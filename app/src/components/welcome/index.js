import React, { useState } from 'react'
import { useNavigate, Routes, Route } from "react-router-dom";
import { AnimatedList } from 'react-animated-list'
import "../../styles/main.css"


const Welcome = () => {
    const navigate = useNavigate();
    const [welcomeContent, setWelcomeContent] = useState({
        title: "Life gets busy. Sometimes you forget to take a little break to...",
        description: "Little Break, loaded with psychology research guided insight, is here to help you utilise those small moments of your day to relax, reflect and grow mentally, to become healthier, happier, stronger.",
        content: [
            {
                value: "Listen to your own thoughts"
            },
            {
                value: "Take care of your body"
            },
            {
                value: "Connect with friends and family"
            },
            {
                value: "Take a moment to think about your purpose"
            }
        ]
    }
    )

    const handleClick = () => {
        navigate("/select-exercises")
    }

    return <div>
        <AnimatedList animation="grow" initialAnimationDuration="5000">
            <h2 className="text-left border-b-2 border-blue-1100 text-blue-1100 font-bold font-heading text-md lg:text-xl">{welcomeContent.title}</h2>
            <ul className=" mt-4">
                {welcomeContent.content.map((item, index) => {
                    return <div className='w-full thought my-8'>
                        <p className="sb14 text-blue-1100 font-heading text-xs lg:text-sm inline-block">{item.value}</p>
                    </div>
                })}

            </ul>
            <p className="text-md text-blue-1100 font-heading text-xs lg:text-base font-semibold lg:ml-4 lg:mb-6 lg:mt-6">
                {welcomeContent.description}
            </p>
        </AnimatedList>


        <div className="flex flex-col justify-center">
            <p className="cursor-pointer rounded-full mx-auto py-2 lg:py-4 mt-16 px-4 lg:px-12 bg-blue-1100 hover:bg-blue-800 text-white inline-block font-body text-md lg:text-base" onClick={() => handleClick()}>Continue</p>
        </div>

    </div>
}

export default Welcome;