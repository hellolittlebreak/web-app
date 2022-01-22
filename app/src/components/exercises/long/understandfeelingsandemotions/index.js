import React, { useState, useEffect } from "react";
import { FaCheck } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";
import "../../../../styles/main.css"
import ScrollToTopOnMount from "../../../../utils/ScrollToTop";
import { getAnalytics, logEvent } from "firebase/analytics";

const StartUnderstandFeelingsAndEmotions = () => {
    const navigate = useNavigate();
    const analytics = getAnalytics()

    useEffect(() => {
        logEvent(analytics, 'screen_view', {
            firebase_screen: "StartUnderstandFeelingsAndEmotions"
        });
    }, [analytics])
    const [exercises, setExercises] = useState({
        title: "Understanding emotions",
        placeholder: "Write your thoughts here...",
        data: [
            {
                refId: "referrerIdOne",
                title: "",
                type: "text-details",
                shouldBeVisible: true,
                notes: [
                    {
                        value: "Recognising our emotions can be a rather peculiar task.",
                    },
                    {
                        value: "Some emotions are simple to recognise; others are a lot more complex and difficult to grasp."
                    },
                    {
                        value: "Emotions guide our decisions, help us to connect with others and keep us safe."
                    },
                    {
                        value: "Learning to identify our emotions is therefore critical to our happiness in life. It helps us develop a better understanding of ourselves, build more meaningful relationships and make better decisions."
                    }
                ]
            }
        ]
    })

    const handleClick = (e) => {
        navigate("/understand-your-feeling-and-emotions")
    }

    return <div className="h-fit mx-auto px-4 lg:pb-32 lg:px-64 pt-6">
        <ScrollToTopOnMount />
        <h2 className="text-left border-b-2 border-blue-1100 text-blue-1100 font-bold font-heading text-xl lg:text-2xl">{exercises.title}</h2>
        {
            exercises.data.map((item, index) => {
                if (item.shouldBeVisible === true) {
                    return <div id={index} key={index} className="h-screen lg:mt-20">
                        {item.notes && item.notes.map((item, index) => {
                            return <div className="thought">
                                <p key={index} className="sb14 lg:select-none m-2 px-4 ml-2 border-blue-1100 bg-white bg-opacity-75 text-blue-1100 rounded-lg font-body"> {item.value}</p>
                            </div>
                        })}

                        <button className="lg:ml-4 lg:mt-20 bg-blue-1100 hover:bg-blue-700 px-4 py-2 text-white rounded-lg flex text-center" onClick={(e) => handleClick(e)} >Start the exercise <FaCheck className="my-auto ml-2 pointer-events-none" /></button>

                    </div>
                }
            })
        }
    </div>
}

export default StartUnderstandFeelingsAndEmotions;