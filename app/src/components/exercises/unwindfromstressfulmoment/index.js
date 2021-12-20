import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'


const UnwindFromStressfulMoment = () => {

    const [exercises, setExercises] = useState({
        title: "The Fight-or-Flight Response",
        startParagraphs: [
            {
                value: "A stressful situation -- sometimes environmental, such as an important deadline, sometimes psychological, such as persistent worry about losing a job — can trigger a cascade of stress hormones that produce classic physiological responses like elevated heart rate, quickened breathes, tensing muscles sweating palms."
            },
            {
                value: "We have all been there."
            },
            {
                value: "This combination of reactions to emotion is also known as the \"fight-or-flight\" response."
            },
            {
                value: "The Fight or Flight response is a physiological response triggered when we feel a strong emotion like fear, anxiety, anger or stress."
            },
            {
                value: "Evolutionarily, this response enables us to react quickly to dangerous situations. In modern days, our body can also overreact to stressors that are not life-threatening, such as traffic jams, work pressure, and family difficulties."
            },
            {
                value: "As our body perceives stress, our nervous system functions like a gas pedal in a car, triggering the “fight or flight” response and releasing cortisol, often called “stress hormone”, into your bloodstream."
            }
        ],
        endParagraphs: [
            {
                value: "The following breathing relaxation technique is developed at Harvard Medical School by cardiologist Dr. Herbert Benson."
            },
            {
                value: "Deep breathing can effectively help lessen stress, anxiety, or other fight-or-flight emotions that could be taking over you in difficult situations."
            },
            {
                value: "Inhaling deeply may not always calm you down."
            },
            {
                value: "But exhaling is linked to our parasympathetic nervous system, which influences our body’s ability to relax and calm down."
            },
            {
                value: "When our body is more balanced, we can then deal with our thoughts and take a closer look at how and why we’re feeling that way."
            }
        ],
        exerciseTitle: "Today, we focus on an exercise that helps you recognises when the “fight or flight” is taking over you. We will also give you tips and exercises on how to switch it off and return to your calm and rational self.",
        data: [
            {
                title: "Have I had any of the following responses in recent events? Select all that applies.",
                type: "multiple-choice-selection",
                choices: [
                    {
                        value: "Increased heart rate",
                        isSelected: false
                    },
                    {
                        value: "Racing thoughts",
                        isSelected: false
                    },
                    {
                        value: "Difficulty concentrating",
                        isSelected: false
                    },
                    {
                        value: "Lightheadedness",
                        isSelected: false
                    },
                    {
                        value: "“Butterflies” in stomach",
                        isSelected: false
                    },
                    {
                        value: "Quick, shallow breathing",
                        isSelected: false
                    },
                    {
                        value: "Shaking",
                        isSelected: false
                    },
                    {
                        value: "Sweating",
                        isSelected: false
                    },
                    {
                        value: "Tensed muscles",
                        isSelected: false
                    }
                ]
            },
            {
                title: "What was the event that triggered these responses?",
                hint: "Threats to either physical or emotional wellness can trigger these responses, such as a racing car when crossing the street, or fear of embarrassment when giving a presentation.",
                type: "text"
            },
            {
                title: "What did you do at the time of the event?",
                hint: "Maybe you told yourself calm down, nothing’s going to happen. Maybe you went for a walk. What did you do and were they effective?",
                type: "text"
            }
        ]
    })


    const [pressed, setPressed] = useState(false)

    useEffect(() => {
        window.onpopstate = () => {
            console.log("BACK PRESSED")
        }
    })

    return <h1>Unwind from stressful moment</h1>
}

export default UnwindFromStressfulMoment;