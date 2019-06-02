import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';
import { setSearchTerm, setSelectedNode } from '../actions/actions';

const mapStateToProps = state => ({
  searchTerm: state.options.searchTerm,
  results: state.results.ingredients.items
    .map(id => state.data.ingredients[id])
    .filter(
      ({ name }) => name.toLowerCase().indexOf(state.options.searchTerm.toLowerCase().trim()) >= 0,
    )
    .sort((a, b) => (a.name < b.name ? -1 : 1))
    .filter(({ name }) => {
      const { selectedNode, searchTerm } = state.options;
      return !selectedNode || (name !== searchTerm !== selectedNode.name);
    })
    .filter((d, i) => i < 10),
});

const mapDispatchToProps = dispatch => ({
  onSearchChange: term => dispatch(setSearchTerm(term)),
  onSelectResult: id => dispatch(setSelectedNode(id)),
});

const Search = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBar);

export default Search;
