import { React, useState, useEffect } from "react";
import TodoCard from "./TodoCard";
import axios from "../axios";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import CancelIcon from "@mui/icons-material/Cancel";
import { motion, AnimatePresence } from "framer-motion";

const TodoMainPage = () => {
  const [todos, setTodos] = useState([
    {
      todo: "Playing PUBG Mobile",
    },
    {
      todo: "Watching Neflix",
    },
    {
      todo: "Coding",
    },
    {
      todo: "YouTube streaming",
    },
    {
      todo: "Cooking with brother-in-law and prepare the food for dinner with the family",
    },
    {
      todo: "Washing the dishes",
    },
  ]);
  const [todoInput, setTodoInput] = useState("");

  // Test for creating todo
  const [createState, setCreateState] = useState(false);

  const fetchTodos = async () => {
    const getTodos = await axios.get("/");
    setTodos(getTodos.data);

    return getTodos;
  };

  // For testing purposes
  const createTodo = () => {
    setCreateState(false);
  };

  // const createTodo = async () => {
  //   const data = {
  //     todo: todoInput,
  //   };
  //   const postTodos = await axios.post("/", data);
  //   setTodos([...todos, postTodos]);
  //   setTodoInput("");
  //   setCreateState(false);

  //   return postTodos;
  // };

  const todoInputChange = (event) => {
    event.preventDefault();

    setTodoInput(event.target.value);
  };

  // useEffect(() => {
  //   fetchTodos();
  // }, []);
  return (
    <div className="App container my-4">
      {/* TODO: CENTER THIS! */}
      <div className="d-flex flex-column justify-content-center">
        <h1 className="text-center text-bg-dark rounded-5 p-2">
          SIMPLE TODO APP
        </h1>
        <div className="d-flex justify-content-center align-items-center">
          {!createState && (
            <Link className="mx-2" to="/">
              <Button color="secondary" variant="contained">
                <HomeIcon />
              </Button>
            </Link>
          )}

          {!createState ? (
            <Button
              color="secondary"
              variant="contained"
              onClick={() => setCreateState(true)}
            >
              <AddIcon />
            </Button>
          ) : (
            <Button
              color="secondary"
              variant="contained"
              onClick={() => setCreateState(false)}
            >
              <CancelIcon />
            </Button>
          )}
          {createState && (
            <Input
              className="mx-3"
              type="text"
              placeholder="What do you want todo?"
              onChange={todoInputChange}
              value={todoInput}
            />
          )}
          {createState && (
            <Button color="secondary" variant="contained" onClick={createTodo}>
              <CreateIcon />
            </Button>
          )}
        </div>
      </div>
      <div className="row mt-4 ">
        {todos.map((todo, index) => (
          <TodoCard key={index} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default TodoMainPage;
