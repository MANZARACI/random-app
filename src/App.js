import "./App.css";

import React, { Fragment, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ParticleBackground from "./components/ParticleBackground";
import Home from "./components/Home";
import HeadsOrTails from "./components/HeadsOrTails";
import Dice from "./components/Dice";
import RandomPicker from "./components/RandomPicker";

function App() {
  const location = useLocation();
  const [animate, setAnimate] = useState(true);

  const animateHandler = () => {
    setAnimate((prev) => !prev);
  };

  return (
    <Fragment>
      <button onClick={animateHandler}>Toggle Animated Background</button>
      {animate && <ParticleBackground />}
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.key}>
          <Route path="/random-app/random-picker" element={<RandomPicker />} />
          <Route path="/random-app/dice" element={<Dice />} />
          <Route path="/random-app/heads-or-tails" element={<HeadsOrTails />} />
          <Route path="/random-app/" element={<Home />} />
        </Routes>
      </AnimatePresence>
    </Fragment>
  );
}

export default App;
