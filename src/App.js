import './App.css';
import Bucket  from './components/Bucket';
import Todo from './components/Todo';
import { useState, useEffect, useReducer } from 'react';
import Modal from './components/Modal';
import { todoReducer } from './reducers/todoReducer';
import { bucketReducer } from './reducers/bucketReducer';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

function App() {
  const [showModal, setShowModal] = useState(false);
  const todoInitialState = { editingTodo: null, todos: [] };
  const bucketInitialState = { editingBucket: null, buckets: [] };

  const [todoState, todoDispatch] = useReducer(todoReducer, todoInitialState);
  const [bucketState, bucketDispatch] = useReducer(bucketReducer, bucketInitialState);

  useEffect(() => {
    const savedBuckets = localStorage.getItem('buckets');
    if (savedBuckets) {
      bucketDispatch({ type: "LOAD_BUCKETS", payload: JSON.parse(savedBuckets) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('buckets', JSON.stringify(bucketState.buckets));
  }, [bucketState.buckets]);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      todoDispatch({ type: "LOAD_TODOS", payload: JSON.parse(savedTodos) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoState.todos));
  }, [todoState.todos]);

  return (
    <div className="App">
      {/* <Bucket buckets={buckets} setBuckets={setBuckets} setShowModal={setShowModal} /> */}
      <BrowserRouter>

      <div className="d-lg-flex flex-row">
        <div className="p-2 col-lg-2 bg-light" style={{height: "100vh"}}>
          <h2>Todo App</h2>

          <br></br>
          <br></br>
            <NavLink to="/todo" className={({ isActive }) => 
              isActive 
                ? "link-primary link-offset-2 link-underline link-underline-opacity-0" 
                : "link-secondary link-offset-2 link-underline link-underline-opacity-0"
            }><h5>Todo</h5></NavLink>
            <br></br>
            <NavLink to="/bucket" className={({ isActive }) => 
              isActive 
                ? "link-primary link-offset-2 link-underline link-underline-opacity-0" 
                : "link-secondary link-offset-2 link-underline link-underline-opacity-0"
            }><h5>Bucket</h5></NavLink>
          
        </div>
        <div className="p-2 col-lg-10">
          <Routes>
            <Route path="/todo" element={ <Todo buckets={bucketState.buckets} setShowModal={setShowModal} todos={todoState.todos} dispatch={todoDispatch} editingTodo={todoState.editingTodo} key={todoState.editingTodo ? todoState.editingTodo.todoTitle : 'new'}/>} />
            <Route path="/bucket" element={ <Bucket buckets={bucketState.buckets} setShowModal={setShowModal} dispatch={bucketDispatch} editingBucket={bucketState.editingBucket} />} />
            
          </Routes>

          <Modal buckets={bucketState.buckets} showModal={showModal} setShowModal={setShowModal} dispatch={bucketDispatch} />
          
        </div>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
