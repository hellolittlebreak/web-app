import React, { useState, useEffect } from 'react'
import { FaCheck } from 'react-icons/fa'
import useDynamicRefs from 'use-dynamic-refs';
import { useNavigate } from "react-router-dom";
import ScrollToTopOnMount from '../../../../utils/ScrollToTop';
import { getAnalytics, logEvent } from "firebase/analytics";

const ThingsAboutMe = () => {
    const [getRef, setRef] = useDynamicRefs();
    const navigate = useNavigate();

    const analytics = getAnalytics()

    useEffect(() => {
        logEvent(analytics, 'screen_view', {
            firebase_screen: "ThingsAboutMe"
        });
    }, [analytics])

    const [exercises, setExercises] = useState({
        title: "Six things about me",
        description: "Sometimes we forget to stop and appreciate how far we have come. \nSometimes we forget to be kind to ourselves and embrace how awesome we are. \n\nWhen life gets tough, our self-confidence slips down. \n\nIn this exercise, we will guide you to establish a healthy self-esteem by re-learning six things about yourself.",
        placeholder: "Reflect and fill in the blank",
        data: [

            {
                refId: "refIdOne",
                title: "I felt really happy when ",
                type: "text",
                shouldBeVisible: true,
            },
            {
                refId: "refIdTwo",
                title: "My friends like to be around me because ",
                type: "text",
                shouldBeVisible: false,
            },
            {
                refId: "refIdThree",
                title: "I am really proud of ",
                type: "text",
                shouldBeVisible: false,
            },
            {
                refId: "refIdFour",
                title: "My family has fun when ",
                type: "text",
                shouldBeVisible: false,
            },
            {
                refId: "refIdFive",
                title: "At work, I am good at ",
                type: "text",
                shouldBeVisible: false,
            }, {
                refId: "refIdSix",
                title: "Something that makes me unique ",
                type: "text",
                shouldBeVisible: false,
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
            navigate("/congratulations-improve-self-esteem", { state: { value: exercises.data } })
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

    return <div className="lg:py-10 mx-auto px-4 lg:px-64">
        <ScrollToTopOnMount />
        <h2 className="text-left border-b-2 border-blue-1100 text-blue-1100 font-bold font-heading text-xl lg:text-2xl">{exercises.title}</h2>
        <div className='mt-10 thought'>
            <p className='sb14 whitespace-pre-wrap text-blue-1100 rounded-lg p-4 font-heading'>{exercises.description}</p>
        </div>
        {
            exercises.data.map((item, index) => {
                if (item.shouldBeVisible === true) {
                    return <div id={index} key={index} ref={setRef(item.refId)} className="h-screen lg:h-58">
                        <div className='flex flex-col lg:flex-row items-center'>
                            <p className="text-lg text-blue-1100 font-heading font-semibold lg:ml-4 lg:inline-block lg:my-10">{item.title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                            <textarea maxlength="50" rows="1" className="w-full lg:w-1/2  font-heading rounded-lg overflow-hidden whitespace-nowrap p-2 text-blue-1100 outline-none border-b-2 my-6 lg:my-10" type="text" name="response" value={item.response} placeholder={exercises.placeholder} onChange={(e) => handleSelection(e, currentPage, true)} />
                        </div>
                        <button className="lg:ml-4 lg:mt-6 bg-blue-1100 hover:bg-blue-700 px-4 py-2 text-white rounded-lg flex text-center" onClick={(e) => handleClick(e, index + 1)} >OK <FaCheck className="my-auto ml-2 pointer-events-none" /></button>
                    </div>
                }
            })
        }
    </div>
}

export default ThingsAboutMe;
