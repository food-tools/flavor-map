import { connect } from 'react-redux';
import CuisineSelect from '../components/CuisineSelect';
import { setSelectedCuisine } from '../actions/actions';

const mapStateToProps = state => ({
  cuisines: state.results.cuisines.items.map(
    id => ({
      ...state.data.cuisines[id],
      selected: state.options.selectedCuisine,
    }),
  ),
});

const mapDispatchToProps = dispatch => ({
  onSelectCuisines: (cuisine) => {
    if (cuisine === '') {
      dispatch(setSelectedCuisine(null));
    } else {
      dispatch(setSelectedCuisine(cuisine));
    }
  },
});

const Cuisines = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CuisineSelect);

export default Cuisines;
