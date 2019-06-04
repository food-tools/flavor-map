import { connect } from 'react-redux';
import IngredientDrilldown from '../components/IngredientDrilldown';

const mapStateToProps = state => ({
  selectedNode: state.data.ingredients[state.options.selectedNode],
});

const Drilldown = connect(
  mapStateToProps,
  null,
)(IngredientDrilldown);

export default Drilldown;
