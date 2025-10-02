# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is an AI-Powered Course Generator built with Next.js that uses Google's Gemini AI to automatically create educational courses. The application allows users to generate course content including titles, chapters, and descriptions based on their input parameters.

**Tech Stack**: Next.js 15, React 19, Drizzle ORM, PostgreSQL (Neon), Clerk Auth, Google Gemini AI, Razorpay, Tailwind CSS

## Development Commands

The main application is located in the `course-generator/` directory. Always run commands from there:

```bash
cd course-generator
```

### Core Commands
- **Development server**: `npm run dev` (uses Turbopack for faster builds)
- **Build**: `npm run build`
- **Production**: `npm run start`
- **Lint**: `npm run lint`

### Database Commands
- **Push schema**: `npm run db:push` (deploy schema changes to database)
- **Database studio**: `npm run db:studio` (open Drizzle Studio for database management)

### Setup Commands
```bash
# Initial setup
npm install
cp .env.example .env.local  # Create and configure environment variables
npm run db:push            # Initialize database schema
npm run dev                # Start development server
```

## Architecture Overview

### Core Application Structure
```
course-generator/
├── app/                      # Next.js App Router pages
│   ├── _components/          # Shared UI components (Header, Hero)
│   ├── _context/            # React contexts for state management
│   ├── _shared/             # Shared utilities and components
│   ├── create-course/       # Course creation wizard (multi-step form)
│   ├── dashboard/           # User dashboard and course management
│   └── checkout/            # Payment processing
├── components/ui/           # shadcn/ui components library
├── configs/                 # Configuration modules
│   ├── AiModel.jsx         # Google Gemini AI integration
│   ├── db.jsx              # Drizzle database connection
│   ├── schema.jsx          # Database schema definitions
│   ├── service.jsx         # External API services (YouTube)
│   └── firebaseConfig.jsx  # Firebase configuration
└── lib/                    # Utility functions
```

### Key Architectural Components

**AI Integration**: 
- `configs/AiModel.jsx` handles Google Gemini AI requests for course generation
- Uses streaming responses with JSON mode for structured course content
- Fallback Ollama integration available (commented out in create-course page)

**Database Layer**:
- Drizzle ORM with PostgreSQL (hosted on Neon)
- Main tables: `CourseList`, `Chapters`, `authors`
- Schema defined in `configs/schema.jsx`

**Authentication**:
- Clerk integration for user authentication
- User data automatically populated in course records

**State Management**:
- React Context API for user input (`UserInputContext`, `UserCourseListContext`)
- Multi-step form state management in course creation

**Course Generation Flow**:
1. User inputs course parameters (category, topic, level, duration, chapters)
2. AI generates structured course layout with chapters
3. Course saved to database with unique UUID
4. YouTube videos fetched for each chapter
5. User redirected to course editing interface

## Environment Configuration

Required environment variables in `course-generator/.env.local`:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Database
DATABASE_URL=               # Neon PostgreSQL connection string
NEXT_PUBLIC_DB_CONNECTION_STRING=  # Same as DATABASE_URL for client access

# AI Services
GEMINI_API_KEY=            # Google Gemini AI API key

# External APIs
NEXT_PUBLIC_YOUTUBE_API_KEY=       # YouTube Data API v3
NEXT_PUBLIC_CLOUDINARY_API_KEY=    # Image hosting
NEXT_PUBLIC_CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLOUDINARY_API_URL=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

# Payment
RAZORPAY_KEY_ID=           # Razorpay payment gateway
RAZORPAY_KEY_SECRET=
```

## Development Guidelines

### Working with AI Models
- Primary AI provider is Google Gemini (gemini-2.0-flash model)
- Always use JSON response format for structured data
- Implement proper error handling for AI API failures
- Ollama integration available as backup (see create-course implementation)

### Database Workflow
- Use `npm run db:push` after schema changes
- Database schema uses Drizzle ORM with PostgreSQL dialect
- UUID v4 for course IDs, serial IDs for database records
- JSON columns store complex course structures

### Component Development
- Follow Next.js 15 App Router conventions
- Use shadcn/ui components for consistent UI
- Shared components go in `app/_components/`
- Page-specific components in respective page directories

### Styling
- Tailwind CSS with custom configuration
- Purple theme colors (`text-purple-500`, `bg-purple-500`)
- Responsive design patterns throughout

### Testing Course Generation
To test the course generation flow:
1. Navigate to `/create-course`
2. Select a category (e.g., "Programming")
3. Enter topic and description
4. Choose difficulty level and options
5. Generate course and verify database entry

## API Integrations

### Google Gemini AI
- Configured in `configs/AiModel.jsx`
- Uses streaming responses for better UX
- JSON mode ensures structured course output

### YouTube API
- Service in `configs/service.jsx`
- Fetches educational videos for course chapters
- Filtered for long-duration videos

### Clerk Authentication
- Handles user management and authentication
- User profile data automatically integrated into course records