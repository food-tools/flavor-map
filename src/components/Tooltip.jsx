import React, { Component } from 'react';
import styled from 'styled-components';

const TooltipBox = styled.div`
  position: absolute;
  transform: ${props => props.transform};
  background-color: blue;
`;

const Tooltip = ({ x, y, children }) => (
  <TooltipBox transform={`translate(${x}px,${y}px)`}>
    { children }
  </TooltipBox>
);

/*

class Tooltip extends React.Component {
  render() {
    const { x, y, children } = props;
    return (
      <>
        ...children
      </>
    );
  }
}
*/

export default Tooltip;
