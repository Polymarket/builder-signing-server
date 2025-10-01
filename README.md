## builder-signing-server

Server for creating builder headers remotely

## Endpoints

- **Health Check**: GET `/` - Returns server status

- **Sign Endpoint**: POST `/sign` - Accepts signing requests with path, method, and body and returns a `BuilderHeaderPayload`

## Prerequisites

- **Node.js**: v18 or higher

## Installation

```bash
# Install dependencies
pnpm install
```


## Environment Variables

Create a `.env` file in the root directory using the `.env.example` file as an example:

```env
PORT=3000
POLY_BUILDER_API_KEY=your_api_key
POLY_BUILDER_SECRET=your_secret
POLY_BUILDER_PASSPHRASE=your_passphrase
```

## Project Structure

```
├── src/                 # TypeScript source files
│   ├── app.ts          # Express app configuration
│   ├── server.ts       # Server entry point
│   └── types.ts        # Type definitions
├── dist/               # Compiled JavaScript (generated)
├── coverage/           # Test coverage reports (generated)
├── tests/              # Test files
├── Makefile           # Build configuration
├── tsconfig.json      # TypeScript configuration
└── package.json       # Dependencies and scripts
```
