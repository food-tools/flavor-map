import {
    SET_SEARCH_TERM,
    SET_SELECTED_NODE,
    SET_SELECTED_CUISINE,
    SET_NODE_COLOR_ENCODING,
    NodeColorEncodings
} from "../actions/actions";

const initialState = {
    data: {
        ingredients: [],
        cuisines: []
    },
    results: {
        ingredients: {
            isFetching: false,
            didInvalidate: false,
            items: []
        },
        cuisines: {
            isFetching: false,
            didInvalidate: false,
            items: []
        }
    },
    options: {
        searchTerm: "",
        selectedNode: null,
        selectedCuisine: null,
        nodeColorEncoding: NodeColorEncodings.ENCODE_TYPE
    }
};

export function flavorMapApp(state=initialState, action) {
    switch (action.type) {
        case SET_SEARCH_TERM:
            return {
                ...state,
                options: {
                    ...state.options,
                    searchTerm: action.term
                }
            };
        case SET_SELECTED_NODE:
            return {
                ...state,
                options: {
                    ...state.options,
                    selectedNode: action.id
                }
            };
        case SET_SELECTED_CUISINE:
            return {
                ...state,
                options: {
                    ...state.options,
                    selectedCuisine: action.id
                }
            };
        case SET_NODE_COLOR_ENCODING:
            return {
                ...state,
                options: {
                    ...state.options,
                    nodeColorEncoding: action.encoding
                }
            };
        default:
            return state;
    }
}
