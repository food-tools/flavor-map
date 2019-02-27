import { connect } from "react-redux";
import { FlavorMapGraph } from "../components/FlavorMapGraph";
import { setHoveredNode, setSelectedNode, setZoomTransform, setNodeSelectionTransition } from "../actions/actions";
import { GetColorScheme, GetColorKey } from "../assets/IngredientPropertyColors";

const mapStateToProps = (state, ownProps) => {
    const colorScheme = GetColorScheme(state.options.nodeColorEncoding);
    const colorKey = GetColorKey(state.options.nodeColorEncoding);
    return {
        ingredients: state.results.ingredients.items.map(id => state.data.ingredients[id]),
        pairings: state.data.pairings.map(pairing => ({
            source: state.data.ingredients[pairing.source],
            target: state.data.ingredients[pairing.target],
        })),
        nodeColors: state.results.ingredients.items.reduce(
            (result, id) => ({
                ...result,
                [id]: colorScheme[state.data.ingredients[id][colorKey].toUpperCase()]
            }),
            {}
        ),
        selectedCuisine: state.options.selectedCuisines.length > 0 ? state.data.cuisines[state.options.selectedCuisines[0]] : null,
        selectedNode: state.options.selectedNode,
        isNodeSelectionTransition: state.options.isNodeSelectionTransition,
        hoveredNode: state.options.hoveredNode,
        zoomTransform: state.options.zoomTransform
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onNodeMouseOver: (id) => dispatch(setHoveredNode(id)),
        onNodeMouseOut: (id) => dispatch(setHoveredNode(null)),
        onNodeClick: (id) => dispatch(setSelectedNode(id)),
        nodeSelectionTransition: (bool) => dispatch(setNodeSelectionTransition(bool)),
        onBackgroundClick: () => dispatch(setSelectedNode(null)),
        onZoom: (zoomTransform) => dispatch(setZoomTransform(zoomTransform))
    }
}

export const FlavorMap = connect(
    mapStateToProps,
    mapDispatchToProps
)(FlavorMapGraph);
