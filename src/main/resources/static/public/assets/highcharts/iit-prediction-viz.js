var date_from='2016,11,28';
var date_to='2017';

var colorRed = '#eb4034';
var colorBlue = '#3492eb';
var colorGreen = '#76c936';
var colorYellow = '#f5bf42';
var colorBlack = '#0f0f0f';

$(document).ready(function(){
var iitData = new Array(); 
var dosesRemaing = new Array();
var dosesWithSurplus = new Array();
var minDate = new Date();
var maxDate = new Date();;
var vlLessThan50 = [];
var vl50_999 = [];
var vlAbove999 = [];
var pickupDot = [];//this is used to have dots at every drug pickup
var vlDots = {"vlLessThan50":[], "vl50_999":[], "vlAbove99":[]}//this is used to have dots on the vl lines
var regimenData = [];


var maxPickup = 0;//this is used to know what the max height for the left y axis should be. i.e the highest days of refill the patient has ever had. plus surplus

 $.getJSON("data/dosage.json").then(function(response){

   // console.log("dosage", response);
    var tempData = response.data;
    var previousPickup = 0;
    for(var i=0; i<tempData.length; i++)
    {
        var date = new Date(tempData[i]["index"]);
        var dosesLeft = tempData[i]["pills_remaining"];
        var dosesLeftWithSurplus = tempData[i]["incl_surplus"];
        maxPickup = Math.max(dosesLeftWithSurplus, maxPickup);

        minDate = (date.getTime()<minDate.getTime()) ? date: minDate;
        maxDate = (date.getTime() > maxDate.getTime()) ? date: maxDate;
        dosesRemaing.push({x:date.getTime(), y:dosesLeft});
        dosesWithSurplus.push({x:date.getTime(), y:dosesLeftWithSurplus});

        if(previousPickup < new Number(dosesLeft))
        {
           //console.log(previousPickup, dosesLeft);
           
           pickupDot.push({y:dosesLeft, x:date.getTime()});
        }
        previousPickup = dosesLeft;


    }
   // console.log("pickup", pickupDot);
    return  $.getJSON("data/iit.json")
  }).
  then(function(response){
   // console.log("iit",response);
    var tempData = response.data;
    for(var i=0; i<tempData.length; i++)
    {
       if(tempData[i]["IIT"] == 1)
      {
        var totalDaysIIT = tempData[i]["IIT_duration"];
        var endDate = new Date(tempData[i]["date_actual"]);
        var startDate = new Date(endDate);
        endDate.setDate(endDate.getDate() - totalDaysIIT);

        iitData.push({
          color: colorYellow, 
          from: startDate,//Date.UTC(2016,10,28), 
          to: endDate,//Date.UTC(2017,1,9 ), 
          label: { 
              text: 'IIT:'+totalDaysIIT+' days', 
              align: 'left',
              /*align: 'center',  */
          }
      })
      }
    }

    return $.getJSON("data/viral_load.json");

  }).then(function(response){
    var tempData = response.data;
    for(var i=0; i<tempData.length; i++)
    {
      var vlDate = new Date(tempData[i]["date_actual"]);
      var vlResult = tempData[i]["VLresult"];
       if(vlResult<50)
       {
           vlLessThan50.push({x:vlDate.getTime(), y:vlResult});
           vlDots["vlLessThan50"].push({y:vlResult, x:vlDate.getTime()});
       }
       else if(vlResult >=50 && vlResult <1000)
       {
          vl50_999.push({x:vlDate.getTime(), y:vlResult});
          vlDots["vl50_999"].push({y:vlResult, x:vlDate.getTime()});
       }
       else{
          vlAbove999.push({x:vlDate.getTime(), y:vlResult});
          vlDots["vlAbove999"].push({y:vlResult, x:vlDate.getTime()});
       }

       console.log(vlDots);
    }
    return  $.getJSON("data/drugregimen.json");
  })
  .then(function(response){
    var regData = response["data"][0];
    console.log(regData)
    var date = new Date(regData["current_regiment_intiation"]).getTime();
    var currRegimen = regData["current_art_regiment"];
    regimenData.push({x: date , y: 60, currRegimen:currRegimen });
    
    
    renderCharts(iitData, dosesRemaing, dosesWithSurplus, maxPickup, minDate, maxDate, vlLessThan50, vl50_999, vlAbove999, pickupDot, regimenData, vlDots);
  })

  

  
  
});
//var dosesRemaingData = $.getJ




