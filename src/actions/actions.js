export const SET_SEARCH_TERM = "SET_SEARCH_TERM";
export const SET_SELECTED_NODE = "SET_SELECTED_NODE";
export const SET_SELECTED_CUISINE = "SET_SELECTED_CUISINE";
export const SET_NODE_COLOR_ENCODING = "SET_NODE_COLOR_ENCODING";

export const NodeColorEncodings = {
    ENCODE_SEASON: "ENCODE_SEASON",
    ENCODE_FUNCTION: "ENCODE_FUNCTION",
    ENCODE_TASTE: "ENCODE_TASTE",
    ENCODE_WEIGHT: "ENCODE_WEIGHT",
    ENCODE_VOLUME: "ENCODE_VOLUME",
    ENCODE_TECHNIQUES: "ENCODE_TECHNIQUES"
};

export function setSearchTerm(term) {
    return {
        type: SET_SEARCH_TERM,
        term
    }
}

export function setSelectedNode(id) {
    return {
        type: SET_SELECTED_NODE,
        id
    }
}

export function setSelectedCuisine(cuisine) {
    return {
        type: SET_SELECTED_CUISINE,
        cuisine
    }
}

export function SET_NODE_COLOR_ENCODING(encoding) {
    return {
        type: SET_NODE_COLOR_ENCODING,
        encoding
    }
}
