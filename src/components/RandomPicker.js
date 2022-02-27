import React, { useState, useCallback } from "react";
import classes from "./RandomPicker.module.css";
import { motion, useAnimation } from "framer-motion";

const RandomPicker = () => {
  const [word, setWord] = useState("");
  const [options, setOptions] = useState([]);
  const [pickedOption, setPickedOption] = useState(null);
  const [isFirst, setIsFirst] = useState(true);
  const moveOptions = useAnimation();

  const addOption = useCallback(
    (e) => {
      e.preventDefault();
      setOptions((prev) => [...prev, word]);
      setWord("");
    },
    [word]
  );

  const removeOption = useCallback(
    (i) => {
      const tempArray = [...options];
      tempArray.splice(i, 1);
      setOptions(tempArray);
    },
    [options]
  );

  const optionList = options.map((option, i) => (
    <li key={i}>
      <button onClick={() => removeOption(i)}>-</button>
      &nbsp;
      {option}
    </li>
  ));

  const pickHandler = useCallback(() => {
    const number = Math.floor(Math.random() * options.length);
    if (isFirst) {
      moveOptions.start({
        y: "0rem",
        transition: {
          from: "-2.5rem",
          type: "spring",
        },
      });

      setIsFirst(false);
    }

    setPickedOption(options[number]);
  }, [isFirst, moveOptions, options]);

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

  const pickedVariants = {
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

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <div className={classes.subContainer}>
        <form className={classes.addForm} onSubmit={addOption}>
          <input
            onChange={(event) => setWord(event.target.value)}
            className={classes.wordInput}
            type="text"
            placeholder=" Add an option"
            value={word}
          ></input>
          <button className={classes.addButton} type="submit">
            Add
          </button>
          {options.length && (
            <button
              type="button"
              onClick={pickHandler}
              className={classes.pickButton}
            >
              Pick
            </button>
          )}
        </form>

        {pickedOption && (
          <motion.div
            className={classes.pickedContainer}
            variants={pickedVariants}
            initial="hidden"
            animate="visible"
          >
            <p>{pickedOption}</p>
          </motion.div>
        )}

        {options.length && (
          <motion.div animate={moveOptions} className={classes.optionContainer}>
            <ul className={classes.optionList}>{optionList}</ul>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default React.memo(RandomPicker);
