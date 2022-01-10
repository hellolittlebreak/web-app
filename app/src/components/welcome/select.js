import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { AnimatedList } from 'react-animated-list'
import "../../styles/main.css"
import { FaFortAwesome, FaChevronRight } from 'react-icons/fa';


const SelectExercises = () => {
    const navigate = useNavigate();
    const [welcomeContent, setWelcomeContent] = useState({
        title: "What type of exercises do you feel like doing today?",
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
                        value: "Give yourself a reality check",
                        isSelected: false,
                        componentLink: "give-yourself-a-reality-check"
                    },
                    {
                        value: "Reconstruct thoughts",
                        isSelected: false,
                        componentLink: "reconstruct-thoughts"
                    },
                    {
                        value: "Establish your self-esteem",
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
                        value: "Understand your feelings",
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

    return <div className='mx-auto px-4 lg:px-64 py-6'>
        <AnimatedList className="" animation="grow" initialAnimationDuration="4000">
            <h2 className="text-left border-b-2 border-blue-1100 text-blue-1100 font-bold font-heading text-xl lg:text-2xl">{welcomeContent.title}</h2>
            <div className="flex justify-center lg:mt-10">
                <ul className="w-full lg:w-4/5 grid grid-cols-0  lg:grid-rows-0 lg:grid-cols-2 gap-4 mt-4 justify-center text-center">
                    <AnimatedList className="" animation="grow" initialAnimationDuration="4000">
                        {welcomeContent.content.map((item, index) => {
                            return <div key={index} className="flex flex-col content-center h-full rounded-lg bg-opacity-75 bg-white">
                                <p className="cursor-none lg:select-none m-2 px-4 inline-block w-full  font-heading font-semibold text-xl text-blue-1100"> {item.value}</p>
                                <span className="cursor-none lg:select-none px-4 inline-block w-full font-heading text-sm text-blue-1100 ">{item.duration}</span>
                                <div className=''>
                                    {item.data.map((exercise, index) => {
                                        return <div>
                                            <div key={index} className='justify-between w-full flex flex-row text-justify lg:cursor-pointer' onClick={(e) => handleChange(e, item.type, index)}>
                                                <FaFortAwesome size={30} className="my-auto ml-2 text-blue-1100" />
                                                <p className="w-2/4 py-4 text-blue-1100 ml-10 font-regular font-heading whitespace-pre-wrap">{exercise.value}</p>
                                                <FaChevronRight size={14} className="my-auto mr-4 text-blue-1100" />
                                            </div>
                                            <div className='border-b-default border-gray-300 ml-12'></div>
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