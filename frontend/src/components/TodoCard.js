import React from "react";

const TodoCard = ({ todo }) => {
  return (
    <div className="col">
      <div className="card col" style={{ width: 18 + "rem" }}>
        <div className="card-body">
          <h5 className="card-title">{todo.todo}</h5>
          {/* <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p> */}
          {/* Change Anchor Tags with Icons (Completed & Detele) */}
          {/* <a href="#" className="btn btn-primary">
            Go somewhere
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
