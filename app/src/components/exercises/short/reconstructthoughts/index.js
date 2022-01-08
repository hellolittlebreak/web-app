import React, { useState, useEffect } from 'react'
import { FaCheck } from 'react-icons/fa'
import useDynamicRefs from 'use-dynamic-refs';
import { useNavigate } from "react-router-dom";

const ReconstructThoughts = () => {
    const [getRef, setRef] = useDynamicRefs();
    const navigate = useNavigate();

    const [exercises, setExercises] = useState({
        title: "Three things to do when you have negative thoughts",
        data: [
            {
                refId: "refIdOne",
                title: "Catch it",
                type: "informative",
                shouldBeVisible: true,
                suggestions: [
                    {
                        title: "Watch out when something makes you feel upset.",
                        subTitle: "Catch yourself with the negative thoughts."
                    },
                    {
                        title: "Identify the thought that comes before your emotions.",
                        subTitle: "Is it overly negative?"
                    },
                    {
                        title: "Think if it's your best friend going through the situation.",
                        subTitle: "what would you say to them?"
                    }
                ]
            },
            {
                refId: "refIdTwo",
                title: "Challenge it",
                type: "informative",
                shouldBeVisible: false,
                suggestions: [
                    {
                        title: "Challenge the thought.",
                        subTitle: "Is there a more helpful interpretation of the situation without changing the reality?"
                    },
                    {
                        title: "Remember, there are almost always a number of interpretations of the same situation.",
                        subTitle: "Some are more helpful and positive than others."
                    },
                    {
                        title: "Reflect  how useful and accurate your thought is.",
                        subTitle: ""
                    }
                ]
            },
            {
                refId: "refIdThree",
                title: "Change it",
                type: "informative",
                shouldBeVisible: false,
                suggestions: [
                    {
                        title: "If you decide that your thought is not helpful or accurate, then change it to a healthier thought.",
                        subTitle: ""
                    },
                    {
                        title: "It will lead you to more positive emotions and healthy behaviours as responses.",
                        subTitle: ""
                    },
                    {
                        title: "f you discover that you are indeed in the worst situation, you will know that you have responded with a clear mind, rather than emotional impulses.",
                        subTitle: ""
                    }
                ]
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

    return <div className="mx-auto px-4 lg:px-64 pt-6">
        <h2 className="text-left border-b-2 border-blue-1100 text-blue-1100 font-bold font-heading text-md lg:text-2xl">{exercises.title}</h2>
        {
            exercises.data.map((item, index) => {
                if (item.shouldBeVisible === true) {
                    return <div id={index} key={index} ref={setRef(item.refId)} className="h-screen lg:h-96">
                        <p className=" text-xl text-blue-1100 font-heading font-semibold lg:ml-4 lg:mt-32">{item.title}</p>
                        <ul className="mt-2 lg:mt-4 flex flex-col">
                            {item.suggestions && item.suggestions.map((item, index) => {
                                return <p className='font-body text-md text-blue-1100 p-2 bg-gray-300 rounded-lg my-2'>{item.title}</p>
                            })}
                        </ul>
                        <button className="lg:ml-4 lg:mt-6 bg-blue-1100 hover:bg-blue-700 px-4 py-2 text-white rounded-lg flex text-center" onClick={(e) => handleClick(e, index + 1)} >OK <FaCheck className="my-auto ml-2 pointer-events-none" /></button>
                    </div>

                }
            })
        }
    </div >
}

export default ReconstructThoughts;