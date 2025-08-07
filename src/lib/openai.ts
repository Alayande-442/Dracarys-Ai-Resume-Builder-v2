// lib/openai.ts

import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://your-domain.com", // Replace with your actual domain
    "X-Title": "AI Resume Builder", // Optional, but good practice
  },
});

export default openai;
