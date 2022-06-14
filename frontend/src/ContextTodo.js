import { createContext, useState } from "react";
import axios from "./axios";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [createState, setCreateState] = useState(false);

  // Todo: Apply/use Pusher to make everything REAL-TIME!

  // CRUD METHODS/OPERATIONS
  // READ (GET)
  const fetchTodos = async () => {
    const getTodos = await axios.get("/");
    setTodos(getTodos.data);

    return getTodos;
  };

  // CREATE (POST)
  const createTodo = async () => {
    const data = {
      todo: todoInput,
    };
    const postTodos = await axios.post("/", data);
    setTodos([...todos, postTodos]);
    setTodoInput("");
    setCreateState(false);

    return postTodos;
  };

  // UPDATE (CHANGE)
  const updateTodo = async (todoID, updatedTodoInput) => {
    const data = {
      todo: updatedTodoInput,
    };
    const updatedTodo = await axios.put(`/${todoID}`, data);

    // todos.forEach((todo) => {
    //   if(todoID === todo._id){
    //     setTodos[todoID]
    //   }
    // })

    return updatedTodo;
  };

  // DELETE (REMOVE)
  const removeTodo = async (todoID) => {
    const deletedTodo = await axios.delete(`/${todoID}`);
    setTodos((previousTodos) =>
      previousTodos.filter((previousTodo) => previousTodo._id !== todoID)
    );

    return deletedTodo;
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        todoInput,
        setTodoInput,
        createState,
        setCreateState,
        fetchTodos,
        createTodo,
        updateTodo,
        removeTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export default TodoContext;
