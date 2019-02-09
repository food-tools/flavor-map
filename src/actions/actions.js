import fetch from "cross-fetch";

export const FETCH_GRAPH_REQUEST = "FETCH_GRAPH_REQUEST";
export const FETCH_GRAPH_SUCCESS = "FETCH_GRAPH_SUCCESS";
export const FETCH_GRAPH_FAILURE = "FETCH_GRAPH_FAILURE";
export const SET_SEARCH_TERM = "SET_SEARCH_TERM";
export const SET_SELECTED_NODE = "SET_SELECTED_NODE";
export const SET_HOVERED_NODE = "SET_HOVERED_NODE";
export const SET_SELECTED_CUISINE = "SET_SELECTED_CUISINE";
export const SET_NODE_COLOR_ENCODING = "SET_NODE_COLOR_ENCODING";
export const SET_LINK_STRENGTH_ENCODING = "SET_LINK_STRENGTH_ENCODING";

export const NodeColorEncodings = {
    ENCODE_TYPE: "ENCODE_TYPE",
    ENCODE_SEASON: "ENCODE_SEASON",
    ENCODE_FUNCTION: "ENCODE_FUNCTION",
    ENCODE_TASTE: "ENCODE_TASTE",
    ENCODE_WEIGHT: "ENCODE_WEIGHT",
    ENCODE_VOLUME: "ENCODE_VOLUME",
    ENCODE_TECHNIQUES: "ENCODE_TECHNIQUES"
};

export const LinkStrengthEncodings = {
    ALL_EQUAL: "ALL_EQUAL",
    BY_PAIRING_STRENGTH: "BY_PAIRING_STRENGTH"
};

export function getGraph() {
    return dispatch => {
        dispatch(fetchGraphRequest());
        fetch("/graph")
            .then(response =>
                response.json()
            )
            .then(json =>
                dispatch(fetchGraphSuccess(json))
            )
            .catch(error =>
                dispatch(fetchGraphFailure(error))
            )
    }
}

export function fetchGraphRequest() {
    return {
        type: FETCH_GRAPH_REQUEST
    }
}

export function fetchGraphSuccess(json) {
    return {
        type: FETCH_GRAPH_SUCCESS,
        json
    }
}

export function fetchGraphFailure(error) {
    return {
        type: FETCH_GRAPH_FAILURE,
        error
    }
}

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

export function setSelectedCuisine(id) {
    return {
        type: SET_SELECTED_CUISINE,
        id
    }
}

export function setNodeColorEncoding(encoding) {
    return {
        type: SET_NODE_COLOR_ENCODING,
        encoding
    }
}
