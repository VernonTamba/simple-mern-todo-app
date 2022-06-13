import { React, useState, useEffect, useContext } from "react";
import TodoContext from "../ContextTodo";
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
  // const [todos, setTodos] = useState([
  //   {
  //     _id: "1",
  //     todo: "Playing PUBG Mobile",
  //   },
  //   {
  //     _id: "2",
  //     todo: "Watching Neflix",
  //   },
  //   {
  //     _id: "3",
  //     todo: "Coding",
  //   },
  //   {
  //     _id: "4",
  //     todo: "YouTube streaming",
  //   },
  //   {
  //     _id: "5",
  //     todo: "Cooking with brother-in-law and prepare the food for dinner with the family",
  //   },
  //   {
  //     _id: "6",
  //     todo: "Washing the dishes",
  //   },
  // ]);
  const { todos, setTodos } = useContext(TodoContext);
  // const [todos, setTodos] = useState(todos);
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
              <Button
                style={{ backgroundColor: "#90caf9" }}
                variant="contained"
              >
                <HomeIcon style={{ color: "#0a1929" }} />
              </Button>
            </Link>
          )}

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
              disabled={!todoInput}
              color="success"
              variant="contained"
              onClick={createTodo}
            >
              <CreateIcon />
            </Button>
          )}
        </div>
      </div>
      <div className="row mt-4 ">
        {todos.map((todo, index) => (
          <TodoCard key={index} todo={todo} todos={[todos, setTodos]} />
        ))}
      </div>
    </div>
  );
};

export default TodoMainPage;
