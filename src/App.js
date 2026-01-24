import './App.css';
import Bucket  from './components/Bucket';
import Todo from './components/Todo';
import { useState, useEffect, useReducer } from 'react';
import Modal from './components/Modal';
import { todoReducer } from './reducers/todoReducer';
import { bucketReducer } from './reducers/bucketReducer';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import { bucketApiService } from './services/bucketApi';
import { todoApiService } from './services/todoApi';

function App() {
  const [showModal, setShowModal] = useState(false);
  const todoInitialState = { editingTodo: null, todos: [] };
  const bucketInitialState = { editingBucket: null, buckets: [] };

  const [todoState, todoDispatch] = useReducer(todoReducer, todoInitialState);
  const [bucketState, bucketDispatch] = useReducer(bucketReducer, bucketInitialState);

 // const [bucket, setBuckets] = useState([]);

    //  useEffect(() => {
    //     bucketApiService.getAllBuckets().then((result) => {setBuckets(result.data); console.log(result.data); })
    // }, [])

  useEffect(() => {
    const loadBuckets = async () => {
      try {
        const response = await bucketApiService.getAllBuckets();
        bucketDispatch({ type: "LOAD_BUCKETS", payload: response.data });
      } catch (error) {
        console.error('Failed to load buckets:', error);
      }
    };
    loadBuckets();
  }, []);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const response = await todoApiService.getAllTodos();
        todoDispatch({ type: "LOAD_TODOS", payload: response.data });
      } catch (error) {
        console.error('Failed to load todos:', error);
      }
    };
    loadTodos();
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoState.todos));
  }, [todoState.todos]);

  return (
    <div className="App">
      {/* <Bucket buckets={buckets} setBuckets={setBuckets} setShowModal={setShowModal} /> */}
      <HashRouter>

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
            <Route path="/todo" element={ <Todo todos={todoState.todos} buckets={bucketState.buckets} setShowModal={setShowModal} dispatch={todoDispatch} editingTodo={todoState.editingTodo} key={todoState.editingTodo ? todoState.editingTodo.todoTitle : 'new'}/>} />
            <Route path="/bucket" element={ <Bucket buckets={bucketState.buckets} setShowModal={setShowModal} dispatch={bucketDispatch} editingBucket={bucketState.editingBucket} />} />
            
          </Routes>

          <Modal buckets={bucketState.buckets} showModal={showModal} setShowModal={setShowModal} dispatch={bucketDispatch} />
          
        </div>
      </div>
      </HashRouter>
    </div>
  );
}

export default App;
