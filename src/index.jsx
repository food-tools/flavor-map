import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import flavorMap from './reducers/flavorMap';
import { getGraph, getCuisines } from './actions/actions';
import App from './containers/App';

const store = createStore(flavorMap, applyMiddleware(thunk));

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  console.log('initial', store.getState());
  store.subscribe(() => console.log(store.getState()));
}

store.dispatch(getGraph());
store.dispatch(getCuisines());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
