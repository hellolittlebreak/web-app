import React, { useState, useEffect } from 'react'
import { FaCheck, FaStar } from 'react-icons/fa'
import useDynamicRefs from 'use-dynamic-refs';
import { useNavigate } from "react-router-dom";

const ReconstructThoughts = () => {
    const [getRef, setRef] = useDynamicRefs();
    const navigate = useNavigate();

    const [exercises, setExercises] = useState({
        title: "Reconstruct negative thoughts",
        placeHolder: "Write your thoughts here",
        data: [
            {
                refId: "refIdOne",
                title: "Catch it",
                question: "Now, think about your last negative thought. What happened? Is it overly negative?",
                type: "text",
                shouldBeVisible: true,
                response: "",
                suggestions: [
                    {
                        title: "Watch out when something makes you feel upset. Catch yourself with the negative thoughts.",
                        subTitle: ""
                    },
                    {
                        title: "Identify the thought that comes before your emotions. Is it overly negative?",
                    }
                ]
            },
            {
                refId: "refIdTwo",
                title: "Challenge it",
                question: "Now, reflect on your last negative thought. Could there be a more helpful interpretation of the situation? If it’s your best friend going through the situation, what would you say to them?",
                type: "text",
                shouldBeVisible: false,
                response: "",
                suggestions: [
                    {
                        title: "Challenge the thought. Is there a more helpful interpretation of the situation?"
                    },
                    {
                        title: "One way to challenge your thought is to imagine if it's your best friend going through the situation, what would you say to them? We can be sometimes overly harsh on ourselves."
                    },
                    {
                        title: "Remember, there are almost always a number of interpretations of the same situation. Some are more helpful and positive than others."
                    }
                ]
            },
            {
                refId: "refIdThree",
                title: "Change it",
                question: "Finally, if you see there could be a more helpful interpretation of the situation, what other thoughts and actions you could have taken? The goal isn't to be overly positive, you just want to be fair.",
                type: "text",
                shouldBeVisible: false,
                response: "",
                suggestions: [
                    {
                        title: "If you decide that your thought is not helpful or accurate, then change it to a healthier thought."
                    },
                    {
                        title: "It will lead you to more positive emotions and healthy behaviours as responses."
                    },
                    {
                        title: "If you discover that you are indeed in the worst situation, you will know that you have responded with a clear mind, rather than emotional impulses."
                    }
                ]
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

    return <div className="lg:pb-32 mx-auto px-4 lg:px-64 pt-6">
        <h2 className="text-left border-b-2 border-blue-1100 text-blue-1100 font-bold font-heading text-md lg:text-2xl">{exercises.title}</h2>
        {
            exercises.data.map((item, index) => {
                if (item.shouldBeVisible === true) {
                    return <div id={index} key={index} ref={setRef(item.refId)} className="h-screen my-6 lg:my-12">
                        <p className="text-center bg-white bg-opacity-50 rounded-lg py-2 text-xl text-blue-1100 font-heading font-semibold">{item.title}</p>
                        <table className='table'>
                            <tbody>


                                {item.suggestions && item.suggestions.map((item, index) => {
                                    return <tr>
                                        <td><FaStar size={15} className="w-10 text-orange-600" /></td>
                                        <td><p className='font-body text-md text-blue-1100 p-2 rounded-lg my-2'>{item.title}</p></td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                        <p className='italic font-body text-md text-blue-1100 p-2  rounded-lg my-2'>{item.question}</p>
                        {item.type === "text" && <div className="w-full p-2">
                            <textarea rows="3" className="w-full h-10 rounded-lg mt-6 p-2 text-blue-1100 bg-gray-100 border-blue-1100 border-2 outline-none" type="text" name="response" value={item.response} placeholder={exercises.placeHolder} onChange={(e) => handleChange(e, currentPage, true)} />
                        </div>}
                        <button className="ml-2 mt-4 lg:mt-8 bg-blue-1100 hover:bg-blue-700 px-4 py-2 text-white rounded-lg flex text-center" onClick={(e) => handleClick(e, index + 1)} >Next <FaCheck className="my-auto ml-2 pointer-events-none" /></button>
                    </div>

                }
            })
        }
    </div >
}

export default ReconstructThoughts;