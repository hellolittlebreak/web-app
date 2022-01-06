import React, { useState } from 'react'
import { useNavigate, Routes, Route } from "react-router-dom";
import { AnimatedList } from 'react-animated-list'
import "../../styles/main.css"


const Welcome = () => {
    const navigate = useNavigate();
    const [welcomeContent, setWelcomeContent] = useState([
        {
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
        },
        {
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
        }
    ])

    const [currentPage, setCurrentPage] = useState(0)

    const handleClick = () => {
        setCurrentPage(() => currentPage + 1)
    }

    const handleChange = (e, type, position) => {
        let componentLink
        if (type === "short-exercises") {
            componentLink = welcomeContent[currentPage].content[0].data[position].componentLink
            navigate("/" + componentLink)
        } else {
            componentLink = welcomeContent[currentPage].content[1].data[position].componentLink
        }
        navigate("/" + componentLink)
    }

    return <div>

        {(() => {

            switch (currentPage) {
                case 0:
                    return <div className=" duration-500 transition ease-in">
                        <AnimatedList animation="grow" initialAnimationDuration="5000">
                            <h2 className="text-left border-b-2 border-blue-1100 text-blue-1100 font-bold font-heading text-md lg:text-xl">{welcomeContent[currentPage].title}</h2>
                            <ul className=" mt-4">
                                {welcomeContent[currentPage].content.map((item, index) => {
                                    return <div className='w-full thought my-8'>
                                        <p className="sb14 text-blue-1100 font-heading text-xs lg:text-sm inline-block">{item.value}</p>
                                    </div>
                                })}

                            </ul>


                            <p className="text-md text-blue-1100 font-heading text-xs lg:text-base font-semibold lg:ml-4 lg:mb-6 lg:mt-6">
                                {welcomeContent[currentPage].description}
                            </p>
                        </AnimatedList>
                    </div>
                case 1:
                    return <div>
                        <AnimatedList className="h-156" animation="grow" initialAnimationDuration="4000">
                            <h2 className="text-left border-b-2 border-blue-1100 text-blue-1100 font-bold font-heading text-md lg:text-xl">{welcomeContent[currentPage].title}</h2>
                            <div className="flex justify-center lg:mt-10">
                                <ul className="w-full lg:w-2/3 grid grid-rows-4 gap-4 lg:grid-cols-2 mt-4 justify-center text-center">
                                    <AnimatedList className="h-156" animation="grow" initialAnimationDuration="4000">
                                        {welcomeContent[currentPage].content.map((item, index) => {
                                            return <div className="flex flex-col content-center border-default h-full lg:h-120 rounded-lg">
                                                <p key={index} className="cursor-none lg:select-none m-2 px-4 inline-block w-full border-blue-1100 font-heading font-semibold text-xl text-blue-1100"> {item.value}</p>
                                                <span key={index} className="cursor-none lg:select-none px-4 inline-block w-full border-blue-1100 font-heading text-sm text-blue-1100 ">{item.duration}</span>
                                                {item.data.map((exercise, index) => {
                                                    return <div key={index} className='flex flex-col text-justify lg:cursor-pointer hover:bg-blue-1100' onClick={(e) => handleChange(e, item.type, index)}>
                                                        <p className="py-2 border-b-default justify-start flex-body text-blue-1100 hover:text-white font-regular">{exercise.value}</p>
                                                    </div>
                                                })}
                                            </div>

                                        })}
                                    </ AnimatedList>
                                </ul>


                            </div>
                        </AnimatedList>
                    </div>

                default:
                    break;

            }

        })()}

        {
            currentPage === 0 && <div className="flex flex-col justify-center">
                <p className="cursor-pointer rounded-full mx-auto py-2 lg:py-4 mt-16 px-4 lg:px-12 bg-blue-1100 hover:bg-blue-800 text-white inline-block font-body text-md lg:text-base" onClick={() => handleClick()}>Continue</p>
            </div>
        }
    </div>
}

export default Welcome;