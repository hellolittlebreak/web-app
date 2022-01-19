
import { Routes, Route } from "react-router-dom";
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
import ReconstructThoughts from "./components/exercises/long/reconstructthoughts";
import ThingsAboutMe from "./components/exercises/short/thingsaboutme";
import WhatTriggersYourStress from "./components/exercises/short/whattriggersyourstress";
import SelectExercises from "./components/welcome/select";
import CongratulationsRealityCheck from "./components/exercises/short/realitycheck/congratulations";
import CongratulationsSelfEsteem from "./components/exercises/short/thingsaboutme/congratulations";
import CongratulationsWhatAreYouWorriedFor from "./components/exercises/short/whatareyouworriedfor/congratulations";
import ChallengeNegativeThoughts from "./components/exercises/short/challengenegativethoughts";
import Gratitude from "./components/exercises/short/gratitude";
import CongratulationsWhatTriggersYourStress from "./components/exercises/short/whattriggersyourstress/congratulations";
import CongratulationsChallengeNegativeThoughts from "./components/exercises/short/challengenegativethoughts/congratulations";
import CongratulationsGratitude from "./components/exercises/short/gratitude/congratulations";
import CongratulationsDiscoverYourMotivations from "./components/exercises/long/findoutyourmotivations/congratulations";

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

          <Route exact path="discover-your-motivations" element={<FindOutYourMotivations />} />
          <Route exact path="congratulations-discover-your-motivations" element={<CongratulationsDiscoverYourMotivations />} />

          <Route exact path="reconstruct-thoughts" element={<ReconstructThoughts />} />

          {/* SHORT Exercises */}
          <Route exact path="what-are-you-worried-for" element={<WhatAreYouWorriedFor />} />
          <Route exact path="congratulations-what-are-you-worried-for" element={<CongratulationsWhatAreYouWorriedFor />} />

          <Route exact path="give-yourself-a-reality-check" element={<RealityCheck />} />
          <Route exact path="congratulations-reality-check" element={<CongratulationsRealityCheck />} />

          <Route exact path="improve-self-esteem" element={<ThingsAboutMe />} />
          <Route exact path="congratulations-improve-self-esteem" element={<CongratulationsSelfEsteem />} />

          <Route exact path="what-triggers-your-stress" element={<WhatTriggersYourStress />} />
          <Route exact path="congratulations-what-triggers-your-stress" element={<CongratulationsWhatTriggersYourStress />} />

          <Route exact path="challenge-negative-thoughts" element={<ChallengeNegativeThoughts />} />
          <Route exact path="congratulations-challenge-negative-thoughts" element={<CongratulationsChallengeNegativeThoughts />} />

          <Route exact path="gratitude" element={<Gratitude />} />
          <Route exact path="congratulations-gratitude" element={<CongratulationsGratitude />} />

          <Route exact path="congratulations" element={<Congratulations />} />
        </Routes>
      </div>
      <footer>

      </footer>
    </ div>
  );
}

export default App;
