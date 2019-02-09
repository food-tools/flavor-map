import { connect } from "react-redux";
import { ControlPanel } from "../components/ControlPanel";

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}

export const Controls = connect(
    mapStateToProps,
    mapDispatchToProps
)(ControlPanel)
