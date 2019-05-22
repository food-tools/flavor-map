import * as React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import * as Styles from '../assets/CustomStyles.css';

const sum = list => list.reduce((s, x) => s + x, 0);
const average = list => sum(list) / list.length;

class FlavorMapForceLayout extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.tooltip = React.createRef();
    this.state = {
      nodes: [],
      regions: [],
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
    const { regions, nodes, regionLinks, memberAccessor } = this.props;
    const { regionSimulation, nodeSimulation } = this.state;

    const w = this.container.current.getBoundingClientRect().width;
    const h = this.container.current.getBoundingClientRect().height;

    const regionRadius = d3.scaleLinear()
      .domain([
        d3.min(regions.map((region) => region[memberAccessor].length)),
        d3.max(regions.map((region) => region[memberAccessor].length)),
      ])
      .range([1, 100]);

    const regionOverlap = d3.forceCollide()
      .radius(
        region => regionRadius(region[memberAccessor].length),
      );

    const clusterForce = (alpha) => {
      nodes.forEach(
        (node) => {
          const nodeRef = node;
          const { x, y } = nodeRef;
          const targetForceCenters = regions
            .filter(
              region => region[memberAccessor].indexOf(node.id) >= 0,
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
          nodeRef.vx += 10 * (vector.x / magnitude) * alpha;
          nodeRef.vy += 10 * (vector.y / magnitude) * alpha;
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
      .force('manyBody', d3.forceManyBody().strength(-5000))
      .force('link', d3.forceLink(regionLinks).id(d => d.id))
      .on('tick', () => {
        this.background
          .selectAll('.region')
          .attr('cx', node => node.x)
          .attr('cy', node => node.y);
        this.background
            .selectAll(".region-link")
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
        nodeSimulation
          .force('x', d3.forceX((node) => {
            const xs = regions
              .filter(
                region => region[memberAccessor].indexOf(node.id) >= 0,
              )
              .map(
                forceCenter => forceCenter.x,
              );
            return (
              xs.length === 0
              ? w / 2
              : average(xs)
            );
          }))
          .force('y', d3.forceY((node) => {
            const ys = regions
              .filter(
                region => region[memberAccessor].indexOf(node.id) >= 0,
              )
              .map(
                forceCenter => forceCenter.y,
              );
            return (
              ys.length === 0
              ? w / 2
              : average(ys)
            );
          }));
      });

    nodeSimulation
      .nodes(nodes)
      .force('manyBody', d3.forceManyBody())
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

    this.background
      .selectAll(".region-link")
      .data(regionLinks, d => `${d.source.id}_${d.target.id}`)
      .join(
        enter => {
          enter
            .append("line")
            .attr("class", "region-link")
            .attr('stroke', 'lightgrey')
            .attr('stroke-width', 3);
        },
        update => {},
        exit => {
          exit.remove();
        }
      );

    this.background
      .selectAll('.region')
      .data(regions, d => d.id)
      .join(
        (enter) => {
          enter.append('circle')
            .attr('class', 'region')
            .attr('r', 5)
            .attr('fill', 'red')
            .attr('id', d => d.id);
        },
        null,
        (exit) => {
          exit.remove();
        },
      );

    regionSimulation.restart();
    nodeSimulation.restart();
  }

  render() {
    return (
      <span>
        <svg ref={this.container} className={Styles.FlavorMap} />
      </span>
    );
  }
}

export default FlavorMapForceLayout;
