import * as React from "react";
import { FlavorMap } from "./FlavorMap";

export class MapContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <svg id="temp" style={{ width: "100vw", height: "100vh" }}>
                <FlavorMap id={this.id} ingredients={this.props.ingredients} pairings={this.props.pairings} />
            </svg>
        )
    }

}
