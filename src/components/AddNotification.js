import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
  inputWidth: {
    width: "550px"
  },
  button: {
    backgroundColor: "#1abc9c",
    color: "black",
    textAlign: "center",
    textDecoration: "none",
    cursor: "pointer",
    boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
    margin: "10px"
  },
  alerts: {
    margin: "5px"
  }
});

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const AddNotification = (props) => {
  const classes = useStyles();
  const { open, handleClickOpen, handleClose, notifications, setNotifications } = props;
  const [note, setNote] = React.useState("");
  const [alert, setAlert] = React.useState(false);

  const saveNotification = (note) => {
    if (note) {
      const cloneData = [...notifications];
      cloneData.push({
        key: notifications.length + 1,
        text: note,
        read: false
      })
      setNotifications(cloneData);
      setNote("");
      handleClose();
    }
    else {
      setAlert(true)
    }
  }

  const handleNoteChange = (event) => {
    if (event.target.value !== "") {
      setAlert(false);
    }
    setNote(event.target.value);
  }

  return (
    <React.Fragment>
      <div>
        <Button variant="h6" onClick={handleClickOpen} className={classes.button}><AddBoxIcon />Add Notification</Button>
      </div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Notification
            </DialogTitle>
        {alert ?
          <Alert className={classes.alerts} severity="error">Notification cannot be empty.</Alert> :
          <React.Fragment></React.Fragment>
        }
        <DialogContent>

          <div>
            <TextField
              id="notification-static"
              multiline
              rows={3}
              variant="outlined"
              onChange={handleNoteChange}
              className={classes.inputWidth}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button className={classes.save} onClick={() => saveNotification(note)} color="primary">
            Save
              </Button>
          <Button className={classes.cancel} onClick={handleClose} color="primary">
            Cancel
              </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AddNotification;