import React, { useState, useEffect } from "react";
import useDynamicRefs from 'use-dynamic-refs';
import { FaCheck } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";

const UnderstandFeelingsAndEmotions = () => {
    const [getRef, setRef] = useDynamicRefs();
    const navigate = useNavigate();
    const [exercises, setExercises] = useState({
        title: "Understanding emotions",
        data: [
            {
                refId: "referrerIdOne",
                title: "",
                type: "text-details",
                shouldBeVisible: true,
                notes: [
                    {
                        value: "How many emotions have you felt today?",
                    },
                    {
                        value: "Is your heart beating faster for the person who'll be waiting for you at the restaurant?"
                    },
                    {
                        value: "Or are you feeling butterflies in your stomach at the thought of tomorrow's deadline?"
                    }
                ]
            },
            {
                refId: "referrerIdTwo",
                title: "",
                type: "text-details",
                shouldBeVisible: false,
                notes: [
                    {
                        value: "Recognising our emotions can be a rather peculiar task.",
                    },
                    {
                        value: "Some emotions are pure as the clearest sky or the darkest night."
                    },
                    {
                        value: "Some emotions are a lot more complex and difficult to grasp."
                    }
                ]
            },
            {
                refId: "referrerIdThree",
                title: "",
                type: "text-details",
                shouldBeVisible: false,
                notes: [
                    {
                        value: "We were taught to regulate our emotions from an early age.",
                    },
                    {
                        value: "Few of us are taught to understand and recognise our emotions properly."
                    },
                    {
                        value: "Emotions help us survive and motivate us to do things."
                    }
                ]
            },
            {
                refId: "referrerIdFour",
                title: "",
                type: "text-details",
                shouldBeVisible: false,
                notes: [
                    {
                        value: "Emotions guide our decisions, help us to connect with others and keep us safe.",
                    },
                    {
                        value: "Emotional intelligence, or your ability to understand and manage emotions, has been shown to play an important role in decision-making."
                    },
                    {
                        value: "It is positively correlated with higher life satisfaction, self-esteem and lower levels of insecurity or depression. It is also negatively correlated with poor health choices and behavior."
                    }
                ]
            },
            {
                refId: "referrerIdFive",
                title: "Learning to identify our emotions help us develop a better understanding of ourselves, build more meaningful relationships and make better decisions.",
                subTitle: "Today, we will start by taking an emotional temperature:",
                question: "What feelings am I aware of having today? UP TO 3 CHOICES",
                type: "max-three-selection",
                shouldBeVisible: false,
                choices: [
                    { value: "Happy", isSelected: false },
                    { value: "Sad", isSelected: false },
                    { value: "Angry", isSelected: false },
                    { value: "Energetic", isSelected: false },
                    { value: "Tired", isSelected: false },
                    { value: "Stressed", isSelected: false },
                    { value: "Worried", isSelected: false },
                    { value: "Bored", isSelected: false }
                ],
                response: {
                    choices: []
                },
                error: "You need to select max 3 items"
            },
            {
                refId: "referrerIdSix",
                title: "Which feeling is the most prominent?",
                type: "single-selection",
                shouldBeVisible: false,
                choices: [

                ],
                response: {
                    choices: []
                },
                error: "You need to select one item"
            },
            {
                refId: "referrerIdSeven",
                title: "When and what triggered you to feel",
                placeholder: "Write here...",
                type: "text",
                shouldBeVisible: false,
                response: "",
            },
            {
                refId: "referrerIdEight",
                title: "Why did it make you feel",
                placeholder: "Write here...",
                type: "text",
                shouldBeVisible: false,
                response: "",
            },
        ]
    })

    const [currentPage, setCurrentPage] = useState(0)

    const handleSelection = (e, isSelected, position) => {
        try {
            const currentPosition = e.target.parentNode.parentNode.id
            console.log(currentPosition)
            switch (exercises.data[currentPosition].type) {
                case "max-three-selection":
                    let items = { ...exercises };
                    const newList = items.data[currentPosition].choices.map((item, index) => {
                        if (index === position) {
                            let newPosition = parseInt(currentPosition) + 1
                            if (item.isSelected === false) {
                                if (items.data[newPosition].choices.length < 3) {
                                    const newItem = {
                                        ...item,
                                        isSelected: isSelected,
                                    };

                                    items.data[newPosition].choices.push({ value: newItem.value })

                                    return newItem;
                                } else {
                                    alert("You cannot select more than " + items.data[newPosition].choices.length + " items")
                                    return {
                                        ...item,
                                        isSelected: !isSelected,
                                    };
                                }
                            } else {
                                const newItem = {
                                    ...item,
                                    isSelected: isSelected,
                                }

                                items.data[newPosition].response.choices.map((item, index) => {
                                    if (item.value === newItem.value) {
                                        if (index > -1) {
                                            items[newPosition].response.choices.splice(index, 1);
                                        }
                                    }
                                })

                                return newItem;
                            }
                        }

                        return item;
                    });
                    items.data[currentPosition].choices = newList
                    setExercises(items);
                    break;
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
                            singleSelectionItems.data[currentPosition].response.choices = []
                            singleSelectionItems.data[currentPosition].response.choices.push({ value: selectedItem.value })

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
            navigate("/congratulations")
        } else {
            setCurrentPage(() => currentPosition)
        }
    }

    useEffect(() => {
        console.log(currentPage)
        const refId = getRef(exercises.data[currentPage].refId);
        refId.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, [currentPage])

    return <div>
        <h2 className="text-left border-b-2 border-blue-1100 text-blue-1100 font-bold font-heading text-md lg:text-xl">{exercises.title}</h2>
        <div className="bg-white rounded-lg m-4 p-4 text-center font-heading text-blue-1100">
            <p>sonder</p>
            <p>son-der noun.</p>
            <p>The realization that each random passerby is living a life as vivid and complex as your own - populated with their own ambitions, friends, routines, worries and inherited craziness - an epic story that continues invisibly around you like an anthill sprawling deep underground, with elaborate passageways to thousands of other lives that you'll never know existed, in which you might appear only once, as an extra sipping coffee in the background, as a blur of traffic passing on the highway, as a lighted window at dusk.</p>
            <p>Extract from: The Dictionary of Obscure Sorrows [1].</p>
        </div>
        {
            exercises.data.map((item, index) => {
                if (item.shouldBeVisible === true) {
                    return <div id={index} key={index} ref={setRef(item.refId)} className="h-screen lg:h-96 lg:mt-20">
                        <p className="text-md text-blue-1100 font-heading font-semibold lg:ml-4 lg:mt-6">{item.title}</p>
                        <p className="text-md text-blue-1100 font-heading font-semibold lg:ml-4 lg:mt-6">{item.question}</p>
                        <ul className="mt-2 lg:mt-4 flex flex-wrap">
                            {item.choices && item.choices.map((item, index) => {
                                if (item.isSelected) {
                                    return <p key={index} className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer lg:cursor-pointer lg:select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 bg-blue-1100 text-white rounded-full border-solid" onClick={(e) => handleSelection(e, false, index)}> {item.value}</p>
                                }
                                return <p key={index} className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer lg:cursor-pointer lg:select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 bg-white hover:bg-blue-1100 hover:text-white rounded-full border-solid" onClick={(e) => handleSelection(e, true, index)}> {item.value}</p>
                            })}
                        </ul>
                        <ul>
                            {item.notes && item.notes.map((item, index) => {
                                return <p key={index} className="lg:select-none m-2 px-4 py-2 border-blue-1100  bg-white     hover:bg-blue-1100 hover:text-white text-blue-1100 rounded-lg font-body"> {item.value}</p>
                            })}
                        </ul>
                        {item.placeholder && <div className="w-full p-2">
                            <textarea rows="3" className="w-full h-40 rounded-lg lg:mt-6 p-2 text-blue-1100 bg-gray-100 border-blue-1100 border-2 outline-none" type="text" name="response" value={item.response} placeholder={item.placeholder} onChange={(e) => handleSelection(e, currentPage, true)} />
                        </div>}
                        <button className="lg:ml-4 lg:mt-6 bg-blue-1100 hover:bg-blue-700 px-4 py-2 text-white rounded-lg flex text-center" onClick={(e) => handleClick(e, index + 1)} >OK <FaCheck className="my-auto ml-2 pointer-events-none" /></button>

                    </div>
                }
            })
        }
    </div>
}

export default UnderstandFeelingsAndEmotions;