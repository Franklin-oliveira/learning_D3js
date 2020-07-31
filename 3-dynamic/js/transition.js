/* 
 * Bar chart example with animations
 * coffee revenue
 */

// defining margins
let margin = { left: 100, bottom: 100, right: 10, top: 10 };

// setting width and height
let width = 600 - margin.left - margin.right;
let height = 400 - margin.top - margin.bottom;

// if true, the chart displays Revenues. If false, the profits are displayed.
let flag = true;

// Adding transition
let t = d3.transition().duration(500);

// appending SVG object
let svg = d3.select('#chart').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

// appending svg group
let g = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// appending axes
let xAxisGroup = g.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')

let yAxisGroup = g.append('g')
    .attr('class', 'y axis')


// y scale (linear)
let y = d3.scaleLinear()
    .range([height, 0])

// y scale (band)
let x = d3.scaleBand()
    .range([0, width])
    .paddingInner(0.3)
    .paddingOuter(0.3);

// x label
g.append('text')
    .attr('class', 'xlabel')
    .attr('x', width / 2)
    .attr('y', height + 50)
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .text("Month")

// y label
let yLabel = g.append('text')
    .attr('class', 'ylabel')
    .attr('x', - (height / 2))
    .attr('y', -60)
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')

d3.json('./data/coffee-revenue.json').then(function (data) {
    console.log(data)

    data.forEach(function (d) {
        d.revenue = +d.revenue;
        d.profit = +d.profit;
    })

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

    d3.interval(function () {
        update(data)
        flag = !flag;  // maked the chart flick between profits and revenues
    }, 1000)

    // set viz for the first time
    update(data)

}).catch(function (error) {
    console.log(error)
})

// updates the chart with new data

function update(data) {

    let value = flag ? "revenue" : "profit";

    // updating domain
    y.domain([0, d3.max(data, function (d) {
        return d[value];
    })])
    x.domain(data.map(function (d) {
        return d.month;
    }))

    // x axis
    let xAxis = d3.axisBottom(x);

    // y axis
    let yAxis = d3.axisLeft(y)
        .tickFormat(function (d) {
            return '$' + d;
        })

    // updating axes
    xAxisGroup.transition(t).call(xAxis)
    yAxisGroup.transition(t).call(yAxis)

    // D3 update pattern
    // JOIN new data with old elements
    let revBars = g.selectAll('rect').data(data)

    // EXIT old elements not present in new data
    revBars.exit()
        .attr('fill', 'red')
        .transition(t)
        .attr('y', y(0))
        .attr('height', 0)
        .remove()

    // UPDATE old elements present in new data
    revBars.transition(t)
        .attr('x', function (d) {
        return x(d.month);
        })
        .attr('y', function (d) {
            return y(d[value]);
        })
        .attr('height', function (d) {
            return height - y(d[value])
        })
        .attr('width', x.bandwidth)

    // ENTER new elements 
    revBars.enter()
        .append('rect')
            .attr('x', function (d) {
                return x(d.month);
            })
            .attr('width', x.bandwidth)
            .attr('fill', '#d9b38c')
            .attr('y', y(0))
            .attr('height', 0)
        .transition(t)
            .attr('y', function (d) {
                return y(d[value]);
            })
            .attr('height', function (d) {
                return height - y(d[value])
            })
    
    let label = flag ? "Revenue" : "Profit";
    yLabel.text(label + ' (thousands of US$)')
} 