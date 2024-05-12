'use client'
import React, {useState, useEffect} from 'react';
import GPTOutput from "./GPTOutput"

export default function GPTIO({gitCommits})
{
    const [gptInput, setGptInput] = useState("");
    const [gptTemperature, setGPTTemperature] = useState('Balanced');

    const [gptOutput, setGptOutput] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const handleChange = (event) => {
        setGPTTemperature(event.target.value);
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

        setGptOutput("The selected creativity is: " + gptTemperature);
        
        // fetch('/api/gptoutput/', {
        //     method: 'post',
        //     headers: {'Content-Type':'application/json'},
        //     body: JSON.stringify({
        //         gptInput : gptInput
        //     })
        //  });

        //  setIsGenerating(true);
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
                        <label>
                            <input
                            type="radio"
                            value="Creative"
                            checked={gptTemperature === 'Creative'}
                            onChange={handleChange}
                            />
                            Creative
                        </label>
                        <label>
                            <input
                            type="radio"
                            value="Balanced"
                            checked={gptTemperature === 'Balanced'}
                            onChange={handleChange}
                            />
                            Balanced
                        </label>
                        <label>
                            <input
                            type="radio"
                            value="Precise"
                            checked={gptTemperature === 'Precise'}
                            onChange={handleChange}
                            />
                            Precise
                        </label>
                        </div>

                    <button onClick={SendToGPT}>Send to GPT</button>
                </div>
                <br/>
                <GPTOutput gptOutput={gptOutput} setGptOutput={setGptOutput} isGenerating={isGenerating} setIsGenerating={setIsGenerating}/>
            </form>
        </div>
        
    );
}
