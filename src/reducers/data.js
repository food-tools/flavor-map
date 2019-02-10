import {
    FETCH_GRAPH_REQUEST,
    FETCH_GRAPH_SUCCESS,
    FETCH_GRAPH_FAILURE
} from "../actions/actions";

const initialState = {
    ingredients: {},
    pairings: []
};

export const data = (state=initialState, action) => {
    switch (action.type) {
        case FETCH_GRAPH_SUCCESS: {
            return {
                ingredients: action.json.nodes.reduce(
                    (result, ingredient) => ({
                        ...result,
                        [ingredient.id]: ingredient
                    }),
                    {}
                ),
                pairings: action.json.links
            };
        }
        default: {
            return state;
        }
    }
}
