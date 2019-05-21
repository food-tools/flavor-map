import { connect } from 'react-redux';
import { SearchBar } from '../components/SearchBar';
import { setSearchTerm, setSelectedCuisines, setSelectedNode } from '../actions/actions';

const mapStateToProps = (state) => {
  const { data, options, results } = state;
  const { searchTerm } = options;
  const filteredIngredients = results.ingredients.items
    .map(id => data.ingredients[id])
    .filter(ingredient => ingredient.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0);
  const filteredCuisines = results.cuisines.items
    .map(id => data.cuisines[id])
    .filter(cuisine => cuisine.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0);
  return {
    searchTerm,
    ingredients: [...filteredIngredients].slice(0, 5),
    cuisines: [...filteredCuisines].slice(0, 5),
    stateIngredients: data.ingredients,
  };
};

const mapDispatchToProps = dispatch => ({
  onSearchKeyUp: value => dispatch(setSearchTerm(value)),
  onSelectIngredient: value => dispatch(setSelectedNode(value)),
  onSelectCuisine: value => dispatch(setSelectedCuisines([value])),
});

const Search = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBar);

export default Search;
