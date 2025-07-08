# Marketing Tool Backend API

A comprehensive backend API for the Marketing Tool frontend, providing AI-powered content generation, URL analysis, and marketing automation features.

## Features

- **URL Analysis**: Extract content, metadata, and branding information from any website
- **AI Content Generation**: Generate marketing content using GPT-4-turbo and Claude 4 Sonnet
- **Email Campaign Creation**: Create professional email campaigns with HTML templates
- **Persona Generation**: Build detailed customer personas based on descriptions
- **Image Upload & Processing**: Handle image uploads with optimization
- **API Key Validation**: Validate OpenAI and Anthropic API keys
- **Rate Limiting**: Protect against abuse with configurable rate limits

## Tech Stack

- **Node.js** with **TypeScript**
- **Express.js** for API framework
- **OpenAI API** (GPT-4-turbo)
- **Anthropic API** (Claude 4 Sonnet)
- **Cheerio** for web scraping
- **Sharp** for image processing
- **Multer** for file uploads

## Installation

1. Clone the repository and navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
MAX_FILE_SIZE=5242880
UPLOAD_DIR=uploads
```

## Development

Start the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
npm start
```

## API Endpoints

### Health Check
- `GET /health` - Server health status

### URL Analysis
- `POST /api/analyze/url` - Analyze a website URL

### AI Chat
- `POST /api/chat` - Chat with AI assistant

### Content Generation
- `POST /api/content/generate` - Generate marketing content

### Email Generation
- `POST /api/email/generate` - Generate email campaigns

### Persona Generation
- `POST /api/persona/generate` - Generate customer personas

### File Upload
- `POST /api/upload/image` - Upload single image
- `POST /api/upload/images` - Upload multiple images

### API Key Validation
- `POST /api/validate/openai` - Validate OpenAI API key
- `POST /api/validate/anthropic` - Validate Anthropic API key

## Authentication

The API uses API key authentication passed via headers:
```javascript
headers: {
  'X-API-Keys': JSON.stringify({
    openai: 'your-openai-key',
    anthropic: 'your-anthropic-key'
  })
}
```

## Rate Limiting

- Default: 100 requests per 15 minutes per IP
- Configurable via environment variables
- Returns `429` status with retry information

## Error Handling

All endpoints return consistent error responses:
```json
{
  "success": false,
  "error": "Error message",
  "retryAfter": 60
}
```

## File Uploads

- Maximum file size: 5MB (configurable)
- Supported formats: Images only
- Automatic optimization to WebP format
- Files stored in `/uploads` directory

## Security Features

- **Helmet.js** for security headers
- **CORS** protection
- **Rate limiting**
- **Input validation**
- **File type restrictions**

## Frontend Integration

The backend is designed to work seamlessly with the provided frontend. API keys are managed through the frontend settings page and passed with each request.

## Production Deployment

1. Set `NODE_ENV=production`
2. Configure production database if needed
3. Set up proper logging
4. Configure reverse proxy (nginx)
5. Set up SSL certificates
6. Configure monitoring

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment | `development` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | `900000` |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` |
| `MAX_FILE_SIZE` | Max upload size in bytes | `5242880` |
| `UPLOAD_DIR` | Upload directory | `uploads` |

## License

This project is proprietary software. All rights reserved.