import { React, useState } from "react";
import "../App.css";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // To do completion/deletion
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // To do cancel/back
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline"; // To do edit/rename
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const TodoCard = ({ todo, todos }) => {
  const [cardState, setCardState] = useState(false);

  const removeTodo = () => {
    // Todo: filter method!
  };

  return (
    <div className="col d-flex justify-content-center align-items-center">
      <div
        className="card col shadow-lg text-bg-primary rounded my-2"
        style={{ width: 18 + "rem" }}
      >
        <div className="card-body text-center d-flex justify-content-around align-items-center">
          <h5 className="card-title">{todo.todo}</h5>
          <button
            type="button"
            class="btn btn-light"
            onClick={() => setCardState(!cardState)}
          >
            {cardState ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </button>
        </div>
        {cardState && (
          <div className="card-body text-center">
            <Button className="mx-3" variant="contained" color="success">
              <CheckCircleIcon />
            </Button>
            <Button variant="contained">
              <DriveFileRenameOutlineIcon />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
