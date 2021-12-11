import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'


const UnwindFromStressfulMoment = () => {
    const [pressed, setPressed] = useState(false)

    useEffect(() => {
        window.onpopstate = () => {
            console.log("BACK PRESSED")
        }
    })

    return <h1>Unwind from stressful moment</h1>
}

export default UnwindFromStressfulMoment;