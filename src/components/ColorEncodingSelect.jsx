import * as React from 'react';
import { Dropdown, Header } from 'semantic-ui-react';

const ColorEncodingSelect = ({ colorEncodings, onSelectColorEncoding }) => (
  <>
    <Header size="tiny">Color Encoding</Header>
    <Dropdown
      fluid
      search
      selection
      options={
        colorEncodings.map(colorEncoding => ({
          text: colorEncoding.text,
          value: colorEncoding.name,
          selected: colorEncoding.selecte,
        }))
      }
      onChange={
          (e, { value }) => onSelectColorEncoding(value)
      }
      value={colorEncodings.filter(colorEncoding => colorEncoding.selected)[0].name}
    />
  </>
);

export default ColorEncodingSelect;
