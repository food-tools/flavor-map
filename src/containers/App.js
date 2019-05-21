import { connect } from 'react-redux';
import View from '../components/View';

const mapStateToProps = state => ({
  isFetchingGraph: state.results.ingredients.isFetching,
  isFetchingCuisines: state.results.cuisines.isFetching,
  selectedNode: state.options.selectedNode,
});

const App = connect(
  mapStateToProps,
  null,
)(View);

export default App;
