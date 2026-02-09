# AI Homework Checker Backend

Backend API for the AI Homework Checker application.

## Features

- **File Upload**: Handle PDF, DOCX, and TXT file uploads
- **AI Integration**: Support for OpenAI, Anthropic Claude, and Google Gemini
- **Text Extraction**: Extract text from uploaded documents
- **Homework Analysis**: AI-powered feedback on assignments
- **Security**: Rate limiting, CORS, and file validation
- **Error Handling**: Comprehensive error responses

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Configure your AI provider in `.env`:
   - For OpenAI: Set `OPENAI_API_KEY`
   - For Anthropic: Set `ANTHROPIC_API_KEY`
   - For Google Gemini: Set `GEMINI_API_KEY`

4. Start the server:
```bash
npm run dev
```

## API Endpoints

### Health Check
- `GET /api/health` - Server health status

### File Upload
- `POST /api/upload` - Upload homework file
- `DELETE /api/upload/:filename` - Delete uploaded file
- `GET /api/upload/:filename/info` - Get file information

### Homework Analysis
- `POST /api/homework/analyze` - Analyze homework submission
- `GET /api/homework/metadata` - Get supported subjects/levels
- `GET /api/homework/history` - Get analysis history (placeholder)

## File Upload

**Supported formats**: PDF, DOCX, TXT
**Maximum size**: 10MB
**Storage**: Local filesystem in `uploads/` directory

## AI Providers

### OpenAI (Default)
- Model: GPT-3.5-turbo
- Max tokens: 1500
- Temperature: 0.7

### Anthropic Claude
- Model: Claude-3-sonnet-20240229
- Max tokens: 1500

### Google Gemini
- Model: Gemini Pro
- Max tokens: 1500

## Security Features

- Helmet.js for security headers
- Rate limiting (100 requests per 15 minutes)
- File type validation
- File size limits
- CORS configuration
- Input validation and sanitization

## Error Handling

All endpoints return consistent error responses:
```json
{
  "error": "Error type",
  "message": "Human-readable error message",
  "details": [...]
}
```

## Development

The server runs on port 3001 by default and is configured to work with the frontend running on port 5173.

## License

MIT
