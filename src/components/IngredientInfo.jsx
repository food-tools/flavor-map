import * as React from 'react';
import PropTypes from 'prop-types';
import { Header, List } from 'semantic-ui-react';

const IngredientInfo = ({
  name,
  type,
  func,
  season,
  taste,
  weight,
  volume,
  techniques,
}) => (
  <div>
    <Header size="medium">{name}</Header>
    <List>
      <List.Item>
        <strong>Type:</strong>
        {type}
      </List.Item>
      <List.Item>
        <strong>Function:</strong>
        {func}
      </List.Item>
      <List.Item>
        <strong>Season:</strong>
        {season}
      </List.Item>
      <List.Item>
        <strong>Taste:</strong>
        {taste}
      </List.Item>
      <List.Item>
        <strong>Weight:</strong>
        {weight}
      </List.Item>
      <List.Item>
        <strong>Volume:</strong>
        {volume}
      </List.Item>
      <List.Item>
        <strong>Techniques:</strong>
        {techniques}
      </List.Item>
    </List>
  </div>
);

IngredientInfo.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  func: PropTypes.string.isRequired,
  season: PropTypes.string.isRequired,
  taste: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  volume: PropTypes.string.isRequired,
  techniques: PropTypes.string.isRequired,
};

export default IngredientInfo;
