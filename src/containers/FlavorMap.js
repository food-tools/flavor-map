import { connect } from 'react-redux';
import FlavorMapGraph from '../components/FlavorMapGraph';
import {
  setHoveredNode,
  setSelectedNode,
  setZoomTransform,
  setNodeSelectionTransition,
} from '../actions/actions';
import { GetColorScheme, GetColorKey } from '../assets/IngredientPropertyColors';

const mapStateToProps = (state) => {
  const { data, options, results } = state;
  const colorScheme = GetColorScheme(options.nodeColorEncoding);
  const colorKey = GetColorKey(options.nodeColorEncoding);
  return {
    ingredients: results.ingredients.items.map(
      id => state.data.ingredients[id],
    ),
    pairings: data.pairings.map(
      pairing => ({
        source: data.ingredients[pairing.source],
        target: data.ingredients[pairing.target],
      }),
    ),
    cuisines: data.cuisines,
    nodeColors: state.results.ingredients.items.reduce(
      (result, id) => ({
        ...result,
        [id]: colorScheme[data.ingredients[id][colorKey].toUpperCase()],
      }),
      {},
    ),
    ...options,
  };
};

const mapDispatchToProps = dispatch => ({
  onNodeMouseOver: id => dispatch(setHoveredNode(id)),
  onNodeMouseOut: () => dispatch(setHoveredNode(null)),
  onNodeClick: id => dispatch(setSelectedNode(id)),
  nodeSelectionTransition: bool => dispatch(setNodeSelectionTransition(bool)),
  onBackgroundClick: () => dispatch(setSelectedNode(null)),
  onZoom: zoomTransform => dispatch(setZoomTransform(zoomTransform)),
});

const FlavorMap = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlavorMapGraph);

export default FlavorMap;
