import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Modal, Backdrop, makeStyles, TextField } from "@material-ui/core";
import { useSpring, animated } from "react-spring/web.cjs";
import { AnswerContext } from "../App";
import theme from "../mui";
import "../modal.css";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.primary.main,
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
  const { userAnswer, setUserAnswer } = useContext(AnswerContext);
  // const [time, setTime] = useContext(TimeContext);
  // const [score, setScore] = useContext(AppContext);
  const classes = useStyles();
  const handleSubmit = (event) => {
    // console.log(event.target);
    event.preventDefault();
    // setUserAnswer(answer);
    // console.log(userAnswer);
    // console.log("handleSubmit answer " + userAnswer);
  };
  const handleChange = (event) => {
    const eventValue = event.target.value;
    setUserAnswer(eventValue);
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
            <h2
              id="spring-modal-title"
              className="title"
            >{`${props.category}`}</h2>
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
                value={userAnswer}
                name="answer-field"
                id="outlined-basic"
                label="Enter answer here: "
                variant="outlined"
              />
              <button
                className="submit-button"
                type="submit"
                onClick={props.onClose}
                disabled={false}
              >
                Submit
              </button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
