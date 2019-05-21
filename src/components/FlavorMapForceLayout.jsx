import * as React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import * as Styles from '../assets/CustomStyles.css';

class FlavorMapForceLayout extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.tooltip = React.createRef();
    this.state = {
      regionSimulation: d3.forceSimulation(),
      nodeSimulation: d3.forceSimulation(),
    };
  }

  componentDidMount() {
    // set up selections
    this.svg = d3.select(this.container.current);
    this.tip = d3.select(this.tooltip.current).attr('opacity', 0);

    // create layers for nodes and links
    this.g = this.svg.append('g').attr('class', 'g');
    this.background = this.g.append('g').attr('class', 'background');
    this.links = this.g.append('g').attr('class', 'links');
    this.nodes = this.g.append('g').attr('class', 'nodes');

    // define background as a rectangle starting at the top left corner
    // add listener on background to de-select nodes
    this.background
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('fill', '#fff');

    // apply some global attributes to nodes and links
    this.links
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6);

    this.nodes
      .attr('stroke', '#fff')
      .attr('stroke-width', 1);

    /*
    this.nodes
      .selectAll('.node')
      .data(this.graph.nodes, d => d.id)
      .join(
        (enter) => {
          enter.append('circle')
            .attr('class', 'node')
            .attr('r', 10)
            .attr('id', d => d.id)
            .style('cursor', 'pointer');
          // .on('mouseover', d => this.props.onNodeMouseOver(d))
          // .on('mouseout', d => this.props.onNodeMouseOut(d))
          // .on('click', d => this.props.onNodeClick(d));
        },
        null,
        (exit) => {
          exit.remove();
        },
      );
    */

    // this.simulation = d3.forceSimulation()
    //    .nodes(this.graph.nodes)
    //    .force("charge", d3.forceManyBody())
    //    .force("collide", d3.forceCollide(12))
    //    .on("tick", () => this.handleTick());

    // draw with the initial state
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  handleTick() {
    this.nodes
      .selectAll('.node')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);
  }

  draw() {
    const { regionSimulation, nodeSimulation } = this.state;
    const { regions, nodes, regionLinks } = this.props;

    const w = this.container.current.getBoundingClientRect().width;
    const h = this.container.current.getBoundingClientRect().height;

    const regionRadius = d3.scaleLinear()
      .domain([
        d3.min(regions.map(({ members }) => members.length)),
        d3.max(regions.map(({ members }) => members.length)),
      ])
      .range([10, 200]);

    const regionOverlap = d3.forceCollide()
      .radius(
        ({ members }) => regionRadius(members.length),
      );

    const clusterForce = (alpha) => {
      nodes.forEach(
        (node) => {
          const nodeRef = node;
          const { x, y } = nodeRef;
          const targetForceCenters = regions
            .filter(
              region => region.members.indexOf(node.id) >= 0,
            );
          const vector = targetForceCenters
            .map(
              forceCenter => ({
                x: forceCenter.x - x,
                y: forceCenter.y - y,
              }),
            )
            .reduce(
              (result, v) => ({
                x: result ? result.x + v.x : v.x,
                y: result ? result.y + v.y : v.y,
              }),
              undefined,
            );

          if (targetForceCenters.length === 0) {
            return;
          }

          const magnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
          nodeRef.x += 50 * (vector.x / magnitude) * alpha;
          nodeRef.y += 50 * (vector.y / magnitude) * alpha;
        },
      );
    };

    this.background
      .select('rect')
      .attr('width', w)
      .attr('height', h);

    regionSimulation
      .nodes(regions)
      .force('x', d3.forceX(w / 2))
      .force('y', d3.forceY(h / 2))
      .force('manyBody', d3.forceManyBody())
      .force('collide', regionOverlap)
      .on('tick', () => {
        nodeSimulation
          .force('x', d3.forceX((node) => {
            const targetForceCenters = regions
              .filter(
                region => region.members.indexOf(node.id) >= 0,
              );
            if (targetForceCenters.length === 0) {
              return w / 2;
            };
            return targetForceCenters.reduce(
              (sum, forceCenter) => sum + forceCenter.x,
              0,
            ) / targetForceCenters.length;
          }))
          .force('y', d3.forceY((node) => {
            const targetForceCenters = regions
              .filter(
                region => region.members.indexOf(node.id) >= 0,
              );
            if (targetForceCenters.length === 0) {
              return h / 2;
            };
            return targetForceCenters.reduce(
              (sum, forceCenter) => sum + forceCenter.y,
              0,
            ) / targetForceCenters.length;
          }));
      });

    nodeSimulation
      .nodes(nodes)
      .force('manyBody', d3.forceManyBody())
      //.force('cluster', clusterForce)
      .on('tick', () => this.handleTick());

    this.nodes
      .selectAll('.node')
      .data(nodes, d => d.id)
      .join(
        (enter) => {
          enter.append('circle')
            .attr('class', 'node')
            .attr('r', 10)
            .attr('id', d => d.id)
            .style('cursor', 'pointer');
        },
        null,
        (exit) => {
          exit.remove();
        },
      );

    console.log(regions, nodes, regionLinks);

    regionSimulation.restart();
    nodeSimulation.restart();
  }

  render() {
    return (
      <span>
        <div ref={this.tooltip} className={Styles.tooltip} />
        <svg ref={this.container} className={Styles.FlavorMap} />
      </span>
    );
  }
}

export default FlavorMapForceLayout;
