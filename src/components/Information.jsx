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
  font-size: 14px;
`;

const Title = styled.h2`
  margin: 0px;
  font-family: 'Alegreya';
  font-size: 28px;
  font-weight: 700;
`;

const SmallText = styled.strong`
  color: #ff9a44;
  font-size: 10px;
  text-transform: uppercase;
`;

const Colored = styled.span`
  color: ${props => props.color};
`;

const Information = () => (
  <Wrapper>
    <Legend>
      <Title>
        The Flavor Map
      </Title>
      <br />
      The world of food and flavor is a complex network of&nbsp;
      <em>pairings</em>
      &nbsp;&mdash; ingredients that taste good together.&nbsp;
      <em>The Flavor Bible</em>
      &nbsp;documents the favorability of countless pairings according to chefs.
      <br />
      <br />
      <SmallText>
        How To Read
      </SmallText>
      <br />
      &#11044;&nbsp;&mdash;&nbsp;An&nbsp;
      <em>ingredient</em>
      , lines indicate&nbsp;
      <em>pairings</em>
      <br />
      <br />
      Colors represent ingredient&nbsp;
      <em>seasonality</em>
      <br />
      <Colored color="#8FA874">&#11044;&nbsp;Spring</Colored>
      ,&nbsp;
      <Colored color="#D3C465">&#11044;&nbsp;Summer</Colored>
      ,&nbsp;
      <Colored color="#BA5734">&#11044;&nbsp;Autumn</Colored>
      ,&nbsp;
      <Colored color="#363457">&#11044;&nbsp;Winter</Colored>
      <br />
      <Colored color="#C4B2B2">&#11044;&nbsp;Year Round</Colored>
      ,&nbsp;
      <Colored color="#B0AEC4">&#11044;&nbsp;No data</Colored>
      &nbsp;
      <br />
      <br />
      <SmallText>
        How To Use
      </SmallText>
      <br />
      Click an ingredient to view pairings and more
      <br />
      Click again to dismiss
      <br />
      Use the search bar to find ingredients quickly!
      <br />
      <br />
      By Brett Fouss and Jack Vallerie 🍔
      <a href="https://food.tools">food.tools</a>
    </Legend>
  </Wrapper>
);

export default Information;
