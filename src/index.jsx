import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { flavorMapApp } from "./reducers/flavorMap";

import App from "./components/App";

const store = createStore(flavorMapApp);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
);
