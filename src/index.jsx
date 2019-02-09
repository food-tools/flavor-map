import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import { flavorMap } from "./reducers/flavorMap";

import { getGraph } from "./actions/actions";

import App from "./components/App";

const store = createStore(flavorMap, applyMiddleware(thunk));

console.log("initial", store.getState());

store.subscribe(() => console.log(store.getState()));
store.dispatch(getGraph());

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
);
