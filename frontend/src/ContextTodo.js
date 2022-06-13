import { createContext, useState } from "react";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  //   const [todos, setTodos] = useState([]);
  const [todos, setTodos] = useState([
    {
      _id: "1",
      todo: "Playing PUBG Mobile",
    },
    {
      _id: "2",
      todo: "Watching Neflix",
    },
    {
      _id: "3",
      todo: "Coding",
    },
    {
      _id: "4",
      todo: "YouTube streaming",
    },
    {
      _id: "5",
      todo: "Cooking with brother-in-law and prepare the food for dinner with the family",
    },
    {
      _id: "6",
      todo: "Washing the dishes",
    },
  ]);

  const removeTodo = (todoID) => {
    console.log(todoID);
    setTodos((previousTodos) =>
      previousTodos.filter((previousTodo) => previousTodo._id !== todoID)
    );
  };

  return (
    <TodoContext.Provider value={{ todos, removeTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export default TodoContext;
