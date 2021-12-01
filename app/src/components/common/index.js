import React from 'react';

const SectionTitle = (props) => {
    return <div className="">
        <h2 className="w-full border-b-2 text-left text-blue-1100 font-semibold font-heading text-md lg:text-xl">{props.title}</h2>
    </div>
}

const InformativeBubble = (props) => {
    return <div className="bg-blue-1000 p-4 lg:ml-2 lg:mr-6 rounded-full lg:my-4 inline-block">
        <p className="text-blue-1100 font-body text-sm">{props.title}</p>
    </div>
}

const ResponseBubbleDefault = (props) => {
    return <div>
        <div className="bg-blue-1000 p-4 lg:ml-2 lg:mr-6 rounded-full lg:my-4 inline-block">
            <p className="text-blue-1100 font-body text-sm">{props.response}</p>
        </div>
    </div>
}

export { SectionTitle, InformativeBubble, ResponseBubbleDefault };