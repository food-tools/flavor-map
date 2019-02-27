import * as React from "react";
import { Header, List, Divider } from "semantic-ui-react";

export const IngredientInfo = ({ ingredient, name }) => (
    <div>
        <Header size="medium">{ingredient.name}</Header>
        <List>
            <List.Item><strong>Type:</strong> {ingredient.type}</List.Item>
            <List.Item><strong>Function:</strong> {ingredient.function}</List.Item>
            <List.Item><strong>Season:</strong> {ingredient.season}</List.Item>
            <List.Item><strong>Taste:</strong> {ingredient.taste}</List.Item>
            <List.Item><strong>Weight:</strong> {ingredient.weight}</List.Item>
            <List.Item><strong>Volume:</strong> {ingredient.volume}</List.Item>
            <List.Item><strong>Techniques:</strong> {ingredient.techniques}</List.Item>
        </List>

    </div>
);