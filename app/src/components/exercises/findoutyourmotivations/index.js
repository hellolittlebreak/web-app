import React, { useRef, useState } from 'react'
import { AnimatedList } from 'react-animated-list'
import { FaArrowDown, FaArrowUp, FaCheck } from 'react-icons/fa'

const FindOutYourMotivations = () => {

    const [exercises, setExercises] = useState({
        title: "Find out your motivations",
        data: [
            {
                title: "How motivated have you been feeling recently?",
                shouldBeVisible: true,
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
                title: "Think about a time when you were highly motivated. When was it and what were you motivated for?",
                hint: "For example, you might have been the most motivated during a work project when you were in charge of the success. That sense of ownership and creative freedom highly motivates you.",
                shouldBeVisible: false,
                response: ""
            },
            {
                title: "Think about a time when you felt most demoralized. What happened then?",
                hint: "Often this points to the lack of the same set of motivations. For example, during a project you hated, you were given menial tasks to do with no control or freedom over your job. You felt trapped. ",
                shouldBeVisible: false,
                response: ""
            },
            {
                title: "If money was not an issue, what would you be doing with your life?",
                hint: "Money is important. But intrinsically, money has no value. The only thing that gives money value is what you can do with it.  If you received enough money to never have to work again, what would you do with your life?",
                shouldBeVisible: false,
                response: ""
            }
        ]
    })

    const [currentPage, setCurrentPage] = useState(0)
    const myRef = useRef(null)

    const executeScroll = () => myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })

    const handleChange = (e, position, isSelected) => {

    }

    const handleClick = (position) => {
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
        setCurrentPage(() => currentPage + 1)
        executeScroll()
    }

    return <div className="w-full h-full">
        <h2 className="text-left border-b-2 border-blue-1100 text-blue-1100 font-bold font-heading text-md lg:text-xl">{exercises.title}</h2>
        {
            exercises.data.map((item, index) => {
                if (item.shouldBeVisible === true) {
                    return <div ref={myRef} className="h-84">
                        {/* // <AnimatedList className="h-156" animation="grow" initialAnimationDuration="4000"> */}

                        <p className="text-md text-blue-1100 font-heading font-semibold lg:ml-4 lg:mt-6">{item.title}</p>
                        <ul className="mt-2 lg:mt-4 flex flex-wrap">
                            {item.choices && item.choices.map((item, index) => {
                                if (item.isSelected) {
                                    return <p key={index} className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer lg:cursor-pointer lg:select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 bg-blue-1100 text-white rounded-full border-solid" onClick={(e) => handleChange(e, index, false)}> {item.value}</p>
                                }
                                return <p key={index} className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer lg:cursor-pointer lg:select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 bg-white hover:bg-blue-1100 hover:text-white rounded-full border-solid" onClick={(e) => handleChange(e, index, true)}> {item.value}</p>
                            })}
                        </ul>
                        <button className="lg:ml-4 lg:mt-6 bg-blue-1100 hover:bg-blue-700 px-4 py-2 text-white rounded-lg flex text-center" onClick={() => handleClick(index + 1)} >OK <FaCheck className="my-auto ml-2" /></button>
                    </div>
                    // </AnimatedList>
                }
            })
        }

        {/* {(() => {
            switch (currentPage) {
                case 0:
                    return (
                        <AnimatedList animation="grow" initialAnimationDuration="4000">
                            <p className="text-md text-blue-1100 font-heading font-semibold lg:ml-4 lg:mt-6">{exercises.data[currentPage].title}</p>
                            <ul className="mt-2 lg:mt-4 flex flex-wrap">
                                {exercises.data[currentPage].choices.map((item, index) => {
                                    if (item.isSelected) {
                                        return <p key={index} className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer lg:cursor-pointer lg:select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 bg-blue-1100 text-white rounded-full border-solid" onClick={(e) => handleChange(e, index, false)}> {item.value}</p>
                                    }
                                    return <p key={index} className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer lg:cursor-pointer lg:select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 bg-white hover:bg-blue-1100 hover:text-white rounded-full border-solid" onClick={(e) => handleChange(e, index, true)}> {item.value}</p>
                                })}
                            </ul>
                            <button className="lg:ml-4 lg:mt-6 bg-blue-1100 hover:bg-blue-700 px-4 py-2 text-white rounded-lg flex text-center" onClick={() => handleClick()} >OK <FaCheck className="my-auto ml-2" /></button>
                        </AnimatedList>
                    )
                case 1:
                case 2:
                case 3:

                    break;
                default:
                    break;
            }
        })()} */}
        {/* <div className="flex absolute">
            <FaArrowDown />
            <FaArrowUp />
        </div> */}
    </div>
}

export default FindOutYourMotivations;