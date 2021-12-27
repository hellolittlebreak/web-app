import React, { useState } from 'react';
import { AnimatedList } from 'react-animated-list';
import { FaArrowRight } from 'react-icons/fa'

function IdentifyEmotions() {
    const [identifyEmotionsExerciseList, setIdentifyEmotionsExerciseList] = useState([
        {
            id: 1, title: 'What feelings am I aware of having today?', page: 1, type: 'single-select', answers: [
                { position: 0, name: "Happy", selected: false }, { position: 1, name: "Sad", selected: false }, { position: 2, name: "Anxious", selected: false }, { position: 3, name: "Angry", selected: false }, { position: 4, name: "Content", selected: false }, { position: 5, name: "Blessed", selected: false }, { position: 6, name: "Stressed", selected: false }, { position: 7, name: "Worried", selected: false }, { position: 8, name: "Bored", selected: false },
            ]
        },
        { id: 2, title: 'When and what triggered you to feel ', page: 2, type: 'input' },
        { id: 2, title: 'Why did it make you feel ', subTitle: 'Don\'t be afraid to ask yourself “why” a few times. It could help you understand why you are feeling as you do, and even bring you to a solution. We often resist our own probing. Click on “i” to see an example.)', page: 3, type: 'input' },
    ]);

    const [previousPosition, setPreviousPosition] = useState(-1)
    const [shouldShowContinue, setShouldShowContinue] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [currentMood, setCurrentMood] = useState("")

    const handleChange = (e, index, isSelected) => {
        try {
            let items = [...identifyEmotionsExerciseList];
            const newList = items[currentPage].answers.map((item) => {
                if (item.position === index) {
                    const updatedItem = {
                        ...item,
                        selected: isSelected,
                    };
                    setShouldShowContinue(true)

                    return updatedItem;
                } else if (item.position === previousPosition) {
                    const previousItem = {
                        ...item,
                        selected: !isSelected,
                    };

                    return previousItem;
                }

                return item;
            });
            items[currentPage].answers = newList
            setIdentifyEmotionsExerciseList(items);
            setPreviousPosition(index)
            setCurrentMood(items[currentPage].answers[index].name)
        } catch (e) {
            console.log(e)
        }
    }

    return <div>
        <div className="p-2 border-b-2 ">
            <h2 className="text-left text-blue-1100 font-bold font-heading text-md lg:text-xl">Identify emotions</h2>
            <p className="text-sm text-blue-1100 font-normal font-heading lg:pt-2">Learning to identify our emotions help us develop a better understanding of ourselves, build more meaningful relationships and make better decisions.</p>
        </div>
        {(() => {
            switch (currentPage) {
                case 0:
                    return (<div className="p-2 lg:mt-2">
                        <p className="text-md text-blue-1100 font-heading font-semibold">{identifyEmotionsExerciseList[currentPage].title}</p>
                        <ul className="mt-2 lg:mt-4 flex flex-wrap">
                            <AnimatedList animation="grow" initialAnimationDuration="4000">
                                {identifyEmotionsExerciseList[currentPage].answers.map((answer, index) => {
                                    if (answer.selected) {
                                        return <p key={index} className="lg:cursor-pointer select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 bg-blue-1100 text-white rounded-full border-solid" onClick={(e) => handleChange(e, answer.position, false)}> {answer.name}</p>
                                    }
                                    return <p key={index} className="lg:cursor-pointer select-none m-2 px-4 py-2 inline-block border-2 border-blue-1100 hover:bg-blue-1100 hover:text-white rounded-full border-solid" onClick={(e) => handleChange(e, answer.position, true)}> {answer.name}</p>
                                })}
                                {shouldShowContinue ? <div className="text-let px-2 lg:px-4 mt-2 lg:mt-6 cursor-pointer">
                                    {/* <Link component={IdentifyEmotions} to="/identify-emotions/"> */}
                                    <p onClick={() => {
                                        setCurrentPage(currentPage + 1)
                                    }} className="inline-flex text-blue-1100 hover:text-blue-500 font-heading text-md align-middle">Next <FaArrowRight className="ml-2 my-auto" /></p>
                                    {/* </Link> */}
                                </div> : <></>}
                            </AnimatedList>
                        </ul>
                    </div>)
                case 1:
                    return (<div className="p-2 lg:mt-2">
                        <p className="text-md text-blue-1100 font-heading font-semibold">{identifyEmotionsExerciseList[currentPage].title} {currentMood}?</p>
                    </div>)

                default:
                    break;
            }
        })()
        }

    </div >
}

export default IdentifyEmotions;