import {
    FETCH_GRAPH_REQUEST,
    FETCH_GRAPH_SUCCESS,
    FETCH_GRAPH_FAILURE
} from "../actions/actions";

const initialState = {
    ingredients: {
        isFetching: false,
        lastUpdated: undefined,
        didInvalidate: false,
        items: []
    },
    cuisines: {
        isFetching: false,
        lastUpdated: undefined,
        didInvalidate: false,
        items: []
    }
};

export const results = (state=initialState, action) => {
    switch (action.type) {
        case FETCH_GRAPH_REQUEST:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    isFetching: true
                }
            }
        case FETCH_GRAPH_SUCCESS:
            return {
                ...state,
                ingredients: {
                    isFetching: false,
                    lastUpdated: action.receivedAt,
                    didInvalidate: false,
                    items: action.json.nodes.map(d => d.id)
                }
            }
        case FETCH_GRAPH_FAILURE:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    isFetching: false
                }
            }
        default: {
            return state;
        }
    }
}
