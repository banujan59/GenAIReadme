import { NextResponse } from "next/server"
import OpenAI from "openai";

let gptOutput = "";
let isGenerating = false;

export async function GET(request)
{
    return NextResponse.json({gptOutput: gptOutput, isGenerating: isGenerating});
}

export async function POST(request) {
    const data = await request.json();

    if(data.gptInput != undefined)
    {
      gptOutput = ""; 
      isGenerating = true;

      const openai = new OpenAI({apiKey:"API_KEY_HERE"});
      const stream = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: data.gptInput }],
          stream: true,
      });

      for await (const chunk of stream) {
          process.stdout.write(chunk.choices[0]?.delta?.content || "");
          gptOutput += chunk.choices[0]?.delta?.content || "";
      }

      isGenerating = false;
    }
   
    return GET(request);
  }