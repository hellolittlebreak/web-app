import React, { useState, useEffect } from 'react'
import { FaCheck } from 'react-icons/fa'
import useDynamicRefs from 'use-dynamic-refs';
import { useNavigate } from "react-router-dom";
import ScrollToTopOnMount from '../../../../utils/ScrollToTop';
import { getAnalytics, logEvent } from "firebase/analytics";

const FindOutYourMotivations = () => {

    const [getRef, setRef] = useDynamicRefs();
    const navigate = useNavigate();

    const analytics = getAnalytics()

    useEffect(() => {
        logEvent(analytics, 'screen_view', {
            firebase_screen: "FindOutYourMotivations"
        });
    }, [analytics])

    const [exercises, setExercises] = useState({
        title: "Discover your motivations",
        placeholder: "Write here",
        data: [
            {
                refId: "refIdOne",
                title: "How motivated have you been feeling recently?",
                type: "single-selection",
                shouldBeVisible: true,
                response: "",
                choices: [
                    {
                        value: "Very motivated",
                        isSelected: false
                    },
                    {
                        value: "Somewhat motivated",
                        isSelected: false
                    },
                    {
                        value: "Quite bored",
                        isSelected: false
                    },
                    {
                        value: "No motivation at all",
                        isSelected: false
                    }
                ]
            },
            {
                refId: "refIdTwo",
                type: "text",
                title: "Think about a time when you were highly motivated. When was it and what were you motivated for?",
                hint: "For example, you might have been the most motivated during a work project when you were in charge of the success. That sense of ownership and creative freedom highly motivates you.",
                shouldBeVisible: false,
                response: ""
            },
            {
                refId: "refIdThree",
                type: "text",
                title: "Think about a time when you felt most demoralized. What happened then?",
                hint: "Often this points to the lack of the same set of motivations. For example, during a project you hated, you were given menial tasks to do with no control or freedom over your job. You felt trapped. ",
                shouldBeVisible: false,
                response: ""
            },
            {
                refId: "refIdFour",
                type: "text",
                title: "If money was not an issue, what would you be doing with your life?",
                hint: "Money is important. But intrinsically, money has no value. The only thing that gives money value is what you can do with it.  If you received enough money to never have to work again, what would you do with your life?",
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
                case "single-selection":
                    let singleSelectionItems = { ...exercises };
                    const singleSelectionList = singleSelectionItems.data[currentPosition].choices.map((item, index) => {
                        let selectedItem;
                        if (index === position) {
                            selectedItem = {
                                ...item,
                                isSelected: isSelected,
                            };

                            singleSelectionItems.data[currentPosition].response = selectedItem.value

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
            navigate("/congratulations-discover-your-motivations", { state: { value: exercises.data } })
        } else {
            setCurrentPage(() => currentPosition)
        }
    }

    return <div className="mx-auto pb-20 px-4 lg:px-64 pt-6">
        <ScrollToTopOnMount />
        <h2 className="text-left border-b-2 border-blue-1100 text-blue-1100 font-bold font-heading text-xl lg:text-2xl">{exercises.title}</h2>
        {
            exercises.data.map((item, index) => {
                if (item.shouldBeVisible === true) {
                    return <div id={index} key={index} ref={setRef(item.refId)} className="h-screen lg:h-84 mb-10 mt-6">
                        <p className="text-lg text-blue-1100 font-heading font-semibold lg:ml-2 lg:mt-6">{item.title}</p>
                        <ul className="my-2 lg:my-4 flex flex-wrap">
                            {item.choices && item.choices.map((item, index) => {
                                if (item.isSelected) {
                                    return <p key={index} className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer lg:cursor-pointer lg:select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 bg-blue-1100 text-white rounded-full border-solid" onClick={(e) => handleChange(e, index, false)}> {item.value}</p>
                                }
                                return <p key={index} className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer lg:cursor-pointer lg:select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 bg-white hover:bg-blue-1100 hover:text-white rounded-full border-solid" onClick={(e) => handleChange(e, index, true)}> {item.value}</p>
                            })}
                        </ul>
                        {item.hint && <div className="w-full p-2">
                            <p className='font-body text-md text-blue-1100 p-2 bg-white bg-opacity-50 rounded-lg'>{item.hint}</p>
                            <textarea rows="3" className="w-full h-20 rounded-lg mt-6 p-2 text-blue-1100 bg-gray-100 border-blue-1100 border-2 outline-none" type="text" name="response" value={item.response} placeholder={exercises.placeholder} onChange={(e) => handleChange(e, currentPage, true)} />
                        </div>}
                        <button className="lg:ml-2 mt-6 bg-blue-1100 hover:bg-blue-700 px-4 py-2 text-white rounded-lg flex text-center" onClick={(e) => handleClick(e, index + 1)} >Next <FaCheck className="my-auto ml-2 pointer-events-none" /></button>

                    </div>

                }
            })
        }
    </div >
}

export default FindOutYourMotivations;