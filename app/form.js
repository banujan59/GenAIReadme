'use client'
import React, { useState } from 'react';
import { useFormState } from "react-dom";
import { createCommitList } from "@/app/actions";

export default function Form({directories})
{
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [serverResponse, formAction] = useFormState(createCommitList)

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
            <input type="date" id="startDate" name="startDate" value={startDate} onChange={(event) => { setStartDate(event.target.value);}}/>

            <label>End date:</label>
            <input type="date" id="endDate" name="endDate" value={endDate} onChange={(event) => { setEndDate(event.target.value);}}/>

            <br/><br/>

            <button>Submit</button>
            <p>{serverResponse?.message}</p>
        </form>
    );
}
