# Monad Hackathon Backend

A Node.js backend service that analyzes Twitter user activity and generates unique AI-powered token metadata based on tweet content. Built for the Monad Hackathon, this service combines social media analysis with AI to create personalized digital assets.

## 🚀 Features

- **Twitter Analysis**: Scrapes and analyzes recent tweets from any public Twitter account
- **AI-Powered Topic Detection**: Uses Google's Gemini AI to identify dominant themes in user tweets
- **Automated Image Generation**: Creates unique artwork based on detected topics using Pollinations AI
- **Token Metadata Generation**: Produces NFT-compatible metadata in JSON format
- **RESTful API**: Simple HTTP endpoints for easy integration

## 🛠️ Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **AI Services**: 
  - Google Generative AI (Gemini) for topic analysis
  - Pollinations.ai for image generation
- **Web Scraping**: Puppeteer
- **Additional Libraries**: Axios, Cheerio, CORS

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Google Gemini API key
- Pollinations API key (optional)

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/erenster2000/monad-backend.git
   cd monad-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Required
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # Optional
   POLLINATIONS_API_KEY=your_pollinations_api_key_here
   PORT=3001
   ```

## 🔑 Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `GEMINI_API_KEY` | Yes | Google Gemini API key for AI analysis | - |
| `POLLINATIONS_API_KEY` | No | Pollinations.ai API key for image generation | - |
| `PORT` | No | Server port number | 3001 |

## 🚦 Running the Application

### Development Mode
```bash
npm run dev
# or
yarn dev
```

The server will start with hot-reload enabled at `http://localhost:3001`

### Production Build
```bash
# Build TypeScript to JavaScript
npm run build
# or
yarn build

# Start the production server
npm start
# or
yarn start
```

## 📚 API Documentation

### Health Check

Check if the server is running.

- **Endpoint**: `GET /`
- **Response**: 
  ```
  Monad Hackathon Backend is Running! 🚀
  ```

### Generate Token Metadata

Analyzes a Twitter user's recent tweets and generates token metadata.

- **Endpoint**: `POST /api/generate`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Request Body**:
  ```json
  {
    "twitterUsername": "elonmusk"
  }
  ```
- **Success Response** (200):
  ```json
  {
    "name": "Monad Token for elonmusk",
    "description": "A unique token generated based on the analysis of the latest tweets from @elonmusk. The central theme is: Technology.",
    "image": "https://gen.pollinations.ai/image/...",
    "attributes": [
      {
        "trait_type": "Topic",
        "value": "Technology"
      },
      {
        "trait_type": "Source Account",
        "value": "@elonmusk"
      }
    ]
  }
  ```

### Error Responses

- **400 Bad Request**: Missing `twitterUsername` parameter
  ```json
  {
    "error": "Twitter username is required."
  }
  ```

- **404 Not Found**: No tweets found or account is private
  ```json
  {
    "error": "No tweets found for this user or account is private."
  }
  ```

- **500 Internal Server Error**: Server-side error during processing
  ```json
  {
    "error": "Failed to generate token metadata."
  }
  ```

## 📁 Project Structure

```
monad-backend/
├── src/
│   ├── server.ts              # Main application entry point
│   ├── config/
│   │   └── gemini.ts          # Gemini AI configuration
│   ├── controller/
│   │   └── tokenController.ts # Request handling logic
│   └── services/
│       ├── ai.ts              # AI topic analysis service
│       ├── image.ts           # Image generation service
│       └── twitter.ts         # Twitter scraping service
├── dist/                      # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── endpoints.md               # API documentation (Turkish)
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled production build

### Code Quality

The project uses TypeScript for type safety and better developer experience. Make sure to:
- Run `npm run build` before committing to catch type errors
- Follow the existing code structure and naming conventions

## 🐛 Troubleshooting

### Puppeteer Installation Issues
If Puppeteer fails to install on macOS, try:
```bash
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
npm install
```

### API Rate Limits
Twitter scraping may be rate-limited. Consider implementing:
- Request caching
- Rate limiting middleware
- Retry logic with exponential backoff

### Missing Environment Variables
The application will throw an error if `GEMINI_API_KEY` is not set. Ensure your `.env` file is properly configured.

## 📄 License

This project is licensed under the MIT License - a permissive open-source license that allows for reuse with minimal restrictions. You are free to use, modify, and distribute this software for both commercial and non-commercial purposes.

## 🤝 Contributing

This project was created for the Monad Hackathon. Feel free to fork and submit pull requests.

## 🔗 Repository

[https://github.com/erenster2000/monad-backend](https://github.com/erenster2000/monad-backend)

---

Built with ❤️ for Monad Hackathon
