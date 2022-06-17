const mongoose = require("mongoose");
const Pusher = require("pusher");
const { db } = require("../models/todoListModels");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Pusher Config
    const pusher = new Pusher({
      appId: "1424799",
      key: "eb0a335b1e346049726b",
      secret: "ed567797a292ec945cdd",
      cluster: "ap1",
      useTLS: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);

    const todoCollection = db.collection("todos");

    // Watching the changes in the MongoDB collection
    const changeStream = todoCollection.watch();

    changeStream.on("change", (change) => {
      console.log(change);
      switch (change.operationType) {
        case "insert":
          const insertedTodoDetails = change.fullDocument;
          pusher.trigger("todos", "inserted", {
            todo: insertedTodoDetails.todo,
            status: insertedTodoDetails.status,
          });
          break;
        case "delete":
          console.log(
            "Deletion occurred! Deletion for Pusher is still being worked on!"
          );
          // const deletedTodoDetails = change.documentKey;
          // pusher.trigger("todos", "deleted", {
          //   _id: deletedTodoDetails._id,
          // });
          break;
        default:
          console.log("Error occurred while trigerring the Pusher!\n");
          process.exit(1);
      }
    });
  } catch (error) {
    console.log("Error occurred in the MongoDB Database!\n", error);
    process.exit(1);
  }
};

module.exports = connectDB;

/*
try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Pusher Config
    const pusher = new Pusher({
      appId: "1424799",
      key: "eb0a335b1e346049726b",
      secret: "ed567797a292ec945cdd",
      cluster: "ap1",
      useTLS: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);

    const db = mongoose.connection;

    const todoCollection = db.collection("todoListDB");

    // Watching the changes in the MongoDB collection
    const changeStream = todoCollection.watch();

    changeStream.on("change", (change) => {
      console.log(change);
      if (change.operationType === "insert") {
        const todoDetails = change.fullDocument;
        pusher.trigger("todos", "inserted", {
          todos: todoDetails.todo,
          status: todoDetails.status,
        });
      } else {
        console.log("Error occurred while trigerring the Pusher!\n", error);
        process.exit(1);
      }
    });
  } catch (error) {
    console.log("Error occurred in the MongoDB Database!\n", error);
    process.exit(1);
  }
*/

/*
  const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI);

  // Pusher Config
  const pusher = new Pusher({
    appId: "1424799",
    key: "eb0a335b1e346049726b",
    secret: "ed567797a292ec945cdd",
    cluster: "ap1",
    useTLS: true,
  });

  const db = mongoose.connection;

  db.once("open", () => {
    console.log(
      `MongoDB Connected: ${mongoose.connection.host}`.cyan.underline
    );

    const todoCollection = db.collection("todos");

    // Watching the changes in the MongoDB collection
    const changeStream = todoCollection.watch();

    changeStream.on("change", (change) => {
      console.log(change);
      // if (change.operationType === "insert") {
      //   const todoDetails = change.fullDocument;
      //   pusher.trigger("todos", "inserted", {
      //     todos: todoDetails.todo,
      //     status: todoDetails.status,
      //   });
      // } else {
      //   console.log("Error occurred while trigerring the Pusher!\n", error);
      //   process.exit(1);
      // }
    });
  });

  db.once("error", () => {
    console.log("Error occurred in the MongoDB Database!\n", error);
    process.exit(1);
  });
};
*/
