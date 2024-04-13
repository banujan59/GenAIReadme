'use client'
import React, { useState } from 'react';
import { useFormState } from "react-dom";
import { createCommitList } from "@/app/actions";
import GPTIO from "./GPTIO"

export default function Form({directories})
{
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [serverResponse, formAction] = useFormState(createCommitList);
    const jsonString = '{"commits": [{"id": "168a803", "title" : "Fix json output", "description" : ""}, {"id": "4af92ad", "title" : "Return json output of Git commits", "description" : ""}, {"id": "c52abc8", "title" : "Retrieve information about Git repository", "description" : ""}, {"id": "9d8be54", "title" : "1 - create form (#2)", "description" : "* Fix warning * Added form UI * Form adjustement & error check - Error check for selected dates * Create server communication - Form data sent to server and server returns a response. * Added server command execution - Change structure where the github project paths are located - Added sample command execution with output returned to the client * Reorganize application and get rid of warnings * Change project list presentation * Unified forms * Test output * Made the date field required"}, {"id": "efd854c", "title" : "List GitHub directories", "description" : "- Add functions to list all Github repositories from a directory. Note: the text \\"INSERT_DIR_HERE\\" must be replaced with an actual directory from the server for the app to compile from now on. "}, {"id": "5954543", "title" : "Init project structure", "description" : "Added all files required to start the project. This is a clone from a basic next project. "}, {"id": "ca1dba4", "title" : "Initial commit", "description" : ""}]}';

    return (
        <form className='UserInputForm' action={formAction}>
            <p>Select the GitHub project:</p>
            <br/>
            {directories.map((dirName, index) => (
                <span key={dirName} className='projectSpan'>
                    <input type="radio" id={dirName} name="project" value={dirName} defaultChecked={index === 0}/>
                    <label htmlFor={dirName}> {dirName}</label>
                </span>
            ))}
            <br/><br/>
            <h3>Choose date range of commits:</h3>
            <br/>
            <label>Start date:</label>
            <input type="date" id="startDate" name="startDate" value={startDate} onChange={(event) => { setStartDate(event.target.value);}} required/>

            <label>End date:</label>
            <input type="date" id="endDate" name="endDate" value={endDate} onChange={(event) => { setEndDate(event.target.value);}} required/>

            <br/><br/>

            <button>Submit</button>

            <br/><br/>
            <GPTIO gitCommits={serverResponse?.message}/>
        </form>
    );
}
