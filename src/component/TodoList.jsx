import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { getAsyncTodos,toggleAsyncTodo } from "./feature/todoSlice";

function TodoList() {
  const { loading, error, todos } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAsyncTodos());
  }, [dispatch]);
 
  console.log(todos);

  return (
    <div>
      <h2>todo list</h2>
      {loading ? (
        <p>loading</p>
      ) : error ? (
        <p>{error}</p>
      )  :(
        <ul className="list-group">
          {todos.map((item) => (
            <TodoItem key={item.id} {...item} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
