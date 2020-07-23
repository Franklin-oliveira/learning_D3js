/*
 * We are going to draw a stickman using D3.
 * 
 */

// creating SVG window
let svg = d3.select('#chart').append('svg')
                .attr('width', 200)
                .attr('height', 250)

// drawing the head
let head = svg.append('rect')
                .attr('x', 50)
                .attr('y', 10)
                .attr('width', 50)
                .attr('height', 50)
                .attr('stroke', 'gray')
                .attr('stroke-width', 5)
                .attr('fill', 'transparent')

// drawing the body
let body = svg.append('rect')
                .attr('x', 72)
                .attr('y', 60)
                .attr('width', 6)
                .attr('height', 120)
                .attr('fill', 'gray')

// drawing right arm
let right_arm = svg.append('line')
                    .attr('x1', 77)
                    .attr('y1', 90)
                    .attr('x2', 120)
                    .attr('y2', 115)
                    .attr('stroke', 'gray')
                    .attr('stroke-width', 5)

// drawing left arm
let left_arm = svg.append('line')
                    .attr('x1', 73)
                    .attr('y1', 90)
                    .attr('x2', 30)
                    .attr('y2', 115)
                    .attr('stroke', 'gray')
                    .attr('stroke-width', 5)

// drawing right leg
let right_leg = svg.append('line')
                    .attr('x1', 75)
                    .attr('y1', 178)
                    .attr('x2', 110)
                    .attr('y2', 235)
                    .attr('stroke', 'gray')
                    .attr('stroke-width', 5)

// drawing left arm
let left_leg = svg.append('line')
                    .attr('x1', 75)
                    .attr('y1', 178)
                    .attr('x2', 40)
                    .attr('y2', 235)
                    .attr('stroke', 'gray')
                    .attr('stroke-width', 5)