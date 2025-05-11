# Quiz Mint AI

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- Docker (Optional, for Docker-based setup)

### Installation

1. Clone repo
```bash
git clone https://github.com/oz841119/quiz-mint-ai.git
cd quiz-mint-ai
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Configure environment variables
```bash
cp env.demo .env.local
```
Then modify the configurations in `.env.local` as needed.

### Development

You can run the development server in two ways:

#### Option 1: Using Docker (Recommended)

```bash
# Start development server
docker compose up

# Stop development server
docker compose down
```

#### Option 2: Manual Setup

```bash
# Start development server
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:3000.

### Adding New AI Models

To add a new AI model to the project:

1. Create a new file in `src/AIService/providers/` with your model name (e.g., `myModel.ts`)
2. Implement the `AIServiceProvider` interface in your new file
3. Add your model to the `providerMap` in `src/AIService/providerMap.ts`
4. Add the required API key to your `.env.local` file

Example:
```typescript
// src/AIService/providers/myModel.ts
import { AIServiceProvider } from '../types';

export class MyModelProvider implements AIServiceProvider {
  // Implement required methods
}

// src/AIService/providerMap.ts
import { MyModelProvider } from './providers/myModel';

export const providerMap = {
  // ... existing providers
  myModel: new MyModelProvider(),
};

// .env.local
MY_MODEL_API_KEY=your_api_key_here
```

### Using Models in Pages

To use a model in your pages:

1. Add your model to the `MODELS` constant in `src/configs/models.ts`
2. The model will then be available in the model selection dropdown
