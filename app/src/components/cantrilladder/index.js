import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { AnimatedList } from 'react-animated-list';

function CantrilLadder() {
    const navigate = useNavigate();
    const [exercises, setExercises] = useState({
        title: "The Cantril Ladder: Gallup Well-Being Index",
        data: [
            {
                title: "Please imagine a ladder with steps numbered from 0 at the bottom to 10 at the top. Suppose we say that the top of the ladder represents the best possible life for you and the bottom of the ladder represents the worst possible life for you.",
                question: "On which step of the ladder would you say you personally feel you stand at this time, assuming that the higher the step the better you feel about your life, and the lower the step the worse you feel about it? Which step comes closest to the way you feel?",
                answers: [{ value: 1, isSelected: false }, { value: 2, isSelected: false }, { value: 3, isSelected: false }, { value: 4, isSelected: false }, { value: 5, isSelected: false }, { value: 6, isSelected: false }, { value: 7, isSelected: false }, { value: 8, isSelected: false }, { value: 9, isSelected: false }, { value: 10, isSelected: false }],
                response: 0,
            },
            {
                title: "Please imagine a ladder with steps numbered from 0 at the bottom to 10 at the top. Suppose we say that the top of the ladder represents the best possible life for you and the bottom of the ladder represents the worst possible life for you.",
                question: "On which step of the ladder would you say you stood 5 years ago?",
                answers: [{ value: 1, isSelected: false }, { value: 2, isSelected: false }, { value: 3, isSelected: false }, { value: 4, isSelected: false }, { value: 5, isSelected: false }, { value: 6, isSelected: false }, { value: 7, isSelected: false }, { value: 8, isSelected: false }, { value: 9, isSelected: false }, { value: 10, isSelected: false }],
                response: 0
            },
            {
                title: "Please imagine a ladder with steps numbered from 0 at the bottom to 10 at the top. Suppose we say that the top of the ladder represents the best possible life for you and the bottom of the ladder represents the worst possible life for you.",
                question: "On which step of the ladder would you say you will stand on in the future, say about 5 years from now?",
                answers: [{ value: 1, isSelected: false }, { value: 2, isSelected: false }, { value: 3, isSelected: false }, { value: 4, isSelected: false }, { value: 5, isSelected: false }, { value: 6, isSelected: false }, { value: 7, isSelected: false }, { value: 8, isSelected: false }, { value: 9, isSelected: false }, { value: 10, isSelected: false }],
                response: 0
            }
        ]
    })
    const [currentPage, setCurrentPage] = useState(0)

    const handleChange = (e, position, isSelected) => {
        const exercisesList = { ...exercises };
        const allExercises = exercisesList.data[currentPage].answers.map((item, index) => {
            let selectedItem;
            if (index === position) {
                selectedItem = {
                    ...item,
                    isSelected: isSelected,
                };

                exercisesList.data[currentPage].response = selectedItem.value

                return selectedItem
            } else {
                selectedItem = {
                    ...item,
                    isSelected: !isSelected,
                };

                return selectedItem;
            }
        });
        exercisesList.data[currentPage].answers = allExercises
        setExercises(exercisesList);
    }

    const handleClick = () => {
        if (currentPage < exercises.data.length - 1) {
            setCurrentPage(currentPage + 1)
        } else {
            navigate("/cantril-self-anchoring-result", { state: { value: 10 } })
        }
    }

    const skipExercise = () => {
        navigate('/select-your-daily-little-break')
    }

    return <div>
        <h2 className="text-left border-b-2 border-blue-1100 text-blue-1100 font-bold font-heading text-md lg:text-xl">{exercises.title}</h2>
        {(() => {
            switch (currentPage) {
                case 0:
                case 1:
                case 2:
                    return <div className="">
                        <AnimatedList animation="grow" initialAnimationDuration="5000">
                            <div className="bg-blue-1000 p-6 lg:ml-2 lg:mr-6 rounded-full my-4 lg:my-8 inline-block">
                                <p className="text-blue-1100 font-heading text-xs lg:text-sm">{exercises.data[currentPage].title}</p>
                            </div>
                            <p className="text-md text-blue-1100 font-heading text-xs lg:text-lg font-semibold lg:ml-4 lg:mb-6">{exercises.data[currentPage].question}</p>
                            <ul className="mt-2 lg:mt-12 flex flex-wrap justify-center">
                                {exercises.data[currentPage].answers.map((item, index) => {
                                    if (item.isSelected) {
                                        return <p key={index} className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer lg:cursor-pointer lg:select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 bg-blue-1100 text-white rounded-full border-solid" onClick={(e) => handleChange(e, index, false)}> {item.value}</p>
                                    }
                                    return <p key={index} className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer lg:cursor-pointer lg:select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 bg-white hover:bg-blue-1100 hover:text-white rounded-full border-solid" onClick={(e) => handleChange(e, index, true)}> {item.value}</p>
                                })}
                            </ul>
                        </AnimatedList>
                    </div>
                default:
                    break;
            }

        })()}
        <div className="flex flex-col justify-center">
            <p className="cursor-pointer rounded-full mx-auto py-2 lg:py-4 mt-16 px-4 lg:px-12 bg-blue-1100 hover:bg-blue-800 text-white inline-block font-body text-md lg:text-base" onClick={() => handleClick()}>Continue</p>
            <p className="cursor-pointer mx-auto py-4 mt-4 px-12 text-blue-1100 font-body text-md lg:text-base" onClick={() => skipExercise()}>Skip Exercise</p>
        </div>
    </div>
}

export default CantrilLadder;
