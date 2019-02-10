import * as React from "react";
import { FlavorMap } from "./FlavorMap";

export class MapContainer extends React.Component {

    constructor(props) {
        super(props);
        this.container = React.createRef();
    }

    render() {
        return (
            <svg ref={this.container} style={{ width: "100vw", height: "100vh" }}>
                <FlavorMap
                    container={this.container.current}
                    ingredients={this.props.ingredients}
                    pairings={this.props.pairings}
                />
            </svg>
        )
    }

}
