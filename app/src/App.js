
import { Routes, Route, Link } from "react-router-dom";
import UserBackgroundInfo from "./components/backgroundinfo/index_new";
import CantrilLadder from "./components/cantrilladder";
import CantrilLadderResult from "./components/cantrilladder/result";
import Welcome from "./components/welcome";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import FindYourselfAtYourBest from "./components/exercises/long/findyourselfatyourbest/index";
import QuietDownNegativeThoughts from "./components/exercises/long/quietdownnegativethoughts";
import UnderstandFeelingsAndEmotions from "./components/exercises/long/understandfeelingsandemotions";
import UnwindFromStressfulMoment from "./components/exercises/long/unwindfromstressfulmoment";
import FindOutYourMotivations from "./components/exercises/long/findoutyourmotivations";
import Congratulations from "./components/congratulations";
import WhatAreYouWorriedFor from "./components/exercises/short/whatareyouworriedfor";
import RealityCheck from "./components/exercises/short/realitycheck";
import ReconstructThoughts from "./components/exercises/short/reconstructthoughts";
import ThingsAboutMe from "./components/exercises/short/thingsaboutme";
import WhatTriggersYourStress from "./components/exercises/short/whattriggersyourstress";
import SelectExercises from "./components/welcome/select";
import CongratulationsRealityCheck from "./components/exercises/short/realitycheck/congratulations";
import CongratulationsSelfEsteem from "./components/exercises/short/thingsaboutme/congratulations";

const firebaseConfig = {
  apiKey: "AIzaSyClDDnFfPSVzOJszY6awn-WOrq3PJNEYMc",
  authDomain: "littlebreak---dev.firebaseapp.com",
  projectId: "littlebreak---dev",
  storageBucket: "littlebreak---dev.appspot.com",
  messagingSenderId: "318559541091",
  appId: "1:318559541091:web:f08fad41344cf2682fa556",
  measurementId: "${config.measurementId}"
};

function App() {

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  return (
    <div className="bg-blue-1000 w-screen h-screen">
      <header>

      </header>
      <div className="bg-blue-1000 ">
        <Routes>
          {/* <Route path="/" element={< UserBackgroundInfo />} /> */}
          <Route exact path="cantril-self-anchoring-striving-scale" element={<CantrilLadder />} />
          <Route exact path="cantril-self-anchoring-result" element={< CantrilLadderResult />} />

          <Route exact path="/" element={<Welcome />} />
          <Route exact path="select-exercises" element={<SelectExercises />} />

          {/* LONG Exercises */}
          <Route exact path="find-yourself-at-your-best" element={<FindYourselfAtYourBest />} />
          <Route exact path="understand-your-feeling-and-emotions" element={<UnderstandFeelingsAndEmotions />} />
          <Route exact path="unwind-from-a-stressful-moment" element={<UnwindFromStressfulMoment />} />
          <Route exact path="quiet-down-the-negative-thoughts" element={<QuietDownNegativeThoughts />} />
          <Route exact path="find-out-your-motivations" element={<FindOutYourMotivations />} />

          {/* SHORT Exercises */}
          <Route exact path="what-are-you-worried-for" element={<WhatAreYouWorriedFor />} />
          <Route exact path="give-yourself-a-reality-check" element={<RealityCheck />} />
          <Route exact path="congratulations-reality-check" element={<CongratulationsRealityCheck />} />

          <Route exact path="reconstruct-thoughts" element={<ReconstructThoughts />} />
          <Route exact path="improve-self-esteem" element={<ThingsAboutMe />} />
          <Route exact path="congratulations-improve-self-esteem" element={<CongratulationsSelfEsteem />} />

          <Route exact path="what-triggers-your-stress" element={<WhatTriggersYourStress />} />

          <Route exact path="congratulations" element={<Congratulations />} />
        </Routes>
      </div>
      <footer>

      </footer>
    </ div>
  );
}

export default App;
