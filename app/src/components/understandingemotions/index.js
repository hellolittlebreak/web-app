import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import IdentifyEmotions from './exercises/identifyemotions';
import { FaArrowRight } from 'react-icons/fa'
import { AnimatedList } from 'react-animated-list';

function UnderstandingEmotions(props) {
  return (
    <div className="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2">
      {/* Left Side */}
      <div className="w-full border-2 border-gray-200 rounded-lg h-144 relative">
        <h2 className="lg:ml-4 lg:mr-16 lg:mt-4 border-b-2 text-left text-blue-1100 font-semibold font-heading text-md lg:text-xl">Understanding emotions</h2>
        <AnimatedList animation="grow" initialAnimationDuration="5000">
          {understandingEmotionsList.map(item =>
            <div className="bg-blue-1000 p-4 lg:ml-2 lg:mr-6 rounded-full lg:my-4 inline-block">
              <p className="text-blue-1100 font-body text-sm">{item.title}</p>
            </div>)}
        </AnimatedList>
        <div className="bg-gray-200 w-full h-20 absolute bottom-0 rounded-b-lg">
          <div className="px-2 lg:px-4 mt-2 lg:mt-6 cursor-pointer text-right">
            <Link component={IdentifyEmotions} to="/identify-emotions/">
              <p className="inline-flex text-blue-1100 hover:text-blue-500 font-heading text-md align-middle">Continue <FaArrowRight className="ml-2 my-auto" /></p>
            </Link>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="rounded-lg border-2 border-gray-200">
        Hello Right Side
      </div>
    </div>

  );
}

var understandingEmotionsList = [
  { id: 1, title: "How many emotions have you felt today?" },
  { id: 2, title: "Is your heart beating faster for the person who’ll be waiting for you at the restaurant?" },
  { id: 3, title: "Are you feeling butterflies in your stomach at the thought of tomorrow’s deadline?" }
]

export default UnderstandingEmotions;