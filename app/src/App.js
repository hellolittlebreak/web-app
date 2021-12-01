
import { Routes, Route, Link } from "react-router-dom";
import UserBackgroundInfo from "./components/backgroundinfo";
import IdentifyEmotions from "./components/understandingemotions/exercises/identifyemotions";
import UnderstandingEmotions from "./components/understandingemotions/index"

function App() {
  return (
    <div className="bg-gray-100 w-screen h-screen">
      <header>

      </header>
      <div className="container mx-auto px-4 lg:px-40 pt-6 lg:pt-12 lg:pb-12">
        <Routes>
          <Route path="/" element={< UserBackgroundInfo />} />
          <Route exact path="understanding-emotions" element={<UnderstandingEmotions />} />
          <Route exact path="identify-emotions" element={<IdentifyEmotions />} />
        </Routes>
      </div>
      <footer>

      </footer>
    </ div>
  );
}

export default App;
