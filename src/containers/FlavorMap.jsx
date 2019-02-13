import { connect } from "react-redux";
import { FlavorMapGraph } from "../components/FlavorMapGraph";
import { setHoveredNode, setSelectedNode } from "../actions/actions";

const mapStateToProps = (state, ownProps) => {
    console.log(state);
    const selectedCuisine = state.options.selectedCuisines.length > 0 ? state.data.cuisines[state.options.selectedCuisines[0]] : null;
    return {
        ingredients: state.results.ingredients.items
            .filter(id => selectedCuisine === null ? true : (selectedCuisine.ingredients.indexOf(id) >= 0))
            .map(id => state.data.ingredients[id]),
        pairings: state.data.pairings
            .filter(pairing => selectedCuisine === null ? true : (selectedCuisine.ingredients.indexOf(pairing.source) >= 0 && selectedCuisine.ingredients.indexOf(pairing.target) >= 0))
            .map(pairing => ({
                source: state.data.ingredients[pairing.source],
                target: state.data.ingredients[pairing.target]
            })),
        selectedNode: state.options.selectedNode,
        hoveredNode: state.options.hoveredNode
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onNodeMouseOver: (id) => dispatch(setHoveredNode(id)),
        onNodeMouseOut: (id) => dispatch(setHoveredNode(null)),
        onNodeClick: (id) => dispatch(setSelectedNode(id))
    }
}

export const FlavorMap = connect(
    mapStateToProps,
    mapDispatchToProps
)(FlavorMapGraph);
