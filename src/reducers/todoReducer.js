export const todoReducer = (state, action) => {
    switch(action.type){
        case "LOAD_TODOS":
            return {
                ...state,
                todos: action.payload
            }
        case "ADD_TODO":
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        case "UPDATE_TODO":
            return {
                ...state,
                todos: state.todos.map(t => t.todoId === action.payload.todoId ? action.payload : t)
            }
        case "DELETE_TODO":
            return {
                ...state,
                todos: state.todos.filter(t => t.todoId !== action.payload)
            }
        case "SET_EDITING_TODO":
            return {
                ...state,
                editingTodo: action.payload,
            }

        case "CANCEL_EDITING_TODO":
            return {
                ...state,
                editingTodo: null,
            }

        case "IS_COMPLETED":
            return {
                ...state,
                todos: state.todos.map(t => t.todoId === action.payload.todoId ? action.payload : t)
            }
        default:
            return state;
    }
}