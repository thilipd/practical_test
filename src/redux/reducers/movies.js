import ACTIONS from "../action/index";

const movies = [];



const moviesReducer = (state = movies, action) => {
    switch (action.type) {

        case ACTIONS.MOVIES:
            return action.payload

        default:
            return state;
    }
}
export default moviesReducer;