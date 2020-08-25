// formatting time  -  Date object to string
let formatTime1 = d3.timeFormat('%B %d, %Y')
console.log(formatTime1(new Date))  // August 25, 2020


// formatting time  -  string to Date object
let parseTime1 = d3.timeParse('%B %d, %Y')
console.log(parseTime1('August 25, 2020'))  // Tue Aug 25 2020 00:00:00 GMT-0300

// string to date
let parseTime = d3.timeParse('%d/%m/%y')
let example = parseTime("19/12/93")  // Sun Dec 19 1993 00:00:00 GMT-0200 

console.log(example)  

// formatting
let formatTime = d3.timeFormat("%d-%m-%Y")
console.log(formatTime(example))  // 19-12-1993