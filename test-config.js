// Test script to verify API key configuration
import fs from 'fs';

// Read environment variables from .env file
const envContent = fs.readFileSync('.env', 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

console.log('🔑 API Key Configuration Check:');
console.log('================================');
console.log(`AI Provider: ${envVars.AI_PROVIDER || 'Not set'}`);
console.log(`OpenAI API Key: ${envVars.OPENAI_API_KEY ? '✅ Configured' : '❌ Missing'}`);
console.log(`Port: ${envVars.PORT || '3001'}`);
console.log(`Frontend URL: ${envVars.FRONTEND_URL || 'Not set'}`);
console.log('');

if (envVars.OPENAI_API_KEY) {
  console.log('✅ API key is configured!');
  console.log('');
  console.log('Next steps:');
  console.log('1. Install dependencies: npm install');
  console.log('2. Start server: npm run dev');
  console.log('3. Test the application');
} else {
  console.log('❌ API key is missing!');
  console.log('Please add your OpenAI API key to the .env file');
}
