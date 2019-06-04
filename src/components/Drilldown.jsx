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

const Drilldown = ({
  id,
  name,
  func,
  season,
  season_text,
  taste,
  weight,
  techniques,
  pairings,
  cuisines,
}) => (
  <Wrapper>
    <Legend>
      <Title>
        {name}
      </Title>
      <br />
      <table>
        {
          func && (
            <tr>
              <td>
                <strong>Function:</strong>
              </td>
              <td>
                { func }
              </td>
            </tr>
          )
        }
        {
          season && (
            <tr>
              <td>
                <strong>Season:</strong>
              </td>
              <td style={{ textAlign: 'right' }}>
                { season }
              </td>
            </tr>
          )
        }
        {
          volume && (
            <tr>
              <td>
                <strong>Volume:</strong>
              </td>
              <td>
                { volume }
              </td>
            </tr>
          )
        }
        {
          taste && (
            <tr>
              <td>
                <strong>Taste:</strong>
              </td>
              <td>
                { taste }
              </td>
            </tr>
          )
        }
        {
          weight && (
            <tr>
              <td>
                <strong>Weight:</strong>
              </td>
              <td>
                { weight }
              </td>
            </tr>
          )
        }
        {
          techniques && (
            <tr>
              <td>
                <strong>Techniques:</strong>
              </td>
              <td>
                { techniques }
              </td>
            </tr>
          )
        }
      </table>
    </Legend>
  </Wrapper>
);

export default Drilldown;
