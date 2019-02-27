import * as React from "react";
import { Dropdown, Header } from "semantic-ui-react";

export const ColorEncodingSelect = ({ colorEncodings, onSelectColorEncoding }) => (
    <div>
        <Header size="tiny">Color Encoding</Header>
        <Dropdown
            fluid
            search
            selection
            options={
                colorEncodings.map(colorEncoding => ({
                    text: colorEncoding.text,
                    value: colorEncoding.name,
                    selected: colorEncoding.selected
                }))
            }
            onChange={
                (event, { value }) => onSelectColorEncoding(value)
            }
            value={ colorEncodings.filter(colorEncoding => colorEncoding.selected)[0].name }
        />
    </div>
);
