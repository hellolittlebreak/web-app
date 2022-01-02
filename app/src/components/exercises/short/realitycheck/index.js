import React, { useState, useEffect } from 'react'
import { FaCheck } from 'react-icons/fa'
import useDynamicRefs from 'use-dynamic-refs';
import { useNavigate } from "react-router-dom";

const RealityCheck = () => {
    const [getRef, setRef] = useDynamicRefs();
    const navigate = useNavigate();

    const [exercises, setExercises] = useState({
        title: "Give yourself a reality check",
        description: "Differentiate thoughts from facts",
        placeholder: "Write here",
        data: [
            {
                refId: "refIdOne",
                title: "I am not good enough",
                type: "single-selection",
                shouldBeVisible: true,
                response: "",
                choices: [
                    {
                        value: "Thought",
                        isSelected: false
                    },
                    {
                        value: "Fact",
                        isSelected: false
                    }
                ]
            },
            {
                refId: "refIdTwo",
                title: "I am in bad health",
                type: "single-selection",
                shouldBeVisible: false,
                response: "",
                choices: [
                    {
                        value: "Thought",
                        isSelected: false
                    },
                    {
                        value: "Fact",
                        isSelected: false
                    }
                ]
            },
            {
                refId: "refIdThree",
                title: "I will be single forever",
                type: "single-selection",
                shouldBeVisible: false,
                response: "",
                choices: [
                    {
                        value: "Thought",
                        isSelected: false
                    },
                    {
                        value: "Fact",
                        isSelected: false
                    }
                ]
            },
            {
                refId: "refIdFour",
                title: "I failed this test",
                type: "single-selection",
                shouldBeVisible: false,
                response: "",
                choices: [
                    {
                        value: "Thought",
                        isSelected: false
                    },
                    {
                        value: "Fact",
                        isSelected: false
                    }
                ]
            },
            {
                refId: "refIdFive",
                title: "My boss does not like me",
                type: "single-selection",
                shouldBeVisible: false,
                response: "",
                choices: [
                    {
                        value: "Thought",
                        isSelected: false
                    },
                    {
                        value: "Fact",
                        isSelected: false
                    }
                ]
            },
            {
                refId: "refIdSix",
                title: "I am single",
                type: "single-selection",
                shouldBeVisible: false,
                response: "",
                choices: [
                    {
                        value: "Thought",
                        isSelected: false
                    },
                    {
                        value: "Fact",
                        isSelected: false
                    }
                ]
            },
            {
                refId: "refIdSix",
                title: "As you can probably tell:",
                subTitle: "Some statements are FACTS whilst others are THOUGHTS",
                question: "We tend to think each and every thought we have is true; however thoughts are not facts. They are more often opinions that we form, and can be sometimes useful and sometimes harmful.",
                type: "informative",
                shouldBeVisible: false
            },
            {
                refId: "refIdSeven",
                title: "Differentiate thoughts and opinions from facts...",
                subTitle: ".. is therefore important and often overlooked",
                question: "Practice this exercise a few times to train your mind for reality checks.",
                type: "informative",
                shouldBeVisible: false
            },
        ]
    })

    const [currentPage, setCurrentPage] = useState(0)
    const [currentVisiblePage, setCurrentVisiblePage] = useState(0)


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

    return <div className="w-full h-full">
        <h2 className="text-left border-b-2 border-blue-1100 text-blue-1100 font-bold font-heading text-md lg:text-xl">{exercises.title}</h2>
        {
            exercises.data.map((item, index) => {

                if (item.shouldBeVisible === true) {
                    return <div id={index} key={index} ref={setRef(item.refId)} className="h-screen lg:h-96">
                        <p className="text-md text-blue-1100 font-heading font-semibold lg:ml-4 lg:mt-32">{item.title}</p>
                        {item.subTitle && <p className="text-md text-blue-1100 font-heading font-semibold lg:ml-4 lg:mt-6">{item.subTitle}</p>}
                        {item.question && <p className="text-md text-blue-1100 font-heading font-semibold lg:ml-4 lg:mt-6">{item.question}</p>}
                        <ul className="mt-2 lg:mt-4 flex flex-wrap">
                            {item.choices && item.choices.map((item, index) => {
                                if (item.isSelected) {
                                    return <p key={index} className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer lg:cursor-pointer lg:select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 bg-blue-1100 text-white rounded-full border-solid" onClick={(e) => handleChange(e, index, false)}> {item.value}</p>
                                }
                                return <p key={index} className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer lg:cursor-pointer lg:select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 bg-white hover:bg-blue-1100 hover:text-white rounded-full border-solid" onClick={(e) => handleChange(e, index, true)}> {item.value}</p>
                            })}
                        </ul>
                        {item.hint && <div className="w-full p-2">
                            <p className='font-body text-md text-blue-1100 p-2 bg-gray-300 hover:bg-blue-1100 hover:text-white rounded-lg'>{item.hint}</p>
                            <textarea rows="3" className="w-full h-40 rounded-lg lg:mt-6 p-2 text-blue-1100 bg-gray-100 border-blue-1100 border-2 outline-none" type="text" name="response" value={item.response} placeholder={exercises.placeholder} onChange={(e) => handleChange(e, currentPage, true)} />
                        </div>}
                        <button className="lg:ml-4 lg:mt-6 bg-blue-1100 hover:bg-blue-700 px-4 py-2 text-white rounded-lg flex text-center" onClick={(e) => handleClick(e, index + 1)} >OK <FaCheck className="my-auto ml-2 pointer-events-none" /></button>

                    </div>

                }
            })
        }
    </div >
}

export default RealityCheck;