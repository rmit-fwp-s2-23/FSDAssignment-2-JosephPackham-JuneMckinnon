import React from "react";
import '../../css/sessiontimes.css'

const Avengersst = () => {
    const Times = [ //array of session times
        {
            day: 'Wednesday 02/08/2023',
            sessions: [
                '11:00', '12:00', '16:00', '18:00'
            ]
        },
        {
            day: ' Thursday 03/08/2023',
            sessions: [
                '9:00', '12:00', '18:00', '22:00'
            ]
        },
        {
            day: 'Friday 04/08/2023',
            sessions: [
                '8:00', '12:00', '16:00', '22:00'
            ]
        }
    ]
  //return the session times
    return (
    <div >
        <div className="heading">
            <h1>Avengers Times</h1>
        </div>
      {Times.map((times) => ( //map through the days 
        <div className="sessiontimes"  key={times.day}>  
            <h1>{times.day}</h1>
            <ul>                       
                {times.sessions.map((session, index) => ( //map through the sessions
                    <li key ={index}>{session}</li>
                ))}

            </ul>
            
        </div>
        

    ))}
    </div>

    
);
};

export default Avengersst;