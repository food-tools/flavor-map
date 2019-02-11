import * as React from "react";
import { FlavorMap } from "./FlavorMap";
import * as Styles from "../assets/CustomStyles";

export class MapContainer extends React.Component {

    constructor(props) {
        super(props);
        this.container = React.createRef();
    }

    render() {
        return (
            <svg ref={this.container} className={Styles.Map}>
                <FlavorMap
                    container={this.container.current}
                    ingredients={this.props.ingredients}
                    pairings={this.props.pairings}
                    selectedNode={this.props.selectedNode}
                    hoveredNode={this.props.hoveredNode}
                    onNodeMouseOver={this.props.onNodeMouseOver}
                    onNodeMouseOut={this.props.onNodeMouseOut}
                    onNodeClick={this.props.onNodeClick}
                />
            </svg>
        )
    }

}
