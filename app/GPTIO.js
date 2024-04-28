'use client'
import React, {useState, useEffect} from 'react';

export default function GPTIO({gitCommits})
{
    let gptInput = "";

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

    const [gptOutput, setGptOutput] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    function SendToGPT(event)
    {
        event.preventDefault();
        if(gptInput === "")
            return; 

        setGptOutput("");
        
        fetch('/api/gptoutput/', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                gptInput : gptInput
            })
         });

         setIsGenerating(true);
    }

    useEffect(() => {
        let intervalId;

        if(isGenerating)
        {
            intervalId = setInterval(async () => {
                if (isGenerating) 
                {
                    const res = await fetch('/api/gptoutput/');
                    const data = await res.json();
                     
                    setGptOutput(data.gptOutput);
                    setIsGenerating(data.isGenerating)
                } 
                else 
                {
                    clearInterval(interval);
                }
            }, 250);
        }
 
        return () => {
            if(intervalId)
                clearInterval(intervalId);
        }
    }, [isGenerating]);

    return (
        <div>
            <form className='gptIO'>
                <p>
                    Here is your GPT input:
                    <br/>
                    <textarea value={gptInput} name='gptInput' readOnly></textarea>
                    <button onClick={SendToGPT}>Send to GPT</button>
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
