import * as React from 'react';
import { Grid, Search } from 'semantic-ui-react';
import * as Styles from '../assets/CustomStyles.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
  }

  handleSearchChange(e, { value }) {
    this.props.onSearchKeyUp(value);
  }

  handleResultSelect(e, { result }) {
    if (result.type === 'ingredient') {
      this.props.onSearchKeyUp(result.title);
      const ingredient = this.props.stateIngredients[result.id]
      this.props.onSelectIngredient(ingredient);
    } else {
      this.props.onSearchKeyUp(result.title);
      console.log('cuisine:', result);
      this.props.onSelectCuisine(result.id);
    }
  }

  render() {
    let results = {};

    if (this.props.ingredients.length > 0) {
      results = {
        ...results,
        ingredients: {
          name: "Ingredients",
          results: this.props.ingredients.map(ingredient => ({
            title: ingredient.name,
            type: "ingredient",
            id: ingredient.id
          }))
        }
      }
    }

    if (this.props.cuisines.length > 0) {
      results = {
        ...results,
        cuisines: {
          name: "Cuisines",
          results: this.props.cuisines.map(cuisine => ({
              title: cuisine.name,
              type: "cuisine",
              id: cuisine.id
          }))
        }
      };
    }

    return (
      <Grid className={Styles.SearchBar}>
        <Grid.Row>
          <Grid.Column width={3}>
          </Grid.Column>
          <Grid.Column width={10}>
            <Search
              category
              fluid
              className={Styles.SearchBar}
              onSearchChange={this.handleSearchChange}
              onResultSelect={this.handleResultSelect}
              value={this.props.searchTerm}
              results={results}
              size="large"
              input={{ fluid: true }}
            />
          </Grid.Column>
          <Grid.Column width={3}>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default SearchBar;
