import React, { useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/home";
import SEPractice from "./pages/se-practice";
import SubmitArticle from "./pages/submit-article";
import ModerationQueue from "./pages/moderation-queue";
import AnalystQueue from "./pages/analyst-queue";
import { createElement } from "react";
import { setup } from "goober";
import NavigationBar from "./components/navigation-bar";
import './style.css'

setup(createElement);

const App = () => {
  const [userType, setUserType] = useState("");


  return (
    <Router>
      <div>
        <NavigationBar changeUser={(e: string) => setUserType(e)} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home user={userType} />} />
            <Route path="/SEPractice" element={<SEPractice />} />
            <Route path="/SubmitArticle" element={<SubmitArticle />} />
            <Route path="/ModerationQueue" element={<ModerationQueue />}/>
            <Route path="/AnalystQueue" element={<AnalystQueue />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
