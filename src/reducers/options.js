import {
    SET_SEARCH_TERM,
    SET_SELECTED_NODE,
    SET_HOVERED_NODE,
    SET_SELECTED_CUISINES,
    SET_NODE_COLOR_ENCODING,
    SET_LINK_STRENGTH_ENCODING,
    NodeColorEncodings,
    LinkStrengthEncodings,
    SET_ZOOM_TRANSFORM
} from "../actions/actions";

const initialState = {
    searchTerm: "",
    selectedNode: null,
    hoveredNode: null,
    selectedCuisines: [],
    nodeColorEncoding: NodeColorEncodings.ENCODE_SEASON, // changed this from ENCODE_TYPE for v1 data render
    linkStrengthEncoding: LinkStrengthEncodings.ALL_EQUAL,
    zoomTransform: {k: 1, x: 0, y: 0}
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
        case SET_ZOOM_TRANSFORM:
            return {
                ...state,
                zoomTransform: action.zoomTransform
            }
        default:
            return state;
    }
}
