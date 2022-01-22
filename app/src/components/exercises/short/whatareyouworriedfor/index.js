import React, { useState, useEffect } from 'react'
import { FaCheck } from 'react-icons/fa'
import useDynamicRefs from 'use-dynamic-refs';
import { useNavigate } from "react-router-dom";
import ScrollToTopOnMount from '../../../../utils/ScrollToTop';
import { getAnalytics, logEvent } from "firebase/analytics";

const WhatAreYouWorriedFor = () => {

    const [getRef, setRef] = useDynamicRefs();
    const navigate = useNavigate();

    const analytics = getAnalytics()

    useEffect(() => {
        logEvent(analytics, 'screen_view', {
            firebase_screen: "WhatAreYouWorriedFor"
        });
    }, [analytics])

    const [exercises, setExercises] = useState({
        title: "Understanding your worries",
        placeholder: "Write here",
        data: [
            {
                refId: "refIdOne",
                title: "What is something that you are worried about?",
                type: "multiple-choice-selection",
                shouldBeVisible: true,
                response: {
                    choices: []
                },
                choices: [
                    {
                        value: "Relationship",
                        isSelected: false
                    },
                    {
                        value: "Health",
                        isSelected: false
                    },
                    {
                        value: "Work / Career",
                        isSelected: false
                    },
                    {
                        value: "Money",
                        isSelected: false
                    },
                    {
                        value: "Other's opinions",
                        isSelected: false
                    },
                    {
                        value: "Family",
                        isSelected: false
                    }
                ]
            },
            {
                refId: "refIdTwo",
                type: "text",
                title: "What are some clues that your worry will come true?",
                hint: "Think about what WILL happen, instead of what COULD happen. This helps you to focus on reality and avoids unrealistic worries",
                shouldBeVisible: false,
                response: ""
            }
        ]
    })

    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        console.log(currentPage)
        const refId = getRef(exercises.data[currentPage].refId);
        refId.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, [currentPage])

    const handleChange = (e, position, isSelected) => {
        try {
            const currentPosition = e.target.parentNode.parentNode.id
            switch (exercises.data[currentPosition].type) {
                case "text":
                    let textSelectionItems = { ...exercises };
                    const textSelectionResponseItem = {
                        ...textSelectionItems.data[currentPosition],
                        response: e.target.value
                    };

                    textSelectionItems.data[currentPosition] = textSelectionResponseItem;
                    setExercises(textSelectionItems)
                    break;
                case "single-selection":
                    let singleSelectionItems = { ...exercises };
                    const singleSelectionList = singleSelectionItems.data[currentPosition].choices.map((item, index) => {
                        let selectedItem;
                        if (index === position) {
                            selectedItem = {
                                ...item,
                                isSelected: isSelected,
                            };

                            return selectedItem
                        } else {
                            selectedItem = {
                                ...item,
                                isSelected: !isSelected,
                            };

                            return selectedItem;
                        }
                    });
                    singleSelectionItems.data[currentPosition].choices = singleSelectionList
                    setExercises(singleSelectionItems);
                    break;
                case "multiple-choice-selection":
                    let allExercises = { ...exercises };
                    const multipleChoiceSelectionList = allExercises.data[currentPosition].choices.map((item, index) => {
                        if (index === position) {
                            if (item.isSelected === false) {
                                const newItem = {
                                    ...item,
                                    isSelected: isSelected,
                                };

                                allExercises.data[currentPosition].response.choices.push({ value: newItem.value })

                                return newItem;

                            } else {
                                const newItem = {
                                    ...item,
                                    isSelected: isSelected,
                                }

                                allExercises.data[currentPosition].response.choices.map((item, index) => {
                                    if (item.value === newItem.name) {
                                        if (index > -1) {
                                            allExercises.data[currentPosition].response.choices.splice(index, 1);
                                        }
                                    }
                                })

                                return newItem;
                            }
                        }

                        return item;
                    });
                    allExercises.data[currentPosition].choices = multipleChoiceSelectionList
                    setExercises(allExercises);
                    break;
                default:
                    break;
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleClick = (e, position) => {
        const newExercisesList = { ...exercises }
        const newElement = newExercisesList.data.map((item, index) => {
            if (index === position) {
                const updatedItem = {
                    ...item,
                    shouldBeVisible: true
                }
                return updatedItem
            }
            return item;
        })
        newExercisesList.data = newElement
        setExercises(newExercisesList)
        const currentPosition = parseInt(e.target.parentNode.id) + 1
        if (currentPosition === exercises.data.length) {
            navigate("/congratulations-what-are-you-worried-for", { state: { value: exercises.data } })
        } else {
            setCurrentPage(() => currentPosition)
        }
    }

    return <div className="mx-auto px-4 lg:px-64 pt-6">
        <ScrollToTopOnMount />
        <h2 className="text-left border-b-2 border-blue-1100 text-blue-1100 font-bold font-heading text-xl lg:text-2xl">{exercises.title}</h2>
        {
            exercises.data.map((item, index) => {
                if (item.shouldBeVisible === true) {
                    return <div id={index} key={index} ref={setRef(item.refId)} className="h-screen lg:h-96">

                        <p className="text-lg text-blue-1100 font-heading font-semibold lg:ml-4 lg:mt-6">{item.title}</p>
                        <ul className="mt-2 lg:mt-4 flex flex-wrap">
                            {item.choices && item.choices.map((item, index) => {
                                if (item.isSelected) {
                                    return <p key={index} className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer lg:cursor-pointer lg:select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 bg-blue-1100 text-white rounded-full border-solid" onClick={(e) => handleChange(e, index, false)}> {item.value}</p>
                                }
                                return <p key={index} className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer lg:cursor-pointer lg:select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 bg-white hover:bg-blue-1100 hover:text-white rounded-full border-solid" onClick={(e) => handleChange(e, index, true)}> {item.value}</p>
                            })}
                        </ul>
                        {item.hint && <div className="w-full p-2">
                            <p className='font-body text-md text-blue-1100 p-2 bg-opacity-75 bg-white  rounded-lg'>{item.hint}</p>
                            <textarea rows="3" className="w-full h-10 rounded-lg mt-6 p-2 text-blue-1100 bg-gray-100 border-blue-1100 border-2 outline-none" type="text" name="response" value={item.response} placeholder={exercises.placeholder} onChange={(e) => handleChange(e, currentPage, true)} />
                        </div>}
                        <button className="lg:ml-4 lg:mt-6 bg-blue-1100 hover:bg-blue-700 px-4 py-2 text-white rounded-lg flex text-center" onClick={(e) => handleClick(e, index + 1)} >OK <FaCheck className="my-auto ml-2 pointer-events-none" /></button>

                    </div>

                }
            })
        }
    </div >
}

export default WhatAreYouWorriedFor;