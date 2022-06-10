import React from "react";
import "../App.css";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // To do completion/deletion
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // To do cancel/back
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline"; // To do edit/rename

const TodoCard = ({ todo }) => {
  return (
    <div className="col d-flex justify-content-center align-items-center">
      <div
        className="card col shadow-lg text-bg-primary rounded my-2"
        style={{ width: 18 + "rem" }}
      >
        <div className="card-body text-center">
          <h5 className="card-title">{todo.todo}</h5>
        </div>
        {/* Todo: Pops when it's clicked. That is all for now */}
        <div className="card-body text-center">
          <Button variant="contained">
            <ArrowBackIcon />
          </Button>
          <Button className="mx-3" variant="contained" color="success">
            <CheckCircleIcon />
          </Button>
          <Button variant="contained">
            <DriveFileRenameOutlineIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
