import React from 'react'
import { FaStar } from 'react-icons/fa';
import { useNavigate, useLocation } from "react-router-dom";
import ScrollToTopOnMount from '../../../../utils/ScrollToTop';

const CongratulationsWhatAreYouWorriedFor = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const takeAnotherExercise = () => {
        navigate("/select-exercises")
    }

    return <div className='grid grid-cols-0 lg:grid-rows-0 lg:grid-cols-2'>
        {/* Left Part */}
        <ScrollToTopOnMount />
        <div className='bg-cover h-screen ' style={{ backgroundImage: `url(https://littlebreak.io/wp-content/uploads/2022/01/give-yourself-a-reality-check-congratulations-scaled.jpeg)` }} >
            <div className='m-8 lg:m-12'>
                <div className='flex justify-center'><FaStar size={20} className="text-orange-600 m-4" /></div>
                <h1 className='text-center text-4xl font-heading text-blue-1100'>Congratulations</h1>
                <div className='bg-white rounded-lg p-10 mt-20 bg-opacity-50'>
                    <p className='font-heading text-blue-1100 font-regular text-md my-2'>During this 3-min little break, you have taken the first step towards understanding your worries and developing a healthier way of thinking about your worries.</p>
                    <p className='font-heading text-blue-1100 font-regular text-md my-2'>Practice when you worry about something that might not be real.</p>
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
                <p className='font-body text-blue-1100 font-regular text-md my-2'>In this "Understanding your worries" short exercise, you reflected on what are you most worried about.</p>

                {location.state.value.map((value, index) => {
                    if (index === 0) {
                        return value.response.choices.map((item, subIndex) =>
                            <div key={subIndex} className='bg-white px-4 rounded-lg my-2 flex items-center w-full lg:w-1/3'>
                                <FaStar size={20} className="text-orange-600 m-4 lg:w-1/12 inline" />
                                <p className='font-body text-blue-1100 font-regular text-md my-2 inline-block'>{item.value}</p>
                            </div>
                        )
                    }
                })}

                <p className='font-body text-blue-1100 font-regular text-md mt-10'>You also understood that in reality, most worries don't come true.</p>
                <p className='font-body text-blue-1100 font-regular text-md my-2'>Focusing on what Will happen instead of what Could happen, you reflected that ...</p>

                {
                    location.state.value.map((value, index) => {

                        if (index === 1) {
                            return <div className='bg-white px-4 rounded-lg lg:w-4/5 flex items-center my-2'>
                                <FaStar size={20} className="text-orange-600 m-4 lg:w-1/12" />
                                <p className='font-body text-blue-1100 font-regular text-md my-2'>{value.response}</p>
                            </div>
                        }
                    })
                }


            </div>
        </div>
        {/* End Right Part */}
    </div>
}

export default CongratulationsWhatAreYouWorriedFor;