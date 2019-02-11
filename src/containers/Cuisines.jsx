import { connect } from "react-redux";
import { CuisineSelect } from "../components/CuisineSelect";
import { setSelectedCuisines } from "../actions/actions";

const mapStateToProps = (state, ownProps) => {
    return {
        cuisines: state.results.cuisines.items.map(id => ({
            ...state.data.cuisines[id],
            selected: state.options.selectedCuisines.indexOf(id) >= 0
        }))
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSelectCuisines: (cuisines) => dispatch(setSelectedCuisines(cuisines))
    };
}

export const Cuisines = connect(
    mapStateToProps,
    mapDispatchToProps
)(CuisineSelect)
