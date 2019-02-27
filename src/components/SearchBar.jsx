import * as React from "react";
import * as Styles from "../assets/CustomStyles.css";
import { Grid, Search, Input } from "semantic-ui-react";

export class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleSearchChange(e, { value }) {
        this.props.onSearchKeyUp(value);
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
                            value={this.props.searchTerm}
                            results={results}
                            size="medium"
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
