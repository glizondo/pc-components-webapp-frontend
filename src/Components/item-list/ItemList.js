import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ItemCard from "../item-card/ItemCard.js";
import "./ItemList.css";
import SearchBox from "../search/search-box.js";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import AddItem from "../add-item/AddItem.js";
import "@fontsource/roboto/300.css";

function ItemList() {
  const [searchField, setSearchField] = useState("");
  const [computers, setComputers] = useState([]);
  const [filteredComputers, setFilteredComputers] = useState(computers);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    const token = sessionStorage.getItem("jwt");
    fetch("http://localhost:8080/api/computers", {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => setComputers(data._embedded.computers))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const newFilteredComputers = computers.filter((computer) => {
      return computer.os.toLocaleLowerCase().includes(searchField);
    });

    setFilteredComputers(newFilteredComputers);
  }, [computers, searchField]);

  const addItem = (computer) => {
    const token = sessionStorage.getItem("jwt");
    fetch("http://localhost:8080/api/computers", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(computer),
    })
      .then((response) => {
        if (response.ok) {
          fetchItems();
        } else {
          alert("Something went wrong!");
        }
      })
      .catch((err) => console.error(err));
  };

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <Typography variant="h2" align="center" color="terciary">
        PC AND LAPTOPS
      </Typography>
      <SearchBox
        className="computers-search-box"
        onChangeHandler={onSearchChange}
        placeholder="search by OS"
      />
      <AddItem addItem={addItem} />
      <ListItems computers={filteredComputers} />
    </div>
  );
}

export default ItemList;

const ListItems = ({ computers }) => (
  <div className="card-list" style={{ marginTop: 30 }}>
    {computers.map((computer) => {
      return (
        <Row key={computer.id} xs={1} md={2} className="g-4">
          <Col>
            <ItemCard computer={computer}/>
          </Col>
        </Row>
      );
    })}
  </div>
);
