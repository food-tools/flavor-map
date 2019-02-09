import React from "react";
import {  Container, Sidebar } from "semantic-ui-react";
import { Controls } from "../containers/Controls";
import { Map } from "../containers/Map";

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Map />
        );
    }

}
