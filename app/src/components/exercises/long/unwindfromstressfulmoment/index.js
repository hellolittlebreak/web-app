import React, { useEffect, useState } from "react";
import useDynamicRefs from 'use-dynamic-refs';
import { useNavigate } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import "../../../../styles/main.css"
import ReactPlayer from "react-player";
import ScrollToTopOnMount from "../../../../utils/ScrollToTop";
import { getAnalytics, logEvent } from "firebase/analytics";

const UnwindFromStressfulMoment = () => {
    const [getRef, setRef] = useDynamicRefs();
    const navigate = useNavigate();
    const analytics = getAnalytics()

    useEffect(() => {
        logEvent(analytics, 'screen_view', {
            firebase_screen: "UnwindFromStressfulMoment"
        });
    }, [analytics])
    const [exercises, setExercises] = useState({

        title: "Unwind from a stressful moment",
        placeholder: "Write your thoughts here...",
        data: [
            {
                refId: "referrerIdOne",
                title: "The Fight or Flight Stress Response",
                type: "text-details",
                shouldBeVisible: true,
                notes: [
                    {
                        value: "A stressful situation — sometimes environmental, such as an important deadline, sometimes psychological, such as persistent worry about losing a job — can be overwhelming and often leaving us emotionally paralysed for a while after.",
                    },
                    {
                        value: "What happens to our body is that during a stressful situation, a cascade of stress hormones are released. They produce the classic physiological responses like elevated heart rate, quickened breathes, tensing muscles and sweating palms."
                    },
                    {
                        value: "Such stress response is also known as the fight-or-flight response. Today, we focus on an exercise that helps you recognises when stress is taking over you. We will also give you tips on how to unwind from the stressful moment and return to your calm and rational self."
                    }
                ]
            },
            {
                refId: "referrerIdTwo",
                title: "The Fight or Flight response is a physiological response triggered when we feel a strong emotion like fear, anxiety, anger or stress.",
                type: "text-details",
                shouldBeVisible: false,
                notes: [
                    {
                        value: "Evolutionarily, this response enables us to react quickly to dangerous situations."
                    },
                    {
                        value: "In modern days, our body can also overreact to stressors that are not life-threatening, such as traffic jams, work pressure, and family difficulties."
                    },
                    {
                        value: "As our body perceives stress, our nervous system functions like a gas pedal in a car, triggering the “fight or flight” response and releasing cortisol, often called “stress hormone”, into our bloodstream."
                    }
                ]
            },
            {
                refId: "referrerIdThree",
                title: "Have you had any of the following responses in recent events? Select all that applies.",
                type: "multiple-choice-selection",
                shouldBeVisible: false,
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
                ],
                response: {
                    choices: []
                },
            },
            {
                refId: "referrerIdFour",
                title: "What was the event that triggered these responses?",
                hint: "Threats to either physical or emotional wellness can trigger these responses, such as a racing car when crossing the street, or fear of embarrassment when giving a presentation.",
                shouldBeVisible: false,
                response: "",
                type: "text"
            },
            {
                refId: "referrerIdFive",
                title: "What did you do at the time of the event?",
                hint: "Maybe you told yourself calm down, nothing's going to happen. Maybe you went for a walk. What did you do and were they effective?",
                shouldBeVisible: false,
                response: "",
                type: "text"
            },
            {
                refId: "referrerIdSix",
                title: "When stress takes over, often it doesn’t help to tell ourselves “Calm down, nothing’s going to happen”. Reality is, something physiological is happening in our body. Instead, try to calm our body down with deep breaths and slow exhales.",
                shouldBeVisible: false,
                type: "text-details",
                notes: [
                    {
                        value: "Calming the breath will in turn help regulate our heartbeats and relieve muscle tension. When our body is more balanced, we can then deal with our thoughts and take a closer look at how and why we’re feeling that way."
                    },
                    {
                        value: "Next up, we have a relaxation technique that is developed to help you effectively manage and unwind from your stress.  "
                    }
                ]
            },
            {
                refId: "referrerIdSeven",
                title: "The following breathing relaxation technique is developed at Harvard Medical School by cardiologist Dr. Herbert Benson.",
                type: "text-details",
                shouldBeVisible: false,
                notes: [
                    {
                        value: "In deep breathing relaxations, exhaling is a crucial element. It is linked to our parasympathetic nervous system, which influences our body’s ability to relax and calm down."
                    },
                    {
                        value: "When our body is more balanced, we can then examine our thoughts and emotions more closely."
                    }
                ]
            },
            {
                refId: "refIdEight",
                type: "video",
                shouldBeVisible: false
            }
        ]
    })

    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        window.onpopstate = () => {
            console.log("BACK PRESSED")
        }
    })

    const handleSelection = (e, isSelected, position) => {
        try {
            const currentPosition = e.target.parentNode.parentNode.id
            console.log(e.target.parentNode.parentNode.id)
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
                case "multiple-choice-selection":
                    let allExercises = { ...exercises };
                    const multipleChoiceSelectionList = allExercises.data[currentPosition].choices.map((item, index) => {
                        if (index === position) {
                            if (item.isSelected === false) {
                                const newItem = {
                                    ...item,
                                    isSelected: isSelected,
                                };

                                allExercises.data[currentPosition].response.choices.push({ value: newItem.value })

                                return newItem;

                            } else {
                                const newItem = {
                                    ...item,
                                    isSelected: isSelected,
                                }

                                allExercises.data[currentPosition].response.choices.map((item, index) => {
                                    if (item.value === newItem.value) {
                                        if (index > -1) {
                                            allExercises.data[currentPosition].response.choices.splice(index, 1);
                                        }
                                    }
                                })

                                return newItem;
                            }
                        }

                        return item;
                    });
                    allExercises.data[currentPosition].choices = multipleChoiceSelectionList
                    setExercises(allExercises);
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
            navigate("/congratulations-unwind-from-stressful-moment", { state: { value: exercises.data } })
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

    return <div className="lg:pb-48 lg:pt-10 mx-auto px-4 lg:px-64 pt-6">
        <ScrollToTopOnMount />
        <h2 className="text-left border-b-2 border-blue-1100 text-blue-1100 font-bold font-heading text-xl lg:text-2xl">{exercises.title}</h2>
        {
            exercises.data.map((item, index) => {
                if (item.shouldBeVisible === true) {
                    return <div id={index} key={index} ref={setRef(item.refId)} className="h-screen lg:h-96 lg:mt-20">
                        <p className="text-lg text-blue-1100 font-heading font-semibold lg:ml-4 lg:mt-6">{item.title}</p>
                        <ul className="mt-2 lg:mt-4 flex flex-wrap">
                            {item.choices && item.choices.map((item, index) => {
                                if (item.isSelected) {
                                    return <p key={index} className="w-full lg:w-2/5 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer lg:cursor-pointer lg:select-none mx-6 m-2 px-4 py-2 border-2 border-blue-1100 bg-blue-1100 text-white rounded-full border-solid" onClick={(e) => handleSelection(e, false, index)}> {item.value}</p>
                                }
                                return <p key={index} className="w-full lg:w-2/5 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer lg:cursor-pointer lg:select-none mx-6 m-2 px-4 py-2 border-2 border-blue-1100 bg-white hover:bg-blue-1100 hover:text-white rounded-full border-solid" onClick={(e) => handleSelection(e, true, index)}> {item.value}</p>
                            })}
                        </ul>
                        <ul>
                            {item.notes && item.notes.map((item, index) => {
                                return <div className="thought">
                                    <p key={index} className="sb14 lg:select-none m-2 px-4 border-blue-1100 text-blue-1100 rounded-lg font-body"> {item.value}</p>
                                </div>
                            })}
                        </ul>
                        {item.hint && <div className="w-full p-2">
                            <p className='font-body text-md text-blue-1100 p-2 bg-white bg-opacity-50 rounded-lg'>{item.hint}</p>
                            <textarea rows="3" className="w-full h-20 rounded-lg mt-6 p-2 text-blue-1100 bg-gray-100 border-blue-1100 border-2 outline-none" type="text" name="response" value={item.response} placeholder={exercises.placeholder} onChange={(e) => handleSelection(e, true, index)} />
                        </div>}
                        {item.type === "video" && <ReactPlayer width="100%" className="mx-auto mt-10 lg:mt-20"
                            url="https://vimeo.com/668699791"
                        />}
                        <button className="lg:ml-4 lg:mt-6 bg-blue-1100 hover:bg-blue-700 px-4 py-2 text-white rounded-lg flex text-center" onClick={(e) => handleClick(e, index + 1)} >Next <FaCheck className="my-auto ml-2 pointer-events-none" /></button>

                    </div>
                }
            })
        }
    </div>
}

export default UnwindFromStressfulMoment;
