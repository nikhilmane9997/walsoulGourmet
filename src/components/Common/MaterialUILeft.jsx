import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    //top: `${top}%`,
    //left: `${left}%`,
    //transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    //position: 'absolute',
   // width: 592,
   // height: 562,
        /* right: auto; */
    /* bottom: auto; */
    /* margin-right: -50%; */
    //padding: '1.38889vw 1.38889vw 1.38889vw 0',
    width: '50vw',
    //padding: '2.77778vw 2.77778vw 2.77778vw 0',
    maxWidth: '27.5em',
    //display: -webkit-box;
    //display: -webkit-flex;
    //display: flex;
    //-webkit-box-align: stretch;
    //-webkit-align-items: stretch;
    alignItems: 'stretch',
    overflow: 'hidden',
    borderRadius: '6px',
    backgroundColor: theme.palette.background.paper,
    position: 'fixed',
    top: '60px',
    right: '20px',
    bottom: '60px',
    overflowY: 'auto',
    height: '400px',
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
//   const [open, setOpen] = React.useState(false);

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

  const extraStyle = (props.extraStyle ? props.extraStyle : {});

  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        Open Modal
      </button> */}
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.open}
        onClose={props.handleCloseModal}
      >
        <div style={{ ...modalStyle, ...extraStyle }} className={classes.paper}>
         {props.children}
          <SimpleModal />
        </div>
      </Modal>
    </div>
  );
}
