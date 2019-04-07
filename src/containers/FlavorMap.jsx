import { connect } from "react-redux";
import { FlavorMapGraph } from "../components/FlavorMapGraph";
import { setHoveredNode, setSelectedNode, setZoomTransform } from "../actions/actions";
import { GetColorScheme, GetColorKey } from "../assets/IngredientPropertyColors";

const mapStateToProps = (state, ownProps) => {
    const colorScheme = GetColorScheme(state.options.nodeColorEncoding);
    console.log("season colors:", colorScheme)
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
                [id]: state.data.ingredients[id][colorKey] ? 
                colorScheme[state.data.ingredients[id][colorKey].toUpperCase()] :
                colorScheme["DEFAULT"]
            }),
            {}
        ),
        selectedCuisine: state.options.selectedCuisines.length > 0 ? state.data.cuisines[state.options.selectedCuisines[0]] : null,
        selectedNode: state.options.selectedNode,
        hoveredNode: state.options.hoveredNode,
        zoomTransform: state.options.zoomTransform
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onNodeMouseOver: (id) => dispatch(setHoveredNode(id)),
        onNodeMouseOut: (id) => dispatch(setHoveredNode(null)),
        onNodeClick: (id) => dispatch(setSelectedNode(id)),
        onBackgroundClick: () => dispatch(setSelectedNode(null)),
        onZoom: (zoomTransform) => dispatch(setZoomTransform(zoomTransform))
    }
}

export const FlavorMap = connect(
    mapStateToProps,
    mapDispatchToProps
)(FlavorMapGraph);
