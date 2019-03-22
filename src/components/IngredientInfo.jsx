import * as React from "react";
import { Header, List, Divider } from "semantic-ui-react";

export const IngredientInfo = ({ ingredient, name }) => (
    <div>
        <Header size="medium">{ingredient.name}</Header>
        <List>
            <List.Item><strong>Type:</strong> {ingredient.type ? ingredient.type : "n/a"}</List.Item>
            <List.Item><strong>Function:</strong> {ingredient.function ? ingredient.function : "n/a"}</List.Item>
            <List.Item><strong>Season:</strong> {ingredient.season ? ingredient.season : "n/a"}</List.Item>
            <List.Item><strong>Taste:</strong> {ingredient.taste ? ingredient.taste : "n/a"}</List.Item>
            <List.Item><strong>Weight:</strong> {ingredient.weight ? ingredient.weight : "n/a"}</List.Item>
            <List.Item><strong>Volume:</strong> {ingredient.volume ? ingredient.volume : "n/a"}</List.Item>
            <List.Item><strong>Techniques:</strong> {ingredient.techniques ? ingredient.techniques : "n/a"}</List.Item>
        </List>

    </div>
);