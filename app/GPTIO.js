'use client'
import React from 'react';

export default function GPTIO({gitCommits})
{
    let gptInput = "";
    let gptOutput = "";

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
        <p className='gptIO'>
            <p>
                Here is your GPT input:
                <br/>
                <textarea value={gptInput} readOnly></textarea>
            </p>
            <p>
                <button>Send to GPT</button>
                
                <br/><br/>
                Here is your GPT output:
                <br/>
                <textarea value={gptOutput} readOnly></textarea>
            </p>
        </p>
    );
}
