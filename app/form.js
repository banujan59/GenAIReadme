'use client'
import React, { useState } from 'react';
import { useFormState, useFormStatus } from "react-dom";
import { createCommitList } from "@/app/actions";

export default function Form()
{
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [state, formAction] = useFormState(createCommitList)

    return (
        <form className='UserInputForm' /*onSubmit={SubmitForm}*/ action={formAction}>
            <h3>Choose date range of commits:</h3>
            <br/>
            <label>Start date:</label>
            <input type="date" id="startDate" name="startDate" value={startDate} onChange={(event) => { setStartDate(event.target.value);}}/>

            <label>End date:</label>
            <input type="date" id="endDate" name="endDate" value={endDate} onChange={(event) => { setEndDate(event.target.value);}}/>

            <br/><br/>

            <button>Submit</button>
            <p>{state?.message}</p>
        </form>
    );
}
