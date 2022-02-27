import classes from "./HeadsOrTails.module.css";

import { motion, useCycle } from "framer-motion";
import React, { useState, useCallback } from "react";

const HeadsOrTails = () => {
  const [isFlip, setIsFlip] = useState(false);
  const [side, cycleSide] = useCycle("Heads", "Tails");
  const [flipCount, setFlipCount] = useState(null);

  let change = true;

  const flipCountHandler = useCallback(() => {
    const number = Math.floor(Math.random() * 6) + 6;
    setFlipCount(number);
  }, []);

  const flipClickHandler = useCallback(() => {
    flipCountHandler();
    setIsFlip(true);
  }, [flipCountHandler]);

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

  const coinVariants = {
    flip: {
      rotateY: "90deg",
      transition: {
        type: "tween",
        repeat: flipCount * 2 - 1,
        repeatType: "mirror",
        duration: 0.15,
        ease: "linear",
        onRepeat: () => {
          if (change) {
            cycleSide();
          }
          change = !change;
        },
        onComplete: useCallback(() => {
          setIsFlip(false);
          change = true;
        }, []),
      },
    },
  };

  return (
    <motion.div
      className={classes.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={classes.coinContainer}>
        <motion.div
          className={classes.coin}
          variants={coinVariants}
          animate={isFlip ? "flip" : ""}
        >
          <p className={classes.coinText}>{side}</p>
        </motion.div>

        <motion.button
          onClick={flipClickHandler}
          className={classes.flipButton}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover={{
            scale: 1.1,
            backgroundColor: "rgba(97, 101, 107, 0.8)",
          }}
        >
          FLIP
        </motion.button>
      </div>
    </motion.div>
  );
};

export default React.memo(HeadsOrTails);
