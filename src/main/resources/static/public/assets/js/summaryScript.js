$(document).ready(function(e){
    
})

function getSummaryCount(summaryType, formatting, divId )
{
    $.ajax({
        url:"/admin/get-summary",
        type:"GET",
        data:{summaryType:summaryType},
        success:function(response){
            var data = JSON.parse(response);
            if(data["status"] == "ok")
            {
                if(formatting == "money")
                {
                    $("#"+divId).html(formatNumber(Math.round(data["data"] * 100) /100));
                    //$("#"+divId).html(formatNumber(Math.round(data["data"]) * 100)/100);
                }
                else if(formatting == "number"){
                    $("#"+divId).html(data["data"]);
                }   
                
            }
        },
        error:function(xhr, status, error){
            console.log(error);
        }   
    })
}

function buildChart(chartType, divId)
{
    $.ajax({
        url:"/admin/get-summary",
        type:"GET",
        data:{summaryType:chartType},
        success:function(response){
            var data = JSON.parse(response);
            var d = data.data;
            console.log(data);
            var chartD = new Array();
            for(var i=0; i<d.length; i++)
            {
                //console.log(data[i]);
                var date = d[i]["date_placed"].substr(0, 10);
                var completed = (parseInt(d[i]["complete"]) == 0) ? 1 : parseInt(d[i]["complete"])
                var inCompleted = (parseInt(d[i]["incomplete"]) == 0) ? 1 : parseInt(d[i]["incomplete"])
                chartD.push({
                    "date": date,
                    "completed": completed , 
                    "incomplete": inCompleted
                });

                
            }

           

            console.log(chartD);

            displayStats(chartD, divId);

        },
        error:function(xhr, status, error){
            console.log(error);
        }   
    })
}


function displayStats(dataForChart, divId)
{
  var chart;
  var average = 190.4;
  //AmCharts.ready(function () {

    // SERIAL CHART
    chart = new AmCharts.AmSerialChart();
    
    chart.dataProvider = dataForChart;
    chart.categoryField = "date";
    chart.dataDateFormat = "YYYY-MM-DD";

    // AXES
    // category
    var categoryAxis = chart.categoryAxis;
    //categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
    categoryAxis.minPeriod = "DD"; // our data is hourly, so we set minPeriod to DD
    categoryAxis.dashLength = 1;
    categoryAxis.labelRotation = 45;
    categoryAxis.gridAlpha = 0.15;
    categoryAxis.axisColor = "#DADADA";

    // value
    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.axisColor = "#DADADA";
    valueAxis.dashLength = 1;
    valueAxis.minimumValue = -1;
    chart.startDuration = 1;
    chart.startEffect = "elastic";
    valueAxis.logarithmic = true; // this line makes axis logarithmic
    chart.addValueAxis(valueAxis);

    /*// GUIDE for average
    var guide = new AmCharts.Guide();
    guide.value = average;
    guide.lineColor = "#CC0000";
    guide.dashLength = 4;
    guide.label = "average";
    guide.inside = true;
    guide.lineAlpha = 1;
    valueAxis.addGuide(guide);*/


    // GRAPH
    var graph = new AmCharts.AmGraph();
    graph.type = "smoothedLine";
    graph.bullet = "round";
    graph.bulletColor = "#FFFFFF";
    graph.useLineColorForBulletBorder = true;
    graph.bulletBorderAlpha = 1;
    graph.bulletBorderThickness = 2;
    graph.balloonText = "<span style='font-size:14px'>[[category]]: <b>[[value]] Completed</b></span>";
    graph.bulletSize = 7;
    graph.title = "Completed";
    graph.valueField = "completed";
    graph.lineThickness = 4;
    graph.lineColor = "#00BBCC";
    chart.addGraph(graph);

    // GRAPH
    var graph2 = new AmCharts.AmGraph();
    graph2.type = "smoothedLine";
    graph2.bullet = "round";
    graph2.bulletColor = "#FFFFFF";
    graph2.useLineColorForBulletBorder = true;
    graph2.bulletBorderAlpha = 1;
    graph2.bulletBorderThickness = 2;
    graph2.balloonText = "<span style='font-size:14px'>[[category]]-1: <b>[[value]] Incomplete</b></span>";
    graph2.bulletSize = 7;
    graph2.title = "Incomplete";
    graph2.valueField = "incomplete";
    graph2.lineThickness = 4;
    graph2.lineColor = "#ff9911";
    chart.addGraph(graph2);

    // CURSOR
    var chartCursor = new AmCharts.ChartCursor();
    chartCursor.cursorPosition = "mouse";
    chart.addChartCursor(chartCursor);

    // SCROLLBAR
    /*var chartScrollbar = new AmCharts.ChartScrollbar();
    chartScrollbar.graph = graph;
    chartScrollbar.scrollbarHeight = 30;
    chart.addChartScrollbar(chartScrollbar);*/
    var legend = new AmCharts.AmLegend();
    legend.position = "top";
    legend.borderAlpha = 0.3;
    legend.horizontalGap = 1;
    legend.switchType = "v";
    chart.addLegend(legend);

    chart.creditsPosition = "bottom-right";

    //console.log(dataForChart);
    // WRITE
    chart.write(divId+"");
//});
}


function getRevenueSummaryForUser(userId, userType, startDate, endDate, callback)
{
    $.ajax({
        url:"/admin/get-revenue-summary",
        type:"GET",
        data:{userId:userId, userType:userType, startDate:startDate, endDate:endDate},
        success:function(response){
            callback(response);
        }   
    })
}


function plotPieChart(data, divId)
{
    var colors = ["#FFBF00",  "#238C00"]
     // PIE CHART
     chart = new AmCharts.AmPieChart();
    chart.dataProvider = data;
    chart.titleField = "title";
    chart.radius = 70
    chart.valueField = "total";
    chart.sequencedAnimation = true;
    chart.startEffect = "elastic";
    chart.innerRadius = "0%";
    chart.startDuration = 2;
    chart.labelRadius = 15;
    chart.colors = colors;
    chart.balloonText = "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>";
    // the following two lines makes the chart 3D
    chart.depth3D = 10;
    chart.angle = 15;

    // WRITE
    chart.write(""+divId);
}
