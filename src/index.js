import React, { useContext, useReducer, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import TodosContext from "./context";
import todosReducer from "./reducer";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import axios from "axios";

//this is a custom hooks
const useAPI = endpoint => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await axios.get(endpoint);
    setData(response.data);
  };
  return data;
};

const App = () => {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(todosReducer, initialState);
  const savedTodos = useAPI("https://hooks-api.desmondsimzh.now.sh/todos");

  useEffect(() => {
    dispatch({
      type: "GET_TODOS",
      payload: savedTodos
    });
  }, [savedTodos]);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <div style={{display:"flex", justifyContent:"center", fontSize:"30px", fontWeight:600, color:"orange"}}>Double Click text to mark todos as DONE</div>
      <TodoList />
    </TodosContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
