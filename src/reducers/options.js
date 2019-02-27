import {
    SET_SEARCH_TERM,
    SET_SELECTED_NODE,
    SET_NODE_SELECTION_TRANSITION,
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
    isNodeSelectionTransition: false,
    hoveredNode: null,
    selectedCuisines: [],
    nodeColorEncoding: NodeColorEncodings.ENCODE_TYPE,
    linkStrengthEncoding: LinkStrengthEncodings.ALL_EQUAL,
    zoomTransform: null
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
        case SET_NODE_SELECTION_TRANSITION:
            return {
                ...state,
                isNodeSelectionTransition: action.bool
            }
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
