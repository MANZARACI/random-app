import React, { useState, useCallback } from "react";
import classes from "./Dice.module.css";
import { motion, useAnimation } from "framer-motion";
import dice1 from "../diceImages/Alea_1.png";
import dice2 from "../diceImages/Alea_2.png";
import dice3 from "../diceImages/Alea_3.png";
import dice4 from "../diceImages/Alea_4.png";
import dice5 from "../diceImages/Alea_5.png";
import dice6 from "../diceImages/Alea_6.png";

const Dice = () => {
  const [curImage, setCurImage] = useState(dice6);
  const diceShake = useAnimation();

  const diceSelector = useCallback(() => {
    const number = Math.floor(Math.random() * 6) + 1;
    switch (number) {
      case 1:
        return dice1;
      case 2:
        return dice2;
      case 3:
        return dice3;
      case 4:
        return dice4;
      case 5:
        return dice5;
      case 6:
        return dice6;
      default:
    }
  }, []);

  const diceRoller = useCallback(() => {
    diceShake.start({
      x: [0, 30, -25, 20, 15],
      rotate: [0, 5, -5, 5, -5],
      transition: {
        duration: 0.5,
        type: "spring",
        ease: "easeInOut",
      },
    });
  }, [diceShake]);

  const diceRoll = useCallback(() => {
    const currentDice = diceSelector();
    diceRoller();
    setCurImage(currentDice);
  }, [diceSelector, diceRoller]);

  const containerVariants = {
    hidden: {
      x: "100vw",
    },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 1.2 },
    },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <div className={classes.diceContainer}>
        <motion.div className={classes.dice} animate={diceShake}>
          <img src={curImage} alt="current dice"></img>
        </motion.div>
        <motion.button
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover={{
            scale: 1.1,
            backgroundColor: "rgba(97, 101, 107, 0.8)",
          }}
          className={classes.rollButton}
          onClick={diceRoll}
        >
          ROLL
        </motion.button>
      </div>
    </motion.div>
  );
};

export default React.memo(Dice);
