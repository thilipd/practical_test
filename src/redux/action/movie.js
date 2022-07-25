import ACTIONS from "./index";


export const dispatchMovies = (arr) => {

    return {
        type: ACTIONS.MOVIES,
        payload: arr
    }
}