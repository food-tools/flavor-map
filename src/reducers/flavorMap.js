import {
    SET_SEARCH_TERM,
    SET_SELECTED_NODE,
    SET_SELECTED_CUISINE,
    SET_NODE_COLOR_ENCODING,
    NodeColorEncodings
} from "../actions/actions";

const initialState = {
    searchTerm: "",
    selectedNode: undefined,
    selectedCuisine: undefined,
    nodeColorEncoding: NodeColorEncodings.ENCODE_TYPE
};

export function flavorMapApp(state=initialState, action) {
    switch (action.type) {
        case SET_SEARCH_TERM:
            return {
                ...state,
                action.term
            };
        case SET_SELECTED_NODE:
            return {
                ...state,
                action.id
            };
        default:
            return state;
    }
}
