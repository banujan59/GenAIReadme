'use client'
import React from 'react';
import { useFormState } from "react-dom";
import { GenerateGPTOutput } from "@/app/actions";

export default function GPTIO({gitCommits})
{
    const [gptOutputResponse, formAction] = useFormState(GenerateGPTOutput);

    let gptInput = "";
    let gptOutput = gptOutputResponse?.message;

    if(gitCommits)
    {
        gptInput = "Act as a technical writer. Generate a paragrah that outlines the new changes for the current version of the software. ";
        gptInput += "Make it easy to understand. The target audience is the client of the application. ";
        gptInput += "Gather the required information from the following git titles and descriptions:\n\n";
        const jsonObj = JSON.parse(gitCommits);
        jsonObj.commits.forEach(element => {
            gptInput += "title: " + element.title + "\n"; 
            gptInput += "description: " + element.description + "\n\n";
        });
    }
    return (
        <div>
            <form className='gptIO' action={formAction}>
                <p>
                    Here is your GPT input:
                    <br/>
                    <textarea value={gptInput} name='gptInput' readOnly></textarea>
                    <button>Send to GPT</button>
                </p>
                <br/>
                <p>
                    Here is your GPT output:
                    <br/>
                    <textarea value={gptOutput} readOnly></textarea>
                </p>
            </form>
        </div>
        
    );
}
