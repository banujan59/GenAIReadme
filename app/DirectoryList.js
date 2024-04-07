'use client'
import React, { useState } from 'react';

export default function DirectoryList({directories})
{
    const defaultIndex = 0;
    const [selectedProject, setSelectedProject] = useState(directories[defaultIndex]);

    function handleProjectChanged(event)
    {
        setSelectedProject(event.target.value);
    }

    return (
        <div>
            <p>Select the GitHub project:</p>
            <br/>
            {directories.map((dirName, index) => (
                <span key={dirName} className='projectSpan'>
                    <input type="radio" id={dirName} name="project" value={dirName} defaultChecked={index === defaultIndex} onChange={handleProjectChanged}/>
                    <label htmlFor={dirName}> {dirName}</label>
                </span>
            ))}
      </div>
    );
}
