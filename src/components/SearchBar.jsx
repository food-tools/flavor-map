import * as React from 'react';
import styled from 'styled-components';

const Search = styled.input`
  width: ${props => props.fluid && '100%'};
  height: 3em;
  border-radius: 3em;
  padding: 0.25em 2em 0.25em;
  background-color: #f6f6f6;
  border: 1px solid #f6f6f6;
  color: #fc6076;
  text-transform: uppercase;
  font-weight: bold;

  :focus {
    outline: none;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  }

  ::placeholder {
    color: #d0d0d0;
  }
`;

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
  }

  handleSearchChange(e, { value }) {
    const { onSearchKeyUp } = this.props;
    onSearchKeyUp(value);
  }

  handleResultSelect(e, { result }) {
    const {
      onSearchKeyUp,
      onSelectIngredient,
      onSelectCuisine,
      stateIngredients,
    } = this.props;
    if (result.type === 'ingredient') {
      onSearchKeyUp(result.title);
      const ingredient = stateIngredients[result.id];
      onSelectIngredient(ingredient);
    } else {
      onSearchKeyUp(result.title);
      console.log('cuisine:', result);
      onSelectCuisine(result.id);
    }
  }

  render() {
    return <Search fluid placeholder="Search..." />;
  }
}

export default SearchBar;
