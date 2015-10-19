window.addEventListener("load",run);
      
function run (){
    button_facebook.addEventListener("click",function() { updateViewQ1("Facebook"); });
    button_instagram.addEventListener("click",function() { updateViewQ1("Instagram"); });
    button_twitter.addEventListener("click",function() { updateViewQ1("Twitter"); });
    button_linkedin.addEventListener("click",function() { updateViewQ1("LinkedIn"); });
    button_pinterest.addEventListener("click",function() { updateViewQ1("Pinterest"); });

    button_gender.addEventListener("click",function() { updateViewQ2("Gender"); });
    button_race.addEventListener("click",function() { updateViewQ2("Race"); });
    button_age.addEventListener("click",function() { updateViewQ2("Age"); });
    button_education.addEventListener("click",function() { updateViewQ2("Education"); });
    button_income.addEventListener("click",function() { updateViewQ2("Income"); });
    button_living.addEventListener("click",function() { updateViewQ2("Living Environment"); });


    initializeViewQ1();
    initializeViewQ2();

}

function initializeViewQ1(){

    var svg = d3.select("#viz1");

    // get the size of the SVG element

    var height = svg.attr("height");
    var width = svg.attr("width");

    var margin = 100;
    var chartHeight = height - 2*margin;
    var chartWidth = width - 2*margin;

    var barmargin = 10;
    
    // set a title
    svg.append("text")
        .attr("class","title")
        .attr("x",width/2)
        .attr("y",margin/2)
        .attr("dy","0.3em")
        .style("text-anchor","middle")

    var categories = ["Gender","Race","Age","Education","Income", "Living Environment"];
    categories.forEach(function(category,i){
        initialize(category, i*150 + margin)
    });
}

function initialize(category, startY){
    var svg = d3.select("#viz1");
    var height = svg.attr("height");
    var width = svg.attr("width");
    var margin = 50;
    var chartHeight = height - 2*margin;
    var chartWidth = width - 2*margin;
    var barmargin = 10;
    var color = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"];

    var data = getDataRows("Facebook", category)
    var barHeight = chartHeight/(15*data.length)+2;

    svg.append("text")
        .attr("class", category)
        .attr("x",width/2)
        .attr("y",startY - 20)
        .attr("dy","0.3em")
        .style("text-anchor","middle")
        .text(category)

    var graph = svg.selectAll(".g")
        .data(data)
        .enter().append("g");

    graph.append("rect")
        .attr("class", "bar")
        .attr("x", margin)
        .attr("y", function(d,i){
            return i*barHeight + startY
        })
        .attr("width", 0)
        .attr("height", barHeight)


    graph.append("text")
        .attr("class","value")
        .attr("x",margin-10)
        .attr("y",function(d,i){
            return i*barHeight + startY+ barHeight/2
        })
        .style("opacity", 0)
        .attr("dy","0.3em")
        .attr("fill", "black")
        .style("text-anchor","end")


    graph.append("text")
        .attr("class","group")
        .attr("x",margin + 5)
        .attr("y",function(d, i){ return i*barHeight + startY+ barHeight/2})
        .attr("dy","0.3em")
        .style("text-anchor","start")
        .text(function (d) {
            return d.group;
        });
}


function updateViewQ1 (social) {

    var svg = d3.select("#viz1");

    var height = svg.attr("height");
    var width = svg.attr("width");
    var legendMargin = 10
        var margin = 100;

    var color = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"];

    // update title
    svg.select(".title")
    .text (social);

    // svg.selectAll(".bar").remove();
    // svg.selectAll(".group").remove();
    // svg.selectAll(".value").remove();

    // updateGraphQ1(social, "Gender", 100);

    var categories = ["Gender","Race","Age","Education","Income", "Living Environment"];
    categories.forEach(function(category,i){
        updateGraphQ1(social, category, i*150 + margin)
    });

}   


