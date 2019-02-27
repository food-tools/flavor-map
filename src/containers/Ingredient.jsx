import { connect } from "react-redux";
import { IngredientInfo } from "../components/IngredientInfo";
import { setSelectedNode } from "../actions/actions";

const mapStateToProps = (state, ownProps) => {
    return {
        ingredient: state.options.selectedNode,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    };
}

export const Ingredient = connect(
    mapStateToProps,
    mapDispatchToProps
)(IngredientInfo)