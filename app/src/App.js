
import { Routes, Route, Link } from "react-router-dom";
import UserBackgroundInfo from "./components/backgroundinfo/index_new";
import CantrilLadder from "./components/cantrilladder";
import CantrilLadderResult from "./components/cantrilladder/result";
import IdentifyEmotions from "./components/understandingemotions/exercises/identifyemotions";
import UnderstandingEmotions from "./components/understandingemotions/index"
import Welcome from "./components/welcome";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
    <div className="bg-white w-screen h-full">
      <header>

      </header>
      <div className="container mx-auto px-4 lg:px-40 pt-6 lg:pt-12 lg:pb-12">
        <Routes>
          <Route path="/" element={< UserBackgroundInfo />} />
          <Route exact path="understanding-emotions" element={<UnderstandingEmotions />} />
          <Route exact path="identify-emotions" element={<IdentifyEmotions />} />
          <Route exact path="cantril-self-anchoring-striving-scale" element={<CantrilLadder />} />
          <Route exact path="cantril-self-anchoring-result" element={< CantrilLadderResult />} />
          <Route exact path="select-your-daily-little-break" element={<Welcome />} />
        </Routes>
      </div>
      <footer>

      </footer>
    </ div>
  );
}

export default App;
