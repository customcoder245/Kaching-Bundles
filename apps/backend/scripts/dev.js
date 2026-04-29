import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env');

// Port should match your Express app
const PORT = process.env.PORT || 5000;

console.log('🚀 Starting development environment...');

// 1. Start the Node.js server (Nodemon)
const server = spawn('npm', ['run', 'server'], { 
  stdio: 'inherit', 
  shell: true 
});

// 2. Start Cloudflare Tunnel
const cloudflared = spawn('cloudflared', ['tunnel', '--url', `http://localhost:${PORT}`], { 
  shell: true 
});

let urlFound = false;

// Cloudflared outputs to stderr mostly
cloudflared.stderr.on('data', (data) => {
  const output = data.toString();
  
  // Extract the Cloudflare URL
  const match = output.match(/https:\/\/[a-zA-Z0-9-]+\.trycloudflare\.com/);
  
  if (match && !urlFound) {
    urlFound = true;
    const url = match[0];
    
    console.log('\n---------------------------------------------------');
    console.log(`✅ Cloudflare Tunnel is live!`);
    console.log(`🔗 URL: ${url}`);
    
    // Update .env file with the new URL
    if (fs.existsSync(envPath)) {
      let envContent = fs.readFileSync(envPath, 'utf8');
      
      if (envContent.includes('HOST=')) {
        envContent = envContent.replace(/HOST=.*/, `HOST=${url}`);
      } else {
        envContent += `\nHOST=${url}`;
      }
      
      fs.writeFileSync(envPath, envContent);
      console.log(`📝 Automatically updated .env HOST variable.`);
    }
    console.log('⚠️  REMINDER: Update your Shopify Partner Dashboard with this URL!');
    console.log('---------------------------------------------------\n');
  } else if (!urlFound && output.includes('ERR')) {
    // Only log errors if we haven't found the URL yet to avoid noise
    console.error(`[Cloudflared]: ${output.trim()}`);
  }
});

// Handle cleanup on exit
const cleanup = () => {
  server.kill();
  cloudflared.kill();
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
server.on('close', cleanup);
