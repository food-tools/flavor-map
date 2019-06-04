import { connect } from 'react-redux';
import Drilldown from '../components/Drilldown';

const mapStateToProps = (state) => {
  const { selectedNode } = state.options;

  if (!selectedNode) {
    return {};
  }

  const ingredient = state.data.ingredients[selectedNode];
  const cuisines = ingredient.cuisines.map(id => state.data.cuisines[id]);
  const pairings = state.data.pairings
    .filter(
      ({ source, target }) => source === selectedNode || target === selectedNode,
    )
    .map(
      ({ source, target }) => (
        source === selectedNode
          ? state.data.ingredients[target]
          : state.data.ingredients[source]
      ),
    );

  return {
    ...ingredient,
    func: ingredient.function,
    cuisines,
    pairings,
    id: selectedNode,
  };
};

const IngredientInfo = connect(
  mapStateToProps,
  null,
)(Drilldown);

export default IngredientInfo;
