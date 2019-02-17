import * as React from "react";
import * as d3 from "d3";
import * as Styles from "../assets/CustomStyles";

const nodeRadius = 9;

export class FlavorMapGraph extends React.Component {

    constructor(props) {
        super(props);
        this.container = React.createRef();
        this.tooltip = React.createRef();
        this.graph = {
            nodes: this.props.ingredients,
            links: this.props.pairings
        };
    }

    componentDidMount() {

        // set up selections
        this.svg = d3.select(this.container.current);
        this.tip = d3.select(this.tooltip.current)
            .attr("opacity", 0);

        // create layers for nodes and links
        this.g = this.svg.append("g").attr("class", "g");
        this.background = this.g.append("g").attr("class", "background");
        this.links = this.g.append("g").attr("class", "links");
        this.nodes = this.g.append("g").attr("class", "nodes");

        // define background as a rectangle starting at the top left corner
        this.background
            .append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("fill", "white")
            .on("click", this.props.onBackgroundClick);

        // apply some global attributes to nodes and links
        this.links
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6);

        this.nodes
            .attr("stroke", "#fff")
            .attr("stroke-width", 1);

        this.nodes
            .selectAll(".node")
            .data(this.graph.nodes, d => d.id)
            .join(
                enter => {
                    enter.append("circle")
                        .attr("class", "node")
                        .attr("r", nodeRadius)
                        .style("cursor", "pointer")
                        .on("mouseover", d => this.props.onNodeMouseOver(d))
                        .on("mouseout", d => this.props.onNodeMouseOut(d))
                        .on("click", d => this.props.onNodeClick(d));
                },
                update => {},
                exit => {
                    exit.remove();
                }
            );

        this.links
            .selectAll(".link")
            .data(this.graph.links, d => `${d.source.id}_${d.target.id}`)
            .join(
                enter => {
                    enter.append("line").attr("class", "link")
                },
                update => {},
                exit => {
                    exit.remove();
                }
            );

        this.simulation = d3.forceSimulation()
            .nodes(this.graph.nodes)
            .force("link", d3.forceLink(this.graph.links).id(d => d.id))
            .force("charge", d3.forceManyBody())
            .force("collide", d3.forceCollide(nodeRadius + 2))
            .on("tick", () => this.handleTick());

        // draw with the initial state
        this.draw();

    }

    componentDidUpdate() {

        this.draw();

    }

    handleTick() {

        this.links
            .selectAll(".link")
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        this.nodes
            .selectAll(".node")
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

    }

    draw() {

        // this runs whenever "state" or "props" changes
        // props come from outside
        // state is internal (we don't use state because we don't need to)
        const w = this.container.current.getBoundingClientRect().width;
        const h = this.container.current.getBoundingClientRect().height;

        //let zoom = d3.zoom()
        //    .scaleExtent([1, 40])
        //    .translateExtent([[-100, -100], [w, h]]);
        //.on("zoom", zoomed);

        // adjust height and width accordingly
        this.g
            .attr("width", w)
            .attr("height", h);

        // set the background to cover the same height and width
        // add listener on background to de-select nodes
        this.background
            .select("rect")
            .attr("width", w)
            .attr("height", h);

        this.nodes
            .selectAll(".node")
            .attr("fill", d => this.props.nodeColors[d.id]);

        // if hovering on a node add a tooltip with that node's ingredient name
        let hoveredNode = this.props.hoveredNode;
        console.log("hovered node:", hoveredNode);
        if (hoveredNode) {
            this.tip.style("opacity", 1);
            this.tip.html(hoveredNode.name)
                    .style("left", hoveredNode.x + "px")
                    .style("top", (hoveredNode.y - 50) + "px")
                    .style("color", "black");
        } else {
            this.tip.style("opacity", 0);
        }

        // if a node is selected fade all non-neighboring nodes and links
        let selectedNode = this.props.selectedNode;
        console.log("Selected node:", selectedNode);
        if (selectedNode) {

            this.nodes
                .selectAll(".node")
                .attr("opacity", d =>
                    selectedNode.id === d.id || areNeighborNodes(selectedNode, d)
                    ? 1.0 : 0.1);

            this.links
                .selectAll(".link")
                .attr("opacity", d =>
                    selectedNode.id === d.target.id || selectedNode.id === d.source.id
                    ? 1.0 : 0.1);
        } else {

            this.nodes
                .selectAll(".node")
                .attr("opacity", 1.0);

            this.links
                .selectAll(".link")
                .attr("opacity", 1.0);
        }

        // helper function to check if a node is a neighbor of another
        function areNeighborNodes(node1, node2) {
            return links.filter(pairing =>
                (pairing.source.id === node1.id && pairing.target.id === node2.id) ||
                (pairing.source.id === node2.id && pairing.target.id === node1.id)
            ).length > 0;
        }

    }

    render() {
        return (
            <span>
                <div ref={this.tooltip} className={Styles.tooltip}></div>
                <svg ref={this.container} className={Styles.FlavorMap} />
            </span>
        );
    }
}

//let hoveredNodeID = this.props.hoveredNode;
//console.log(hoveredNodeID);
//if (hoveredNodeID != null){
//    let hoveredNode = nodes[hoveredNodeID];
    // @TODO: probably just an issue accessing this data
//    console.log(hoveredNode);
//}

// node.append("title")
//     .text(d => d.name);

// @TODO: do we want this functionality?
/*

*/

//function zoomed() {
    //won't be this easy:
    //svg.attr("transform", d3.event.transform);

//return svg.node();


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

svg.call(zoom);
*/

// @TODO: this line is in mbostock example, do we need it?
// https://beta.observablehq.com/@mbostock/d3-force-directed-graph#drag
// invalidation.then(() => simulation.stop());
