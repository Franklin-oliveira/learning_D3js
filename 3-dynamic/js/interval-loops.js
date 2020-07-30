/* 
 * Bar chart example
 * coffee revenue
 */

// defining margins
let margin = { left: 100, bottom: 100, right: 10, top: 10 };

// setting width and height
let width = 600 - margin.left - margin.right;
let height = 400 - margin.top - margin.bottom;

// appending SVG object
let svg = d3.select('#chart').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

// appending svg group
let g = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

d3.json('./data/coffee-revenue.json').then(function (data) {
    console.log(data)

    data.forEach(function (d) {
        d.revenue = +d.revenue;
        d.profit = +d.profit;
    })

    x.domain(data.map(function (d) {
        return d.month;
    }))

    y.domain([0, d3.max(data, function (d) {
        return d.revenue;
    })])


    d3.interval(function () {
        update(data)
    }, 1000);

    // // profit bars
    // let profBars = g.selectAll('bar').data(data)
    // profBars.enter()
    //     .append('rect')
    //     .attr('x', function (d) {
    //         return x(d.month);
    //     })
    //     .attr('y', function (d) {
    //         return y(d.profit);
    //     })
    //     .attr('height', function (d) {
    //         return height - y(d.profit);
    //     })
    //     .attr('width', x.bandwidth)
    //     .attr('fill', '#996633')

}).catch(function (error) {
    
})

function update(data) {

    // y scale (linear)
    let y = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) {
        return d.revenue;
    })])
    .range([height, 0])

    // y scale (band)
    let x = d3.scaleBand()
        .domain(data.map(function (d) {
            return d.month;
        }))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);

    // x axis
    let xAxis = d3.axisBottom(x);
    g.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)

    // y axis
    let yAxis = d3.axisLeft(y);
    g.append('g')
        .attr('class', 'y axis')
        .call(yAxis)

    // x label
    g.append('text')
        .attr('class', 'xlabel')
        .attr('x', width / 2)
        .attr('y', height + 50)
        .attr('font-size', '20px')
        .attr('text-anchor', 'middle')
        .text("Month")

    // y label
    g.append('text')
        .attr('class', 'ylabel')
        .attr('x', - (height / 2))
        .attr('y', -60)
        .attr('font-size', '20px')
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .text('Value (thousands of US$)')

    // revenue bars
    let revBars = g.selectAll('bar').data(data)
    revBars.enter()
        .append('rect')
        .attr('x', function (d) {
            return x(d.month);
        })
        .attr('y', function (d) {
            return y(d.revenue);
        })
        .attr('height', function (d) {
            return height - y(d.revenue)
        })
        .attr('width', x.bandwidth)
        .attr('fill', '#d9b38c')
};