var data1 = Papa.parse(document.getElementById('pills_remaining_csv').innerHTML);
//console.log(convertDataFromCsv(data1.data))
var data_vl_csv_over_1000 = Papa.parse(document.getElementById('vl_csv_over_1000').innerHTML);
var data_vl_csv_50_1000 = Papa.parse(document.getElementById('vl_csv_50_1000').innerHTML);
var data_vl_csv_less_50 = Papa.parse(document.getElementById('vl_csv_less_50').innerHTML);

/*function convertDataFromCsv(data) {
var convData = [];
data.forEach(function(elem) {
  if (elem[1] = 60){      
    convData.push({
    x: Date.parse(elem[0]),
    y: parseFloat(elem[1]),
    marker: {
      symbol : '●'
    }
  
}else{
  convData.push({
    x: Date.parse(elem[0]),
    y: parseFloat(elem[1])
  });
    
}

return convData;
}*/

function convertDataFromCsv(data) {
	var convData = [];
  data.forEach(function(elem) {
    
    convData.push({
      x: Date.parse(elem[0]),
      y: parseFloat(elem[1])
    });
      


  });
  return convData;
}



function convertDataFromCsvMaxValues(data) {
	var convData = [];
  var lastVal = 0;
  var cnt = 0;

  
  data.forEach(function(elem) {
    var y = parseInt(elem[1]);
    if ((y != 0 && y > lastVal) || cnt == 2){
      
      convData.push({
    	  x: Date.parse(elem[0]),
        y: parseFloat(elem[1]),
      
       });
    }
  
  lastVal = y;
  cnt++;
  });

  return convData;
}

