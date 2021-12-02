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
                { name: "Happy", selected: false },
                { name: "Sad", selected: false },
                { name: "Angry", selected: false },
                { name: "Energetic", selected: false },
                { name: "Tired", selected: false },
                { name: "Stressed", selected: false },
                { name: "Bored", selected: false }]
        },
        {
            title: "What are the three main things impacting your happiness?"
        },
        {
            title: "Which gender do you identify with?",
            gender: [
                { name: "Male", selected: false },
                { name: "Female", selected: false },
                { name: "Agender", selected: false },
                { name: "Bigender", selected: false },
                { name: "Butch", selected: false },
                { name: "Cisgender", selected: false },
                { name: "Genderfluid", selected: false }
            ]
        },
        {
            title: "Which age group are you in?",
            ageGroup: [
                { name: "18 - 24", selected: false },
                { name: "24 - 40", selected: false },
                { name: "41 - 56", selected: false }
            ]
        }
    ]
    );
    const [currentPage, setCurrentPage] = useState(0);
    const [textAreaResponse, setTextAreaResponse] = useState("")

    const handleChange = (e, position, isSelected) => {
        try {
            switch (currentPage) {
                case 0:
                    let items = [...userQuestionsList];
                    const newList = items[currentPage].mood.map((item, index) => {
                        if (index === position) {
                            const updatedItem = {
                                ...item,
                                selected: isSelected,
                            };
                            // setShouldShowContinue(true)

                            return updatedItem;
                        }

                        return item;
                    });
                    items[currentPage].mood = newList
                    setUserQuestionsList(items);
                    break;
                case 1:
                    setTextAreaResponse(e.target.value);
                    break;
                case 2:
                    let itemsTwo = [...userQuestionsList];
                    const newListTwo = itemsTwo[currentPage].gender.map((item, index) => {
                        if (index === position) {
                            const updatedItem = {
                                ...item,
                                selected: isSelected,
                            };
                            // setShouldShowContinue(true)

                            return updatedItem;
                        }

                        return item;
                    });
                    itemsTwo[currentPage].gender = newListTwo
                    setUserQuestionsList(itemsTwo);
                    break;
                case 3:
                    let itemsThree = [...userQuestionsList];
                    const newListThree = itemsThree[currentPage].ageGroup.map((item, index) => {
                        if (index === position) {
                            const updatedItem = {
                                ...item,
                                selected: isSelected,
                            };
                            // setShouldShowContinue(true)

                            return updatedItem;
                        }

                        return item;
                    });
                    itemsThree[currentPage].ageGroup = newListThree
                    setUserQuestionsList(itemsThree);
                    break;

                default:
                    break;
            }

            // setPreviousPosition(index)
            // setCurrentMood(items[currentPage].answers[index].name)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 bg-blue-100 rounded-lg">
            {/* Left Side */}
            <div className="w-full border-r-2 border-gray-300 h-144 relative">
                <SectionTitle title={"About you"} />
                {(() => {
                    switch (currentPage) {
                        case 0:
                            return (
                                <AnimatedList animation="grow" initialAnimationDuration="4000">
                                    <p className="text-md text-blue-1100 font-heading font-semibold lg:ml-4 lg:mt-6">{userQuestionsList[currentPage].title}</p>
                                    <ul className="mt-2 lg:mt-4 flex flex-wrap">
                                        {userQuestionsList[currentPage].mood.map((mood, index) => {
                                            if (mood.selected) {
                                                return <p key={index} className="lg:cursor-pointer select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 bg-blue-1100 text-white rounded-full border-solid" onClick={(e) => handleChange(e, index, false)}> {mood.name}</p>
                                            }
                                            return <p key={index} className="lg:cursor-pointer select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 hover:bg-blue-1100 hover:text-white rounded-full border-solid" onClick={(e) => handleChange(e, index, true)}> {mood.name}</p>
                                        })}
                                    </ul>
                                </AnimatedList>
                            )
                        case 1:
                            // FREE INPUT
                            return (<div className="p-2 lg:mt-2">
                                <AnimatedList animation="grow" initialAnimationDuration="4000">
                                    <p className="text-md text-blue-1100 font-heading font-semibold lg:mt-4">{userQuestionsList[currentPage].title}</p>
                                    <textarea rows="3" className="w-full h-40 rounded-lg lg:mt-6 p-2 text-blue-1100" type="text" name="response" value={textAreaResponse} placeholder="Write a few lines" onChange={(e) => handleChange(e, currentPage, true)} />
                                </AnimatedList>
                            </div>)
                        case 2:
                            // SINGLE SELECTION
                            return (
                                <AnimatedList animation="grow" initialAnimationDuration="4000">
                                    <p className="p-2 lg:mt-4 text-md text-blue-1100 font-heading font-semibold">{userQuestionsList[currentPage].title}</p>
                                    <ul className="mt-2 lg:mt-4 flex flex-wrap">
                                        {userQuestionsList[currentPage].gender.map((gender, index) => {
                                            if (gender.selected) {
                                                return <p key={index} className="lg:cursor-pointer select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 bg-blue-1100 text-white rounded-full border-solid" onClick={(e) => handleChange(e, index, false)}> {gender.name}</p>
                                            }
                                            return <p key={index} className="lg:cursor-pointer select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 hover:bg-blue-1100 hover:text-white rounded-full border-solid" onClick={(e) => handleChange(e, index, true)}> {gender.name}</p>
                                        })}
                                    </ul>
                                </AnimatedList>
                            );
                        case 3:
                            // SELECTOR
                            return (
                                <div className="p-2 lg:mt-2">
                                    <AnimatedList animation="grow" initialAnimationDuration="4000">
                                        <p className="p-2 lg:mt-2 text-md text-blue-1100 font-heading font-semibold">{userQuestionsList[currentPage].title}</p>
                                        <ul className="mt-2 lg:mt-4 flex flex-wrap">
                                            {userQuestionsList[currentPage].ageGroup.map((ageGroup, index) => {
                                                if (ageGroup.selected) {
                                                    return <p key={index} className="lg:cursor-pointer select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 bg-blue-1100 text-white rounded-full border-solid" onClick={(e) => handleChange(e, index, false)}> {ageGroup.name}</p>
                                                }
                                                return <p key={index} className="lg:cursor-pointer select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 hover:bg-blue-1100 hover:text-white rounded-full border-solid" onClick={(e) => handleChange(e, index, true)}> {ageGroup.name}</p>
                                            })}
                                        </ul>
                                    </AnimatedList>
                                </div>
                            );
                        default:
                            break;
                    }
                })()
                }

                <div className="bg-blue-200 flex flex-row justify-between w-full h-20 absolute bottom-0">
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
            <div className="rounded-lg ">
                We can put some nice background, message or message and icon before the user starts
            </div>
        </div>
    );

}

export default UserBackgroundInfo;