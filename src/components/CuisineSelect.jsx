import * as React from "react";
import { Dropdown } from "semantic-ui-react";

export const CuisineSelect = ({ cuisines, onSelectCuisines }) => (
    <Dropdown
        fluid
        search
        selection
        options={
            cuisines.map(cuisine => ({
                text: cuisine.name,
                value: cuisine.id,
                selected: cuisine.selected
            }))
        }
        onChange={
            (event, { value }) => onSelectCuisines([value])
        }
        value={ cuisines.filter(cuisine => cuisine.selected).map(cuisine => cuisine.id)[0] }
    />
);
