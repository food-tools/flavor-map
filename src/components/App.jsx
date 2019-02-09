import React from "react";
import {  Container, Sidebar } from "semantic-ui-react";
import { Controls } from "../containers/Controls";

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Sidebar.Pushable as={Container}>
                <Controls></Controls>
            </Sidebar.Pushable>
        );
    }

}
