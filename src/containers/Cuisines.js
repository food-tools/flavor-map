import { connect } from 'react-redux';
import { CuisineSelect } from '../components/CuisineSelect';
import { setSelectedCuisines } from '../actions/actions';

const mapStateToProps = state => ({
  cuisines: state.results.cuisines.items.map(
    id => ({
      ...state.data.cuisines[id],
      selected: state.options.selectedCuisines.indexOf(id) >= 0,
    }),
  ),
});

const mapDispatchToProps = dispatch => ({
  onSelectCuisines: (cuisines) => {
    if (cuisines[0] === '') {
      dispatch(setSelectedCuisines([]));
    } else {
      dispatch(setSelectedCuisines(cuisines));
    }
  },
});

const Cuisines = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CuisineSelect);

export default Cuisines;
