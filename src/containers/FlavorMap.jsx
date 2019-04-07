import { connect } from "react-redux";
import { FlavorMapGraph } from "../components/FlavorMapGraph";
import { setHoveredNode, setSelectedNode, setZoomTransform } from "../actions/actions";
import { GetColorScheme, GetColorKey } from "../assets/IngredientPropertyColors";

const mapStateToProps = (state, ownProps) => {

    const colorScheme = GetColorScheme(state.options.nodeColorEncoding);
    const colorKey = GetColorKey(state.options.nodeColorEncoding);
    const {
        selectedCuisine,
        selectedNode,
        hoveredNode,
        zoomTransform
    } = state.options;

    // to reduce visual complexity, a cuisine must be selected
    if (selectedCuisine == null) {
        return {
            ingredients: [],
            pairings: [],
            nodeColors: [],
            selectedCuisine: null,
            selectedNode,
            hoveredNode,
            zoomTransform
        };
    } else {

        const ingredients = state.data.cuisines[selectedCuisine].ingredients;

        return {
            ingredients: ingredients.map(id => state.data.ingredients[id]),
            pairings: state.data.pairings
                .filter(pairing =>
                    ingredients.indexOf(pairing.source) >= 0 && ingredients.indexOf(pairing.target) >= 0
                )
                .map(pairing => ({
                    source: state.data.ingredients[pairing.source],
                    target: state.data.ingredients[pairing.target],
                })
            ),
            nodeColors: ingredients.reduce(
                (result, id) => ({
                    ...result,
                    [id]: state.data.ingredients[id][colorKey] ?
                    colorScheme[state.data.ingredients[id][colorKey].toUpperCase()] :
                    colorScheme["DEFAULT"]
                }),
                {}
            ),
            selectedCuisine: state.data.cuisines[selectedCuisine],
            selectedNode,
            hoveredNode,
            zoomTransform
        }

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
