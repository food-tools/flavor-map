import { connect } from "react-redux";
import { MapContainer } from "../components/MapContainer";

const mapStateToProps = (state, ownProps) => {
    return {
        ingredients: state.results.ingredients.items.map(id => state.data.ingredients[id]),
        pairings: state.data.pairings
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}

export const Map = connect(
    mapStateToProps,
    mapDispatchToProps
)(MapContainer)
