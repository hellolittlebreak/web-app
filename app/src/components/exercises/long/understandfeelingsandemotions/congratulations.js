import React, { useEffect } from 'react'
import { FaStar } from 'react-icons/fa';
import { useNavigate, useLocation } from "react-router-dom";
import ScrollToTopOnMount from '../../../../utils/ScrollToTop';
import { getAnalytics, logEvent } from "firebase/analytics";
import { convertComponentToPdf } from "../../../../utils/ExportToPdf"

const CongratulationsUnderstandFeelingsAndEmotions = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const takeAnotherExercise = () => {
        navigate("/select-exercises")
    }

    const analytics = getAnalytics()

    useEffect(() => {
        logEvent(analytics, 'screen_view', {
            firebase_screen: "CongratulationsUnderstandFeelingsAndEmotions"
        });
    }, [analytics])

    return <div className='mx-auto w-full lg:w-1/2 py-10' >
        <ScrollToTopOnMount />
        <div className='m-8'>
            <div className='flex justify-center'>
                <FaStar size={20} className="text-orange-600 m-4" />
            </div>
            <h1 className='text-center text-4xl font-heading text-blue-1100'>Congratulations</h1>
            <div className='bg-white rounded-lg p-10 mt-10 bg-opacity-50'>
                <p className='font-heading text-blue-1100 font-regular text-md my-2'>During this 7-min little break, you have taken the time to recognise your feelings and emotions.</p>
                <p className='font-heading text-blue-1100 font-regular text-md my-2'>You also went deeper to uncover what are the triggers of your emotions and why did it trigger you to feel that way.</p>
                <p className='font-heading text-blue-1100 font-regular text-md my-2'>Understanding our emotions is a first step towards building up greater emotional intelligence. Our ability to understand and manage emotions plays an important role in decision-making in our life, and overall contributes to higher life satisfaction.</p>
            </div>
        </div>
        <p className="font-heading font-bold text-blue-1100 mx-8 my-8">In this "Understand your feelings and emotions" long exercise, you reflected on the following:</p>
        {location.state.value.map((item, index) => {
            return <div key={index} className="mx-8 my-4 flex items-center">
                <table className='table'>
                    <tbody>
                        {(item.type === "text" || item.type === "max-three-selection" || item.type === "single-selection") &&
                            <tr>
                                <td><FaStar size={15} className="w-10 text-orange-600" /></td>
                                {item.response.choices ? <td><p className="text-blue-1100 font-body ">{item.question} {item.response.choices.map((choice, index) => {
                                    if (index === item.response.choices.length - 1) {
                                        return <span key={index} style={{ fontStyle: 'italic' }} className="font-semibold">{choice.value} </span>
                                    } else {
                                        return <span key={index} style={{ fontStyle: 'italic' }} className="font-semibold">{choice.value}, </span>
                                    }
                                })}</p></td> :
                                    (item.newTitle ? <td><p className="text-blue-1100 ">{item.question} <span className='italic lowercase'>{item.newTitle} </span> ?<span style={{ fontStyle: 'italic' }} className="font-semibold"> {item.response}</span></p></td> : <td><p className="text-blue-1100 font-body ">{item.question} <span style={{ fontStyle: 'italic' }} className="font-semibold">{item.response}</span></p></td>)}
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        })}
        <div className="flex flex-col justify-center w-full items-center mt-16">
            <p className="lg:inline-block lg:cursor-pointer rounded-full px-4 lg:px-20 text-center py-4  bg-blue-1100 hover:bg-blue-800 text-white font-body text-md lg:text-base" onClick={() => takeAnotherExercise()}>Take another exercise</p>
        </div>
    </div>
}

export default CongratulationsUnderstandFeelingsAndEmotions;
