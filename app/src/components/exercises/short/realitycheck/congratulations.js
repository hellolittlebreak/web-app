import React from 'react'
import { FaStar } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const CongratulationsRealityCheck = () => {
    const navigate = useNavigate();

    const takeAnotherExercise = () => {
        navigate("/select-exercises")
    }

    return <div className='grid grid-cols-0 lg:grid-rows-0 lg:grid-cols-2'>
        {/* Left Part */}
        <div className='bg-cover h-screen ' style={{ backgroundImage: `url(https://littlebreak.io/wp-content/uploads/2022/01/give-yourself-a-reality-check-congratulations-scaled.jpeg)` }} >
            <div className='m-8 lg:m-12'>
                <div className='flex justify-center'><FaStar size={20} className="text-orange-600 m-4" /></div>
                <h1 className='text-center text-4xl font-heading text-blue-1100'>Congratulations</h1>
                <div className='bg-white rounded-lg p-10 mt-20 bg-opacity-50'>
                    <p className='font-heading text-blue-1100 font-regular text-md my-2'>During this 3-min little break, you have taken the first step towards differentiating thoughts and opinions from facts.</p>
                    <p className='font-heading text-blue-1100 font-regular text-md my-2'>It is a very important mental-fitness training.</p>
                    <p className='font-heading text-blue-1100 font-regular text-md my-2'>And an often overlooked critical skill.</p>
                    <p className='font-heading text-blue-1100 font-regular text-md my-2'>Practice this exercise a few times to train your mind to give yourself reality checks</p>
                </div>
            </div>
            <div className="flex flex-col justify-center w-full items-center">
                <p className="lg:inline-block lg:cursor-pointer rounded-full px-4 lg:px-20 text-center py-4 mt-4 bg-blue-1100 hover:bg-blue-800 text-white font-body text-md lg:text-base" onClick={() => takeAnotherExercise()}>Take another exercise</p>
            </div>
        </div>
        {/* End Left Part */}
        {/* Right Part */}
        <div className='bg-blue-1000'>
            <div className='m-8 lg:m-12'>
                <p className='font-body text-blue-1100 font-regular text-md my-2'>In this "Reality Check" short exercise, you trained a critical skill.</p>
                <p className='font-body text-blue-1100 font-regular text-md my-2'>You can now differentiate thoughts and opinions from facts.</p>
                <p className='font-body text-blue-1100 font-regular text-md my-2'>When you move on to your day do not forget to apply what you learned from this exercise to your daily thoughts.</p>
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