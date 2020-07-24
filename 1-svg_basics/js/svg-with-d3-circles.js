/*
 * Adding many circles to the screel
 * 
 */ 

// Adding many circles
let data = [25, 20, 10, 12, 15];
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
        .attr('cx', function(d, i) {
            console.log('item: ' + d, 'index: ' + i);
            return (i*50)+25;
        })
        .attr('cy', 100)
        .attr('r', function(d) {
            console.log('item: ' + d);
            return d;
        })
        .attr('fill', function (d, i){
            return colors[i];
        });
