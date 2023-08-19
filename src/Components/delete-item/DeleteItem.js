import { Button } from "@mui/material";
import ItemList from "../item-list/ItemList";

function DeleteItem(computer) {

  const onDelClick = () => {
    const token = sessionStorage.getItem("jwt");
    if (window.confirm("Are you sure to delete?")) {
      fetch("http://localhost:8080/api/computers/" + computer.data.id, {
        method: "DELETE",
        headers: { Authorization: token },
      })
        .then((response) => {
          if (response.ok) {
            window.location.reload();
          } else {
            alert("Something went wrong!");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <Button onClick={onDelClick} aria-label="delete">
        Delete
      </Button>
    </div>
  );
}
export default DeleteItem;
