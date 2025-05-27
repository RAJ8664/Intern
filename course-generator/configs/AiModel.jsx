import { GoogleGenerativeAI } from "@google/generative-ai";

// Load API key from environment variables
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// Initialize the Gemini client
const genAI = new GoogleGenerativeAI(apiKey);

// Main function

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-pro-preview-05-06",
  });

export const GenerateCourseLayout_AI=model.startChat();

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `Generate a course tutorial on following detail with field as course name, description, along with chapter name, about, duration: category :'programming', topic: python, level: basic, duration: 1 hours, no.of chapters:5 , in JSON format`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `**Initiating Course Design**

I've started with the request's core – crafting a JSON structure for a basic Python course. It needs to reflect "programming" as a category and "python" as its topic... (shortened for brevity)`,
        },
        {
          text: `\`\`\`json
{
  "category": "programming",
  "topic": "python",
  "level": "basic",
  "course_name": "Python Quickstart: A 1-Hour Introduction",
  "description": "Kickstart your Python journey with this concise 1-hour tutorial...",
  "total_duration_hours": 1,
  "chapters": [
    {
      "chapter_name": "Chapter 1: Getting Started with Python",
      "about": "Understand what Python is...",
      "duration_minutes": 10
    },
    {
      "chapter_name": "Chapter 2: Variables and Basic Data Types",
      "about": "Learn how to store information...",
      "duration_minutes": 15
    },
    {
      "chapter_name": "Chapter 3: Control Flow - Conditional Statements",
      "about": "Explore how to make your programs responsive...",
      "duration_minutes": 12
    },
    {
      "chapter_name": "Chapter 4: Control Flow - Loops",
      "about": "Discover for and while loops...",
      "duration_minutes": 13
    },
    {
      "chapter_name": "Chapter 5: Introduction to Lists & Next Steps",
      "about": "Get a first look at Python's versatile list...",
      "duration_minutes": 10
    }
  ]
}
\`\`\``,
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "INSERT_INPUT_HERE", // You can replace this with further interaction if needed
        },
      ],
    },
  ];

 


