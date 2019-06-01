import * as React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import styled from 'styled-components';

const FullScreenSvg = styled.svg`
  height: 100%;
  width: 100%;
  position: absolute;
`;

const Tooltip = styled.div`
  position: absolute;
  padding: 1em;
  background: #fff;
  border: 0.25em solid #000;
  z-index: 1000;

  ::before {
    content: '';
    position: absolute;
    display: block;
    width: 0px;
    left: 50%;
    bottom: 0;
    border: 0.75em solid transparent;
    border-bottom: 0;
    border-top: 0.75em solid #000;
    transform: translate(-50%, calc(100%));
  }
`;

const NiceHeader = styled.h3`
  margin: 0px;
`;

const sum = list => list.reduce((s, x) => s + x, 0);
const average = list => sum(list) / list.length;
const concat = (a, b) => a.concat(b);
const dedupe = list => list.reduce((r, x) => (r.indexOf(x) === -1 ? r.concat([x]) : r), []);
const ease = d3.transition().duration(100).ease(d3.easeLinear);

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

    // create layers for nodes and links
    this.background = this.svg.append('g').attr('class', 'background');
    this.g = this.svg.append('g').attr('class', 'g');
    this.links = this.g.append('g').attr('class', 'links');
    this.nodes = this.g.append('g').attr('class', 'nodes');

    // apply some global attributes to nodes and links
    this.links
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6);

    this.nodes
      .attr('stroke', '#fff')
      .attr('stroke-width', 1);

    this.zoom = d3.zoom()
      .scaleExtent([0.1, 7])
      .on('zoom', () => {
        const { transform } = d3.event;
        this.g.attr('transform', `translate(${transform.x}, ${transform.y}) scale(${transform.k})`);
        this.moveTooltip();
      });

    this.svg
      .call(this.zoom)
      .on('click.zoom', null)
      .on('dblclick.zoom', null);

    this.background
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('fill', 'transparent');

    // draw with the initial state
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  handleTick() {
    this.links
      .selectAll('.link')
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);

    this.nodes
      .selectAll('.node')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);

    this.moveTooltip();
  }

  draw() {
    const { regionSimulation, nodeSimulation } = this.state;
    const {
      nodes,
      links,
      regions,
      regionLinks,
      memberAccessor,
      selectedNode,
      onClickNode,
      onClickBackground,
    } = this.props;

    console.log(links);

    const w = this.container.current.getBoundingClientRect().width;
    const h = this.container.current.getBoundingClientRect().height;

    this.background
      .select('rect')
      .attr('width', w)
      .attr('height', h);

    const regionRadius = d3.scaleLinear()
      .domain([
        d3.min(regions.map(region => region[memberAccessor].length)),
        d3.max(regions.map(region => region[memberAccessor].length)),
      ])
      .range([10, 300]);

    const regionOverlap = d3.forceCollide()
      .radius(
        region => regionRadius(region[memberAccessor].length),
      );

    const clusterForce = (alpha) => {
      nodes.forEach(
        (node) => {
          const clusters = nodes
            .filter(n => n.id !== node.id)
            .filter(n => n.clusterId === node.clusterId);
          if (clusters.length > 0) {
            const nodeRef = node;
            const { x, y } = nodeRef;
            const vector = clusters
              .map(
                point => ({
                  x: point.x - x,
                  y: point.y - y,
                }),
              )
              .reduce(
                (result, v) => ({
                  x: result ? result.x + v.x : v.x,
                  y: result ? result.y + v.y : v.y,
                }),
                undefined,
              );
            const magnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
            nodeRef.vx += 10 * (vector.x / magnitude) * alpha;
            nodeRef.vy += 10 * (vector.y / magnitude) * alpha;
          }
        },
      );
    };

    this.g.selectAll('*').interrupt();
    this.background.on('click', onClickBackground);

    regionSimulation
      .nodes(regions)
      .force('x', d3.forceX(w / 2))
      .force('y', d3.forceY(h / 2))
      .force('collide', regionOverlap)
      .force('manyBody', d3.forceManyBody().strength(-5000))
      .force('link', d3.forceLink(regionLinks).id(d => d.id))
      .on('tick', () => {
        nodeSimulation
          .force('x', d3.forceX((node) => {
            const xs = regions
              .filter(
                region => region[memberAccessor].indexOf(node.id) >= 0,
              )
              .map(
                forceCenter => forceCenter.x,
              );
            return xs.length === 0 ? w / 2 : average(xs);
          }))
          .force('y', d3.forceY((node) => {
            const ys = regions
              .filter(
                region => region[memberAccessor].indexOf(node.id) >= 0,
              )
              .map(
                forceCenter => forceCenter.y,
              );
            return ys.length === 0 ? h / 2 : average(ys);
          }));
      });

    nodeSimulation
      .nodes(nodes)
      .force('cluster', clusterForce)
      .force('collide', d3.forceCollide(10))
      .force('manyBody', d3.forceManyBody())
      .on('tick', () => this.handleTick());

    this.nodes
      .selectAll('.node')
      .data(nodes, d => d.id)
      .join(
        (enter) => {
          enter.append('circle')
            .attr('class', d => `node node-${d.id}`)
            .attr('r', 10)
            .attr('id', d => d.id)
            .style('cursor', 'pointer')
            .on('click', d => onClickNode(d.id));
        },
        null,
        (exit) => {
          exit.remove();
        },
      );

    if (selectedNode) {
      const neighbors = (
        concat(
          dedupe(
            concat(
              links.map(d => d.source.id), links.map(d => d.target.id),
            ),
          ),
          [selectedNode.id],
        )
      );
      this.nodes
        .selectAll('.node')
        .transition(ease)
        .attr('opacity', d => (neighbors.indexOf(d.id) >= 0 ? 1.0 : 0.1));
      this.moveTooltip();
    } else {
      this.nodes
        .selectAll('.node')
        .transition(ease)
        .attr('opacity', 1.0);
    }

    this.links
      .selectAll('.link')
      .data(links, d => `${d.source.id}_${d.target.id}`)
      .join(
        (enter) => {
          enter.append('line')
            .attr('class', 'link')
            .attr('stroke', '#bdbdbd')
            .attr('stroke-width', 2)
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y)
            .attr('opacity', 0)
            .transition(ease)
            .attr('opacity', 1.0);
        },
        null,
        (exit) => {
          exit.remove();
        },
      );

    regionSimulation.restart();
    nodeSimulation.restart();
  }

  moveTooltip() {
    const { selectedNode } = this.props;

    if (selectedNode === null || selectedNode === undefined) {
      return;
    }

    const { x, y, width } = d3.select(`.node-${selectedNode.id}`).node().getBoundingClientRect();
    const t = d3.select(this.tooltip.current).node().getBoundingClientRect();

    const radius = width / 2;

    d3.select(this.tooltip.current)
      .style('transform', `translate(${x + radius - (t.width / 2)}px,${y - radius - 5 - t.height}px)`);
  }

  render() {
    const { selectedNode } = this.props;
    return (
      <>
        <FullScreenSvg ref={this.container} />
        {
          selectedNode && (
            <Tooltip ref={this.tooltip}>
              <NiceHeader>
                { selectedNode.name }
              </NiceHeader>
              <table>
                {
                  selectedNode.taste && (
                    <tr>
                      <td>
                        taste
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        { selectedNode.taste }
                      </td>
                    </tr>
                  )
                }
                {
                  selectedNode.volume && (
                    <tr>
                      <td>
                        volume
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        { selectedNode.volume }
                      </td>
                    </tr>
                  )
                }
              </table>
            </Tooltip>
          )
        }
      </>
    );
  }
}

export default FlavorMapForceLayout;
