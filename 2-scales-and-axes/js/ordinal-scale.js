/*
 * Using ordinal scale to assign different colors to categorical data
 *
 */

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

var linearScale = d3.scaleLinear()
	.domain([0, 11])
	.range([0, 600]);

var ordinalScale = d3.scaleOrdinal()
	.domain(months)
	.range(['black', 'blue', 'purple', 'green', 'orange', 'gray']);

let svg = d3.select('#chart').append('svg')
    .attr('width', 800)
    .attr('height', 100)

svg.selectAll('text')
	.data(months)
	.enter()
	.append('text')
	.attr('x', function(d, i) {
		return linearScale(i);
	})
	.text(function(d) {
		return d;
	})
	.style('fill', function(d) {
		return ordinalScale(d);
    })
    .attr('transform', 'translate(100 40)')