function updateGraphQ1(social, category, startY) {
    
    var svg = d3.select("#viz1");
    var height = svg.attr("height");
    var width = svg.attr("width");
    var margin = 50;
    var chartHeight = height - 2*margin;
    var chartWidth = width - 2*margin;
    var barmargin = 10;
    var color = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"];

    var data = getDataRows(social, category)
    // console.log(data)
    var barHeight = chartHeight/(15*data.length)+2;

    svg.append("text")
        .attr("class", category)
        .attr("x",width/2)
        .attr("y",startY - 20)
        .attr("dy","0.3em")
        .style("text-anchor","middle")
        .text(category)

    var graph = svg.selectAll("g")
        .data(data);
    // console.log(graph)

    graph.select(".bar")
        .transition()
        .duration(2500)
        .attr("width", function(d){
            console.log(d.group);
            return (chartWidth*d.value/100)
        })
        .attr("fill", function(d,i){
            console.log(i);
            return color[i];
        });

    graph.select(".value")
        .transition()
        .style("opacity", 1)
        .duration(2500)
        .attr("x",function(d) {
            return chartWidth*d.value/100 +90;
        })
        .text(function(d) {
            return d.value + "%";
        });
}



function initializeViewQ2() {

    var svg = d3.select("#viz2");

    // get the size of the SVG element

    var height = svg.attr("height");
    var width = svg.attr("width");

    // the chart lives in the svg surrounded by a margin of 100px

    var margin = 100;
    var chartHeight = height - 2*margin;
    var chartWidth = width - 2*margin;

    var barmargin = 10;
    
    // set a title
    svg.append("text")
        .attr("class","title")
        .attr("x",width/2)
        .attr("y",margin/2)
        .attr("dy","0.3em")
        .style("text-anchor","middle")
        .text (" Difference"); 
}

  

function updateViewQ2 (category) {

    var svg = d3.select("#viz2");
    var width = svg.attr("width");
    var legendMargin = 10

    var color = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"];

    // update title
    svg.select(".title")
    .text (category +" Difference");

    // reset everything
    svg.selectAll(".bar").remove();
    svg.selectAll(".group").remove();
    svg.selectAll(".value").remove();

    var socials = ["Facebook","LinkedIn","Instagram","Pinterest","Twitter"];
    socials.forEach(function(social,i){
        updateGraphQ2(social, category, i)
    });

    var legend = svg.selectAll(".legend")
      .data(socials)
      .enter()
      .append("g")
      .attr("class", "legend");

    legend.append("rect")
        .attr("x", width - 110)
        .attr("y", function(d, i){ return i * 25 + legendMargin;})
        .attr("width", 20)
        .attr("height", 20)
        .style("fill", function(d,i) { 
            console.log("legend",i)
            return color[i];
        });
    legend.append("text")
      .attr("x", width-80 )
      .attr("y", function(d, i){ return i * 25 + legendMargin*1.8;})
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text(function(d) { return d; });

}   

function updateGraphQ2(social, category, order) {
    
    var svg = d3.select("#viz2");
    var height = svg.attr("height");
    var width = svg.attr("width");
    var margin = 50;
    var chartHeight = height - 2*margin;
    var chartWidth = width - 2*margin;
    var barmargin = 10;
    var color = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"];

    var data = getDataRows(social, category)
    var barWidth = (chartWidth/(5*(data.length)+2));
    var graph = svg.selectAll(".g")
        .data(data)
        .enter().append("g");

    graph.append("rect")
        .attr("class","bar")
        .attr("x",function(d,i){
            return i*6*(barWidth)+order*(barWidth) + margin; })
        .attr("y", height-margin)
        .attr("width",barWidth)
        .attr("height", 0)
        .transition()
        .duration(2500)
        .attr("y",function(d) {
            return height-margin-(chartHeight*d.value/100); 
        })
        .attr("height",function(d) { return chartHeight*d.value/100; })
        .attr("fill", function(d,i){
            return color[order];
        });

    graph.append("text")
        .attr("class","value")
        .attr("x",function(d,i) { return i*6*(barWidth)+order*(barWidth) + margin + barWidth/2; })
        .attr("y",height-margin -10)
        .style("opacity", 0)
        .attr("dy","0.3em")
        .attr("fill", "black")
        .style("text-anchor","middle")
        .transition()
        .style("opacity", 1)
        .duration(2500)
        .attr("y",function(d) {
            return height-margin-(chartHeight*d.value/100) -10;
        })
        .text(function(d) {
            return d.value + "%";
        });


    graph.append("text")
        .attr("class","group")
        .attr("x",function(d,i) { return margin+i*6*(barWidth) + barWidth*2.5;})
        .attr("y",height-margin+20)
        .attr("dy","0.3em")
        .style("text-anchor","middle")
        .text(function (d) {
            return d.group;
        });
}

