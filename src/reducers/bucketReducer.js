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
            debugger;
            return {
                ...state,
                buckets: state.buckets.map(b => b.bucketId === action.payload.bucketId ? action.payload : b)
            }
        case "DELETE_BUCKET":
            return {
                ...state,
                buckets: state.buckets.filter(b => b.bucketId !== action.payload)
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