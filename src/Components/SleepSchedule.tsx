import React from 'react'
import TimeDisplay from './TimeDisplay'

export default function SleepSchedule({seconds} : {seconds:number}) {
    const now = new Date();

    // Add seconds to current time

    let resultSeconds = 0;
    if(seconds){
    const result = new Date(now.getTime() + seconds * 1000);
    resultSeconds = (result.getHours() * 3600) +
                        (result.getMinutes() * 60) +
                        result.getSeconds();
    }
  return (
    <TimeDisplay status="active" time={resultSeconds}></TimeDisplay>
  )
}
