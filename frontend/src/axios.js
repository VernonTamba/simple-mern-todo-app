import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/todos",
  //   headers: {
  //     "Content-type": "application/json"
  //   }
});

export default instance;
