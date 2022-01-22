import React, { useState, useEffect } from 'react'
import { FaCheck } from 'react-icons/fa'
import useDynamicRefs from 'use-dynamic-refs';
import { useNavigate } from "react-router-dom";
import ScrollToTopOnMount from '../../../../utils/ScrollToTop';

const Gratitude = () => {

    const [getRef, setRef] = useDynamicRefs();
    const navigate = useNavigate();

    const [exercises, setExercises] = useState({
        title: "What is going well today? Can you think of three things?",
        placeholder: "Write here",
        data: [
            {
                refId: "refIdOne",
                type: "text",
                title: "Something or someone that made me smile today",
                shouldBeVisible: true,
                response: ""
            },
            {
                refId: "refIdTwo",
                type: "text",
                title: "Something I was happy about",
                shouldBeVisible: false,
                response: ""
            },
            {
                refId: "refIdThree",
                type: "text",
                title: "One thing I am grateful for",
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
            navigate("/congratulations-gratitude", { state: { value: exercises.data } })
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
                    return <div id={index} key={index} ref={setRef(item.refId)} className="h-screen lg:h-58">
                        <div className='flex flex-col lg:flex-row items-center'>
                            <p className="text-lg text-blue-1100 font-heading font-semibold lg:ml-4 lg:inline-block lg:my-10">{item.title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                            <textarea maxlength="50" rows="1" className="w-full lg:w-1/2  font-heading rounded-lg overflow-hidden whitespace-nowrap p-2 text-blue-1100 outline-none border-b-2 my-6 lg:my-10" type="text" name="response" value={item.response} placeholder={exercises.placeholder} onChange={(e) => handleChange(e, currentPage, true)} />
                        </div>
                        <button className="lg:ml-4 lg:mt-6 bg-blue-1100 hover:bg-blue-700 px-4 py-2 text-white rounded-lg flex text-center" onClick={(e) => handleClick(e, index + 1)} >OK <FaCheck className="my-auto ml-2 pointer-events-none" /></button>
                    </div>
                }
            })
        }
    </div >
}

export default Gratitude