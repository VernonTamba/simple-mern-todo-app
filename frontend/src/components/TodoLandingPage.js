import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";

const TodoLandingPage = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center position-absolute top-50 start-50 translate-middle">
      <h1 className="text-center text-bg-dark rounded-3 p-4">
        SIMPLE TODO APP
      </h1>
      <Link className="mt-3" to="/main">
        <Button size="large" variant="contained">
          <LoginIcon />
        </Button>
      </Link>
    </div>
  );
};

export default TodoLandingPage;
