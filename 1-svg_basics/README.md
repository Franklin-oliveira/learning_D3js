# SVG Basics

Here you are going to find some notes about the `svg` object and how to modify it using D3. 

<br>

## Content

- **data:** some data files used on examples.
- **js:** some JavaScript libraries (including D3) and some custom scripts. 
- **buildings.html:** simple bar chart representing the height of some buildings around the world. Code is on file `./js/buildings.js`.
- **external-data.html:** a short example of how to load external data (from `csv`, `tsv` and `json` files) into D3 and using it to construct some shapes in svg. D3 code is on file `./js/external-data.js`. 
- **stickman.html:** funny example of how to use D3 to draw in svg. Details in `./js/stickman.js`.
- **svg-with-d3-circles.html:** a short example of how to work with **D3 enter** to handle an array of data. Details are in `./js/svg-with-d3-circles.js`. 
- **svg-with-d3.html:** a short example of how to use D3 to create and modify a svg element inside an HTML page. Here, we use **D3 select**, **D3 append** and **D3 attr**. For details, see `./js/svg-with-d3.js` file. 
- **svg.html:** a brief review of the svg element and some examples of how to draw rectangles, circles, ellipses, paths, etc.

<br>

## What I learned

- reviewed some `svg` basic structures and learned how to create and modify them with D3.
- how to use `selectAll` and `enter` methods to create and modify multiple structures recursively.
- how to load external data into D3 (from `csv`, `tsv` and `json` files) and use it to modify `svg` structures.

<br>

## Examples

Here are some examples of what I was capable of constructing after learning these things:

### Mr. Stickman

This example was constructed using only `svg` methods like `rect` and `line`. 

<p align='center'>
    <img src='./prints/stickman.png'>
</p>

### Circles

The goal here was to produce an `svg` recursively modifying colors and size with an array of data.

<p align='center'>
    <img src='./prints/circles.png'>
</p>


### Simple Bar Chart

Here the objective was to understand what kinds of things D3 does "under the hood" to produce some classical visualizations with real data.

<p align='center'>
    <img src='./prints/bar-chart.png'>
</p>

<br>

-----
