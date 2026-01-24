import axios from 'axios';

// Configure the base URL for your Spring Boot backend
const TODO_API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/todo';


const todoApi = axios.create({
  baseURL: TODO_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handling interceptor
todoApi.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Todo APIs
export const todoApiService = {
  // Get all todos
  getAllTodos: () => todoApi.get('/viewTodos'),
  
  // Get todo by ID
  getTodoById: (id) => todoApi.get(`/todos/${id}`),
  
  // Create new todo
  createTodo: (todoData) => todoApi.post('/createTodo', todoData),
  
  // Update todo
  updateTodo: (id, todoData) => todoApi.put(`/updateTodo/${id}`, todoData),
  
  // Delete todo
  deleteTodo: (id) => todoApi.delete(`/deleteTodo/${id}`),
  
  // Get todos by bucket
  getTodosByBucket: (bucketId) => todoApi.get(`/todos/bucket/${bucketId}`),
  
  // Mark todo as completed
  completeTodo: (id) => todoApi.patch(`/todos/${id}/complete`),
};

export default todoApi;
