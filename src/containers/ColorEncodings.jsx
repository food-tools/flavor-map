import { connect } from "react-redux";
import { ColorEncodingSelect } from "../components/ColorEncodingSelect";
import { setNodeColorEncoding, NodeColorEncodings } from "../actions/actions";

const mapStateToProps = (state, ownProps) => {
    console.log(state);
    return {
        colorEncodings: Object.keys(NodeColorEncodings).map(encoding => ({
            name: NodeColorEncodings[encoding],
            selected: (NodeColorEncodings[encoding] == state.options.nodeColorEncoding) ? true : false
        }))
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSelectColorEncoding: (colorEncoding) => dispatch(setNodeColorEncoding(colorEncoding))
    };
}

export const ColorEncodings = connect(
    mapStateToProps,
    mapDispatchToProps
)(ColorEncodingSelect)
