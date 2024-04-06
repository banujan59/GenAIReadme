import React from 'react';

export default function From()
{
    return (
        <form className='UserInputForm'>
            <h3>Choose date range of commits:</h3>
            <br/>
            <label>Start date:</label>
            <input type="date" id="startDate" name="startDate"/>

            <label>End date:</label>
            <input type="date" id="endDate" name="endDate"/>

            <br/><br/>
            
            <h3>Target Audience:</h3>
            <input type="radio" id="clientAudience" name="targetAudience" value="Clients"/>
            <label for="clientAudience">Clients</label>
            <input type="radio" id="developperAudience" name="targetAudience" value="Developper"/>
            <label for="developperAudience">Developper</label>

            <br/><br/>

            <button type='submit'>Submit</button>
        </form>
    );
}
