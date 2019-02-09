import { combineReducers } from "redux";
import { data } from "./data";
import { results } from "./results";
import { options } from "./options";
import { view } from "./view";

export const flavorMap = combineReducers({
    data,
    results,
    options,
    view
});
