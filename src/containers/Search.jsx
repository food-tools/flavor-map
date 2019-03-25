import { connect } from "react-redux";
import { SearchBar } from "../components/SearchBar";
import { setSearchTerm, setSelectedCuisines, setSelectedNode } from "../actions/actions";

const mapStateToProps = (state, ownProps) => {
    const filteredIngredients = state.results.ingredients.items
        .map(id => state.data.ingredients[id])
        .filter(ingredient => ingredient.name.toLowerCase().indexOf(state.options.searchTerm.toLowerCase()) >= 0);
    const filteredCuisines = state.results.cuisines.items
        .map(id => state.data.cuisines[id])
        .filter(cuisine => cuisine.name.toLowerCase().indexOf(state.options.searchTerm.toLowerCase()) >= 0);
    return {
        searchTerm: state.options.searchTerm,
        ingredients: Array.from(filteredIngredients).slice(0, 5),
        cuisines: Array.from(filteredCuisines).slice(0, 5),
        stateIngredients: state.data.ingredients
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSearchKeyUp: (value) => dispatch(setSearchTerm(value)),
        onSelectIngredient: (value) => {
            dispatch(setSelectedNode(value));
        },
        onSelectCuisine: (value) => {
            dispatch(setSelectedCuisines([value]));
        },
    };
}

export const Search = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar)
