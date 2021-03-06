import React, {useContext} from "react";
import PropTypes from "prop-types";
import {Modal, Backdrop, makeStyles, TextField} from "@material-ui/core";
import {useSpring, animated} from "react-spring/web.cjs";
import {WagerContext} from "../App";
import theme from "../styles/mui";

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
    from: {opacity: 0},
    to: {opacity: open ? 1 : 0},
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
  const {wager, setWager} = useContext(WagerContext);
  const classes = useStyles();
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleChange = (event) => {
    const eventValue = event.target.value;
    setWager(eventValue);
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
            <h2 id="spring-modal-title">Final Jeopardy</h2>
            <p id="spring-modal-description">Enter your wager</p>
            <form
              onSubmit={handleSubmit}
              className={classes.root}
              noValidate
              autoComplete="off"
            >
              <TextField
                onChange={handleChange}
                value={wager}
                type="number"
                name="answer-field"
                id="outlined-basic"
                label="Enter your wager here: "
                variant="outlined"
              />
              <button className="submit-button" type="submit" onClick={props.onClose}>
                Submit
              </button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}