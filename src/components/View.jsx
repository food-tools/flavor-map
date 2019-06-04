import React from 'react';
import styled from 'styled-components';
import Information from './Information';
import FlavorMapLayout from '../containers/FlavorMapLayout';
import IngredientSearch from '../containers/IngredientSearch';
import Drilldown from '../containers/Drilldown';

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

const View = ({ isFetchingGraph, isFetchingCuisines, selectedNode }) => (
  <>
    {
      !isFetchingGraph && !isFetchingCuisines && <FlavorMapLayout />
    }
    <Viewport>
      <Grid>
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
          { selectedNode ? (
            <StickyFooter>
              <div />
              <Drilldown />
            </StickyFooter>
          ) : null}
        </ColumnOne>
      </Grid>
    </Viewport>
  </>
);

export default View;
