import React, { useEffect } from 'react'
import { FaStar } from 'react-icons/fa';
import { useNavigate, useLocation } from "react-router-dom";
import ScrollToTopOnMount from '../../../../utils/ScrollToTop';
import { getAnalytics, logEvent } from "firebase/analytics";
import { convertComponentToPdf } from "../../../../utils/ExportToPdf"

const CongratulationsWhatTriggersYourStress = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const takeAnotherExercise = () => {
        navigate("/select-exercises")
    }

    const analytics = getAnalytics()

    useEffect(() => {
        logEvent(analytics, 'screen_view', {
            firebase_screen: "CongratulationsWhatAreYouWorriedFor"
        });
    }, [analytics])

    return <div className='flex pb-32'>
        {/* Left Part */}
        <ScrollToTopOnMount />
        <div id="divIdToPrint">
            <div className='mx-auto w-full lg:w-1/2 ' >
                <div className='m-8'>
                    <div className='flex justify-center'>
                        <FaStar size={20} className="text-orange-600 m-4" />
                    </div>
                    <h1 className='text-center text-4xl font-heading text-blue-1100'>Congratulations</h1>
                    <div className='bg-white rounded-lg p-10 mt-10 bg-opacity-50'>
                        <p className='font-heading text-blue-1100 font-regular text-md my-2'>During this 3-min little break, you have taken the time to understand what are the stress triggers in your life, and what you can do to reduce your exposure to them. </p>
                        <p className='font-heading text-blue-1100 font-regular text-md my-2'>Keep this on your mind as you move through the day. Explore different ways to avoid the stress triggers and you will be moving closer towards a stress-free life. </p>
                    </div>
                </div>
                <p className="font-heading font-bold text-blue-1100 mx-8 my-8">In this "Dealing with your stress" short exercise, you reflected on what triggers your stress and how you can reduce your exposure:</p>
                {location.state.value.map((item, index) => {
                    return <div key={index} className="mx-8 my-4 flex items-center">
                        <FaStar size={15} className="text-orange-600 mx-4" />
                        {item.response.choices ? <p className="text-blue-1100 font-body ">{item.title} {item.response.choices.map((choice, index) => {
                            return <span key={index} style={{ fontStyle: 'italic' }} className="font-semibold">{choice.value} </span>
                        })}</p> :
                            <p className="text-blue-1100 font-body ">{item.title}<span style={{ fontStyle: 'italic' }} className="font-semibold">{item.response}</span></p>}

                    </div>
                })
                }
            </div>
            <div className="flex flex-col lg:flex-row justify-evenly w-full items-center mt-16">
                <p className="w-4/5 lg:w-full lg:cursor-pointer rounded-full mx-2 my-2 text-center py-4 hover:bg-blue-800 hover:text-white text-blue-1100 font-body text-md lg:text-base border-default" onClick={() => convertComponentToPdf(document.getElementById('divIdToPrint'))}>Download the result</p>
                <p className="w-4/5 lg:w-full lg:cursor-pointer rounded-full mx-2 my-2 text-center py-4  bg-blue-1100 hover:bg-blue-800 text-white font-body text-md lg:text-base" onClick={() => takeAnotherExercise()}>Take another exercise</p>
            </div>
        </div>
        {/* End Left Part */}

    </div>
}

export default CongratulationsWhatTriggersYourStress;
