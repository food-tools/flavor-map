import { connect } from "react-redux";
import { SearchBar } from "../components/SearchBar";
import { setSearchTerm } from "../actions/actions";

const mapStateToProps = (state, ownProps) => {
    const filteredIngredients = state.results.ingredients.items
        .map(id => state.data.ingredients[id])
        .filter(ingredient => ingredient.name.toLowerCase().indexOf(state.options.searchTerm) >= 0);
    const filteredCuisines = state.results.cuisines.items
        .map(id => state.data.cuisines[id])
        .filter(cuisine => cuisine.name.toLowerCase().indexOf(state.options.searchTerm) >= 0);
    return {
        searchTerm: state.options.searchTerm,
        ingredients: Array.from(filteredIngredients).slice(0, 5),
        cuisines: Array.from(filteredCuisines).slice(0, 5)
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSearchKeyUp: (value) => dispatch(setSearchTerm(value)),
        onSelectSearchResult: (value) => console.log(value)
    };
}

export const Search = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar)
