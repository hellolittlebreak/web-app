
import { Routes, Route, Link } from "react-router-dom";
import UserBackgroundInfo from "./components/backgroundinfo/index_new";
import CantrilLadder from "./components/cantrilladder";
import CantrilLadderResult from "./components/cantrilladder/result";
import IdentifyEmotions from "./components/understandingemotions";
import UnderstandingEmotions from "./components/understandingemotions/index"
import Welcome from "./components/welcome";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import FindYourselfAtYourBest from "./components/exercises/findyourselfatyourbest/index";
import QuietDownNegativeThoughts from "./components/exercises/quietdownnegativethoughts";
import UnderstandFeelingsAndEmotions from "./components/exercises/understandfeelingsandemotions";
import UnwindFromStressfulMoment from "./components/exercises/unwindfromstressfulmoment";
import FindOutYourMotivations from "./components/exercises/findoutyourmotivations";

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
      <div className="bg-blue-1000 mx-auto px-4 lg:px-64 pt-6">
        <Routes>
          <Route path="/" element={< UserBackgroundInfo />} />
          <Route exact path="understanding-emotions" element={<UnderstandingEmotions />} />
          <Route exact path="identify-emotions" element={<IdentifyEmotions />} />
          <Route exact path="cantril-self-anchoring-striving-scale" element={<CantrilLadder />} />
          <Route exact path="cantril-self-anchoring-result" element={< CantrilLadderResult />} />
          <Route exact path="select-your-daily-little-break" element={<Welcome />} />
          <Route exact path="find-yourself-at-your-best" element={<FindYourselfAtYourBest />} />
          <Route exact path="understand-your-feeling-and-emotions" element={<IdentifyEmotions />} />
          <Route exact path="unwind-from-a-stressful-moment" element={<UnwindFromStressfulMoment />} />
          <Route exact path="quiet-down-the-negative-thoughts" element={<QuietDownNegativeThoughts />} />
          <Route exact path="find-out-your-motivations" element={<FindOutYourMotivations />} />
        </Routes>
      </div>
      <footer>

      </footer>
    </ div>
  );
}

export default App;
