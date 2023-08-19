import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./ItemCard.css";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import React, { useState, useEffect } from "react";
import EditItem from "../edit-item/EditItem";
import DeleteItem from "../delete-item/DeleteItem";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const ItemCard = ({ computer }) => {
  const { os, price, type } = computer;
  const [open, setOpen] = useState(false);
  const [seller, setSeller] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
    fetch("http://localhost:8080/api/computers/" + computer.id + "/seller", {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => setSeller(data.username))
      .catch((err) => console.error(err));
  });
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="card-container">
      <Card>
        <Card.Img
          variant="top"
          style={{ width: 200, height: 200 }}
          src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/819XYUimTuL.jpg"
        />
        <Card.Body>
          <Card.Title variant="primary">Operating System: {os}</Card.Title>
          <Card.Text>Price: ${price}</Card.Text>
          <Card.Text>Type: {type}</Card.Text>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>More</DialogTitle>
            <DialogContent>
              <Stack spacing={2} mt={1}>
                <TextField
                  label="Operating System"
                  name="os"
                  autoFocus
                  variant="standard"
                  value={computer.os}
                />
                <TextField
                  label="hard drive"
                  name="hd"
                  autoFocus
                  variant="standard"
                  value={computer.hardDrive}
                />
                <TextField
                  label="Memory"
                  name="memory"
                  autoFocus
                  variant="standard"
                  value={computer.memory}
                />
                <TextField
                  label="Screen"
                  name="screen"
                  variant="standard"
                  value={computer.screen}
                />
                <TextField
                  label="Type"
                  name="type"
                  autoFocus
                  variant="standard"
                  value={computer.type}
                />
                <TextField
                  label="Video Card"
                  name="VC"
                  autoFocus
                  variant="standard"
                  value={computer.videoCard}
                />
                <TextField
                  label="Seller"
                  name="seller"
                  autoFocus
                  variant="standard"
                  value={seller}
                />
              </Stack>
            </DialogContent>
          </Dialog>
          <ButtonGroup aria-label="Basic example">
            <Button variant="primary" onClick={handleClickOpen}>
              More
            </Button>
            <EditItem data={computer} />
            <DeleteItem data={computer} />
          </ButtonGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ItemCard;
