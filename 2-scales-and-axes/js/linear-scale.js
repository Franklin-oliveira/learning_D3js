/*
 * Revisiting Buildings bar chart example and adding a linear scale to it
 *
 */

let svg = d3.select('#chart').append('svg')
    .attr('width', 400)
    .attr('height', 400)

d3.json('./data/buildings.json').then(function (data) {
    console.log(data)

    data.forEach(function (d) {
        d.height = parseFloat(d.height);
    })

    // linear scale
    let y = d3.scaleLinear()
        .domain([0, 820])
        .range([0, 400])

    let bars = svg.selectAll("bar")
        .data(data);

    bars.enter()
        .append('rect')
        .attr('x', function (d, i) {
            return i * 50
        })
        .attr('y', 10)
        .attr('height', function (d, i) {
            // returning the scaled value to fit the screen
            return y(d.height);
        })
        .attr('width', 40)
        .attr('fill', 'grey')
}).catch(function (error) {
    console.log(error);
})