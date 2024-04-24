import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteAsyncTodo, toggleAsyncTodo } from "./feature/todoSlice";

function TodoItem({ id, title, complited }) {
  console.log("todo item rendering")
  const dispatch = useDispatch();
  useEffect(()=>{
    console.log("todo item use effect");
    dispatch(toggleAsyncTodo({id,complited}))
  },[])
  return (
    <div>
      <li
        className={`list-group-item ${complited&&"list-group-item-success"}`}
      >
        <div className="d-flex justify-content-between">
          <span className="d-flex align-items-center gap-1">
            <input
              type={"checkbox"}
              className="mr-3"
              checked={complited}
              onChange={() => dispatch(toggleAsyncTodo({ id,complited:!complited}))}
            />
            <span>{title}</span>
          </span>
          <button
            className="btn btn-danger"
            onClick={() => dispatch(deleteAsyncTodo({ id }))}
          >
            Delete
          </button>
        </div>
      </li>
    </div>
  );
}

export default TodoItem;
