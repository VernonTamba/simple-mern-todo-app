import { React, useState, useEffect, useContext } from "react";
import TodoContext from "../ContextTodo";
import "../App.css";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Symbolizes completion/deletion
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline"; // Symbolizes edit/rename
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import Pusher from "pusher-js";

const TodoCard = ({ todo }) => {
  const [todoModalInput, setTodoModalInput] = useState(todo.todo);
  const [cardState, setCardState] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { todos, setTodos, updateTodo, removeTodo } = useContext(TodoContext);

  const updateTodoAndCloseModal = (todoID, todoModalInput) => {
    console.log(todoID, todoModalInput);
    updateTodo(todoID, todoModalInput);
    handleClose();
    setCardState(false);
  };

  const todoModalInputChange = (event) => {
    event.preventDefault();

    setTodoModalInput(event.target.value);
  };

  useEffect(() => {
    todos.map((todo, index) => {
      if (todo.todo === "Play PUBG Mobile") {
        // console.log("Gotchuuuuu!");
        return (todo.todo = "Changed todo");
      }
    });
    console.log(todos);
  }, []);

  // Pusher-js or Pusher for updating todo
  // TODO: Not working correctly yet! Not real-time yet!
  useEffect(() => {
    const pusher = new Pusher("eb0a335b1e346049726b", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("todos");
    channel.bind("updated", (updatedTodo) => {
      // setTodos(
      todos.map((todo) => {
        if (todo._id === updatedTodo._id) {
          // console.log("Gotchuuuuu!");
          return (todo.todo = updatedTodo.todo);
        }
      });
      // );
      setTodos(todos);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [todos]);

  // console.log(todos[3]);

  //Todo: Pusher for deletion is still not working correctly. Fix this!
  // useEffect(() => {
  //   const pusher = new Pusher("eb0a335b1e346049726b", {
  //     cluster: "ap1",
  //   });

  //   const channel = pusher.subscribe("todos");
  //   channel.bind("deleted", (deletedTodo) => {
  //     setTodos((previousTodos) =>
  //       previousTodos.filter(
  //         (previousTodo) => previousTodo._id !== deletedTodo._id
  //       )
  //     );
  //   });

  //   return () => {
  //     channel.unbind_all();
  //     channel.unsubscribe();
  //   };
  // }, [todos]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#0a1929",
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
                  {todo.todo === todoModalInput ? (
                    <Input
                      style={{ color: "white" }}
                      className="mx-5"
                      type="text"
                      defaultValue={todo.todo}
                      onChange={todoModalInputChange}
                      value={todoModalInput}
                      error
                    />
                  ) : (
                    <Input
                      style={{ color: "white" }}
                      className="mx-5"
                      type="text"
                      defaultValue={todo.todo}
                      onChange={todoModalInputChange}
                      value={todoModalInput}
                    />
                  )}
                  <Button
                    disabled={todo.todo === todoModalInput}
                    className="mx-5 my-3"
                    color="warning"
                    variant="contained"
                    onClick={() =>
                      updateTodoAndCloseModal(todo._id, todoModalInput)
                    }
                  >
                    <DriveFileRenameOutlineIcon style={{ color: "#0a1929" }} />
                  </Button>
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
