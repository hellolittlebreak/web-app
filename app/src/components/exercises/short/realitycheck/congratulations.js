import React, { useEffect } from 'react'
import { FaStar } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import ScrollToTopOnMount from '../../../../utils/ScrollToTop';
import { getAnalytics, logEvent } from "firebase/analytics";
import { convertComponentToPdf } from "../../../../utils/ExportToPdf"

const CongratulationsRealityCheck = () => {
    const navigate = useNavigate();

    const takeAnotherExercise = () => {
        navigate("/select-exercises")
    }

    const analytics = getAnalytics()

    useEffect(() => {
        logEvent(analytics, 'screen_view', {
            firebase_screen: "CongratulationsRealityCheck"
        });
    }, [analytics])

    return <div className='grid grid-cols-0 lg:grid-rows-0 lg:grid-cols-2'>
        {/* Left Part */}
        <ScrollToTopOnMount />
        <div className='bg-cover h-full lg:h-screen' style={{ backgroundImage: `url(https://littlebreak.io/wp-content/uploads/2022/01/give-yourself-a-reality-check-congratulations-scaled.jpeg)` }} >
            <div className='m-8 lg:m-12'>
                <div className='flex justify-center'><FaStar size={20} className="text-orange-600 m-4" /></div>
                <h1 className='text-center text-4xl font-heading text-blue-1100'>Congratulations</h1>
                <div className='bg-white rounded-lg p-10 mt-20 bg-opacity-50'>
                    <p className='font-heading text-blue-1100 font-regular text-md my-2'>During this 3-min little break, you have taken the first step towards differentiating thoughts and opinions from facts.</p>
                    <p className='font-heading text-blue-1100 font-regular text-md my-2'>It is a very important mental-fitness training, and an often overlooked critical skill.</p>
                    <p className='font-heading text-blue-1100 font-regular text-md my-2'>Practice this exercise a few times to train your mind to give yourself reality checks.</p>
                </div>
            </div>
            <div className="flex flex-col justify-evenly w-full items-center mt-10">
                <p className="w-4/5 lg:cursor-pointer rounded-full mx-2 my-2 text-center py-4 hover:bg-blue-800 hover:text-white text-blue-1100 font-body text-md lg:text-base border-default" onClick={() => convertComponentToPdf(document.getElementById('divIdToPrint'))}>Download the result</p>
                <p className="w-4/5 lg:cursor-pointer rounded-full mx-2 my-2 text-center py-4  bg-blue-1100 hover:bg-blue-800 text-white font-body text-md lg:text-base" onClick={() => takeAnotherExercise()}>Take another exercise</p>
            </div>
        </div>
        {/* End Left Part */}
        {/* Right Part */}
        <div id="divIdToPrint" className='bg-blue-1000'>
            <div className='m-8 lg:m-12'>
                <p className='font-body text-blue-1100 font-regular text-md my-2'>In this "Reality Check" short exercise, you trained a critical skill - differentiate thoughts and opinions from facts.</p>
                <p className='font-body text-blue-1100 font-regular text-md my-2'>When you move on to your day, do not forget to apply what you learned from this exercise to your daily thoughts.</p>
                <p className='font-body text-blue-1100 font-regular text-md my-2'>When a thought occurs, check-in with yourself:</p>
                <p className='font-body text-blue-1100 font-bold text-md my-8'>Is this my opinion or a fact?</p>
                <p className='font-body text-blue-1100 font-regular text-md my-8'>Remember:</p>
                <div className='bg-white px-4 rounded-lg lg:w-4/5 flex items-center justify-between my-2'>
                    <FaStar size={20} className="text-orange-600 m-4 lg:w-1/12" />
                    <p className='font-body text-blue-1100 font-regular text-md my-2'>FACT has evidence to support its truth, it is driven by rational thought.</p>
                </div>

                <div className='bg-white px-4 rounded-lg lg:w-4/5 flex justify-between items-center my-2'>
                    <FaStar size={20} className="text-orange-600 m-4 lg:w-1/12" />
                    <p className='font-body text-blue-1100 font-regular text-md my-2'>OPINION is based on a personal view. It is driven by emotions and often arguable.</p>
                </div>
            </div>
        </div>
        {/* End Right Part */}
    </div>
}

export default CongratulationsRealityCheck;
