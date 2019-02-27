import { connect } from "react-redux";
import { View } from "../components/View";

const mapStateToProps = (state, ownProps) => {
    return {
        isFetchingGraph: state.results.ingredients.isFetching,
        isFetchingCuisines: state.results.cuisines.isFetching,
        selectedNode: state.options.selectedNode
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
}

export const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
