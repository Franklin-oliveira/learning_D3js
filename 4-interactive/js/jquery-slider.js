/*
 * Gapminder clone with legend
 *
 */

// defining margins
let margin = { left: 80, right: 10, top: 10, bottom: 80 };

// svg dimmensions
let width = 900 - margin.left - margin.right;
let height = 600 - margin.top - margin.bottom;

let time = 0;
let interval;
let Data;

// appending SVG
let svg = d3.select('#chart').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

// appending SVG group
let g = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')

// preparint Tooltip
let Tip = d3.tip().attr('class', 'd3-tip')
    .html(function (d) {
        let text = "<strong>Country:</strong> <span style='color:red'>" + d.country + "</span><br>";
        text += "<strong>Continent:</strong> <span style='color:red;text-transform:capitalize'>" + d.continent + "</span><br>";
        text += "<strong>Life Expectancy:</strong> <span style='color:red'>" + d3.format(".2f")(d.life_exp) + "</span><br>";
        text += "<strong>GDP Per Capita:</strong> <span style='color:red'>" + d3.format("$,.0f")(d.income) + "</span><br>";
        text += "<strong>Population:</strong> <span style='color:red'>" + d3.format(",.0f")(d.population) + "</span><br>";

        return text;
    })
g.call(Tip)  // setting context (see the docs)

// x scale (in log)
let x = d3.scaleLog()
    .base(10)
    .range([0, width])
    .domain([100, 150000]);

// y scale (linear)
let y = d3.scaleLinear()
    .domain([0, 90])
    .range([height, 0])

// area of the circles
var area = d3.scaleLinear()
    .range([25 * Math.PI, 1500 * Math.PI])
    .domain([2000, 1400000000]);

// colors schemeTableau10
var color = d3.scaleOrdinal(d3.schemeTableau10);

// x axis
var xAxis = d3.axisBottom(x)
    .tickValues([300, 1000, 3000, 10000, 30000, 100000])
    .tickFormat(d3.format("$"));
g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxis);

// y axis
var yAxis = d3.axisLeft(y)
    .tickFormat(function (d) { return +d; });
g.append("g")
    .attr("class", "y axis")
    .call(yAxis);

// adding legend
var continents = ["europe", "asia", "americas", "africa"];

var legend = g.append("g")
    .attr("transform", "translate(" + (width - 10) + "," + (height - 125) + ")")  // bottom right position

continents.forEach(function (continent, i) {
    var legendRow = legend.append("g")
        .attr("transform", "translate(0, " + (i * 20) + ")");  // separating rows by 20px

    // adding rectangles and text to the legend
    legendRow.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", color(continent));

    legendRow.append("text")
        .attr("x", -10)
        .attr("y", 10)
        .attr("text-anchor", "end")
        .style("text-transform", "capitalize")
        .text(continent);
});

// x label
var xLabel = g.append("text")
    .attr("y", height + 40)
    .attr("x", width / 2)
    .attr("font-size", "16px")
    .attr("text-anchor", "middle")
    .text("GDP Per Capita (in US$)");

// y label
var yLabel = g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -35)
    .attr("x", -200)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Life Expectancy (in years)")

// time label (slightly above x axis)
var timeLabel = g.append("text")
    .attr("y", height - 10)
    .attr("x", width - 45)
    .attr("font-size", "40px")
    .attr("opacity", "0.4")
    .attr("text-anchor", "middle")
    .text("1800");


// Parsing data
d3.json('./data/gapminder.json').then(function (data) {


    // adjusting data 
    Data = data.map(function (year) {
        return year["countries"].filter(function (country) {
            var point_exist = (country.income && country.life_exp);
            return point_exist
        }).map(function (country) {
            country.income = +country.income;
            country.life_exp = +country.life_exp;
            return country;
        })
    });


    // First run of the visualization
    update(Data[0]);


}).catch(function (error) {
    console.log(error)
})

$("#play-button")
    .on("click", function () {

        let button = $(this);
        if (button.text() == "Play") {
            button.text('Pause')
            // when the user clicks on play
            interval = setInterval(step, 200);
        } else {
            button.text('Play')
            clearInterval(interval);
        }
    })

$("#reset-button")
    .on("click", function () {
        time = 0;
        update(Data[0]);  // updates imediately (doesn't need to click on play)
    })

$("#continent-select")
    .on("change", function () {
        update(Data[time])
    })

$('#date-slider').slider({
    max: 2014,
    min: 1800,
    step: 1,
    slide: function (event, ui) {
        time = ui.value - 1800;  // sets selected time (position in the array)
        update(Data[time]);
    }
})

function step() {
    time = (time < 214) ? time + 1 : 0  // when reaches the end, start over
    update(Data[time]);
}


function update(data) {
    // setting transition
    var t = d3.transition().duration(200);

    let continent = $("#continent-select").val();

    var data = data.filter( function (d) {
        if (continent == "all") {
            return true;
        } else {
            return d.continent == continent;
        }
    })

    // JOIN new data with old elements.
    var circles = g.selectAll("circle").data(data, function (d) {
        return d.country;
    });

    // EXIT old elements not in new data.
    circles.exit()
        .attr("class", "exit")
        .remove();

    // ENTER new elements.
    circles.enter()
        .append("circle")
        .attr("class", "enter")
        .attr("fill", function (d) { return color(d.continent); })
        .on("mouseover", Tip.show)
        .on('mouseout', Tip.hide)
        .merge(circles)
        .transition(t)
        .attr("cy", function (d) { return y(d.life_exp); })
        .attr("cx", function (d) { return x(d.income) })
        .attr("r", function (d) { return Math.sqrt(area(d.population) / Math.PI) });

    // Update the time label
    timeLabel.text(+(time + 1800))

    // updates the label
    $("#year")[0].innerHTML = +(time + 1800)

    $("#date-slider").slider("value", +(time+1800) )
}