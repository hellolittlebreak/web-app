import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { AnimatedList } from 'react-animated-list'
import "../../styles/main.css"
import { FaChevronRight } from 'react-icons/fa';
import {
    RiQuestionAnswerFill,
    RiChatCheckFill,
    RiHomeHeartFill,
    RiBuilding3Fill,
    RiServiceFill,
    RiContrastDrop2Fill,
    RiVipDiamondFill,
    RiTrophyFill,
    RiStarSmileFill,
    RiHeartPulseFill,
    RiPsychotherapyFill,
    RiDirectionFill
} from 'react-icons/ri'
import ScrollToTopOnMount from '../../utils/ScrollToTop';
import { getAnalytics, logEvent } from "firebase/analytics";

const SelectExercises = () => {
    const navigate = useNavigate();
    const analytics = getAnalytics()
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
                        value: "Understand your worries",
                        isSelected: false,
                        componentLink: "what-are-you-worried-for",
                        icon: "RiQuestionAnswerFill"
                    },
                    {
                        value: "Give yourself a reality check",
                        isSelected: false,
                        componentLink: "give-yourself-a-reality-check",
                        icon: "RiChatCheckFill"
                    },

                    {
                        value: "Establish your self-esteem",
                        isSelected: false,
                        componentLink: "improve-self-esteem",
                        icon: "RiHomeHeartFill"
                    },
                    {
                        value: "What triggers your stress",
                        isSelected: false,
                        componentLink: "what-triggers-your-stress",
                        icon: "RiBuilding3Fill"
                    },
                    {
                        value: "Challenge negativity",
                        isSelected: false,
                        componentLink: "challenge-negative-thoughts",
                        icon: "RiServiceFill"
                    },
                    {
                        value: "Gratitude and appreciation",
                        isSelected: false,
                        componentLink: "gratitude",
                        icon: "RiContrastDrop2Fill"
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
                        value: "Discover your motivations",
                        isSelected: false,
                        componentLink: "discover-your-motivations",
                        icon: "RiVipDiamondFill"
                    },
                    {
                        value: "Find yourself at your best",
                        isSelected: false,
                        componentLink: "find-yourself-at-your-best",
                        icon: "RiTrophyFill"
                    },
                    {
                        value: "Understand your feelings",
                        isSelected: false,
                        componentLink: "start-exercise-understand-your-feeling-and-emotions",
                        icon: "RiStarSmileFill"
                    },
                    {
                        value: "Unwind from a stressful moment",
                        isSelected: false,
                        componentLink: "unwind-from-a-stressful-moment",
                        icon: "RiHeartPulseFill"
                    },
                    {
                        value: "Reconstruct negative thoughts",
                        isSelected: false,
                        componentLink: "reconstruct-thoughts",
                        icon: "RiPsychotherapyFill"
                    },
                    {
                        value: "Behaviour change",
                        isSelected: false,
                        componentLink: "behaviour-change",
                        icon: "RiDirectionFill"
                    },
                ]
            },
        ]
    })

    const handleChange = (e, type, position) => {
        let componentLink
        if (type === "short-exercises") {
            componentLink = welcomeContent.content[0].data[position].componentLink
            logEvent(analytics, `selected_short_exercise ${componentLink}`)
        } else {
            componentLink = welcomeContent.content[1].data[position].componentLink
            logEvent(analytics, `selected_long_exercise ${componentLink}`)
        }
        navigate("/" + componentLink)
    }

    const setIcon = (type, index) => {
        if (type === "short-exercises") {
            switch (index) {
                case 0:
                    return <RiQuestionAnswerFill size={30} className="my-auto ml-2 text-blue-1100" />
                case 1:
                    return <RiChatCheckFill size={30} className="my-auto ml-2 text-blue-1100" />
                case 2:
                    return <RiHomeHeartFill size={30} className="my-auto ml-2 text-blue-1100" />
                case 3:
                    return <RiBuilding3Fill size={30} className="my-auto ml-2 text-blue-1100" />
                case 4:
                    return <RiServiceFill size={30} className="my-auto ml-2 text-blue-1100" />
                case 5:
                    return <RiContrastDrop2Fill size={30} className="my-auto ml-2 text-blue-1100" />
                default:
                    break;
            }
        } else {
            switch (index) {
                case 0:
                    return <RiVipDiamondFill size={30} className="my-auto ml-2 text-blue-1100" />
                case 1:
                    return <RiTrophyFill size={30} className="my-auto ml-2 text-blue-1100" />
                case 2:
                    return <RiStarSmileFill size={30} className="my-auto ml-2 text-blue-1100" />
                case 3:
                    return <RiHeartPulseFill size={30} className="my-auto ml-2 text-blue-1100" />
                case 4:
                    return <RiPsychotherapyFill size={30} className="my-auto ml-2 text-blue-1100" />
                case 5:
                    return <RiDirectionFill size={30} className="my-auto ml-2 text-blue-1100" />
                default:
                    break;
            }
        }
    }

    return <div className='mx-auto px-4 lg:px-64 py-6'>
        <AnimatedList className="" animation="grow" initialAnimationDuration="4000">
            <ScrollToTopOnMount />
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
                                                {setIcon(item.type, index)}
                                                <p className="w-2/4 py-4 text-blue-1100 font-regular font-heading whitespace-pre-wrap">{exercise.value}</p>
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
