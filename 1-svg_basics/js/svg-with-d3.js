/*
 * Custom script to add SVG into html div with D3
*/

// selects the div where the chart will be added and appends an svg canvas to it
let svg = d3.select("#chart").append("svg")
    .attr("width", 300)
    .attr("height", 300);

// drawing a circle
let circle = svg.append("circle")
    .attr('cx', 100)
    .attr('cy', 150)
    .attr('r', 100)
    .attr('fill', 'red');
