import React from 'react';
import styled from 'styled-components';
import Information from './Information';
import FlavorMapLayout from '../containers/FlavorMapLayout';
import IngredientSearch from '../containers/IngredientSearch';
import IngredientDrilldown from '../containers/IngredientDrilldown';

const Viewport = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Row = styled.div`
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
  height: calc(100vh - 1em);
`;

const GradientBox = styled.div`
  width: 100%;
  height: 1em;
  background-image: linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%);
`;

const View = ({ isFetchingGraph, isFetchingCuisines, selectedNode }) => (
  <>
    {
      !isFetchingGraph && !isFetchingCuisines && <FlavorMapLayout />
    }
    <Viewport>
      <Grid>
        <Row>
          <ColumnOne>
            <StickyFooter>
              <div />
              <Information />
            </StickyFooter>
          </ColumnOne>
          <ColumnTwo>
            <br />
            <IngredientSearch />
          </ColumnTwo>
          <ColumnOne>
            {
              selectedNode && (
                <StickyFooter>
                  <div />
                  <IngredientDrilldown />
                </StickyFooter>
              )
            }
          </ColumnOne>
        </Row>
        <Row>
          <GradientBox />
        </Row>
      </Grid>
    </Viewport>
  </>
);

export default View;
