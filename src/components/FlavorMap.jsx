import * as React from "react";
import * as d3 from "d3";

export class FlavorMap extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this runs when the thing is loaded into the DOM for the first time
    }

    componentDidUpdate() {

        // this runs whenever "state" or "props" changes
        // props come from outside
        // state is internal (we don't use state because we don't need to)

        console.log("Inside flavor map, props are => ", this.props);

        let svg = d3.select(this.props.container);

        let w = svg.node().getBoundingClientRect().width;
        let h = svg.node().getBoundingClientRect().height;

        console.log(svg, w, h);

    }

    render() {
        return <div> Hello </div>;
    }

}
