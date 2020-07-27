/*
 * Constructing a simple bar chart with the height of some buildings around the world
 * Data: ./data/buildings.js
 */

d3.json('./data/buildings.json').then(function (data) {
    // console.log(data);

    // height field should be a float
    data.forEach(function (d) {
        d.height = parseFloat(d.height);
    })

    let svg = d3.select('#chart').append('svg')
                                  .attr('width', 400)
                                  .attr('height', 400)

    let bars = svg.selectAll("bar")
                    .data(data);
    
    bars.enter()
            .append('rect')
            .attr('x', function(d, i) {
                return i*50
            })
            .attr('y', 10)
            .attr('height', function(d, i) {
                return d.height;
            })
            .attr('width', 40)
            .attr('fill', 'grey')
}).catch(function (error) {
    console.log(error);
})