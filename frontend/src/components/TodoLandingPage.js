// Use Framer Motion: Page Transition (to transition from landing page to main page and vice versa)
import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";

const TodoLandingPage = () => {
  return (
    // <div className="position-absolute top-50 start-50 translate-middle">
    <div className="d-flex flex-column justify-content-center align-items-center position-absolute top-50 start-50 translate-middle">
      <h1 className="text-center text-bg-dark border border-light rounded-3 p-4">
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
