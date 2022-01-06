import React, { useState } from 'react'
import { useNavigate, Routes, Route } from "react-router-dom";
import { AnimatedList } from 'react-animated-list'
import "../../styles/main.css"


const SelectExercises = () => {
    const navigate = useNavigate();
    const [welcomeContent, setWelcomeContent] = useState({
        title: "What types of exercises do you feel like doing today?",
        description: "",
        content: [
            {
                value: "Shorter exercises",
                duration: "( Aprox. 3 min )",
                isSelected: false,
                type: "short-exercises",
                data: [
                    {
                        value: "What are you worried for?",
                        isSelected: false,
                        componentLink: "what-are-you-worried-for"
                    },
                    {
                        value: "Reality check",
                        isSelected: false,
                        componentLink: "give-yourself-a-reality-check"
                    },
                    {
                        value: "Reconstruct thoughts",
                        isSelected: false,
                        componentLink: "reconstruct-thoughts"
                    },
                    {
                        value: "Self esteem",
                        isSelected: false,
                        componentLink: "improve-self-esteem"
                    },
                    {
                        value: "Understanding forgiveness",
                        isSelected: false,
                        componentLink: "understanding-forgiveness"
                    },
                    {
                        value: "Behaviour change",
                        isSelected: false,
                        componentLink: "behaviour-change"
                    },
                    {
                        value: "What triggers your stress",
                        isSelected: false,
                        componentLink: "what-triggers-your-stress"
                    },
                    {
                        value: "Challenge negativity",
                        isSelected: false,
                        componentLink: "challenge-negative-thoughts"
                    },
                    {
                        value: "Gratitude",
                        isSelected: false,
                        componentLink: "gratitude"
                    }
                ]
            },
            {
                value: "Longer exercises",
                duration: "( Aprox. 7 min )",
                isSelected: false,
                type: "long-exercises",
                data: [
                    {
                        value: "Find out your motivations",
                        isSelected: false,
                        componentLink: "find-out-your-motivations"
                    },
                    {
                        value: "Find yourself at your best",
                        isSelected: false,
                        componentLink: "find-yourself-at-your-best"
                    },
                    {
                        value: "Understand your feelings and emotions",
                        isSelected: false,
                        componentLink: "understand-your-feeling-and-emotions"
                    },
                    {
                        value: "Unwind from a stressful moment",
                        isSelected: false,
                        componentLink: "unwind-from-a-stressful-moment"
                    },
                    {
                        value: "Quiet down the negative thoughts ",
                        isSelected: false,
                        componentLink: "quiet-down-the-negative-thoughts"
                    }
                ]
            },
        ]
    })

    const handleChange = (e, type, position) => {
        let componentLink
        if (type === "short-exercises") {
            componentLink = welcomeContent.content[0].data[position].componentLink
            navigate("/" + componentLink)
        } else {
            componentLink = welcomeContent.content[1].data[position].componentLink
        }
        navigate("/" + componentLink)
    }

    return <div>
        <AnimatedList className="h-156" animation="grow" initialAnimationDuration="4000">
            <h2 className="text-left border-b-2 border-blue-1100 text-blue-1100 font-bold font-heading text-xl lg:text-2xl">{welcomeContent.title}</h2>
            <div className="flex justify-center lg:mt-10">
                <ul className="w-full lg:w-2/3 grid grid-cols-2 lg:grid-rows-4 gap-4 lg:grid-cols-2 mt-4 justify-center text-center">
                    <AnimatedList className="h-156" animation="grow" initialAnimationDuration="4000">
                        {welcomeContent.content.map((item, index) => {
                            return <div className="flex flex-col content-center border-default h-full lg:h-120 rounded-lg">
                                <p key={index} className="cursor-none lg:select-none m-2 px-4 inline-block w-full border-blue-1100 font-heading font-semibold text-xl text-blue-1100"> {item.value}</p>
                                <span key={index} className="cursor-none lg:select-none px-4 inline-block w-full border-blue-1100 font-heading text-sm text-blue-1100 ">{item.duration}</span>
                                <div className='pl-2'>
                                    {item.data.map((exercise, index) => {
                                        return <div key={index} className='flex flex-col text-justify lg:cursor-pointer hover:bg-blue-1100' onClick={(e) => handleChange(e, item.type, index)}>
                                            <p className=" py-2 border-b-default justify-start flex-body text-blue-1100 hover:text-white font-regular">{exercise.value}</p>
                                        </div>
                                    })}
                                </div>
                            </div>

                        })}
                    </ AnimatedList>
                </ul>


            </div>
        </AnimatedList>
    </div>
}

export default SelectExercises;