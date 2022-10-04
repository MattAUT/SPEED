import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/home";
import SEPractice from "./pages/se-practice";
import SubmitArticle from "./pages/submit-article";
import ModerationQueue from "./pages/moderation-queue";
import { createElement } from "react";
import { setup } from "goober";
import NavigationBar from "./components/navigation-bar";
import './style.css'

setup(createElement);

const App = () => {
  return (
    <Router>
      <div>
        <NavigationBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/SEPractice" element={<SEPractice />} />
            <Route path="/SubmitArticle" element={<SubmitArticle />} />
            <Route path="/ModerationQueue" element={<ModerationQueue />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
