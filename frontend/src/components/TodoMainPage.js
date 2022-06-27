import { React, useEffect, useContext } from "react";
import TodoContext from "../ContextTodo";
import TodoCard from "./TodoCard";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import CancelIcon from "@mui/icons-material/Cancel";
import { motion, AnimatePresence } from "framer-motion";
import Pusher from "pusher-js";

const TodoMainPage = () => {
  const {
    todos,
    setTodos,
    todoInput,
    setTodoInput,
    createState,
    setCreateState,
    fetchTodos,
    createTodo,
  } = useContext(TodoContext);

  // Track the input change
  const todoInputChange = (event) => {
    setTodoInput(event.target.value);
  };

  // Fetch all todos
  useEffect(() => {
    fetchTodos();
  }, []);

  // Pusher-js or Pusher for creating todo
  useEffect(() => {
    const pusher = new Pusher("eb0a335b1e346049726b", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("todos");
    channel.bind("inserted", (newTodo) => {
      setTodos([...todos, newTodo]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [todos]);

  return (
    <div className="App container my-4">
      <div className="d-flex flex-column justify-content-center">
        <h1 className="text-center text-bg-dark rounded-5 p-2">
          SIMPLE TODO APP
        </h1>
        <div className="d-flex justify-content-center align-items-center">
          {!createState && (
            <Link className="mx-2" to="/">
              <Button
                style={{ backgroundColor: "#90caf9" }}
                variant="contained"
              >
                <HomeIcon style={{ color: "#0a1929" }} />
              </Button>
            </Link>
          )}
          <form>
            {!createState ? (
              <Button
                style={{ backgroundColor: "#90caf9" }}
                variant="contained"
                onClick={() => setCreateState(true)}
              >
                <AddIcon style={{ color: "#0a1929" }} />
              </Button>
            ) : (
              <Button
                style={{ backgroundColor: "#90caf9" }}
                variant="contained"
                onClick={() => {
                  setCreateState(false);
                  setTodoInput("");
                }}
              >
                <CancelIcon style={{ color: "#0a1929" }} />
              </Button>
            )}
            {createState && (
              <Input
                style={{ color: "white" }}
                className="mx-3"
                type="text"
                placeholder="What do you want todo?"
                onChange={todoInputChange}
                value={todoInput}
              />
            )}
            {createState && (
              <Button
                type="submit"
                disabled={!todoInput}
                color="success"
                variant="contained"
                onClick={createTodo}
              >
                <CreateIcon />
              </Button>
            )}
          </form>
        </div>
      </div>
      {/* Todo: Use framer motion (animate presence) to make a smooth transition when the todo is inserted and deleted (exit) */}
      <div className="row mt-4 ">
        {todos.map((todo, index) => (
          <TodoCard key={index} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default TodoMainPage;
