import * as React from "react";
import { Dropdown } from "semantic-ui-react";

export const ColorEncodingSelect = ({ colorEncodings, onSelectColorEncoding }) => (
    <Dropdown
        fluid
        search
        selection
        options={
            colorEncodings.map(colorEncoding => ({
                text: colorEncoding.name,
                value: colorEncoding.name,
                selected: colorEncoding.selected
            }))
        }
        onChange={
            (event, { value }) => onSelectColorEncoding(value)
        }
        value={ colorEncodings.filter(colorEncoding => colorEncoding.selected)[0].name }
    />
);
