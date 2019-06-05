import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  pointer-events: all;
  box-shadow: 0em 0em 5px 5px #FAFAFA;
  font-family: 'IBM Plex Sans', sans-serif;
`;

const Legend = styled.div`
  padding: 0.5em;
  background-color: #FAFAFA;
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 300;
`;

const Title = styled.h2`
  margin: 0px;
`;

const Table = styled.table`
  width: 100%;
  font-size: 12px;
`;
const TableBody = styled.tbody``;
const TableRow = styled.tr``;
const TableCell = styled.td`
  text-align: center;
`;

const SmallText = styled.strong`
  color: #fc6076;
  font-size: 10px;
  text-transform: uppercase;
`;

const Drilldown = ({
  id,
  name,
  func,
  season,
  season_text,
  volume,
  taste,
  weight,
  techniques,
  pairings,
  cuisines,
}) => (
  <Wrapper>
    <Legend>
      <Table>
        <TableBody>
          {
            id && (
            <TableRow>
              <TableCell>
                <SmallText>
                  SELECTED INGREDIENT
                </SmallText>
                <br />
                <Title>
                  {name}
                </Title>
              </TableCell>
            </TableRow>
            )
          }
          {
            pairings && (
              <TableRow>
                <TableCell>
                  <em>
                    Pairs with&nbsp;
                    {`${pairings.length}`}
                    &nbsp;other ingredients
                  </em>
                </TableCell>
              </TableRow>
            )
          }
          {
            cuisines && (
              <TableRow>
                <TableCell>
                  <SmallText>
                    Cuisines
                  </SmallText>
                  <br />
                  {
                    cuisines
                      .map(
                        cuisine => cuisine.name
                          .replace('cuisines', '')
                          .replace('cuisine', '')
                          .trim(),
                      )
                      .sort((a, b) => (a < b ? 1 : -1))
                      .join(', ')
                  }
                </TableCell>
              </TableRow>
            )
          }
          {
            func && (
              <TableRow>
                <TableCell>
                  <SmallText>
                    Function
                  </SmallText>
                  <br />
                  { func }
                </TableCell>
              </TableRow>
            )
          }
          {
            season && (
              <TableRow>
                <TableCell>
                  <SmallText>
                    Season
                  </SmallText>
                  <br />
                  { season }
                </TableCell>
              </TableRow>
            )
          }
          {
            volume && (
              <TableRow>
                <TableCell>
                  <SmallText>
                    Volume
                  </SmallText>
                  <br />
                  { volume }
                </TableCell>
              </TableRow>
            )
          }
          {
            taste && (
            <TableRow>
              <TableCell>
                <SmallText>
                  Taste
                </SmallText>
                <br />
                { taste }
              </TableCell>
            </TableRow>
            )
          }
          {
            weight && (
              <TableRow>
                <TableCell>
                  <SmallText>
                    Weight
                  </SmallText>
                  <br />
                  { weight }
                </TableCell>
              </TableRow>
            )
          }
          {
            techniques && (
              <TableRow>
                <TableCell>
                  <SmallText>
                    Techniques
                  </SmallText>
                  <br />
                  { techniques }
                </TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </Legend>
  </Wrapper>
);
export default Drilldown;
