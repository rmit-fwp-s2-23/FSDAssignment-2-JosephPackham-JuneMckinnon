import React from "react";
import '../../css/sessiontimes.css'

const Barbiest = (onCLose) => { 
    const Times = [ //array of session times
        {
            day: 'Wednesday 02/08/2023', 
            sessions: [
                '9:00', '12:00', '15:00', '18:00'
            ]
        },
        {
            day: ' Thursday 03/08/2023',
            sessions: [
                '9:00', '11:00', '15:00', '18:00'
            ]
        },
        {
            day: 'Friday 04/08/2023',
            sessions: [
                '9:00', '12:00', '15:00', '22:00'
            ]
        }
    ]
  
  return ( //return the session times
    <div >
        <div className="heading">
            <h1>Barbie Times</h1>
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

export default Barbiest;


