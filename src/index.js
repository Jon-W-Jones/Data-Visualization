import React, { useEffect, useState, useRef } from 'react';
import { render } from 'react-dom';
import * as d3 from 'd3';

const styles = require('./index.module.scss');
function App() {
    const testData = [100, 250, 150, 300, 230, 130];
    const unstableTestData = [];
    for(let i = 0; i < 30; ++i) {
        unstableTestData.push(testData[Math.round(Math.random() * (testData.length - 1))] * Math.random());
    };
    console.log(unstableTestData);
    const divRef = useRef(null);
    let numCircles = 20;
    var xScale = d3.scaleLinear().domain([0,300]).range([0, 500]);
    var yScale = d3.scaleLinear().domain([0,300]).range([0, 500]);
    useEffect(() => {
        const svg = !d3.select('#iExist').empty() ? d3.select('#iExist') : d3.select('#svgCanvas')
            .append('svg')
                .attr('width', '500px')
                .attr('height', '500px')
                .attr('id', 'iExist')
                .style('margin-left', '100px');
        
        var toolTip = d3.select("#svgCanvas")
        .append("div")
        .style("opacity", 0)
        .attr("class", `${styles.toolTip}`)
        .attr("ref", divRef);
        svg.selectAll('circle')
            .data(unstableTestData)
            .enter()
            .append('circle')
                .attr('cx', (d, i) => `${xScale(d)}px`)
                .attr('cy', (d, i) => `${yScale(d)}px`)
                .attr('r', (d, i) => `${d % 40 * 1.3}px`)
                .attr('stroke', 'black')
                .attr('fill', 'pink')
                .attr('class', `${styles.circles}`)
                .on('mouseover', (d, i) => {
                    toolTip.style('opacity', 1)
                        .text(d)
                        .style('top', `${d3.event.pageY + 30}px`)
                        .style('left', `${d3.event.pageX}px`)
                        .style('display', 'inherit')
                })
                .on('mousemove', (d, i, e) => {
                    toolTip.style('left', (d3.event.clientX + 5) + 'px')
                        .style('top', (d3.event.clientY - 20) + 'px') 
                })
                .on('mouseout', (d, i) => {
                    toolTip.style('display', 'none')
                });
    }, []);
    return (
        <div id='bigboi'>
            <div className={styles.canvas} id='svgCanvas'></div>
        </div>
    );
}

render(<App />, document.getElementById('app'));