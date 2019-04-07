import * as React from "react";
import { Header, List, Divider } from "semantic-ui-react";

export const IngredientInfo = ({ ingredient, name }) => (
    <div>
        <Header size="medium">{ingredient.name}</Header>
        <List>
            {ingredient.aka ? <List.Item><strong>AKA:</strong> {ingredient.aka}</List.Item> : ""}
            {ingredient.type ? <List.Item><strong>Type:</strong> {ingredient.type}</List.Item> : ""}
            {ingredient.season_text ? <List.Item><strong>Season:</strong> {ingredient.season_text}</List.Item> : ""}
            {ingredient.taste ? <List.Item><strong>Taste:</strong> {ingredient.taste}</List.Item> : ""}
            {ingredient.botanical_relatives ? <List.Item><strong>Botanical relatives:</strong> {ingredient.botanical_relatives}</List.Item> : ""}
            {ingredient.function ? <List.Item><strong>Function:</strong> {ingredient.function}</List.Item> : ""}
            {ingredient.weight ? <List.Item><strong>Weight:</strong> {ingredient.weight}</List.Item> : ""}
            {ingredient.volume ? <List.Item><strong>Volume:</strong> {ingredient.volume}</List.Item> : ""}
            {ingredient.tips ? <List.Item><strong>Tips:</strong> {ingredient.tips}</List.Item> : ""}
            {ingredient.techniques ? <List.Item><strong>Techniques:</strong> {ingredient.techniques}</List.Item> : ""}
        </List>

    </div>
);