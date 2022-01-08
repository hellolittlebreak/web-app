import React, { useState, useEffect } from 'react'
import { FaCheck } from 'react-icons/fa'
import useDynamicRefs from 'use-dynamic-refs';
import { useNavigate } from "react-router-dom";

const ThingsAboutMe = () => {
    const [getRef, setRef] = useDynamicRefs();
    const navigate = useNavigate();
    const [exercises, setExercises] = useState({
        title: "Six things about me",
        placeholder: "....",
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
            navigate("/congratulations")
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
        <h2 className="text-left border-b-2 border-blue-1100 text-blue-1100 font-bold font-heading text-md lg:text-xl">{exercises.title}</h2>
        {
            exercises.data.map((item, index) => {
                if (item.shouldBeVisible === true) {
                    return <div id={index} key={index} ref={setRef(item.refId)} className="h-screen lg:h-96 lg:my-20">
                        <div className=''>
                            <p className="text-md text-blue-1100 font-heading font-semibold lg:ml-4 lg:mt-32 lg:inline-block">{item.title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                            <textarea rows="1" className="font-heading bg-transparent rounded-lg lg:mt-6 p-2 text-blue-1100 outline-none border-b-2 " type="text" name="response" value={item.response} placeholder={exercises.placeholder} onChange={(e) => handleClick(e, currentPage, true)} />
                        </div>
                        <button className="lg:ml-4 lg:mt-6 bg-blue-1100 hover:bg-blue-700 px-4 py-2 text-white rounded-lg flex text-center" onClick={(e) => handleClick(e, index + 1)} >OK <FaCheck className="my-auto ml-2 pointer-events-none" /></button>
                    </div>
                }
            })
        }
    </div>
}

export default ThingsAboutMe;