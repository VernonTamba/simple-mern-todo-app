import { React, useState, useContext } from "react";
import TodoContext from "../ContextTodo";
import "../App.css";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // To do completion/deletion
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline"; // To do edit/rename
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const TodoCard = ({ todo }) => {
  const [cardState, setCardState] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { removeTodo } = useContext(TodoContext);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="card-div col d-flex justify-content-center align-items-center">
      <Card
        className="card my-2 shadow-lg"
        style={{ width: 20 + "rem", backgroundColor: "#0A1929" }}
      >
        <CardContent className="card-body text-center d-flex justify-content-around align-items-center">
          <Typography
            style={{ color: "white" }}
            sx={{ fontSize: 20 }}
            variant="h1"
            component="div"
          >
            {todo.todo}
          </Typography>
        </CardContent>
        <Button
          size="small"
          variant="text"
          onClick={() => setCardState(!cardState)}
        >
          {cardState ? (
            <ExpandLessIcon style={{ color: "#90CAF9" }} />
          ) : (
            <ExpandMoreIcon style={{ color: "#90CAF9" }} />
          )}
        </Button>
        <CardActions>
          {cardState && (
            <div className="card-body text-center">
              <Button
                className="mx-3"
                variant="contained"
                color="success"
                onClick={() => {
                  removeTodo(todo._id);
                  setCardState(false);
                }}
              >
                <CheckCircleIcon />
              </Button>
              <Button variant="contained" onClick={handleOpen}>
                <DriveFileRenameOutlineIcon />
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    {todo.todo}
                  </Typography>
                </Box>
              </Modal>
            </div>
          )}
        </CardActions>
      </Card>
    </div>
  );
};

export default TodoCard;

// boostrap card
{
  /* <div
        className="card shadow-lg text-bg-primary rounded my-2"
        style={{ width: 20 + "rem" }}
      >
        <div className="card-body text-center d-flex justify-content-around align-items-center">
          <h5 className="card-title">{todo.todo}</h5>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => setCardState(!cardState)}
          >
            {cardState ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </button>
        </div>
        {cardState && (
          <div className="card-body text-center">
            <Button
              className="mx-3"
              variant="contained"
              color="success"
              onClick={() => {
                removeTodo(todo._id);
                setCardState(false);
              }}
            >
              <CheckCircleIcon />
            </Button>
            <Button variant="contained">
              <DriveFileRenameOutlineIcon />
            </Button>
          </div>
        )}
      </div> */
}
