let timeScale = d3.scaleTime()
    .domain([new Date(2016, 0, 1), new Date(2017, 0, 1)])
    .range([0, 700]);

let Data = [new Date(2016, 0, 1), new Date(2016, 3, 1), new Date(2016, 6, 1), new Date(2017, 0, 1)];

let svg = d3.select('#chart').append('svg')
    .attr('width', 1000)
    .attr('height', 100)


svg.selectAll('circle')
    .data(Data)
    .enter()
    .append('circle')
    .attr('r', 2)
    .attr('cy', 8)
    .attr('cx', function (d) {
        return timeScale(d);
    })
    .attr('transform', 'translate(40 40)')

svg.selectAll('text')
    .data(Data)
    .enter()
    .append('text')
    .attr('x', function (d) {
        return timeScale(d);
    })
    .text(function (d) {
        return d.toDateString();
    })
    .attr('transform', 'translate(40 40)')