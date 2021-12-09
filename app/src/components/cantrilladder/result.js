import React from 'react';
import { useLocation } from 'react-router-dom';

function CantrilLadderResult() {

    const location = useLocation();

    return (
        <div>
            <h2 className="text-left border-b-2 border-blue-1100 text-blue-1100 font-bold font-heading text-md lg:text-xl">Result</h2>
            <h1>Your Result is {location.state.value}</h1>
        </div>
    )
}

export default CantrilLadderResult;