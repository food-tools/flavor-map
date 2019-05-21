import { connect } from 'react-redux';
import FlavorMapForceLayout from '../components/FlavorMapForceLayout';

const intersection = (a, b) => a.filter(elem => b.indexOf(elem) >= 0);

const mapStateToProps = (state) => {
  const ingredients = state.results.ingredients.items.map(id => state.data.ingredients[id]);
  const cuisines = state.results.cuisines.items.map(id => state.data.cuisines[id]);

  // record overlap between pairs of cuisines
  const pairs = cuisines
    .map(
      (cuisineA, i) => cuisines.map(
        (cuisineB, j) => (
          i >= j
            ? null
            : ({
              source: cuisineA,
              target: cuisineB,
            })
        ),
      ),
    )
    .reduce(
      (result, p) => [...result, ...p],
      [],
    )
    .filter(
      pair => pair !== null,
    )
    .map(
      pair => ({
        ...pair,
        intersection: intersection(pair.source.ingredients, pair.target.ingredients),
      }),
    )
    .filter(
      pair => pair.intersection.length > 0,
    );

  return {
    nodes: ingredients.map(
      ingredient => ({
        id: ingredient.id,
        data: {
          ...ingredient,
        },
      }),
    ),
    regions: cuisines.map(
      cuisine => ({
        name: cuisine.name,
        members: cuisine.ingredients,
        data: {
          ...cuisine,
        },
      }),
    ),
    regionLinks: pairs,
  };
};

const FlavorMap = connect(
  mapStateToProps,
  null,
)(FlavorMapForceLayout);

export default FlavorMap;
