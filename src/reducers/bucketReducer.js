export const bucketReducer = (state, action) => {
    switch(action.type){
        case "SAVE_BUCKET":
            return {
                ...state,
                bucket: [state.bucket, action.payload]
            }
        default:
            return state;
    }
}