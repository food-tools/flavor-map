import * as React from 'react';
import styled from 'styled-components';

const SearchWrapper = styled.div`
  background-color: #f6f6f6;
  border: 1px solid #f6f6f6;
  width: ${props => props.fluid && '100%'};
  ${props => (
    props.focused
     && (`
      outline: none;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    `)
  )}
  ${props => (
    props.roundBottom
      ? 'border-radius: 1.5em 1.5em 0em 0em;'
      : 'border-radius: 1.5em;'
  )}
`;

const SearchInput = styled.input`
  box-sizing: border-box;
  height: 3em;
  width: 100%;
  padding: 0.5em 2em 0.5em;
  color: #fc6076;
  text-transform: uppercase;
  font-weight: bold;
  pointer-events: all;
  background-color: transparent;
  border: none;

  ${props => (
    props.roundBottom
      ? 'border-radius: 1.5em 1.5em 0em 0em;'
      : 'border-radius: 1.5em;'
  )}

  :focus {
    outline: none;
  }

  ::placeholder {
    color: #d0d0d0;
  }
`;

const ResultsList = styled.div`
  padding: 0em 0em 1em 0em;
  border-top: 0.5px solid #E0E0E0;
`;

const ResultsItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 0.5em 1.5em 0.5em 1.5em;
  cursor: pointer;
  pointer-events: all;

  ${props => props.hovered && 'background-color: #fc6076;'}

  ${props => (
    props.shouldShowEnterPrompt && (`
      ::after {
        content: 'ENTER';
        float: right;
        padding: 0em 0.5em 0em;
        font-family: monospace;
        border: 1.5px solid #BDBDBD;
        border-radius: 6px;
        font-size: 12px;
        background-color: #EEEEEE;
        color: #BDBDBD;
        vertical-align: top !important;
      }
    `)
  )}
`;

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      hovered: null,
    };
    this.handleMouseOverItem = this.handleMouseOverItem.bind(this);
    this.handleMouseOutItem = this.handleMouseOutItem.bind(this);
    this.handleMouseOutContainer = this.handleMouseOutContainer.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleInputFocus() {
    this.setState(prev => ({
      ...prev,
      focused: true,
    }));
  }

  handleMouseOverItem(index) {
    this.setState(prev => ({
      ...prev,
      hovered: index,
    }));
  }

  handleMouseOutItem() {
    this.setState(prev => ({
      ...prev,
      hovered: null,
    }));
  }

  handleMouseOutContainer() {
    this.setState(prev => ({
      ...prev,
      hovered: null,
    }));
  }

  handleInputBlur() {
    this.setState(prev => ({
      ...prev,
      focused: false,
    }));
  }

  handleSearchChange(event) {
    const { onSearchKeyUp } = this.props;
    onSearchKeyUp(event.target.value);
  }

  handleResultSelect(result) {
    const { onSearchKeyUp, onSelectResult } = this.props;
    onSearchKeyUp(result.name);
    onSelectResult(result.id);
    this.setState(prev => ({
      ...prev,
      focused: false,
      hovered: null,
    }));
  }

  handleKeyDown(event) {
    const { focused, hovered } = this.state;
    const { results, onSearchKeyUp } = this.props;
    if (!focused) {
      return;
    }
    if (event.keyCode === 38) { // up arrow
      if (hovered === null) {
        this.setState(prev => ({
          ...prev,
          hovered: results.length - 1,
        }));
      } else if (hovered > 0) {
        this.setState(prev => ({
          ...prev,
          hovered: hovered - 1,
        }));
      }
    } else if (event.keyCode === 40) { // down arrow
      if (hovered === null) {
        this.setState(prev => ({
          ...prev,
          hovered: 0,
        }));
      } else if (hovered < results.length - 1) {
        this.setState(prev => ({
          ...prev,
          hovered: hovered + 1,
        }));
      }
    } else if (event.keyCode === 13 && hovered !== null) {
      this.handleResultSelect(results[hovered]);
    } else if (event.keyCode === 13 && hovered === null && results.length > 0) {
      this.handleResultSelect(results[0]);
    } else if (event.keyCode === 27) {
      onSearchKeyUp('');
    }
  }

  render() {
    const { focused, hovered } = this.state;
    const { searchTerm, results } = this.props;

    return (
      <>
        <SearchWrapper
          focused={focused}
          onMouseOut={() => this.handleMouseOutContainer()}
          onBlur={() => this.handleMouseOutContainer()}
          fluid
        >
          <SearchInput
            value={searchTerm ? searchTerm : ''}
            placeholder="Search..."
            onChange={this.handleSearchChange}
            onKeyDown={this.handleKeyDown}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
            roundBottom={focused}
          />
          {
            focused && (
              <ResultsList>
                {
                  results
                    .map(
                      (result, index) => (
                        <ResultsItem
                          key={`result-${result.name}`}
                          onMouseDown={() => this.handleResultSelect(result)}
                          onMouseOver={() => this.handleMouseOverItem(index)}
                          onMouseOut={() => this.handleMouseOutItem(index)}
                          onFocus={() => this.handleMouseOverItem(index)}
                          onBlur={() => this.handleMouseOutItem(index)}
                          hovered={hovered === index}
                          shouldShowEnterPrompt={hovered === null ? index === 0 : hovered === index}
                        >
                          {result.name}
                        </ResultsItem>
                      ),
                    )
                }
                {
                  results.length === 0 && (
                    <ResultsItem>
                      <em>No results</em>
                    </ResultsItem>
                  )
                }
              </ResultsList>
            )
          }
        </SearchWrapper>
      </>
    );
  }
}

export default SearchBar;
