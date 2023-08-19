import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

function AddItem(props) {
  const [open, setOpen] = useState(false);
  const [computer, setComputer] = useState({
    os: "",
    hardDrive: "",
    memory: "",
    price: "",
    processor: "",
    screen: "",
    type: "",
    videoCard: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setComputer({ ...computer, [event.target.name]: event.target.value });
  };
  const handleSave = () => {
      props.addItem(computer);
      handleClose();
  };
  return (
    <div>
      <Button
        variant="contained"
        style={{ color: "black", backgroundColor: "silver"}}
        onClick={handleClickOpen}
      >
        New Computer
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Computer</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Operating System"
              name="os"
              autoFocus
              variant="standard"
              value={computer.os}
              onChange={handleChange}
            />
            <TextField
              label="hard drive"
              name="hardDrive"
              variant="standard"
              value={computer.hardDrive}
              onChange={handleChange}
            />
            <TextField
              label="Memory"
              name="memory"
              variant="standard"
              value={computer.memory}
              onChange={handleChange}
            />
            <TextField
              label="Price"
              name="price"
              variant="standard"
              value={computer.price}
              onChange={handleChange}
            />
            <TextField
              label="Processor"
              name="processor"
              variant="standard"
              value={computer.processor}
              onChange={handleChange}
            />
            <TextField
              label="Screen"
              name="screen"
              variant="standard"
              value={computer.screen}
              onChange={handleChange}
            />
            <TextField
              label="Type"
              name="type"
              variant="standard"
              value={computer.type}
              onChange={handleChange}
            />
            <TextField
              label="Video Card"
              name="videoCard"
              variant="standard"
              value={computer.videoCard}
              onChange={handleChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AddItem;
