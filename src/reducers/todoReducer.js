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
                todos: state.todos.map(t => t.todoTitle === action.payload.old.todoTitle && t.todoDescription === action.payload.old.todoDescription ? action.payload.new : t)
            }
        case "DELETE_TODO":
            return {
                ...state,
                todos: state.todos.filter(t => t !== action.payload)
            }
        case "EDIT_TODO":
            return {
                ...state,

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

        default:
            return state;
    }
}