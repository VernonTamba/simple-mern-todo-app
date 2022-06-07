const express = require("express");
const cors = require("cors");
const routers = require("./routes/todoRoutes");
const colors = require("colors");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/todos", routers);

app.listen(port, () => console.log(`Server is running on PORT ${port}`));
