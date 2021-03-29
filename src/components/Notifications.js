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
import Badge from '@material-ui/core/Badge';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  cursorPointer: {
    cursor: "pointer"
  },
  check: {
    color: "green"
  },
  discard: {
    color: "#e33327"
  },
  read: {
    color: "grey"
  },
  unread: {
    color: "blue"
  },
  header: {
    padding: "60px",
    textAlign: "center",
    background: "#1abc9c",
    color: "white"
  },
  subHeading: {
    padding: "15px",
  },
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

export default Notification = (props) => {
  const classes = useStyles();
  const { open, handleClickOpen, handleClose, notifications, setNotifications } = props;

  const c = [...notifications];
  const notificationCount = (c.filter(row => row.read === false)).length;

  const notificationAllRead = () => {
    const a = [...notifications];
    a.forEach((item) => {
      item.read = true;
    });
    setNotifications(a);
  }

  const notificationAllUnread = () => {
    const a = [...notifications];
    a.forEach((item) => {
      item.read = false;
    });
    setNotifications(a);
  }

  const changeColorRead = id => {
    const a = [...notifications];
    for (let i = 0; i < a.length; i++) {
      if (a[i].key === id) {
        a[i].read = true;
      }
    }
    setNotifications(a);
  }

  const changeColorUnread = id => {
    const a = [...notifications];
    for (let i = 0; i < a.length; i++) {
      if (a[i].key === id) {
        a[i].read = false;
      }
    }
    setNotifications(a);
  }

  const handleNotificationClick = (id) => {
    let n = notifications.filter(row => row.key === id)
  }

  return (
    <React.Fragment>
      <Typography variant="h4" className={classes.header}>Notifications App</Typography>
      <Typography className={classes.subHeading}>Check Your Notifications By Clicking the Icon</Typography>
      <Badge badgeContent={notificationCount} className={classes.cursorPointer} color="secondary" onClick={handleClickOpen} >
        {notificationCount > 0 ? <NotificationsActiveIcon /> : <NotificationsIcon />}
      </Badge>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Notifications
        </DialogTitle>
        <DialogContent dividers>
          <div>
            {notifications.map(({ key, text, read }) => (
              <div key={key}>
                <Typography
                  className={read ? classes.read : classes.unread}
                  onClick={() => handleNotificationClick(key)}
                >
                  {text}
                </Typography>
                <Button onClick={() => changeColorRead(key)}>
                  Mark Read
              <CheckIcon className={classes.check} />
                </Button>
                <span>&nbsp;&nbsp;</span>
                <Button onClick={() => changeColorUnread(key)}>
                  Mark Unread
                  <CancelIcon className={classes.discard} />
                </Button>
                <hr />
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={notificationAllRead} color="primary">
            Mark All as Read
          </Button>
          <Button onClick={notificationAllUnread} color="primary">
            Mark All as Unread
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}