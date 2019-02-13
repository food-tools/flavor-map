import * as React from "react";
import * as d3 from "d3";
import * as Styles from "../assets/CustomStyles";

// mapping of ingredient types to colors
export const ingredient_type_color = {
    "vegetable":"#14453d",
    "fruit":"#a3333d",
    "grain":"#c4a69d",
    "dairy":"#7391ba",
    "fat":"#aa9052",
    "nut":"#363457",
    "meat":"#6d3b47",
    "herb":"#98a886",
    "spice":"#ba5734"
};

export class FlavorMapGraph extends React.Component {

    constructor(props) {
        super(props);
        this.container = React.createRef();
    }

    componentDidMount() {
        // this runs when the thing is loaded into the DOM for the first time
    }

    componentDidUpdate() {

        // this runs whenever "state" or "props" changes
        // props come from outside
        // state is internal (we don't use state because we don't need to)

        console.log("Inside flavor map, props are => ", this.props);

        let svg = d3.select(this.container.current);

        let w = this.container.current.getBoundingClientRect().width;
        let h = this.container.current.getBoundingClientRect().height;

        console.log(svg, w, h);

        const nodeRadius = 9;

        let zoom = d3.zoom()
            .scaleExtent([1, 40])
            .translateExtent([[-100, -100], [w, h]])
            .on("zoom", zoomed);

        // main fdg code taken from http://bl.ocks.org/eyaler/10586116#index.html

        const nodes = this.props.ingredients;
        const links = this.props.pairings;

        svg.call(zoom);

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(w / 2, h / 2))
            .force("collide", d3.forceCollide(nodeRadius + 2));

        const link = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value));

        const node = svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1)
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r", nodeRadius)
            .attr("fill", d => String(ingredient_type_color[d.type]))
            .call(drag(simulation))
            .on("mouseover", d => this.props.onNodeMouseOver(d.id));
            // .on("mouseout",);


        let hoveredNodeID = this.props.hoveredNode;
        console.log(hoveredNodeID);
        if(hoveredNodeID != null){
            let hoveredNode = nodes[hoveredNodeID];
            // @TODO: probably just an issue accessing this data
            console.log(hoveredNode);
        }

        // node.append("title")
        //     .text(d => d.name);


        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
        });



        // @TODO: do we want this functionality?
        function drag(simulation) {

            function dragstarted(d) {
              if (!d3.event.active) simulation.alphaTarget(0.3).restart();
              d.fx = d.x;
              d.fy = d.y;
            }

            function dragged(d) {
              d.fx = d3.event.x;
              d.fy = d3.event.y;
            }

            function dragended(d) {
              if (!d3.event.active) simulation.alphaTarget(0);
              d.fx = null;
              d.fy = null;
            }

            return d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);
        }

        function zoomed() {
            //won't be this easy:
            //svg.attr("transform", d3.event.transform);
        }

        return svg.node();


        // zoom.on function from d3v3 example of zooming fdg
        // http://bl.ocks.org/eyaler/10586116#index.html
        /*

        let nominal_stroke = 1.5;
        let max_stroke = 4.5;
        let nominal_base_node_size = 36;

        function() {

            let stroke = nominal_stroke;
            if (nominal_stroke * zoom.scale() > max_stroke) {
                stroke = max_stroke/zoom.scale();
            }
            link.style("stroke-width",stroke);
            circle.style("stroke-width",stroke);

            let base_radius = nominal_base_node_size;
            if (nominal_base_node_size * zoom.scale() > max_base_node_size) {
                base_radius = max_base_node_size/zoom.scale();
            }
            circle.attr("d", d3.svg.symbol()
                .size(function(d) { return Math.PI * Math.pow(size(d.size) *
                        base_radius/nominal_base_node_size || base_radius , 2); })
                .type(function(d) { return d.type; }))

            if (!text_center) {
                text.attr("dx", function(d) {
                    return (size(d.size) * base_radius/nominal_base_node_size || base_radius);
                });

                let text_size = nominal_text_size;
                if (nominal_text_size*zoom.scale()>max_text_size) {
                    text_size = max_text_size/zoom.scale();
                }
                text.style("font-size",text_size + "px");

                g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
            }
        });

        svg.call(zoom);
        */

        // @TODO: this line is in mbostock example, do we need it?
        // https://beta.observablehq.com/@mbostock/d3-force-directed-graph#drag
        // invalidation.then(() => simulation.stop());
    }

    render() {
        return (
            <svg ref={this.container} className={Styles.FlavorMap} />
        );
    }
}
