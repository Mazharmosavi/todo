import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAsyncTodos = createAsyncThunk(
  "todos/getAsyncThunk",
  async (_, { rejectWithValue }) => {
    try {
      const respond = await axios.get("http://localhost:5000/todos");
      console.log(respond.data);
      return respond.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addAsyncTodo = createAsyncThunk(
  "todos/addAsyncTodo",
  async (payload, { rejectWithValue }) => {
    try {
      const respond = await axios.post("http://localhost:5000/todos", {
        complited: false,
        title: payload.title,
        id: Date.now(),
      });
      console.log(respond.data);
      return respond.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAsyncTodo = createAsyncThunk(
  "todos/deleteAsyncTodo",
  async (payload, { rejectWithValue }) => {
    try {
      const respond = await axios.delete(
        `http://localhost:5000/todos/${payload.id}`,
        {
           id: payload.id 
        }
      );
      console.log(respond);
      return { id: payload.id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleAsyncTodo = createAsyncThunk(
  "todos/toggleAsyncTodo",
  async (payload, { rejectWithValue }) => {
    try {
      console.log("respond");

      const respond = await axios.get(
        `http://localhost:5000/todos/${payload.id}`,
        
      );
      console.log(respond.data);
      return respond.data;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: false,
    error: "",
  },
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        complited: false,
      };
      state.todos.push(newTodo);
    },
    toggleTodo: (state, action) => {
      const selectedTodo = state.todos.find(
        (t) => t.id === Number(action.payload.id)
      );
      selectedTodo.complited = action.payload.complited;
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAsyncTodos.pending, (state) => {
        console.log("get pending");
        state.loading = true;
        state.todos = [];
      })
      .addCase(getAsyncTodos.fulfilled, (state, action) => {
        console.log("get fulfiled");
        state.loading = false;
        state.todos = action.payload;
        state.error = "";
      })
      .addCase(getAsyncTodos.rejected, (state, action) => {
        console.log("get error");
        state.loading = false;
        state.todos = [];
        state.error = action.payload;
      })
      .addCase(addAsyncTodo.pending, (state) => {
        state.loading = true;
        console.log("loading");
      })
      .addCase(addAsyncTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addAsyncTodo.fulfilled, (state, action) => {
        state.loading = false;
        console.log("fulled");
        state.todos.push(action.payload);
        console.log("didi");
      })
      .addCase(deleteAsyncTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          (todo) => todo.id !== action.payload.id
        );
        console.log("fuck");
        console.log(state.todos);
      })
      .addCase(toggleAsyncTodo.fulfilled, (state, action) => {
        console.log(state.todos);
        console.log(action);
        state.todos.find((todo) => todo.id === Number(action.payload.id));
      });
  },

  /* extraReducers: (builder) => {
    builder
      .addCase(addAsyncTodo.pending, (state) => {
        state.loading = true;
        console.log("loading");
      })
      .addCase(addAsyncTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addAsyncTodo.fulfilled, (state, action) => {
        state.loading = false;
        console.log("fulled");
        state.todos.push(action.payload);
        console.log("didi");
      });
  },

 /* extraReducers: (builder) => {
    builder.addCase(deleteAsyncTodo.fulfilled, (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    });
  },

  extraReducers: (builder) => {
    builder.addCase(toggleAsyncTodo.fulfilled, (state, action) => {
      const selectedTodo = state.todos.find(
        (todo) => todo.id === Number(action.payload.id)
      );
      selectedTodo.complited = action.payload.complited;
    });
  },*/
});
export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
