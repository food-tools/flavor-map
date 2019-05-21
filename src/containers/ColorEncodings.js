import { connect } from 'react-redux';
import { ColorEncodingSelect } from '../components/ColorEncodingSelect';
import { setNodeColorEncoding, NodeColorEncodings } from '../actions/actions';

export const NodeColorEncodingLabels = {
  ENCODE_TYPE: 'Type',
  ENCODE_SEASON: 'Season',
  ENCODE_FUNCTION: 'Function',
  ENCODE_TASTE: 'Taste',
  ENCODE_WEIGHT: 'Weight',
  ENCODE_VOLUME: 'Volume',
  ENCODE_TECHNIQUES: 'Techniques',
};

const mapStateToProps = state => ({
  colorEncodings: Object.keys(NodeColorEncodings).map(encoding => ({
    name: NodeColorEncodings[encoding],
    text: NodeColorEncodingLabels[encoding],
    selected: NodeColorEncodings[encoding] === state.options.nodeColorEncoding,
  })),
});

const mapDispatchToProps = dispatch => ({
  onSelectColorEncoding: colorEncoding => dispatch(setNodeColorEncoding(colorEncoding)),
});

const ColorEncodings = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ColorEncodingSelect);

export default ColorEncodings;
