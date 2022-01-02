import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { AnimatedList } from 'react-animated-list'

const LongExercises = () => {
    const navigate = useNavigate();
    const [longExercises, setLongExercises] = useState([
        {
            title: "Now, take a Little Break to practice at least one exercise",
            description: "",
            content: [
                {
                    value: "Find out your motivations",
                    isSelected: false,
                    componentLink: "find-out-your-motivations"
                },
                {
                    value: "Find yourself at your best",
                    isSelected: false,
                    componentLink: "find-yourself-at-your-best"
                },
                {
                    value: "Understand your feelings and emotions",
                    isSelected: false,
                    componentLink: "understand-your-feeling-and-emotions"
                },
                {
                    value: "Unwind from a stressful moment",
                    isSelected: false,
                    componentLink: "unwind-from-a-stressful-moment"
                },
                {
                    value: "Quiet down the negative thoughts ",
                    isSelected: false,
                    componentLink: "quiet-down-the-negative-thoughts"
                }
            ]
        }
    ])

    const [currentPage, setCurrentPage] = useState(0)

    const handleClick = () => {
        setCurrentPage(() => currentPage + 1)
    }

    const handleChange = (e, position) => {
        const componentLink = longExercises[currentPage].content[position].componentLink
        navigate("/" + componentLink)
    }

    return <div>

        {<div>
            <AnimatedList className="h-156" animation="grow" initialAnimationDuration="4000">
                <h2 className="text-left border-b-2 border-blue-1100 text-blue-1100 font-bold font-heading text-md lg:text-xl">{longExercises[currentPage].title}</h2>
                <div className="flex justify-center lg:mt-10">
                    <ul className="w-full lg:w-2/3 grid grid-rows-4 gap-4 lg:grid-cols-2 mt-4 justify-center text-center">
                        <AnimatedList className="h-156" animation="grow" initialAnimationDuration="4000">
                            {longExercises[currentPage].content.map((item, index) => {

                                return <div className="flex content-center">
                                    <p key={index} className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer lg:cursor-pointer lg:select-none m-2 px-4 py-2 inline-block border-2 w-full lg:w-56 h-32 border-blue-1100 bg-white hover:bg-blue-1100 hover:text-white rounded-lg border-solid font-heading" onClick={(e) => handleChange(e, index, true)}> {item.value}</p>
                                </div>
                            })}
                        </ AnimatedList>
                    </ul>


                </div>
            </AnimatedList>
        </div>}
    </div>
}

export default LongExercises;