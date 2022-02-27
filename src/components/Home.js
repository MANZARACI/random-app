import classes from "./Home.module.css";

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const homeVariants = {
    exit: {
      x: "-100vw",
      transition: { ease: "easeInOut" },
    },
  };

  const titleVariants = {
    hidden: {
      y: "-100vw",
    },
    visible: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        delay: 1,
        staggerChildren: 0.5,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div variants={homeVariants} exit="exit">
      <motion.h1
        className={classes.title}
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        Random App
      </motion.h1>

      <motion.div
        className={classes.container}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Link to="/heads-or-tails" style={{ textDecoration: "none" }}>
          <motion.button
            variants={linkVariants}
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(97, 101, 107, 0.8)",
            }}
          >
            Heads or Tails
          </motion.button>
        </Link>

        <Link to="/dice" style={{ textDecoration: "none" }}>
          <motion.button
            variants={linkVariants}
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(97, 101, 107, 0.8)",
            }}
          >
            Dice
          </motion.button>
        </Link>

        <Link to="/random-picker" style={{ textDecoration: "none" }}>
          <motion.button
            variants={linkVariants}
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(97, 101, 107, 0.8)",
            }}
          >
            Random Picker
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default React.memo(Home);
