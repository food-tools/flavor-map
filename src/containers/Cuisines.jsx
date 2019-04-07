import { connect } from "react-redux";
import { CuisineSelect } from "../components/CuisineSelect";
import { setSelectedCuisine } from "../actions/actions";

const mapStateToProps = (state, ownProps) => {
    return {
        cuisines: state.results.cuisines.items.map(id => ({
            ...state.data.cuisines[id],
            selected: state.options.selectedCuisine == id
        }))
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSelectCuisine: (cuisine) => cuisine === "" ? dispatch(setSelectedCuisine(null)) : dispatch(setSelectedCuisine(cuisine))
    };
}

export const Cuisines = connect(
    mapStateToProps,
    mapDispatchToProps
)(CuisineSelect)
