import React, { useState, useEffect } from "react";
import useDynamicRefs from 'use-dynamic-refs';
import { FaCheck } from 'react-icons/fa'
import { useNavigate } from "react-router-dom"
import ReactPlayer from "react-player"
import "../../../../styles/main.css"
import ScrollToTopOnMount from "../../../../utils/ScrollToTop";
import { getAnalytics, logEvent } from "firebase/analytics";

const FindYourselfAtYourBest = () => {

    const analytics = getAnalytics()

    useEffect(() => {
        logEvent(analytics, 'screen_view', {
            firebase_screen: "FindYourselfAtYourBest"
        });
    }, [analytics])

    const [getRef, setRef] = useDynamicRefs();
    const navigate = useNavigate();
    const [exercises, setExercises] = useState({
        title: "Find yourself at your best",
        placeholder: "Write here your thoughts",
        data: [
            {
                refId: "refIdOne",
                title: "Recall a recent time or event when you were at your best. How did it make you feel?",
                subTitle: "Maybe you were solving a serious challenge, or perhaps you made someone else's life better.",
                question: "When you were at your best, what did you feel? Select as many as you felt.",
                type: "multiple-choice-selection",
                shouldBeVisible: true,
                choices: [
                    { value: "more alive", isSelected: false },
                    { value: "more grounded", isSelected: false },
                    { value: "more enthusiastic", isSelected: false },
                    { value: "more energized", isSelected: false },
                    { value: "more engaged", isSelected: false },
                    { value: "more creative", isSelected: false },
                    { value: "more relaxed", isSelected: false },
                    { value: "happier", isSelected: false },
                    { value: "healthier", isSelected: false },
                ],
                response: {
                    choices: []
                },
            },
            {
                refId: "refIdTwo",
                title: "What was the event that happened? Which part did you take? How did you feel?",
                hint: "Describe your story as if you are reliving it. Don't be shy about your own achievement, there is no need to be humble here. Allow the details in your narrative to demonstrate your strengths and values. ",
                response: "",
                type: "text",
                shouldBeVisible: false,
            },
            {
                refId: "refIdThree",
                title: "Now read over your previous story, and make a mental highlight on any words that you feel might relate to your personal strengths.",
                hint: "Strengths could include a lot of things, don't feel shy to put down any you have identified. Just to give you a few examples: creativity, humility, curiosity, love, judgment, social intelligence, perspective, gratitude, fairness, humor, honesty...",
                question: "What are the strengths that you've identified from your story?",
                type: "text",
                response: "",
                shouldBeVisible: false,
            },
            {
                refId: "refIdFour",
                title: "Finally, take the last minute to think about how you can use your strengths and move towards this better version of you?",
                subTitle: "How different would you life be once you have made the change?",
                question: "We have prepared a 3-minute meditation music for you to listen in the background. It is designed to soothe your mind, relax your muscles and help you get into a state of deep thinking.",
                type: "informative",
                shouldBeVisible: false
            },
            {
                refId: "refIdFive",
                type: "video",
                shouldBeVisible: false
            }
        ]
    })

    const [currentPage, setCurrentPage] = useState(0)

    const handleSelection = (e, isSelected, position) => {
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
            navigate("/congratulations-find-yourself-at-your-best", { state: { value: exercises.data } })
        } else {
            setCurrentPage(() => currentPosition)
        }
    }

    useEffect(() => {
        if (currentPage > 0) {
            const refId = getRef(exercises.data[currentPage].refId);
            refId.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [currentPage])

    return <div className="lg:pb-20 px-4 lg:px-64 pt-6">
        <ScrollToTopOnMount />
        <h2 className="text-left border-b-2 border-blue-1100 text-blue-1100 font-bold font-heading text-xl lg:text-2xl">{exercises.title}</h2>
        {
            exercises.data.map((item, index) => {
                if (item.shouldBeVisible === true) {
                    return <div id={index} key={index} ref={setRef(item.refId)} className="h-screen lg:h-108 lg:mt-10">
                        <p className="text-lg text-blue-1100 font-heading font-semibold lg:ml-4">{item.title}</p>
                        {item.subTitle && <div className="thought">
                            <p className="sb14 text-md text-blue-1100 font-heading text-xs lg:text-sm lg:ml-4">{item.subTitle}</p>
                        </div>}
                        {item.question && <div className="thought">
                            <p className="sb14 text-md text-blue-1100 font-heading text-xs lg:text-sm lg:ml-4">{item.question}</p>
                        </div>}
                        <ul className="mt-2 lg:mt-10 flex flex-wrap">
                            {item.choices && item.choices.map((item, index) => {
                                if (item.isSelected) {
                                    return <p key={index} className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer lg:cursor-pointer lg:select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 bg-blue-1100 text-white rounded-full border-solid font-body" onClick={(e) => handleSelection(e, false, index)}> {item.value}</p>
                                }
                                return <p key={index} className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer lg:cursor-pointer lg:select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 bg-white hover:bg-blue-1100 hover:text-white rounded-full border-solid font-body" onClick={(e) => handleSelection(e, true, index)}> {item.value}</p>
                            })}
                        </ul>
                        {item.hint && <div className="w-full p-2">
                            <p className='font-body text-md text-blue-1100 p-2 bg-white bg-opacity-50 rounded-lg'>{item.hint}</p>
                            <textarea rows="3" className="w-full h-20 rounded-lg mt-6 p-2 text-blue-1100 bg-gray-100 border-blue-1100 border-2 outline-none" type="text" name="response" value={item.response} placeholder={exercises.placeholder} onChange={(e) => handleSelection(e, true, index)} />
                        </div>}
                        {item.type === "video" && <ReactPlayer width="100%" className="mx-auto"
                            url="https://vimeo.com/660493074"
                        />}
                        <button className="lg:ml-4 lg:mt-6 bg-blue-1100 hover:bg-blue-700 px-4 py-2 text-white rounded-lg flex text-center" onClick={(e) => handleClick(e, index + 1)} >Next <FaCheck className="my-auto ml-2 pointer-events-none" /></button>
                    </div>
                }
            })
        }
    </div>
}

export default FindYourselfAtYourBest;
