"use server"

import { NextResponse } from "next/server"
import OpenAI from "openai";

let gptOutput = "";
let isGenerating = false;

const initialMessages = [
    {"role": "system", "content": "You are an assistant that summarizes the work done in a GitHub repository in a simple terms for the client."},
    {"role": "user", "content": "Generate a paragraph that outlines the new changes for the current version of the software. "
        + "Make it easy to understand. The target audience is the client of the application. " 
        + "Gather the required information from the following git titles and descriptions:\n\n"
        + "title: Fix crash at startup\ndescription: Fix a bug that prevented the app from starting.\n\n"
        + "title: Fix high memory usage.\ndescription: Optimized performance of the application and introduced new data structure that saves 25% of RAM."},
    {"role": "assistant", "content": "In this latest version of our software, we've made significant improvements to enhance your experience. "
        + "First off, we've addressed a bug that was causing the app to crash at startup, ensuring smoother navigation right from the get-go. "
        + "Additionally, we've fine-tuned the performance, notably reducing memory usage. By implementing a new data structure, we've managed "
        + "to cut down on RAM usage by a substantial 25%, making the application more efficient and responsive. These updates not only improve "
        + "stability but also enhance overall performance, providing you with a better and more reliable user experience."}        
];

export async function GET(request)
{
    return NextResponse.json({gptOutput: gptOutput, isGenerating: isGenerating});
}

export async function POST(request) {
    const data = await request.json();
    const validToGenerate = (data.gptInput != undefined) && (data.gptTemperature != undefined) && (process.env.GENAI_README_OPENAI_SECRET_KEY != undefined);

    if(validToGenerate)
    {
      gptOutput = ""; 
      isGenerating = true;

      let messageHistory = initialMessages;
      messageHistory.push({"role" : "user", "content": data.gptInput});

      const selectedTemperature = Math.max(0, Math.min(2, selectedTemperature)); // Clamps the value from 0 to 2

      const openai = new OpenAI({apiKey: process.env.GENAI_README_OPENAI_SECRET_KEY});
      const stream = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: messageHistory,
          stream: true,
          temperature: selectedTemperature
      });
      
      for await (const chunk of stream) {
          process.stdout.write(chunk.choices[0]?.delta?.content || "");
          gptOutput += chunk.choices[0]?.delta?.content || "";
      }

      isGenerating = false;
    }
   
    return GET(request);
  }