function getDataRows (social, category) {
    var data = [
        { social: "Facebook", category:"Gender", group:"Men", value:66},
        { social: "Facebook", category:"Gender", group:"Women", value:77},
            
        { social: "Facebook", category:"Race", group:"White", value:70},
        { social: "Facebook", category:"Race", group:"Black", value:67},
        { social: "Facebook", category:"Race", group:"Hispanic", value:75},
            
        { social: "Facebook", category:"Age", group:"18-29", value:82},
        { social: "Facebook", category:"Age", group:"30-49", value:79},
        { social: "Facebook", category:"Age", group:"50-64", value:64},
        { social: "Facebook", category:"Age", group:"65+", value:48},
            
        { social: "Facebook", category:"Education", group:"High School", value:71},
        { social: "Facebook", category:"Education", group:"Some College", value:72},
        { social: "Facebook", category:"Education", group:"College+", value:72},

        { social: "Facebook", category:"Income", group:"< $30,000/yr", value:73},
        { social: "Facebook", category:"Income", group:"$30,000-$49,999", value:72},
        { social: "Facebook", category:"Income", group:"$50,000-$74,999", value:66},
        { social: "Facebook", category:"Income", group:"$75,000+", value:78},

        { social: "Facebook", category:"Living Environment", group:"Urban", value:74},
        { social: "Facebook", category:"Living Environment", group:"Suburban", value:72},
        { social: "Facebook", category:"Living Environment", group:"Rural", value:67},

        { social: "LinkedIn", category:"Gender", group:"Men", value:26},
        { social: "LinkedIn", category:"Gender", group:"Women", value:25},
            
        { social: "LinkedIn", category:"Race", group:"White", value:26},
        { social: "LinkedIn", category:"Race", group:"Black", value:22},
        { social: "LinkedIn", category:"Race", group:"Hispanic", value:22},
            
        { social: "LinkedIn", category:"Age", group:"18-29", value:22},
        { social: "LinkedIn", category:"Age", group:"30-49", value:32},
        { social: "LinkedIn", category:"Age", group:"50-64", value:26},
        { social: "LinkedIn", category:"Age", group:"65+", value:12},
            
        { social: "LinkedIn", category:"Education", group:"High School", value:9},
        { social: "LinkedIn", category:"Education", group:"Some College", value:25},
        { social: "LinkedIn", category:"Education", group:"College+", value:46},

        { social: "LinkedIn", category:"Income", group:"< $30,000/yr", value:17},
        { social: "LinkedIn", category:"Income", group:"$30,000-$49,999", value:21},
        { social: "LinkedIn", category:"Income", group:"$50,000-$74,999", value:32},
        { social: "LinkedIn", category:"Income", group:"$75,000+", value:41},

        { social: "LinkedIn", category:"Living Environment", group:"Urban", value:30},
        { social: "LinkedIn", category:"Living Environment", group:"Suburban", value:26},
        { social: "LinkedIn", category:"Living Environment", group:"Rural", value:1},    

        { social: "Instagram", category:"Gender", group:"Men", value:24},
        { social: "Instagram", category:"Gender", group:"Women", value:31},
            
        { social: "Instagram", category:"Race", group:"White", value:21},
        { social: "Instagram", category:"Race", group:"Black", value:47},
        { social: "Instagram", category:"Race", group:"Hispanic", value:38},
            
        { social: "Instagram", category:"Age", group:"18-29", value:55},
        { social: "Instagram", category:"Age", group:"30-49", value:28},
        { social: "Instagram", category:"Age", group:"50-64", value:11},
        { social: "Instagram", category:"Age", group:"65+", value:4},
            
        { social: "Instagram", category:"Education", group:"High School", value:25},
        { social: "Instagram", category:"Education", group:"Some College", value:32},
        { social: "Instagram", category:"Education", group:"College+", value:26},

        { social: "Instagram", category:"Income", group:"< $30,000/yr", value:26},
        { social: "Instagram", category:"Income", group:"$30,000-$49,999", value:27},
        { social: "Instagram", category:"Income", group:"$50,000-$74,999", value:30},
        { social: "Instagram", category:"Income", group:"$75,000+", value:26},

        { social: "Instagram", category:"Living Environment", group:"Urban", value:32},
        { social: "Instagram", category:"Living Environment", group:"Suburban", value:28},
        { social: "Instagram", category:"Living Environment", group:"Rural", value:18},

        {social:"Pinterest", category:"Gender", group:"Men", value:16},
        {social:"Pinterest", category:"Gender", group:"Women", value:44},
        {social:"Pinterest", category:"Race", group:"White", value:32},
        {social:"Pinterest", category:"Race", group:"Black", value:23},
        {social:"Pinterest", category:"Race", group:"Hispanic", value:32},
        {social:"Pinterest", category:"Age", group:"18-29", value:37},
        {social:"Pinterest", category:"Age", group:"30-49", value:36},
        {social:"Pinterest", category:"Age", group:"50-64", value:24},
        {social:"Pinterest", category:"Age", group:"65+", value:16},
        {social:"Pinterest", category:"Education", group:"High School", value:25},
        {social:"Pinterest", category:"Education", group:"Some College", value:37},
        {social:"Pinterest", category:"Education", group:"College+", value:31},
        {social:"Pinterest", category:"Income", group:"< $30,000/yr", value:24},
        {social:"Pinterest", category:"Income", group:"$30,000-$49,999", value:37},
        {social:"Pinterest", category:"Income", group:"$50,000-$74,999", value:41},
        {social:"Pinterest", category:"Income", group:"$75,000+", value:30},
        {social:"Pinterest", category:"Living Environment", group:"Urban", value:26},
        {social:"Pinterest", category:"Living Environment", group:"Suburban", value:34},
        {social:"Pinterest", category:"Living Environment", group:"Rural", value:31},
        {social:"Pinterest", category:"Total", value:31},

        {social:"Twitter", category:"Gender", group:"Men", value:25},
        {social:"Twitter", category:"Gender", group:"Women", value:21},
        {social:"Twitter", category:"Race", group:"White", value:20},
        {social:"Twitter", category:"Race", group:"Black", value:28},
        {social:"Twitter", category:"Race", group:"Hispanic", value:28},
        {social:"Twitter", category:"Age", group:"18-29", value:32},
        {social:"Twitter", category:"Age", group:"30-49", value:19},
        {social:"Twitter", category:"Age", group:"50-64", value:13},
        {social:"Twitter", category:"Age", group:"65+", value:6},
        {social:"Twitter", category:"Education", group:"High School", value:19},
        {social:"Twitter", category:"Education", group:"Some College", value:23},
        {social:"Twitter", category:"Education", group:"College+", value:27},
        {social:"Twitter", category:"Income", group:"< $30,000/yr", value:21},
        {social:"Twitter", category:"Income", group:"$30,000-$49,999", value:19},
        {social:"Twitter", category:"Income", group:"$50,000-$74,999", value:30},
        {social:"Twitter", category:"Income", group:"$75,000+", value:26},
        {social:"Twitter", category:"Living Environment", group:"Urban", value:32},
        {social:"Twitter", category:"Living Environment", group:"Suburban", value:28},
        {social:"Twitter", category:"Living Environment", group:"Rural", value:18},
        {social:"Twitter", category:"Total", value:23}

    ];
    
    return data.filter(function(row) {
        return (row.category===category && row.social===social) ; 
    });
}


