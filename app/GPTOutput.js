'use client'
import React, {useState, useEffect} from 'react';

export default function GPTOutput({gptInput, isGenerating, setIsGenerating})
{
    const [gptOutput, setGptOutput] = useState("");

    function SendToGPT(event)
    {
        event.preventDefault();
        if(gptInput === "" || isGenerating)
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
        <p>
            Here is your GPT output:
            <br/>
            <textarea value={gptOutput} readOnly></textarea>
        </p>
    );
}
