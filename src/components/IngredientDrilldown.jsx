import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  pointer-events: all;
  box-shadow: '0px 0px 1em 1.5em #ffffff';
`;

const Legend = styled.div`
  padding: 0.5em;
  background-color: #fff;
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 300;
`;

const Title = styled.h2`
  margin: 0px;
`;

const Drilldown = ({ selectedNode }) => (
  <Wrapper>
    <Legend>
      <Title>
        {selectedNode.name}
      </Title>
      <br />
      <table>
        
        {
          selectedNode.function && (
            <tr>
              <td>
                <strong>Function:</strong>
              </td>
              <td style={{ textAlign: 'right' }}>
                { selectedNode.function }
              </td>
            </tr>
          )
        }
        {
          selectedNode.season_text && (
            <tr>
              <td>
                <strong>Season:</strong>
              </td>
              <td style={{ textAlign: 'right' }}>
                { selectedNode.season_text }
              </td>
            </tr>
          )
        }
        {
          selectedNode.volume && (
            <tr>
              <td>
                <strong>Volume:</strong>
              </td>
              <td style={{ textAlign: 'right' }}>
                { selectedNode.volume }
              </td>
            </tr>
          )
        }
        {
          selectedNode.taste && (
            <tr>
              <td>
                <strong>Taste:</strong>
              </td>
              <td style={{ textAlign: 'right' }}>
                { selectedNode.taste }
              </td>
            </tr>
          )
        }
        {
          selectedNode.weight && (
            <tr>
              <td>
                <strong>Weight:</strong>
              </td>
              <td style={{ textAlign: 'right' }}>
                { selectedNode.weight }
              </td>
            </tr>
          )
        }
        {
          selectedNode.techniques && (
            <tr>
              <td>
                <strong>Techniques:</strong>
              </td>
              <td style={{ textAlign: 'right' }}>
                { selectedNode.techniques }
              </td>
            </tr>
          )
        }
      </table>
    </Legend>
  </Wrapper>
);

/*
function
season
volume
taste
weight
techniques
*/


export default Drilldown;
