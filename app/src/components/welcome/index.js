import React, { useState } from 'react'
import { useNavigate, Routes, Route } from "react-router-dom";
import { AnimatedList } from 'react-animated-list'


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
            title: "Now, take a Little Break to...",
            description: "",
            content: [
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
        }
    ])

    const [currentPage, setCurrentPage] = useState(0)

    const handleClick = () => {
        setCurrentPage(() => currentPage + 1)
    }

    const handleChange = (e, position, isSelected) => {
        const componentLink = welcomeContent[currentPage].content[position].componentLink
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
                                    return <div className='w-full'>
                                        <p className="bg-white p-2 lg:ml-2 lg:mr-6 rounded-lg my-4 text-blue-1100 font-heading text-xs lg:text-sm inline-block">{item.value}</p>
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

                        <h2 className="text-left border-b-2 border-blue-1100 text-blue-1100 font-bold font-heading text-md lg:text-xl">{welcomeContent[currentPage].title}</h2>

                        <div className="flex justify-center lg:mt-10">
                            <ul className="w-full lg:w-2/3 grid grid-rows-4 gap-4 lg:grid-cols-2 mt-4 justify-center text-center">
                                {welcomeContent[currentPage].content.map((item, index) => {
                                    if (item.isSelected) {
                                        return <p key={index} className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer lg:cursor-pointer lg:select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 bg-blue-1100 text-white rounded-lg border-solid" onClick={(e) => handleChange(e, index, false)}> {item.value}</p>
                                    }
                                    return <div className="flex  content-center">
                                        <p key={index} className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer lg:cursor-pointer lg:select-none m-2 px-4 py-2 inline-block border-2 w-56 h-32 border-blue-1100 bg-white hover:bg-blue-1100 hover:text-white rounded-lg border-solid" onClick={(e) => handleChange(e, index, true)}> {item.value}</p>
                                    </div>
                                })}
                            </ul>

                        </div>

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