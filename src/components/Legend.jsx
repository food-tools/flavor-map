import React from 'react';
import styled from 'styled-components';

const Dot = styled.div`
  height: 1em;
  width: 1em;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const LegendRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Legend = () => (
  <LegendRow>
    <Dot color="blue" />
    <em>Click to view ingredient properties and pairings</em>
  </LegendRow>
);

export default Legend;
