import * as React from "react";
import { List, Checkbox } from "semantic-ui-react";

export const CuisineList = ({ cuisines }) => (
    <List>
        {
            cuisines.map(cuisine => (
                <List.Item key={cuisine.id}>
                    <Checkbox label={cuisine.name} checked={ cuisine.selected } />
                </List.Item>
            ))
        }
    </List>
);
