/*
 * Importing external data to D3
 * 
 */

d3.json('./data/data.json').then(function (data) {
    // p.s.: data generally comes in text format. So, we need to convert to numerical formats if necessary
    data.forEach(function (d) {
        d.age = +d.age;
        d.height = parseFloat(d.height);
    })

    // Adding many circles
    let colors = ['gray', 'purple', 'red', 'green', 'blue'];

    let svg = d3.select('#chart').append('svg')
        .attr('width', 400)
        .attr('height', 200)

    let circles = svg.selectAll("circle")
        .data(data);

    // we can use a function instead of a value (works for every value in the array)
    // function (data, index) 
    // note: the function loops through every element of the array
    circles.enter()
        .append('circle')
        .attr('cx', function (d, i) {
            console.log('item: ' + d, 'index: ' + i);
            return (i * 80) + 50;
        })
        .attr('cy', 100)
        .attr('r', function (d) {
            console.log('item: ' + d);
            return d.age * 2;
        })
        .attr('fill', function (d, i) {
            return colors[i];
        });

}).catch(function (error) {
    // displays if there's an error at reading the file
    console.log(error)
})

