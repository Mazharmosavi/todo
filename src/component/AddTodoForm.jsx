import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addAsyncTodo, addTodo, getAsyncTodos } from './feature/todoSlice';

function AddTodoForm() {
    const[value,setValue] = useState("");
    const dispatch = useDispatch();
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!value) return;
       console.log( dispatch(addAsyncTodo({title:value})))
        setValue("");
    }
  return (
    <div>
        <form className='form-inline mt-3 mb-4' onSubmit={handleSubmit}>
            <label htmlFor='name' className='mb-1'>Name</label>
            <input autoComplete={"off"}
                   id="name"
                   type={"text"}
                   className={"form-control mb-2 mr-sm-2"}
                   placeholder="add todo"
                   value={value}
                   onChange={(e)=>setValue(e.target.value)}/>
            <button type='submit' className='btn btn-primary mt-1'>submit</button>
        </form>
    </div>
  )
}

export default AddTodoForm
