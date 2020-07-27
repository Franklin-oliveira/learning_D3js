/*
 * Adding a Band Scale to the Buildings chart we did previously
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
        .domain([0, 828])
        .range([0, 400])

    // band scale
    let x = d3.scaleBand()
        .domain(["Burj Khalifa", "Shanghai Tower", "Abraj Al-Bait Clock Tower",
            "Ping An Finance Centre", "Lotte World Tower", "One World Trade Center",
            "Guangzhou CTF Finance Center"])
        .range([0, 400])
        .paddingInner(0.2)
        .paddingOuter(0.3);

    let bars = svg.selectAll("bar")
        .data(data);

    bars.enter()
        .append('rect')
        .attr('x', function (d) {
            return x(d.name)
        })
        .attr('y', 10)
        .attr('height', function (d) {
            // returning the scaled value to fit the screen
            return y(d.height);
        })
        .attr('width', x.bandwidth)
        .attr('fill', 'grey')
}).catch(function (error) {
    console.log(error);
})