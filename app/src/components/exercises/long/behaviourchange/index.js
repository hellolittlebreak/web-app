import React, { useState, useEffect } from 'react'
import { FaCheck, FaStar } from 'react-icons/fa'
import useDynamicRefs from 'use-dynamic-refs';
import { useNavigate } from "react-router-dom";
import ScrollToTopOnMount from '../../../../utils/ScrollToTop';

const BehaviourChange = () => {
    const [getRef, setRef] = useDynamicRefs();
    const navigate = useNavigate();

    const [exercises, setExercises] = useState({
        title: "Stop unwanted Thought or Behaviour",
        placeHolder: "Write your thoughts here",
        data: [
            {
                refId: "refIdOne",
                question: "If you can change one thought or behaviour, what you would like to change?",
                type: "text",
                shouldBeVisible: true,
                response: "",
            },
            {
                refId: "refIdTwo",
                question: "What are the benefits of this thought or behaviour?",
                subQuestion: "What are the other ways to obtain these benefits?",
                type: "text",
                shouldBeVisible: false,
                response: ""
            },
            {
                refId: "refIdThree",
                question: "What has this thought or behaviour cost you?",
                subQuestion: "Make yourself aware of the costs",
                type: "text",
                shouldBeVisible: false,
                response: ""
            },
            {
                refId: "refIdFour",
                question: "After reviewing the costs and benefits, how can you change it to improve your life?",
                type: "text",
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
            navigate("/congratulations-behaviour-change", { state: { value: exercises.data } })
        } else {
            setCurrentPage(() => currentPosition)
        }
    }

    return <div className="lg:pb-32 mx-auto px-4 lg:px-64 pt-6">
        <ScrollToTopOnMount />
        <h2 className="text-left border-b-2 border-blue-1100 text-blue-1100 font-bold font-heading text-xl lg:text-2xl">{exercises.title}</h2>
        {
            exercises.data.map((item, index) => {
                if (item.shouldBeVisible === true) {
                    return <div id={index} key={index} ref={setRef(item.refId)} className="h-screen lg:h-72 my-6 lg:my-12">
                        <p className="p-2 rounded-lg py-2 text-lg text-blue-1100 font-heading font-semibold">{item.question}</p>
                        {item.subQuestion && <p className='italic font-body text-md text-blue-1100 p-2 rounded-lg my-2'>{item.subQuestion}</p>}
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

export default BehaviourChange;