import { React, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoCard from "./components/TodoCard";
import "./App.css";
import axios from "./axios";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

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

  const createTodo = async () => {
    const data = {
      todo: todoInput,
    };
    const postTodos = await axios.post("/", data);
    setTodos([...todos, postTodos]);
    setTodoInput("");
    // For testing purposes
    setCreateState(false);

    return postTodos;
  };

  const todoInputChange = (event) => {
    event.preventDefault();

    setTodoInput(event.target.value);
  };

  // useEffect(() => {
  //   fetchTodos();
  // }, []);

  return (
    <div className="App container">
      {/* Create a "Create new Todo" component */}
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

      <div className="row">
        {todos.map((todo, index) => (
          <TodoCard key={index} todo={todo} />
        ))}
      </div>
    </div>
  );
}

export default App;
