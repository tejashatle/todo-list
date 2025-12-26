import logo from './logo.svg';
import './App.css';
import Bucket  from './components/Bucket';
import Todo from './components/Todo';
import { useState, useEffect, useReducer } from 'react';
import Modal from './components/Modal';
import TodoList from './components/TodoList';
import { todoReducer } from './reducers/todoReducer';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

function App() {
  const [showModal, setShowModal] = useState(false);
  const initialState = {editingTodo: null, todos: [], buckets: []};

  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    const savedBuckets = localStorage.getItem('buckets');
    if (savedBuckets) {
      dispatch({ type: "LOAD_BUCKETS", payload: JSON.parse(savedBuckets) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('buckets', JSON.stringify(state.buckets));
  }, [state.buckets]);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      dispatch({ type: "LOAD_TODOS", payload: JSON.parse(savedTodos) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <div className="App">
      {/* <Bucket buckets={buckets} setBuckets={setBuckets} setShowModal={setShowModal} /> */}
      <BrowserRouter>

      <div className="d-lg-flex flex-row">
        <div className="p-2 col-lg-2 bg-light" style={{height: "100vh"}}>
          <h2>Todo App</h2>

          <br></br>
          <br></br>
            <Link to="/todo" className="link-secondary link-offset-2 link-underline link-underline-opacity-0"><h5>Todo</h5></Link>
            <br></br>
            <Link to="/bucket" className="link-secondary link-offset-2 link-underline link-underline-opacity-0"><h5>Bucket</h5></Link>
          
        </div>
        <div className="p-2 col-lg-10">
          <Routes>
            <Route path="/todo"element={ <Todo buckets={state.buckets} setShowModal={setShowModal} todos={state.todos} dispatch={dispatch} editingTodo={state.editingTodo} key={state.editingTodo ? state.editingTodo.todoTitle : 'new'}/>} />
            <Route path="/bucket" element={ <Bucket buckets={state.buckets} setShowModal={setShowModal} dispatch={dispatch}  />} />
            
          </Routes>

          <Modal buckets={state.buckets} showModal={showModal} setShowModal={setShowModal} dispatch={dispatch} />
            <TodoList todos={state.todos} dispatch={dispatch}></TodoList>
        </div>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
