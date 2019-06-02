import React from 'react';
import styled from 'styled-components';

const GradientBox = styled.div`
  width: 100%;
  height: 1em;
  background-image: linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%);
`;

const Legend = styled.div`
  padding: 0.5em;
  background-color: #fff;
`;

const Title = styled.h2`
  margin: 0px;
`;

const Information = () => (
  <div style={{ boxShadow: '0px 0px 1em 1.5em #ffffff' }}>
    <Legend>
      <Title>
        The Flavor Map
      </Title>
      <p>
        <br />
        The world of food and flavor is a complex network of&nbsp;
        <em>pairings</em>
        &nbsp;&mdash; ingredients that taste good together.&nbsp;
        <em>The Flavor Bible</em>
        &nbsp;documents the favorability of countless pairings according to chefs.
        <br />
        <br />
        By Brett Fouss and Jack Vallerie 🍔
        <a href="https://food.tools">food.tools</a>
      </p>
    </Legend>
    <GradientBox />
  </div>
);

export default Information;
