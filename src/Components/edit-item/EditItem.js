import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

function EditItem(computer) {
  const [open, setOpen] = useState(false);
  const [modifiedComputer, setModifiedComputer] = useState({
    id: computer.data.id,
    os: computer.data.os,
    hardDrive: computer.data.hardDrive,
    memory: computer.data.memory,
    price: computer.data.price,
    processor: computer.data.processor,
    screen: computer.data.screen,
    type: computer.data.type,
    videoCard: computer.data.videoCard,
  });

  const updateItem = (modifiedComputer) => {
    const token = sessionStorage.getItem("jwt");
    fetch("http://localhost:8080/api/computers/" + modifiedComputer.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(modifiedComputer),
    })
      .then((response) => {
        if (response.ok) {
          window.location.reload();
        } else {
          alert("Something went wrong!");
        }
      })
      .catch((err) => console.error(err));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setModifiedComputer({
      ...modifiedComputer,
      [event.target.name]: event.target.value,
    });
  };
  const handleSave = () => {
    updateItem(modifiedComputer);
    handleClose();
  };

  return (
    <div>
      <IconButton
        style={{ backgroundColor: "black" }}
        onClick={handleClickOpen}
      >
        <EditIcon color="primary" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Computer</DialogTitle>
        <DialogContent>
          <Stack spacing={4} mt={1}>
            <TextField
              id="filled-read-only-input"
              label="Id"
              name="id"
              InputProps={{
                readOnly: true,
              }}
              autoFocus
              variant="standard"
              value={modifiedComputer.id}
              onChange={handleChange}
            />
            <TextField
              label="Operating System"
              name="os"
              variant="standard"
              value={modifiedComputer.os}
              onChange={handleChange}
            />
            <TextField
              label="hard drive"
              name="hardDrive"
              variant="standard"
              value={modifiedComputer.hardDrive}
              onChange={handleChange}
            />
            <TextField
              label="Memory"
              name="memory"
              variant="standard"
              value={modifiedComputer.memory}
              onChange={handleChange}
            />
            <TextField
              label="Price"
              name="price"
              variant="standard"
              value={modifiedComputer.price}
              onChange={handleChange}
            />
            <TextField
              label="Processor"
              name="processor"
              variant="standard"
              value={modifiedComputer.processor}
              onChange={handleChange}
            />
            <TextField
              label="Screen"
              name="screen"
              variant="standard"
              value={modifiedComputer.screen}
              onChange={handleChange}
            />
            <TextField
              label="Type"
              name="type"
              variant="standard"
              value={modifiedComputer.type}
              onChange={handleChange}
            />
            <TextField
              label="Video Card"
              name="videoCard"
              variant="standard"
              value={modifiedComputer.videoCard}
              onChange={handleChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}> Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default EditItem;
