import { React, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoCard from "./components/TodoCard";
import "./App.css";
import axios from "./axios";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import backgroundVideo from "./background.mp4";

function App() {
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
    <div className="App container">
      <video autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      {/* TODO: CENTER THIS! */}
      <div className="d-flex flex-column justify-content-center">
        <h1>SIMPLE TODO APP</h1>
        <div>
          <Button variant="contained" onClick={() => setCreateState(true)}>
            Create Todo
          </Button>
          {createState && (
            <Input
              type="text"
              placeholder="What do you want todo?"
              onChange={todoInputChange}
              value={todoInput}
            />
          )}
          {createState && (
            <Button variant="contained" onClick={createTodo}>
              Post Todo
            </Button>
          )}
        </div>
      </div>
      <div className="row">
        {todos.map((todo, index) => (
          <TodoCard key={index} todo={todo} />
        ))}
      </div>
    </div>
  );
}

export default App;