function renderCharts(iitData, dosesRemaing, dosesWithSurplus, maxPickup, minDate, maxDate, vlLessThan50, vl50_999, vlAbove999, pickupDot, regimenData, vlDots)
{
  var tickPositions = [];
  for(var i=0; i<=(maxPickup+10); i+=10)
  {
    tickPositions.push(i);
  }
  Highcharts.chart('container', {
    plotOptions: {
      
      series: {
          cursor: 'pointer',
          label: {
               enabled: false
          },
       }
   },

    boost: {
      useGPUTranslations: true
    },
  
    title: {
      text: '',
      
    },
    exporting: { enabled: false },
  
    xAxis: {
      type: 'datetime',
      min: minDate.getTime(),
      max: maxDate.getTime(),
      showLastLabel: false,
      tickLength: 0,
      tickWidth:0,
      tickAmount:1,
      minorTickLength:0,
      dateTimeLabelFormats: {
  
      },
      plotBands: iitData
    },
  
    tooltip: {
      xDateFormat: '%Y-%m-%d',
      shared: true
    },
  
    yAxis: [{
      title: {
        text: 'Estimated doses remaining',
        style: {
            color: colorBlue
      }
      },
        labels: {
        format: '{value:,.0f}'
      },
      
      minPadding: 0,
      maxPadding: 0,
      startOnTick: true,
      endOnTick: true,
      //tickPositions: tickPositions,
      //tickWidth: 0,
      //minorTickLength:0,
      tickWidth:0,
      min: 0,
      max: maxPickup,
      reversed: false,
      tickAmount:1,
      lineWith:1,
      lineColor: '#FF0000',
  
      },
      { // Secondary yAxis
      type: 'logarithmic',
      /*minorTickInterval: 0.1,*/
      tickAmount:1,
      minorTickLength:0,
      tickWidth:0,
      title: {
      text: 'VL Result',
      },
      opposite: true
  
      }
    ],
  
  
  
    series: [{
        id : 'remaining_doses',
        name : 'Including surplus',
        data: dosesWithSurplus,//convertDataFromCsv(data1.data),
        turboThreshold: Number.MAX_VALUE, 
        yAxis:0,
        type: 'line',
        color: colorBlue
  
      },
      {
        id : 'remaining_doses2',
        type: 'line',
        name: 'Doses Ramaining',
        turboThreshold: Number.MAX_VALUE, 
        data: dosesRemaing,//convertDataFromCsvMaxValues(data1.data),
        yAxis:0,
        color: colorGreen,
        
      },
  
      {
        data: vlAbove999,//convertDataFromCsv(data_vl_csv_over_1000.data),
        name: 'VL >= 1000',
        turboThreshold: Number.MAX_VALUE, 
        yAxis:1,
        zIndex:9999,
        type: 'column',
        color: colorRed,
        borderWidth:0.2,
        borderColor:colorRed,
        borderWidth:2,
        dataLabels: {
            enabled: true,
        },
  
      },
      {
        data:vlDots["vlAbove999"],
        name: 'vlAbove999',
        zIndex:1,
        marker: {
            symbol: 'round',
            radius:6,
        },
        turboThreshold: Number.MAX_VALUE, 
        yAxis:1,
        showInLegend:false,
        dataLabels: {
          enabled: true,
      },
        type: 'scatter',
        color: colorYellow
      },
      
      {
        data: vl50_999,//convertDataFromCsv(data_vl_csv_50_1000.data),
        name: 'VL 51-999',
        turboThreshold: Number.MAX_VALUE, 
        yAxis:1,
        zIndex:9999,
        type: 'column',
        color: colorYellow,
        borderWidth:0.2,
        borderColor:colorYellow,
        dataLabels: {
            enabled: true,
        },
          
      },
      {
        data:vlDots["vl50_999"],
        name: 'vl50_999',
        zIndex:1,
        marker: {
            symbol: 'round',
            radius:6,
        },
        turboThreshold: Number.MAX_VALUE, 
        yAxis:1,
        showInLegend:false,
        dataLabels: {
          enabled: true,
      },
        type: 'scatter',
        color: colorYellow
      },
      {
        data: vlLessThan50,//convertDataFromCsv(data_vl_csv_less_50.data),
        name: 'VL <= 50',
        turboThreshold: Number.MAX_VALUE, 
        yAxis:1,
        zIndex:9999,
        type: 'column',
        borderWidth:0.2,
        borderColor:colorBlack,
        color: colorBlack,
          dataLabels: {
            enabled: true,
        },
      },
      {
        data:vlDots["vlLessThan50"],
        name: 'VLDotBelow50',
        zIndex:1,
        marker: {
            symbol: 'round',
            radius:6,
        },
        turboThreshold: Number.MAX_VALUE, 
        yAxis:1,
        showInLegend:false,
        dataLabels: {
          enabled: true,
      },
        type: 'scatter',
        color: colorBlack
      },
      
      
  
      {
        data:regimenData,
        name: 'Regimens',
        zIndex:2,
        dataLabels: {
          enabled: true,
          formatter:function(){
            return this.series.data[0]["currRegimen"];
        },
      },
        marker: {
            symbol: 'url(regicon.png)',
            width: 30,
            height: 30,
        },
        turboThreshold: Number.MAX_VALUE, 
        yAxis:0,
        type: 'scatter',
        color: colorRed
      },
      {
        data:pickupDot,
        name: 'Pickups',
        zIndex:1,
        marker: {
            symbol: 'round'
        },
        turboThreshold: Number.MAX_VALUE, 
        yAxis:0,
        showInLegend:false,
        dataLabels: {
          enabled: true,
      },
        type: 'scatter',
        color: colorGreen
      },
      
      
      
      
  
    ]
  
  
  
  });
}



