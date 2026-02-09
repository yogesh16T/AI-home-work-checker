// Simple test server without dependencies
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3001;

// Simple CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json'
};

// Simple request handler
const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, corsHeaders);
    res.end();
    return;
  }

  // Set CORS headers for all responses
  Object.keys(corsHeaders).forEach(key => {
    res.setHeader(key, corsHeaders[key]);
  });

  // Routes
  if (req.url === '/api/health' && req.method === 'GET') {
    res.writeHead(200, corsHeaders);
    res.end(JSON.stringify({
      status: 'OK',
      timestamp: new Date().toISOString(),
      version: '1.0.0-test',
      message: 'Test server is running'
    }));
    return;
  }

  if (req.url === '/api/homework/metadata' && req.method === 'GET') {
    res.writeHead(200, corsHeaders);
    res.end(JSON.stringify({
      success: true,
      data: {
        subjects: [
          { value: 'mathematics', label: 'Mathematics' },
          { value: 'physics', label: 'Physics' },
          { value: 'chemistry', label: 'Chemistry' },
          { value: 'biology', label: 'Biology' },
          { value: 'computer-science', label: 'Computer Science' },
          { value: 'english', label: 'English / Literature' },
          { value: 'history', label: 'History' },
          { value: 'economics', label: 'Economics' }
        ],
        levels: [
          { value: 'middle-school', label: 'Middle School' },
          { value: 'high-school', label: 'High School' },
          { value: 'undergraduate', label: 'Undergraduate' },
          { value: 'postgraduate', label: 'Postgraduate' }
        ],
        supportedFormats: ['.pdf', '.docx', '.txt'],
        maxFileSize: '10MB'
      }
    }));
    return;
  }

  // Mock analysis endpoint
  if (req.url === '/api/homework/analyze' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        console.log('Analysis request:', data);
        
        // Mock response
        res.writeHead(200, corsHeaders);
        res.end(JSON.stringify({
          success: true,
          data: {
            analysis: {
              provider: 'openai-mock',
              analysis: `**AI Analysis for ${data.subject} (${data.level})**

**Overall Assessment**: This is a comprehensive homework submission that demonstrates understanding of the key concepts in ${data.subject}.

**Strengths**: 
- Clear structure and organization
- Good use of relevant terminology
- Demonstrates understanding of core principles
- Well-articulated explanations

**Areas for Improvement**:
- Consider adding more specific examples
- Expand on practical applications
- Include counterarguments where applicable
- Strengthen conclusion with more evidence

**Key Concepts Covered**:
- Fundamental principles of ${data.subject}
- Problem-solving methodology
- Theoretical framework application
- Critical analysis skills

**Next Steps for Learning**:
- Practice with more complex problems
- Explore advanced topics in ${data.subject}
- Apply concepts to real-world scenarios
- Review current research in the field

**Estimated Score**: 85-90% (B+ to A- range)

**Feedback**: This is solid work that shows good understanding. With the suggested improvements, this could easily reach A-level quality. Keep up the good work!

---
*This is a mock analysis. Install backend dependencies and configure OpenAI API key for real AI-powered feedback.*`,
              timestamp: new Date().toISOString(),
              wordCount: 125,
              characterCount: 850
            },
            metadata: {
              subject: data.subject,
              level: data.level,
              hasFile: !!data.fileName,
              contentLength: data.context?.length || 0,
              timestamp: new Date().toISOString()
            }
          }
        }));
      } catch (error) {
        console.error('Parse error:', error);
        res.writeHead(400, corsHeaders);
        res.end(JSON.stringify({
          error: 'Invalid JSON',
          message: 'Could not parse request body'
        }));
      }
    });
    return;
  }

  // Mock upload endpoint
  if (req.url === '/api/upload' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      console.log('Upload request received');
      res.writeHead(200, corsHeaders);
      res.end(JSON.stringify({
        success: true,
        data: {
          fileName: 'mock_file_' + Date.now() + '.pdf',
          originalName: 'homework.pdf',
          size: 1024000,
          mimetype: 'application/pdf',
          uploadPath: '/uploads/mock_file.pdf',
          uploadedAt: new Date().toISOString()
        }
      }));
    });
    return;
  }

  // Mock history endpoint
  if (req.url === '/api/homework/history' && req.method === 'GET') {
    res.writeHead(200, corsHeaders);
    res.end(JSON.stringify({
      success: true,
      data: [],
      message: 'History feature coming soon'
    }));
    return;
  }

  // 404 for other routes
  res.writeHead(404, corsHeaders);
  res.end(JSON.stringify({
    error: 'Route not found',
    path: req.url,
    message: 'Available endpoints: /api/health, /api/homework/metadata, /api/homework/analyze, /api/upload, /api/homework/history'
  }));
});

// Start server
server.listen(PORT, () => {
  console.log('🚀 Test Server Started Successfully!');
  console.log('📍 Server running on: http://localhost:' + PORT);
  console.log('🔗 Health check: http://localhost:' + PORT + '/api/health');
  console.log('📚 This is a minimal test server for connection testing');
  console.log('⚠️  Install npm dependencies for full functionality');
  console.log('');
  console.log('Press Ctrl+C to stop the server');
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error('❌ Port ' + PORT + ' is already in use');
    console.log('💡 Try stopping other services or use a different port');
  } else {
    console.error('❌ Server error:', error);
  }
});
