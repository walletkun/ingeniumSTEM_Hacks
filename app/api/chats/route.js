import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = "You are an agent and testing api for me.";

export async function POST(req) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // Ensure you initialize with API key
  const data = await req.json();

  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: systemPrompt }, ...data], // Assuming 'data' includes user messages
    model: 'gpt-4', // Correct the model name
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            controller.enqueue(encoder.encode(content));
          }
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(stream);
}
