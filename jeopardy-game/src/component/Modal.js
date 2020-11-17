import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Modal, Backdrop, makeStyles, TextField } from "@material-ui/core";
import { useSpring, animated } from "react-spring/web.cjs";
import { AnswerContext } from "../App";
// import {getScore} from "../store/actions/scoreActions";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    in: open,
    handleClose,
    children,
    onEnter,
    onExited,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

export default function SpringModal(props) {
  const [answer, setAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useContext(AnswerContext);
  // const [time, setTime] = useContext(TimeContext);
  // const [score, setScore] = useContext(AppContext);

  const classes = useStyles();

  // useEffect((event) => {
  // }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // props.userAnswer = answer;
    setUserAnswer(answer);
    console.log(userAnswer);
    console.log("handleSubmit answer " + answer);
  };

  // const questionTimer = () => {
  //   setTimeout(() => {
  //     handleSubmit();
  //   }, 10000);
  // };

  const handleChange = (event) => {
    const eventValue = event.target.value;

    setAnswer(eventValue);
    console.log(eventValue);
    console.log(answer);
  };

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={props.open}
        questionid={props.dataid}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open} onClose={props.handleClose}>
          <div className={classes.paper}>
            <h2 id="spring-modal-title">{`${props.category}`}</h2>
            <h2 id="timer">{`${props.timer}`}</h2>
            <p id="spring-modal-description">{`${props.questionText}`}</p>
            <form
              onSubmit={handleSubmit}
              className={classes.root}
              noValidate
              autoComplete="off"
            >
              <TextField
                onChange={handleChange}
                value={answer}
                name="answer-field"
                id="outlined-basic"
                label="Enter answer here: "
                variant="outlined"
              />
              <button type="submit" onClick={props.onClose}>
                Submit
              </button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
