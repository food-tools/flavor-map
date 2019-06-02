import * as React from 'react';
import styled from 'styled-components';
import FlavorMapLayout from '../containers/FlavorMapLayout';
import Cuisines from '../containers/Cuisines';
import ColorEncodings from '../containers/ColorEncodings';
import IngredientSearch from '../containers/IngredientSearch';
import Ingredient from '../containers/Ingredient';
import * as Styles from '../assets/CustomStyles.css';

const Viewport = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

const ColumnOne = styled.div`
  flex-grow: 1;
  width: 25vw;
`;

const ColumnTwo = styled.div`
  flex-grow: 2;
  width: 50vw;
`;

const StickyFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

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

const View = ({ isFetchingGraph, isFetchingCuisines, selectedNode }) => (
  <>
    {
      !isFetchingGraph && !isFetchingCuisines
        ? <FlavorMapLayout />
        : null
    }
    <Viewport>
      <Grid>
        <ColumnOne />
        <ColumnTwo>
          <br />
          <IngredientSearch />
        </ColumnTwo>
        <ColumnOne>
          <StickyFooter>
            <div />
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
          </StickyFooter>
        </ColumnOne>
      </Grid>
    </Viewport>
  </>
);

export default View;
