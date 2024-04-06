'use client'
import React, { useState } from 'react';

export default function From()
{
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [formOutput, setFormOutput] = useState('');

    function ValidateDates(startDate, endDate) 
    {
        const start = new Date(startDate);
        const end = new Date(endDate);
      
        if (end > start) 
          return true;
         else 
          return false;
      }

    function SubmitForm(event)
    {
        event.preventDefault();
        setFormOutput("");

        if(startDate == "" || endDate == "" || !ValidateDates(startDate, endDate))
            setFormOutput("Make sure the dates ranges are valid !");
        
    }

    return (
        <form className='UserInputForm' onSubmit={SubmitForm}>
            <h3>Choose date range of commits:</h3>
            <br/>
            <label>Start date:</label>
            <input type="date" id="startDate" name="startDate" value={startDate} onChange={(event) => { setStartDate(event.target.value);}}/>

            <label>End date:</label>
            <input type="date" id="endDate" name="endDate" value={endDate} onChange={(event) => { setEndDate(event.target.value);}}/>

            <br/><br/>

            <button>Submit</button>
            <p>{formOutput}</p>
        </form>
    );
}
