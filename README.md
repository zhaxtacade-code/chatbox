# Research Assistant - PDF Knowledge Archive

A Next.js application for searching and chatting about 21 academic papers on leadership and crisis management.

## Features

- **PDF Search**: Search through 21 academic papers by title, author, or category
- **AI Chat**: Ask questions about the research papers using OpenAI
- **Category Filtering**: Filter papers by Leadership, Crisis Management, Research Methods, or Organizational Theory
- **Real-time Search**: Instant filtering as you type

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- OpenAI API (via AI SDK)
- Vercel AI SDK

## Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd skal-ventures-template
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Create a `.env.local` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

4. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/` - Next.js app router pages and API routes
- `components/` - React components
- `lib/` - Utility functions and data
- `public/` - Static assets

## API Routes

- `/api/chat` - Chat endpoint for AI interactions

## Environment Variables

- `OPENAI_API_KEY` - Your OpenAI API key (required for chat functionality)

## License

MIT
