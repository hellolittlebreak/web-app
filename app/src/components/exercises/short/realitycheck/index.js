import React, { useState, useEffect } from 'react'
import { FaCheck } from 'react-icons/fa'
import useDynamicRefs from 'use-dynamic-refs';
import { useNavigate } from "react-router-dom";

const RealityCheck = () => {
    const [getRef, setRef] = useDynamicRefs();
    const navigate = useNavigate();

    const [exercises, setExercises] = useState({
        title: "Give yourself a reality check",
        description: "Our mind processes all kinds of thoughts each day. \nSome thoughts are accurate reflection of events in our life, some are opinions that could be either overly pessimistic or overly positive.  \nOur opinions are not necessarily facts. \nOften what we need is a reality check that helps us differentiate opinions from facts. \nFor the following statements, select whether they are an opinion or a fact.",
        placeholder: "Write here",
        correctAnswer: "Correct, this is an opinion!",
        wrongAnswer: "Not quite, this is an opinion, not a fact.",
        data: [
            {
                refId: "refIdOne",
                title: "\"I am not good enough\"",
                type: "single-selection",
                shouldBeVisible: true,
                selectedCorrectAnswer: false,
                isSelected: false,
                choices: [
                    {
                        value: "Thought",
                        isSelected: false,
                        isCorrect: true
                    },
                    {
                        value: "Fact",
                        isSelected: false,
                        isCorrect: false
                    }
                ]
            },
            {
                refId: "refIdTwo",
                title: "\"I am in bad health\"",
                type: "single-selection",
                shouldBeVisible: false,
                selectedCorrectAnswer: false,
                isSelected: false,
                choices: [
                    {
                        value: "Thought",
                        isSelected: false,
                        isCorrect: false
                    },
                    {
                        value: "Fact",
                        isSelected: false,
                        isCorrect: true
                    }
                ]
            },
            {
                refId: "refIdThree",
                title: "\"I will be single forever\"",
                type: "single-selection",
                shouldBeVisible: false,
                selectedCorrectAnswer: false,
                isSelected: false,
                choices: [
                    {
                        value: "Thought",
                        isSelected: false,
                        isCorrect: true
                    },
                    {
                        value: "Fact",
                        isSelected: false,
                        isCorrect: false
                    }
                ]
            },
            {
                refId: "refIdFour",
                title: "\"I failed this test\"",
                type: "single-selection",
                shouldBeVisible: false,
                selectedCorrectAnswer: false,
                choices: [
                    {
                        value: "Thought",
                        isSelected: false,
                        isCorrect: false
                    },
                    {
                        value: "Fact",
                        isSelected: false,
                        isCorrect: true
                    }
                ]
            },
            {
                refId: "refIdFive",
                title: "\"My boss does not like me\"",
                type: "single-selection",
                shouldBeVisible: false,
                selectedCorrectAnswer: false,
                choices: [
                    {
                        value: "Thought",
                        isSelected: false,
                        isCorrect: true
                    },
                    {
                        value: "Fact",
                        isSelected: false,
                        isCorrect: false
                    }
                ]
            },
            {
                refId: "refIdSix",
                title: "\"I am single\"",
                type: "single-selection",
                shouldBeVisible: false,
                selectedCorrectAnswer: false,
                choices: [
                    {
                        value: "Thought",
                        isSelected: false,
                        isCorrect: false
                    },
                    {
                        value: "Fact",
                        isSelected: false,
                        isCorrect: true
                    }
                ]
            },
            {
                refId: "refIdSeven",
                title: "\"I am overweight\"",
                type: "single-selection",
                shouldBeVisible: false,
                selectedCorrectAnswer: false,
                choices: [
                    {
                        value: "Thought",
                        isSelected: false,
                        isCorrect: false
                    },
                    {
                        value: "Fact",
                        isSelected: false,
                        isCorrect: true
                    }
                ]
            },
            {
                refId: "refIdEight",
                title: "\"Something is wrong with me\"",
                type: "single-selection",
                shouldBeVisible: false,
                selectedCorrectAnswer: false,
                choices: [
                    {
                        value: "Thought",
                        isSelected: false,
                        isCorrect: true
                    },
                    {
                        value: "Fact",
                        isSelected: false,
                        isCorrect: false
                    }
                ]
            },
            {
                refId: "refIdNine",
                title: "\"No one listens to me\"",
                type: "single-selection",
                shouldBeVisible: false,
                selectedCorrectAnswer: false,
                choices: [
                    {
                        value: "Thought",
                        isSelected: false,
                        isCorrect: true
                    },
                    {
                        value: "Fact",
                        isSelected: false,
                        isCorrect: false
                    }
                ]
            },
            {
                refId: "refIdTen",
                title: "\"I work longer hours than my colleagues\"",
                type: "single-selection",
                shouldBeVisible: false,
                selectedCorrectAnswer: false,
                choices: [
                    {
                        value: "Thought",
                        isSelected: false,
                        isCorrect: false
                    },
                    {
                        value: "Fact",
                        isSelected: false,
                        isCorrect: true
                    }
                ]
            },
            {
                refId: "refIdEleven",
                title: "As you can see, some statements are facts whilst others are simply our opinions",
                subTitle: "We tend to think that each and every thought we have is true",
                question: "However thoughts are not facts. They are more often opinions that we form. \n\nOpinions deviates from facts, and can be sometimes useful and other times harmful. \n\nIt is therefore important to train our mind to differentiate opinions from facts.",
                type: "informative",
                shouldBeVisible: false
            }
        ]
    })

    const [currentPage, setCurrentPage] = useState(0)
    const [currentVisiblePage, setCurrentVisiblePage] = useState(0)


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
                case "single-selection":
                    let singleSelectionItems = { ...exercises };
                    const singleSelectionList = singleSelectionItems.data[currentPosition].choices.map((item, index) => {
                        let selectedItem;
                        if (index === position) {
                            selectedItem = {
                                ...item,
                                isSelected: isSelected,
                            };

                            if (selectedItem.isCorrect) {
                                singleSelectionItems.data[currentPosition].selectedCorrectAnswer = true
                            } else {
                                singleSelectionItems.data[currentPosition].selectedCorrectAnswer = false
                            }
                            singleSelectionItems.data[currentPosition].isSelected = true

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
        e.preventDefault()
        const newExercisesList = { ...exercises }
        const newElement = newExercisesList.data.map((item, index) => {
            if (index === position + 1) {
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
            navigate("/congratulations-reality-check")
        } else {
            setCurrentPage(() => currentPosition)
        }
    }

    return <div className="w-full h-full mx-auto px-4 lg:px-64 pt-6 lg:pb-20">
        <h2 className="text-left border-b-2 border-blue-1100 text-blue-1100 font-bold font-heading text-md lg:text-xl">{exercises.title}</h2>
        <div className='mt-10 thought'>
            <p className='sb14 whitespace-pre-wrap text-blue-1100 rounded-lg p-4 font-heading'>{exercises.description}</p>
        </div>
        {
            exercises.data.map((item, index) => {
                if (item.shouldBeVisible === true) {
                    return <div id={index} key={index} ref={setRef(item.refId)} className="h-screen lg:h-56">
                        <div className='lg:ml-4 inline'>
                            <p className="text-md text-blue-1100 font-heading font-semibold lg:mt-32 inline">{item.title}  </p>
                            {item.isSelected && (item.selectedCorrectAnswer ? <p className='inline text-green-700'>- {exercises.correctAnswer}</p> : <p className='inline text-red-700'>- {exercises.wrongAnswer}</p>)}
                        </div>
                        {item.subTitle && <p className="text-md text-blue-1100 font-heading font-semibold lg:ml-4 lg:my-4">{item.subTitle}</p>}
                        {item.question && <p className="whitespace-pre-wrap text-md text-blue-1100 font-heading font-semibold lg:ml-4 lg:my-4">{item.question}</p>}
                        <ul className="mt-2 lg:mt-4 flex-wrap">
                            {item.choices && item.choices.map((item, index) => {
                                if (item.isSelected) {
                                    return <p key={index} className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 lg:cursor-pointer lg:select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 bg-blue-1100 text-white rounded-full border-solid" onClick={(e) => handleChange(e, index, false)}> {item.value}</p>
                                }
                                return <p key={index} className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 lg:cursor-pointer lg:select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 bg-white hover:bg-blue-1100 hover:text-white rounded-full border-solid" onClick={(e) => handleChange(e, index, true)}> {item.value}</p>
                            })}
                        </ul>


                        <button className="lg:ml-4 mt-10 lg:mt-6 bg-blue-1100 hover:bg-blue-700 px-4 py-2 text-white rounded-lg flex text-center" onClick={(e) => handleClick(e, index)} >OK <FaCheck className="my-auto ml-2 pointer-events-none" /></button>
                    </div>

                }
            })
        }
    </div >
}

export default RealityCheck;