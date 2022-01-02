import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { AnimatedList } from 'react-animated-list'

const ShortExercises = () => {
    const navigate = useNavigate();
    const [shortExercises, setShortExercises] = useState([
        {
            title: "Now, take a Little Break to practice at least one exercise",
            description: "",
            content: [
                {
                    value: "What are you worried for?",
                    isSelected: false,
                    componentLink: "what-are-you-worried-for"
                },
                {
                    value: "Reality check",
                    isSelected: false,
                    componentLink: "give-yourself-a-reality-check"
                },
                {
                    value: "Reconstruct thoughts",
                    isSelected: false,
                    componentLink: "reconstruct-thoughts"
                },
                {
                    value: "Self esteem",
                    isSelected: false,
                    componentLink: "improve-self-esteem"
                },
                {
                    value: "Understanding forgiveness",
                    isSelected: false,
                    componentLink: "understanding-forgiveness"
                },
                {
                    value: "Behaviour change",
                    isSelected: false,
                    componentLink: "behaviour-change"
                },
                {
                    value: "What triggers your stress",
                    isSelected: false,
                    componentLink: "what-triggers-your-stress"
                },
                {
                    value: "Challenge negativity",
                    isSelected: false,
                    componentLink: "challenge-negative-thoughts"
                },
                {
                    value: "Gratitude",
                    isSelected: false,
                    componentLink: "gratitude"
                }
            ]
        }
    ])

    const [currentPage, setCurrentPage] = useState(0)

    const handleChange = (e, position) => {
        const componentLink = shortExercises[currentPage].content[position].componentLink
        navigate("/" + componentLink)
    }

    return <div>

        {<div>
            <AnimatedList className="h-156" animation="grow" initialAnimationDuration="4000">
                <h2 className="text-left border-b-2 border-blue-1100 text-blue-1100 font-bold font-heading text-md lg:text-xl">{shortExercises[currentPage].title}</h2>
                <div className="flex justify-center lg:mt-10">
                    <ul className="w-full lg:w-2/3 grid grid-rows-4 gap-4 lg:grid-cols-2 mt-4 justify-center text-center">
                        <AnimatedList className="h-156" animation="grow" initialAnimationDuration="4000">
                            {shortExercises[currentPage].content.map((item, index) => {
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

export default ShortExercises;