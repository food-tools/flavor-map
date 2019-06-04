import React from 'react';

const IngredientInfoBox = ({
  id,
  name,
  func,
  season,
  taste,
  pairings,
}) => (
  id
    ? (
      <div>
        {name}
        <br />
        Number of pairings: {`${pairings.length}`}
      </div>
    )
    : ''
);

/*
{
  pairings.reduce(
    (s, pairing) => (s === '' ? `${pairing.name}` : `${s}, ${pairing.name}`),
    '',
  )
}
*/

export default IngredientInfoBox;
