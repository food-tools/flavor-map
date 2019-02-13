import { connect } from "react-redux";
import { FlavorMapGraph } from "../components/FlavorMapGraph";
import { setHoveredNode, setSelectedNode } from "../actions/actions";

const mapStateToProps = (state, ownProps) => {
    return {
        ingredients: state.results.ingredients.items.map(id => state.data.ingredients[id]),
        pairings: state.data.pairings,
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
