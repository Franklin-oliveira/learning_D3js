/*
 * SVG's groups and margins
 *
 */

// defining margin object
let margin = { left: 100, bottom: 140, top: 10, right: 10 };

// defining height and width of viz.
let width = 500 - margin.left - margin.right;
let height = 500 - margin.top - margin.bottom;

// defining svg
let svg = d3.select('#chart').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

// appending an SVG group
let g = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

d3.json('./data/buildings.json').then(function (data) {
    console.log(data)

    data.forEach(function (d) {
        d.height = parseFloat(d.height);
    })

    // linear scale
    let y = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) {
            return d.height;  // maximum value for domain
        })])
        .range([height, 0])

    // band scale
    let x = d3.scaleBand()
        .domain(data.map(function (d) {  // automatic categorical domain
            return d.name;
        }))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);

    // creating axes (need to rotate so the labels don't overlap)
    let xAxis = d3.axisBottom(x);
    g.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, ' + height + ')')
        .call(xAxis)
        .selectAll('text')
        .attr('y', '10')
        .attr('x', '-5')
        .attr('text-anchor', 'end')
        .attr('transform', 'rotate(-40)')

    let yAxis = d3.axisLeft(y)
        .ticks(4)
        .tickFormat(function (d) {
            return d + 'm'
        })
    g.append('g')
        .attr('class', 'y axis')
        .call(yAxis)


    // x label
    g.append('text')
        .attr('class', 'xlabel')
        .attr('x', width/2)
        .attr('y', height+120)
        .attr('font-size', '20px')
        .attr('text-anchor', 'middle')
        .text("The World's Tallest Buildings")

    // y label
    g.append('text')
        .attr('class', 'ylabel')
        .attr('x', - (height/2))
        .attr('y', -60)
        .attr('font-size', '20px')
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .text('Height (in meters)')


    let bars = g.selectAll("bar")
        .data(data);

    bars.enter()
        .append('rect')
        .attr('x', function (d) {
            return x(d.name)
        })
        .attr('y', function (d) {  // shifting the bars to the bottom
            return y(d.height)
        })
        .attr('height', function (d) {
            // returning the scaled value to fit the screen
            return height - y(d.height);
        })
        .attr('width', x.bandwidth)
        .attr('fill', 'grey')
}).catch(function (error) {
    console.log(error);
})