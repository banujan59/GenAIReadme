'use client'
import React, { useState } from 'react';
import { useFormState } from "react-dom";
import { createCommitList } from "@/app/actions";

export default function Form()
{
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [serverResponse, formAction] = useFormState(createCommitList)

    return (
        <form className='UserInputForm' action={formAction}>
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
