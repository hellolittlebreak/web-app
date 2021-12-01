import React, { useState } from "react";
import { AnimatedList } from 'react-animated-list';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { Link } from "react-router-dom";
import { SectionTitle } from "../common";
import UnderstandingEmotions from "../understandingemotions";

function UserBackgroundInfo() {
    const [userQuestionsList, setUserQuestionsList] = useState([
        {
            title: "How do you feel lately?",
            mood: [
                { name: "Happy" },
                { name: "Sad" },
                { name: "Angry" },
                { name: "Energetic" },
                { name: "Tired" },
                { name: "Stressed" },
                { name: "Bored" }]
        },
        {
            title: "What are the three main things impacting your happiness?"
        },
        {
            title: "Which gender do you identify with?"
        },
        {
            title: "Which age group are you in?"
        }
    ]
    );
    const [currentPage, setCurrentPage] = useState(0);

    const handleChange = (e, position, isSelected) => {

    }

    return (
        <div className="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2">
            {/* Left Side */}
            <div className="w-full border-2 border-gray-200 rounded-lg h-144 relative">
                <SectionTitle title={"About you"} />
                {(() => {
                    switch (currentPage) {
                        case 0:
                            return (<div>
                                <p className="text-md text-blue-1100 font-heading font-semibold lg:ml-4 lg:mt-6">{userQuestionsList[currentPage].title}</p>
                                <ul className="mt-2 lg:mt-4 flex flex-wrap">
                                    <AnimatedList animation="grow" initialAnimationDuration="4000">
                                        {userQuestionsList[currentPage].mood.map((answer, index) => {
                                            if (answer.selected) {
                                                return <p key={index} className="lg:cursor-pointer select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 bg-blue-1100 text-white rounded-full border-solid" onClick={(e) => handleChange(e, answer.position, false)}> {answer.name}</p>
                                            }
                                            return <p key={index} className="lg:cursor-pointer select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 hover:bg-blue-1100 hover:text-white rounded-full border-solid" onClick={(e) => handleChange(e, answer.position, true)}> {answer.name}</p>
                                        })}

                                    </AnimatedList>
                                </ul>
                            </div>)
                        case 1:
                            // FREE INPUT
                            return (<div className="p-2 lg:mt-2">
                                <p className="text-md text-blue-1100 font-heading font-semibold">{userQuestionsList[currentPage].title}</p>
                            </div>)
                        case 2:
                            // SINGLE SELECTION
                            return (<div className="p-2 lg:mt-2">
                                <p className="text-md text-blue-1100 font-heading font-semibold">{userQuestionsList[currentPage].title}</p>
                            </div>)
                        case 3:
                            // SELECTOR
                            return (<div className="p-2 lg:mt-2">
                                <p className="text-md text-blue-1100 font-heading font-semibold">{userQuestionsList[currentPage].title}</p>
                            </div>)

                        default:
                            break;
                    }
                })()
                }

                <div className="bg-gray-200 flex flex-row justify-between w-full h-20 absolute bottom-0 rounded-b-lg">
                    {(() => {
                        console.log(currentPage > 0)
                        if (currentPage > 0) {
                            return <div className="px-2 lg:px-4 mt-2 lg:mt-6 cursor-pointer text-left flex my-auto">
                                <FaArrowLeft className="inline-flex mr-2 my-auto" /><p onClick={
                                    () => {
                                        setCurrentPage(currentPage - 1)
                                    }
                                } className="text-blue-1100 hover:text-blue-500 font-heading text-md my-auto ">Back</p>
                            </div>
                        }
                    })()}
                    <div className="px-2 lg:px-4 mt-2 lg:mt-6 cursor-pointer text-right my-auto ml-auto">
                        <p onClick={
                            () => {
                                setCurrentPage(currentPage + 1)
                            }
                        } className="inline-flex text-blue-1100 hover:text-blue-500 outline-none font-heading text-md align-middle">Continue <FaArrowRight className="ml-2 my-auto" /></p>
                    </div>
                </div>
            </div>
            {/* Right Side */}
            <div className="rounded-lg border-2 border-gray-200">
                We can put some nice background, message or message and icon before the user starts
            </div>
        </div>
    );

}

export default UserBackgroundInfo;