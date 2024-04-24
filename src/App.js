import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddTodoForm from "./component/AddTodoForm";
import TodoList from "./component/TodoList";
import { Provider } from "react-redux";
import store from "./component/feature/store";

function App() {
  return (
    <div className="container pt-3">
      <h1 className="text-center">ToDo RTK</h1>
      <Provider store={store}>
        <AddTodoForm />
        <TodoList />
      </Provider>
    </div>
  );
}

export default App;
