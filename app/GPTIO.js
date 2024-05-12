'use client'
import React, {useState, useEffect} from 'react';
import GPTOutput from "./GPTOutput"

export default function GPTIO({gitCommits})
{
    const [gptInput, setGptInput] = useState("");
    const [gptTemperature, setGPTTemperature] = useState(1);

    const [gptOutput, setGptOutput] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGPTTemperatureChange = (event) => {
        setGPTTemperature(parseInt(event.target.value));
    };

    useEffect(() => {
        let gptInputText = "";
    
        if(gitCommits)
        {
            gptInputText = "Generate a paragraph that outlines the changes in the new version of the software based on the following "
                + "git titles and descriptions:\n\n";
            const jsonObj = JSON.parse(gitCommits);
            jsonObj.commits.forEach(element => {
                gptInputText += "title: " + element.title + "\n"; 
                gptInputText += "description: " + element.description + "\n\n";
            });
        }
    
        setGptInput(gptInputText);
    }, [gitCommits]); 

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
                gptInput : gptInput,
                gptTemperature: gptTemperature
            })
         });

         setIsGenerating(true);
    }

    return (
        <div>
            <form className='gptIO'>
                <div>
                    Here is your GPT input (you can adjust it if needed):
                    <br/>
                    <textarea value={gptInput} name='gptInput' onChange={(event)=>{setGptInput(event.target.value);}} readOnly={!gitCommits}></textarea>
                    
                    <div>
                        <b>Creativity Level: </b>
                        {['Creative', 'Balanced', 'Precise'].map((option, index) => (
                            <span key={option+"CreativityOption"}>
                                <input
                                    id={option+"CreativityOption"}
                                    type="radio"
                                    value={index}
                                    checked={gptTemperature === index}
                                    onChange={handleGPTTemperatureChange}
                                />
                                <label htmlFor={option+"CreativityOption"}>{option}</label>
                            </span>
                        ))}
                        </div>

                    <br/>
                    <button onClick={SendToGPT}>Send to GPT</button>
                </div>
                <br/>
                <GPTOutput gptOutput={gptOutput} setGptOutput={setGptOutput} isGenerating={isGenerating} setIsGenerating={setIsGenerating}/>
            </form>
        </div>
        
    );
}
