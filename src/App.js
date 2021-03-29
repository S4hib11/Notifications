import React from 'react';
import Notification from './components/Notifications';
import AddNotification from './components/AddNotification';
import './App.css';
import { TrendingUpRounded } from '@material-ui/icons';

function App() {

  const [notifications, setNotifications] = React.useState([
    { key: 1, text: "Someone from Pune viewed your profile", read: false },
    { key: 2, text: "Your food has been picked up and will be delivered to you by 9:00PM", read: false },
    { key: 3, text: "Hey! Feeling hungry order some noodles for your dinner", read: TrendingUpRounded },
    { key: 4, text: "Shivam posted an update", read: false },
    { key: 5, text: "Jack & Jones added new summer collection you might like", read: false },
    { key: 6, text: "You have a new friend suggestion Kabir Bedi", read: true },
    { key: 7, text: "Congratulate Sahib for starting new postion at Nikulsan", read: false },
    { key: 8, text: "Akanksha recently posted a photo", read: false },
    { key: 9, text: "Mayank commented on your profile picture: Cool", read: true },
    { key: 10, text: "Cant stay away from travelling. Book your tickets now from MakeMyTrip at lowest prices", read: false }
  ]);

  const [open, setOpen] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  return (
    <div className="App">
      <Notification notifications={notifications} setNotifications={setNotifications} open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />
      <AddNotification notifications={notifications} setNotifications={setNotifications} open={openAdd} handleClickOpen={handleClickOpenAdd} handleClose={handleCloseAdd} />
    </div>
  );
}

export default App;
