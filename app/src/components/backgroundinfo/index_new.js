import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatedList } from 'react-animated-list';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { SectionTitle } from "../common";
import CantrilLadder from "../cantrilladder";

function UserBackgroundInfo() {
    const navigate = useNavigate();
    const [userQuestionsList, setUserQuestionsList] = useState([
        {
            title: "How do you feel lately?",
            hint: "Please select maximum 3 items",
            type: "max-three-selection",
            choices: [
                { name: "Happy", selected: false },
                { name: "Sad", selected: false },
                { name: "Angry", selected: false },
                { name: "Energetic", selected: false },
                { name: "Tired", selected: false },
                { name: "Stressed", selected: false },
                { name: "Bored", selected: false }
            ],
            response: {
                choices: []
            },
            error: "You need to select max 3 items"
        },
        {
            title: "What are the three main things impacting your happiness?",
            type: "text",
            response: "",
            placeholder: "Write a few lines",
            error: "You need to enter at least 10 characters"
        },
        {
            title: "Which gender do you identify with?",
            hint: "Please make at least one selection",
            type: "single-selection",
            choices: [
                { name: "Male", selected: false },
                { name: "Female", selected: false },
                { name: "Agender", selected: false },
                { name: "Bigender", selected: false },
                { name: "Butch", selected: false },
                { name: "Cisgender", selected: false },
                { name: "Genderfluid", selected: false },
            ],
            response: {
                choices: []
            },
            error: "You need to select at least 1 item"
        },
        {
            title: "Which age group are you in?",
            type: "single-selection",
            hint: "Please make at least one selection",
            choices: [
                { name: "18 - 24", selected: false },
                { name: "24 - 40", selected: false },
                { name: "41 - 56", selected: false }
            ],
            response: {
                choices: []
            },
            error: "You need to select at least 1 item"
        }
    ]
    );
    const [currentPage, setCurrentPage] = useState(0);

    const handleChange = (e, position, isSelected) => {
        try {
            switch (userQuestionsList[currentPage].type) {
                case "max-three-selection":
                    let items = [...userQuestionsList];
                    const newList = items[currentPage].choices.map((item, index) => {
                        if (index === position) {
                            if (item.selected === false) {
                                if (items[currentPage].response.choices.length < 3) {
                                    const newItem = {
                                        ...item,
                                        selected: isSelected,
                                    };

                                    items[currentPage].response.choices.push({ value: newItem.name })

                                    return newItem;
                                } else {
                                    alert("You cannot select more than " + items[currentPage].response.choices.length + " items")
                                    return item;
                                }
                            } else {
                                const newItem = {
                                    ...item,
                                    selected: isSelected,
                                }

                                items[currentPage].response.choices.map((item, index) => {
                                    if (item.value === newItem.name) {
                                        if (index > -1) {
                                            items[currentPage].response.choices.splice(index, 1);
                                        }
                                    }
                                })

                                return newItem;
                            }
                        }

                        return item;
                    });
                    items[currentPage].choices = newList
                    setUserQuestionsList(items);
                    break;
                case "text":
                    let textSelectionItems = [...userQuestionsList];
                    const textSelectionResponseItem = {
                        ...textSelectionItems[currentPage],
                        response: e.target.value
                    };

                    textSelectionItems[currentPage] = textSelectionResponseItem;

                    setUserQuestionsList(textSelectionItems)
                    break;
                case "single-selection":
                    let singleSelectionItems = [...userQuestionsList];
                    const singleSelectionList = singleSelectionItems[currentPage].choices.map((item, index) => {
                        let selectedItem;
                        if (index === position) {
                            selectedItem = {
                                ...item,
                                selected: isSelected,
                            };
                            singleSelectionItems[currentPage].response.choices = []
                            singleSelectionItems[currentPage].response.choices.push({ value: selectedItem.name })

                            return selectedItem
                        } else {
                            selectedItem = {
                                ...item,
                                selected: !isSelected,
                            };

                            return selectedItem;
                        }
                    });
                    singleSelectionItems[currentPage].choices = singleSelectionList
                    setUserQuestionsList(singleSelectionItems);
                    break;
                default:
                    break;
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleNavigation = (isContinue) => {
        switch (isContinue) {
            case true:
                const userQuestionsListSize = userQuestionsList.length - 2
                if (currentPage <= userQuestionsListSize) {
                    switch (userQuestionsList[currentPage].type) {
                        case "max-three-selection":
                            if (userQuestionsList[currentPage].response.choices.length < 3) {
                                setCurrentPage(currentPage + 1)
                                // SHOW ERROR HERE
                            } else {
                                setCurrentPage(currentPage + 1)
                            }
                            break;
                        case "single-selection":

                            if (userQuestionsList[currentPage].response.choices.length < 1) {
                                setCurrentPage(currentPage + 1)
                                // SHOW ERROR HERE
                            } else {
                                setCurrentPage(currentPage + 1)
                            }
                            break;
                        case "text":
                            if (userQuestionsList[currentPage].response === "") {
                                setCurrentPage(currentPage + 1)
                                // SHOW ERROR HERE
                            } else {
                                setCurrentPage(currentPage + 1)
                            }
                            break;
                        default:
                            break;
                    }
                } else {
                    navigate("/cantril-self-anchoring-striving-scale")
                }

                break;
            case false:
                setCurrentPage(currentPage - 1)
                break;
            default:
                break;
        }
    }

    return (
        <div className="bg-blue-1000 rounded-lg">
            {/* Left Side */}
            <div className="w-full border-gray-300 h-132 relative">
                <SectionTitle title={"About you"} />
                {(() => {
                    switch (currentPage) {
                        case 0:
                        case 2:
                        case 3:
                            return (
                                <AnimatedList animation="grow" initialAnimationDuration="4000">
                                    <p className="text-md text-blue-1100 font-heading font-semibold lg:ml-4 lg:mt-6">{userQuestionsList[currentPage].title}</p>
                                    <ul className="mt-2 lg:mt-4 flex flex-wrap">
                                        {userQuestionsList[currentPage].choices.map((item, index) => {
                                            if (item.selected) {
                                                return <p key={index} className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer lg:cursor-pointer lg:select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 bg-blue-1100 text-white rounded-full border-solid" onClick={(e) => handleChange(e, index, false)}> {item.name}</p>
                                            }
                                            return <p key={index} className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer lg:cursor-pointer lg:select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 bg-white hover:bg-blue-1100 hover:text-white rounded-full border-solid" onClick={(e) => handleChange(e, index, true)}> {item.name}</p>
                                        })}
                                    </ul>
                                </AnimatedList>
                            )
                        case 1:
                            // FREE INPUT
                            return (<div className="p-2 lg:mt-2">
                                <AnimatedList animation="grow" initialAnimationDuration="4000">
                                    <p className="text-md text-blue-1100 font-heading font-semibold lg:mt-4">{userQuestionsList[currentPage].title}</p>
                                    <textarea rows="3" className="w-full h-40 rounded-lg lg:mt-6 p-2 text-blue-1100 bg-gray-100 border-blue-1100 border-2 outline-none" type="text" name="response" value={userQuestionsList[currentPage].response} placeholder={userQuestionsList[currentPage].placeholder} onChange={(e) => handleChange(e, currentPage, true)} />
                                </AnimatedList>
                            </div>)
                        default:
                            break;
                    }
                })()
                }

                <div className="bg-blue-1000 flex flex-row justify-between w-full h-20 absolute bottom-0 rounded-b-lg">
                    {(() => {
                        if (currentPage > 0) {
                            return <div className="px-2 lg:px-4 mt-2 lg:mt-6 cursor-pointer text-left flex my-auto">
                                <FaArrowLeft className="inline-flex mr-2 my-auto" /><p onClick={() => handleNavigation(false)} className="text-blue-1100 hover:text-blue-500 font-heading text-md my-auto ">Back</p>
                            </div>
                        }
                    })()}
                    <div className="px-2 lg:px-4 mt-2 lg:mt-6 cursor-pointer text-right my-auto ml-auto">
                        <p onClick={() => handleNavigation(true)} className="inline-flex text-blue-1100 hover:text-blue-500 outline-none font-heading text-md align-middle">Continue <FaArrowRight className="ml-2 my-auto" /></p>
                    </div>
                </div>
            </div>
        </div >
    );

}

export default UserBackgroundInfo;