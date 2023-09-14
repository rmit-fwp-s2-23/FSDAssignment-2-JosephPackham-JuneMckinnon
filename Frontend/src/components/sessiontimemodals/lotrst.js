import React from "react";
import '../../css/sessiontimes.css'

const Lotrst = () => { 
    const Times = [ //array of session times
        {
            day: 'Wednesday 02/08/2023',
            sessions: [
                '10:00', '12:00', '16:00', '18:00'
            ]
        },
        {
            day: ' Thursday 03/08/2023',
            sessions: [
                '10:00', '11:00', '15:00', '23:00'
            ]
        },
        {
            day: 'Friday 04/08/2023',
            sessions: [
                '11:00', '12:00', '15:00', '22:00'
            ]
        }
    ]
  
  return (
    <div >
        <div className="heading">
            <h1>Lord of the Rings Times</h1>
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

export default Lotrst;


