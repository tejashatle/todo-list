export const bucketReducer = (state, action) => {
    switch(action.type){
        case "LOAD_BUCKETS":
            return {
                ...state,
                buckets: action.payload
            }
        case "ADD_BUCKET":
            return {
                ...state,
                buckets: [...state.buckets, action.payload]
            }
        case "UPDATE_BUCKET":
            return {
                ...state,
                buckets: state.buckets.map(b => b.id === action.payload.id ? action.payload : b)
            }
        case "DELETE_BUCKET":
            return {
                ...state,
                buckets: state.buckets.filter(b => b.id !== action.payload)
            }
        case "SET_EDITING_BUCKET":
            return {
                ...state,
                editingBucket: action.payload,
            }

        case "CANCEL_EDITING_BUCKET":
            return {
                ...state,
                editingBucket: null,
            }
        default:
            return state;
    }
}