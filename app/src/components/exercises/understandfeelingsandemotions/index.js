import React, { useState } from "react";

const UnderstandFeelingsAndEmotions = () => {

    const [exercises, setExercises] = useState({
        title: "Understanding emotions",
        data: [
            {
                refId: "referrerIdOne",
                title: "",
                type: "text-details",
                shouldBeVisible: true,
                notes: [
                    {
                        value: "How many emotions have you felt today?",
                    },
                    {
                        value: "Is your heart beating faster for the person who'll be waiting for you at the restaurant?"
                    },
                    {
                        value: "Or are you feeling butterflies in your stomach at the thought of tomorrow's deadline?"
                    }
                ]
            },
            {
                refId: "referrerIdTwo",
                title: "",
                type: "text-details",
                shouldBeVisible: false,
                notes: [
                    {
                        value: "Recognising our emotions can be a rather peculiar task.",
                    },
                    {
                        value: "Some emotions are pure as the clearest sky or the darkest night."
                    },
                    {
                        value: "Some emotions are a lot more complex and difficult to grasp."
                    }
                ]
            },
            {
                refId: "referrerIdThree",
                title: "",
                type: "text-details",
                shouldBeVisible: false,
                notes: [
                    {
                        value: "We were taught to regulate our emotions from an early age.",
                    },
                    {
                        value: "Few of us are taught to understand and recognise our emotions properly."
                    },
                    {
                        value: "Emotions help us survive and motivate us to do things."
                    }
                ]
            },
            {
                refId: "referrerIdFour",
                title: "",
                type: "text-details",
                shouldBeVisible: false,
                notes: [
                    {
                        value: "Emotions guide our decisions, help us to connect with others and keep us safe.",
                    },
                    {
                        value: "Emotional intelligence, or your ability to understand and manage emotions, has been shown to play an important role in decision-making."
                    },
                    {
                        value: "It is positively correlated with higher life satisfaction, self-esteem and lower levels of insecurity or depression. It is also negatively correlated with poor health choices and behavior."
                    }
                ]
            },
            {
                refId: "referrerIdFive",
                title: "Learning to identify our emotions help us develop a better understanding of ourselves, build more meaningful relationships and make better decisions.",
                subTitle: "Today, we will start by taking an emotional temperature:",
                question: "What feelings am I aware of having today? UP TO 3 CHOICES",
                type: "max-three-selection",
                shouldBeVisible: false,
                choices: [
                    { name: "Happy", selected: false },
                    { name: "Sad", selected: false },
                    { name: "Angry", selected: false },
                    { name: "Energetic", selected: false },
                    { name: "Tired", selected: false },
                    { name: "Stressed", selected: false },
                    { name: "Worried", selected: false },
                    { name: "Bored", selected: false }
                ],
                response: {
                    choices: []
                },
                error: "You need to select max 3 items"
            },
        ]
    })

    return <div>
        <h2 className="text-left border-b-2 border-blue-1100 text-blue-1100 font-bold font-heading text-md lg:text-xl">{exercises.title}</h2>
        <div className="bg-gray-300 rounded-lg m-4 p-4 text-center">
            <p>sonder</p>
            <p>son-der noun.</p>
            <p>The realization that each random passerby is living a life as vivid and complex as your own - populated with their own ambitions, friends, routines, worries and inherited craziness - an epic story that continues invisibly around you like an anthill sprawling deep underground, with elaborate passageways to thousands of other lives that you'll never know existed, in which you might appear only once, as an extra sipping coffee in the background, as a blur of traffic passing on the highway, as a lighted window at dusk.</p>
            <p>Extract from: The Dictionary of Obscure Sorrows [1].</p>
        </div>
    </div>
}

export default UnderstandFeelingsAndEmotions;