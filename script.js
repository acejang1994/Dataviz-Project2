data = {
    "Facebook" : {
        "Gender" : 
        { "label": "Men", "count": 66},
        { "label": "Women", "count": 77}
        ],
        "Race": {
            "White": 70,
            "Black": 67,
            "Hispanic": 75 
        },
        "Age":{
            "18-29": 82,
            "30-49": 79, 
            "50-64": 64, 
            "65+": 48
        },
        "Education": {
            "Highschool grad or less": 71, 
            "Some College": 72,
            "College+": 72
        },
        "Income": {
            "Less than $30,000/yr": 73,
            "$30,000-$49,999": 72, 
            "$50,000-$74,999": 66, 
            "$75,000+": 78
        },
        "Living Environment": {
            "Urban": 74, 
            "Suburban": 72, 
            "Rural": 67
        },
        "Total": 72
    },
    "Pinterest":{
        "Gender":{
            "Men":16,
            "Women":44
        },
        "Race":{
            "White":32,
            "Black":23,
            "Hispanic":32
        },
        "Age":{
            "18-29": 37,
            "30-49": 36,
            "50-64": 24,
            "65+": 16
        },
        "Education":{
            "High school grad or less": 25,
            "Some college": 37,
            "College+": 31
        },
        "Income":{
            "Less than $30,000/yr": 24,
            "$30,000-$49,999": 37,
            "$50,000-$74,999": 41,
            "$75,000+": 30
        },
        "Living Environment":{
            "Urban": 26,
            "Suburban": 34,
            "Rural": 31
        },
        "Total":31
    },
    "LinkedIn":{
        "Gender":{
            "Men":26,
            "Women":25
        },
        "Race":{
            "White":26,
            "Black":22,
            "Hispanic":22
        },
        "Age":{
            "18-29": 22,
            "30-49": 32,
            "50-64": 26,
            "65+": 12
        },
        "Education":{
            "High school grad or less": 9,
            "Some college": 25,
            "College+": 46
        },
        "Income":{
            "Less than $30,000/yr": 17,
            "$30,000-$49,999": 21,
            "$50,000-$74,999": 32,
            "$75,000+": 41
        },
        "Living Environment":{
            "Urban": 30,
            "Suburban": 26,
            "Rural": 1
        },
        "Total":25
    },
    "Instagram" : {
        "Gender" :  {
            "Men": 24,
            "Women": 31
        },

        "Race": {
            "White": 21,
            "Black": 47,
            "Hispanic": 38 
        },

        "Age":{
            "18-29": 55,
            "30-49": 28, 
            "50-64": 11, 
            "65+": 4
        },

        "Education": {
            "Highschool grad or less": 25, 
            "Some College": 32,
            "College+": 26
        },

        "Income": {
            "Less than $30,000/yr": 26,
            "$30,000-$49,999": 27, 
            "$50,000-$74,999": 30, 
            "$75,000+": 26
        },
        "Living Environment": {
            "Urban": 32, 
            "Suburban": 28, 
            "Rural": 18
        },
        "Total": 28
    },

    "Twitter" : {
        "Gender" :  {
            "Men": 25,
            "Women": 21
        },

        "Race": {
            "White": 20,
            "Black": 28,
            "Hispanic": 28 
        },

        "Age":{
            "18-29": 32,
            "30-49": 29, 
            "50-64": 13, 
            "65+": 6
        },

        "Education": {
            "Highschool grad or less": 19, 
            "Some College": 23,
            "College+": 27
        },

        "Income": {
            "Less than $30,000/yr": 21,
            "$30,000-$49,999": 19, 
            "$50,000-$74,999": 30, 
            "$75,000+": 26
        },
        "Living Environment": {
            "Urban": 32, 
            "Suburban": 28, 
            "Rural": 18
        },
        "Total": 23
    }
}

      
window.addEventListener("load",run);
      
function run (){
    // button_facebook.addEventListener("click",function() { updateView(category,2013); });
    initializeView();
}

function initializeView() {
    var dataset = [
        { "label": "Men", "count": 66},
        { "label": "nothing", "count": 100-66}
    ];

    var height = 360
    var width = 360
    var radius = Math.min(width, height) / 2;
    var donutWidth = 75;
    var legendRectSize = 18;                                  // NEW
    var legendSpacing = 4; 


    var svg = d3.select('#viz')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + (width / 2) + 
        ',' + (height / 2) + ')');

      var color = d3.scale.category20b();

    var arc = d3.svg.arc()
      .innerRadius(radius - donutWidth)             // NEW
      .outerRadius(radius);
      
    var pie = d3.layout.pie()
      .value(function(d) { return d.count; })
      .sort(null);
    var path = svg.selectAll('path')
      .data(pie(dataset))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function(d, i) { 
        return color(d.data.label);
      })
      .attrTween('d', function(d) {
       var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
       return function(t) {
           d.endAngle = i(t);
         return arc(d);
       }
    });

    var legend = svg.selectAll('.legend')                     // NEW
        .data(color.domain())                                   // NEW
        .enter()                                                // NEW
        .append('g')                                            // NEW
        .attr('class', 'legend')                                // NEW
        .attr('transform', function(d, i) {                     // NEW
        var height = legendRectSize + legendSpacing;          // NEW
        var offset =  height * color.domain().length / 2;     // NEW
        var horz = -2 * legendRectSize;                       // NEW
        var vert = i * height - offset;                       // NEW
        return 'translate(' + horz + ',' + vert + ')';        // NEW
    });                                                     // NEW
    legend.append('rect')                                     // NEW
        .attr('width', legendRectSize)                          // NEW
        .attr('height', legendRectSize)                         // NEW
        .style('fill', color)                                   // NEW
        .style('stroke', color);                                // NEW

    legend.append('text')                                     // NEW
        .attr('x', legendRectSize + legendSpacing)              // NEW
        .attr('y', legendRectSize - legendSpacing)              // NEW
        .text(function(d) { return d; });                       // NEW

}


function handler(company) {
    console.log(data.company);
};

console.log(data.Facebook.Gender.Men)


