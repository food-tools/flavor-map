import {
    SET_SEARCH_TERM,
    SET_SELECTED_NODE,
    SET_HOVERED_NODE,
    SET_SELECTED_CUISINES,
    SET_NODE_COLOR_ENCODING,
    SET_LINK_STRENGTH_ENCODING,
    NodeColorEncodings,
    LinkStrengthEncodings
} from "../actions/actions";

const initialState = {
    searchTerm: "",
    selectedNode: null,
    hoveredNode: null,
    selectedCuisines: [],
    nodeColorEncoding: NodeColorEncodings.ENCODE_TYPE,
    linkStrengthEncoding: LinkStrengthEncodings.ALL_EQUAL
};

export const options = (state=initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_TERM:
            return {
                ...state,
                searchTerm: action.term
            };
        case SET_SELECTED_NODE:
            return {
                ...state,
                selectedNode: action.id
            };
        case SET_HOVERED_NODE:
            return {
                ...state,
                hoveredNode: action.id
            }
        case SET_SELECTED_CUISINES:
            return {
                ...state,
                selectedCuisines: action.ids
            };
        case SET_NODE_COLOR_ENCODING:
            return {
                ...state,
                nodeColorEncoding: action.encoding
            };
        case SET_LINK_STRENGTH_ENCODING:
            return {
                ...state,
                linkStrengthEncoding: action.encoding
            };
        default:
            return state;
    }
}
