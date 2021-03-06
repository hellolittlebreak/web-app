import React, { useState, useEffect } from 'react'
import { FaCheck } from 'react-icons/fa'
import useDynamicRefs from 'use-dynamic-refs';
import { useNavigate } from "react-router-dom";
import ScrollToTopOnMount from '../../../../utils/ScrollToTop';
import { getAnalytics, logEvent } from "firebase/analytics";

const WhatTriggersYourStress = () => {
    const [getRef, setRef] = useDynamicRefs();
    const navigate = useNavigate();

    const analytics = getAnalytics()

    useEffect(() => {
        logEvent(analytics, 'screen_view', {
            firebase_screen: "WhatTriggersYourStress"
        });
    }, [analytics])

    const [exercises, setExercises] = useState({
        title: "Dealing with your stress",
        placeholder: "Write here",
        data: [
            {
                refId: "refIdOne",
                title: "What triggers your stress",
                type: "multiple-choice-selection",
                shouldBeVisible: true,
                response: {
                    choices: []
                },
                choices: [
                    {
                        value: "Lack of purpose in life",
                        isSelected: false
                    },
                    {
                        value: "Pressure from work",
                        isSelected: false
                    },
                    {
                        value: "Social pressure from peers",
                        isSelected: false
                    },
                    {
                        value: "Family and close relations",
                        isSelected: false
                    },
                    {
                        value: "Financial worries",
                        isSelected: false
                    }
                ]
            },
            {
                refId: "refIdTwo",
                type: "informative",
                title: "Now you have identified your stress trigger, the best way to reduce stress is to avoid these triggers in your daily routine.",
                description: "This often means making necessary changes to your daily routines, lifestyle, or existing relationships.                ",
                shouldBeVisible: false,
                response: ""
            },
            {
                refId: "refIdThree",
                type: "text",
                title: "What can you do to eliminate or reduce your exposure to the stress triggers?",
                description: "Sometimes the option to avoid your stress trigger is not obvious. For example, pressure from work or expectations from family could seem unescapable. \nHowever, there are always ways to reduce your exposure to these triggers. \nFor example, avoid working with the colleague that has been giving you the negative energy at work. \nThink about what are the potential ways for you to avoid or reduce even a little bit of exposure to your stress triggers?                   ",
                hint: "",
                shouldBeVisible: false,
                response: ""
            }
        ]
    })

    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        if (currentPage > 0) {
            const refId = getRef(exercises.data[currentPage].refId);
            refId.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
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
                                    if (item.value === newItem.value) {
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
            navigate("/congratulations-what-triggers-your-stress", { state: { value: exercises.data } })
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
                                    return <p key={index} className="w-full lg:w-2/5 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer lg:cursor-pointer lg:select-none mx-6 m-2 px-4 py-2 border-2 border-blue-1100 bg-blue-1100 text-white rounded-full border-solid" onClick={(e) => handleChange(e, index, false)}> {item.value}</p>
                                }
                                return <p key={index} className="w-full lg:w-2/5 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer lg:cursor-pointer lg:select-none mx-6 m-2 px-4 py-2 border-2 border-blue-1100 bg-white hover:bg-blue-1100 hover:text-white rounded-full border-solid" onClick={(e) => handleChange(e, index, true)}> {item.value}</p>
                            })}
                        </ul>
                        {item.description && <p className='font-body text-md text-blue-1100 lg:ml-4 p-2 bg-opacity-75 bg-white  rounded-lg'>{item.description}</p>}
                        {item.type === "text" && <div className="w-full p-2">

                            <textarea rows="3" className="w-full h-20 rounded-lg mt-6 p-2 text-blue-1100 bg-gray-100 border-blue-1100 border-2 outline-none" type="text" name="response" value={item.response} placeholder={exercises.placeholder} onChange={(e) => handleChange(e, currentPage, true)} />
                        </div>}
                        <button className="lg:ml-4 lg:mt-6 bg-blue-1100 hover:bg-blue-700 px-4 py-2 text-white rounded-lg flex text-center" onClick={(e) => handleClick(e, index + 1)} >Next <FaCheck className="my-auto ml-2 pointer-events-none" /></button>

                    </div>

                }
            })
        }
    </div >
}

export default WhatTriggersYourStress;
