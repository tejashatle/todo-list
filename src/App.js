import logo from './logo.svg';
import './App.css';
import Bucket  from './components/Bucket';
import Todo from './components/Todo';
import { useState, useEffect, useReducer } from 'react';
import Modal from './components/Modal';
import TodoList from './components/TodoList';
import { todoReducer } from './reducers/todoReducer';

function App() {
  const [buckets, setBuckets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const initialState = {editingTodo: null, todos: [], buckets: []};

  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    const savedBuckets = localStorage.getItem('buckets');
    if (savedBuckets) {
      setBuckets(JSON.parse(savedBuckets));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('buckets', JSON.stringify(buckets));
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
      <Todo buckets={state.buckets} setShowModal={setShowModal} todos={state.todos} dispatch={dispatch} editingTodo={state.editingTodo} key={state.editingTodo ? state.editingTodo.todoTitle : 'new'}/>
      <Modal buckets={state.buckets} setBuckets={setBuckets} showModal={showModal} setShowModal={setShowModal} dispatch={dispatch} />
      <TodoList todos={state.todos} dispatch={dispatch}></TodoList>
    </div>
  );
}

export default App;
