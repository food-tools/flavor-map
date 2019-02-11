import {
    FETCH_GRAPH_SUCCESS,
    FETCH_CUISINES_SUCCESS
} from "../actions/actions";

const initialState = {
    ingredients: {},
    cuisines: {},
    pairings: []
};

export const data = (state=initialState, action) => {
    switch (action.type) {
        case FETCH_GRAPH_SUCCESS:
            return {
                ...state,
                ingredients: action.json.nodes.reduce(
                    (result, ingredient) => ({
                        ...result,
                        [ingredient.id]: ingredient
                    }),
                    {}
                ),
                pairings: action.json.links
            };
        case FETCH_CUISINES_SUCCESS:
            return {
                ...state,
                cuisines: action.json.reduce(
                    (result, cuisine) => ({
                        ...result,
                        [cuisine.id]: cuisine
                    }),
                    {}
                )
            }
        default:
            return state;
    }
}
