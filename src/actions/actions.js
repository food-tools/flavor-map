/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
/* eslint-disable no-unresolved */

export const FETCH_GRAPH_REQUEST = 'FETCH_GRAPH_REQUEST';
export const FETCH_GRAPH_SUCCESS = 'FETCH_GRAPH_SUCCESS';
export const FETCH_GRAPH_FAILURE = 'FETCH_GRAPH_FAILURE';
export const FETCH_CUISINES_REQUEST = 'FETCH_CUISINES_REQUEST';
export const FETCH_CUISINES_SUCCESS = 'FETCH_CUISINES_SUCCESS';
export const FETCH_CUISINES_FAILURE = 'FETCH_CUISINES_FAILURE';
export const FETCH_CUISINE_INGREDIENTS_REQUEST = 'FETCH_CUISINE_INGREDIENTS_REQUEST';
export const FETCH_CUISINE_INGREDIENTS_SUCCESS = 'FETCH_CUISINE_INGREDIENTS_SUCCESS';
export const FETCH_CUISINE_INGREDIENTS_FAILURE = 'FETCH_CUISINE_INGREDIENTS_FAILURE';
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const SET_SELECTED_NODE = 'SET_SELECTED_NODE';
export const SET_NODE_SELECTION_TRANSITION = 'SET_NODE_SELECTION_TRANSITION';
export const SET_HOVERED_NODE = 'SET_HOVERED_NODE';
export const SET_SELECTED_CUISINE = 'SET_SELECTED_CUISINE';
export const SET_ZOOM_TRANSFORM = 'SET_ZOOM_TRANSFORM';
export const SET_NODE_COLOR_ENCODING = 'SET_NODE_COLOR_ENCODING';
export const SET_LINK_STRENGTH_ENCODING = 'SET_LINK_STRENGTH_ENCODING';

let graphData;
let cuisineData;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  graphData = require('../../data-v1/graph-no-null-cuisines.json');
} else {
  graphData = require('./graph.json');
}

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  cuisineData = require('../../data-v1/cuisines.json');
} else {
  cuisineData = require('./cuisines.json');
}

export const NodeColorEncodings = {
  ENCODE_TYPE: 'ENCODE_TYPE',
  ENCODE_SEASON: 'ENCODE_SEASON',
  ENCODE_FUNCTION: 'ENCODE_FUNCTION',
  ENCODE_TASTE: 'ENCODE_TASTE',
  ENCODE_WEIGHT: 'ENCODE_WEIGHT',
  ENCODE_VOLUME: 'ENCODE_VOLUME',
  ENCODE_TECHNIQUES: 'ENCODE_TECHNIQUES',
};

export const LinkStrengthEncodings = {
  ALL_EQUAL: 'ALL_EQUAL',
  BY_PAIRING_STRENGTH: 'BY_PAIRING_STRENGTH',
};

export function fetchGraphRequest() {
  return {
    type: FETCH_GRAPH_REQUEST,
  };
}

export function fetchGraphSuccess(json) {
  return {
    type: FETCH_GRAPH_SUCCESS,
    receivedAt: new Date(),
    json,
  };
}

export function fetchGraphFailure(error) {
  return {
    type: FETCH_GRAPH_FAILURE,
    error,
  };
}

export function fetchCuisinesRequest() {
  return {
    type: FETCH_CUISINES_REQUEST,
  };
}

export function fetchCuisinesSuccess(json) {
  return {
    type: FETCH_CUISINES_SUCCESS,
    receivedAt: new Date(),
    json,
  };
}

export function fetchCuisinesFailure(error) {
  return {
    type: FETCH_CUISINES_FAILURE,
    error,
  };
}

export function fetchCuisineIngredientsRequest() {
  return {
    type: FETCH_CUISINE_INGREDIENTS_REQUEST,
  };
}

export function fetchCuisineIngredientsSuccess(json) {
  return {
    type: FETCH_CUISINE_INGREDIENTS_SUCCESS,
    receivedAt: new Date(),
    json,
  };
}

export function fetchCuisineIngredientsFailure(error) {
  return {
    type: FETCH_CUISINE_INGREDIENTS_FAILURE,
    error,
  };
}

export function setSearchTerm(term) {
  return {
    type: SET_SEARCH_TERM,
    term,
  };
}

export function setSelectedNode(id) {
  return {
    type: SET_SELECTED_NODE,
    id,
  };
}

export function setNodeSelectionTransition(bool) {
  return {
    type: SET_NODE_SELECTION_TRANSITION,
    bool,
  };
}

export function setHoveredNode(id) {
  return {
    type: SET_HOVERED_NODE,
    id,
  };
}

export function setSelectedCuisine(id) {
  return {
    type: SET_SELECTED_CUISINE,
    id,
  };
}

export function setNodeColorEncoding(encoding) {
  return {
    type: SET_NODE_COLOR_ENCODING,
    encoding,
  };
}

export function setZoomTransform(zoomTransform) {
  return {
    type: SET_ZOOM_TRANSFORM,
    zoomTransform,
  };
}


export function getGraph() {
  return (dispatch) => {
    dispatch(fetchGraphRequest());
    dispatch(fetchGraphSuccess(graphData));
  };
}

export function getCuisines() {
  return (dispatch) => {
    dispatch(fetchCuisinesRequest());
    dispatch(fetchCuisinesSuccess(cuisineData));
  };
}
