import {
  FETCH_GRAPH_REQUEST,
  FETCH_GRAPH_SUCCESS,
  FETCH_GRAPH_FAILURE,
  FETCH_CUISINES_REQUEST,
  FETCH_CUISINES_SUCCESS,
  FETCH_CUISINES_FAILURE,
} from '../actions/actions';

const initialState = {
  ingredients: {
    isFetching: false,
    lastUpdated: undefined,
    didInvalidate: false,
    items: [],
  },
  cuisines: {
    isFetching: false,
    lastUpdated: undefined,
    didInvalidate: false,
    items: [],
  },
};

const results = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GRAPH_REQUEST:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          isFetching: true,
        },
      };
    case FETCH_GRAPH_SUCCESS:
      return {
        ...state,
        ingredients: {
          isFetching: false,
          lastUpdated: action.receivedAt,
          didInvalidate: false,
          items: action.json.nodes.map(d => d.id),
        },
      };
    case FETCH_GRAPH_FAILURE:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          isFetching: false,
        },
      };
    case FETCH_CUISINES_REQUEST:
      return {
        ...state,
        cuisines: {
          ...state.cuisines,
          isFetching: true,
        },
      };
    case FETCH_CUISINES_SUCCESS:
      return {
        ...state,
        cuisines: {
          isFetching: false,
          lastUpdated: action.receivedAt,
          didInvalidate: false,
          items: action.json.map(d => d.id),
        },
      };
    case FETCH_CUISINES_FAILURE:
      return {
        ...state,
        cuisines: {
          ...state.cuisines,
          isFetching: false,
        },
      };
    default:
      return state;
  }
};

export default results;
