import * as React from "react";
import * as d3 from "d3";
import * as Styles from "../assets/CustomStyles";
import { Transform } from "stream";

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
        this.g = this.svg.append("g").attr("class", "g")
        this.background = this.g.append("g").attr("class", "background");
        this.links = this.g.append("g").attr("class", "links");
        this.nodes = this.g.append("g").attr("class", "nodes");

        // @TODO: add a translateExtent to restrict panning?
        this.zoom = d3.zoom()
            .scaleExtent([0.1, 7])
            .on("zoom", this.zoomed.bind(this));

        // define background as a rectangle starting at the top left corner
        // add listener on background to de-select nodes
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
                        .attr("r", 10)
                        .attr("id", d => d.id)
                        .style("cursor", "pointer")
                        .on("mouseover", d => this.props.onNodeMouseOver(d))
                        .on("mouseout", d => this.props.onNodeMouseOut(d))
                        .on("click", d => {

                            // this sets a bool in the state that allows us to define a transition for
                            // the zoom transform only on node selection for smooth node centering
                            this.props.nodeSelectionTransition(true);

                            const w = this.container.current.getBoundingClientRect().width;
                            const h = this.container.current.getBoundingClientRect().height;
                            const midpoint = {x: w/2, y: h/2};

                            // determine zoomTransform x, y, k
                            const zoomTransform = {
                                k: 1,
                                x: midpoint.x - d.x,
                                y: midpoint.y - d.y
                            }

                            this.zoomed(zoomTransform);
                            this.props.onNodeClick(d);
                            this.props.nodeSelectionTransition(false);
                        });
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
            .force("collide", d3.forceCollide(12))
            .on("tick", () => this.handleTick());

        this.svg.call(this.zoom);

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

    zoomed() {
        this.props.onZoom(d3.event.transform);
    }

    // this runs whenever "state" or "props" changes
    // props come from outside
    // state is internal (we don't use state because we don't need to)
    draw() {

        const w = this.container.current.getBoundingClientRect().width;
        const h = this.container.current.getBoundingClientRect().height;

        const ease1 = d3.transition().duration(100).ease(d3.easeLinear);
        const ease2 = d3.transition().duration(200).ease(d3.easeLinear);


        // helper function to check if a node is a neighbor of another
        const areNeighborNodes = (node1, node2) => this.graph.links.filter(pairing =>
            (pairing.source.id === node1.id && pairing.target.id === node2.id) ||
            (pairing.source.id === node2.id && pairing.target.id === node1.id)
        ).length > 0;

        // helper function to highlight selected node and neighboring nodes and links
        const runSelectedNodeResponse = () => {
            this.nodes
                .selectAll(".node")
                .transition(ease)
                .attr("opacity",
                    d =>
                    selectedNode.id === d.id || areNeighborNodes(selectedNode, d) ?
                    1.0 :
                    0.1
                );

            this.links
                .selectAll(".link")
                .transition(ease)
                .attr("opacity",
                    d =>
                    selectedNode.id === d.target.id || selectedNode.id === d.source.id ?
                    1.0 :
                    0.1
                );
        }

        // helper function to highlight selected cuisine nodes and links
        const highlightCuisine = () => {
            this.nodes
                .selectAll(".node")
                .transition(ease)
                .attr("opacity",
                    d =>
                    selectedCuisine.ingredients.indexOf(d.id) >= 0 ?
                    1.0 :
                    0.1
                );

            this.links
                .selectAll(".link")
                .transition(ease)
                .attr("opacity",
                    d =>
                    (
                        selectedCuisine.ingredients.indexOf(d.source.id) >= 0 &&
                        selectedCuisine.ingredients.indexOf(d.target.id) >= 0
                    ) ?
                    1.0 :
                    0.1
                );
        }

        const { hoveredNode, selectedNode, selectedCuisine, zoomTransform } = this.props;

        // adjust height and width and apply the zoom transform
        this.g
            .attr("width", w)
            .attr("height", h)

        if (zoomTransform) {

            // smooth the transform that centers the selected node
            if (isNodeSelectionTransition) {

                this.g
                    .transition(ease2)
                    .attr("transform", () => `translate(${zoomTransform.x}, ${zoomTransform.y}) scale(${zoomTransform.k})`);

            } else {

                this.g.attr("transform", () => `translate(${zoomTransform.x}, ${zoomTransform.y}) scale(${zoomTransform.k})`);

            }
        }

        // set the background to cover the same height and width as g
        this.background
            .select("rect")
            .attr("width", w)
            .attr("height", h);

        this.nodes
            .selectAll(".node")
            .transition(ease1)
            .attr("fill", d => this.props.nodeColors[d.id]);


        // if hovering on a node add a tooltip with that node's ingredient name
        if (hoveredNode) {

            this.tip.style("opacity", 1);
            this.tip.html(hoveredNode.name);

            const tipbox = this.tooltip.current.getBoundingClientRect();
            const bbox = document.getElementById(`${hoveredNode.id}`).getBoundingClientRect();

            const tipX = bbox.x + (bbox.width/2);
            const tipY = bbox.y - tipbox.height - 5;

            this.tip.style("left", tipX + "px")
                    .style("top", tipY + "px")
                    .style("color", "black");

        } else {

            this.tip.style("opacity", 0);
        }

        // on node selection highlight that node and its neighbors
        if (selectedNode) {

            runSelectedNodeResponse();

            // make sure cuisine highlight happens even if an ingredient is selected
            // if (selectedCuisine) {
            //     highlightCuisine();
            // }

        } else if (selectedCuisine) {

            highlightCuisine();

            // make sure node highlight happens even if a cuisine is selected
            // if (selectedNode) {
            //     runSelectedNodeResponse();
            // }

        } else {

            this.nodes
                .selectAll(".node")
                .transition(ease1)
                .attr("opacity", 1.0);

            this.links
                .selectAll(".link")
                .transition(ease1)
                .attr("opacity", 1.0);

        }

        this.simulation.force("center", d3.forceCenter(w/2, h/2));

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
