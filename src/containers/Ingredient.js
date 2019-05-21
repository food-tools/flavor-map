import { connect } from 'react-redux';
import IngredientInfo from '../components/IngredientInfo';

// rename "function" as "func" because function is a JavaScript keyword
const mapStateToProps = state => ({
  ...state.options.selectedNode,
  func: state.options.selectedNode.function,
});

const Ingredient = connect(
  mapStateToProps,
  null,
)(IngredientInfo);

export default Ingredient;
