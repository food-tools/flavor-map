import { connect } from 'react-redux';
import { setSelectedNode, setHoveredNode } from '../actions/actions';
import FlavorMapForceLayout from '../components/FlavorMapForceLayout';

const intersection = (a, b) => a.filter(elem => b.indexOf(elem) >= 0);
const union = (a, b) => [...a, ...b.filter(elem => a.indexOf(elem) < 0)];

const mapStateToProps = (state) => {
  const { selectedNode, hoveredNode } = state.options;

  const cuisines = state.results.cuisines.items.map(
    id => state.data.cuisines[id],
  );

  const ingredients = cuisines.reduce(
    (result, cuisine) => union(result, cuisine.ingredients),
    [],
  );

  // record overlap between pairs of cuisines
  const pairs = cuisines
    .map(
      (cuisineA, i) => cuisines.map(
        (cuisineB, j) => (
          i >= j
            ? null
            : ({
              source: {
                id: cuisineA.id,
                ingredients: cuisineA.ingredients,
              },
              target: {
                id: cuisineB.id,
                ingredients: cuisineB.ingredients,
              },
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
        source: pair.source.id,
        target: pair.target.id,
        intersection: intersection(pair.source.ingredients, pair.target.ingredients),
      }),
    )
    .filter(
      pair => pair.intersection.length > 0,
    )
    .filter(
      pair => pair.intersection.length >= 50,
    );

  const links = selectedNode
    ? state.data.pairings
      .filter(
        ({ source, target }) => source === selectedNode || target === selectedNode,
      )
      .map(
        ({ source, target }) => ({
          source: state.data.ingredients[source],
          target: state.data.ingredients[target],
        }),
      )
    : [];

  return {
    links,
    nodes: ingredients.map(
      id => state.data.ingredients[id],
    ),
    regions: cuisines.map(
      ({ id }) => state.data.cuisines[id],
    ),
    regionLinks: pairs.map(
      ({ source, target }) => ({
        source: state.data.cuisines[source],
        target: state.data.cuisines[target],
      }),
    ),
    memberAccessor: 'ingredients',
    selectedNode: selectedNode ? state.data.ingredients[selectedNode] : null,
    hoveredNode: hoveredNode ? state.data.ingredients[hoveredNode] : null,
  };
};

const mapDispatchToProps = dispatch => ({
  onNodeMouseOver: id => dispatch(setHoveredNode(id)),
  onNodeMouseOut: () => dispatch(setHoveredNode(null)),
  onClickNode: id => dispatch(setSelectedNode(id)),
  onClickBackground: () => dispatch(setSelectedNode(null)),
});

const FlavorMap = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlavorMapForceLayout);

export default FlavorMap;
