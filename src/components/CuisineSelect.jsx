import * as React from "react";
import { Dropdown, Header } from "semantic-ui-react";

export const CuisineSelect = ({ cuisines, onSelectCuisine }) => (
    <div>
        <Header size="tiny">Select a cuisine</Header>
        <Dropdown
            fluid
            search
            selection
            clearable
            options={
                cuisines.map(cuisine => ({
                    text: cuisine.name,
                    value: cuisine.id,
                    selected: cuisine.selected
                }))
            }
            onChange={
                (event, { value }) => onSelectCuisine(value)
            }
            value={ cuisines.filter(cuisine => cuisine.selected).length > 0 ? cuisines.filter(cuisine => cuisine.selected).map(cuisine => cuisine.id)[0] : "" }
        />
    </div>
);
