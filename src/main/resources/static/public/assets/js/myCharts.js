
var colorRed = '#eb4034';
var colorBlue = '#3492eb';
var colorGreen = '#76c936';
var colorDarkGreen = "#2D9E3F";
var colorYellow = '#f5bf42';
var colorBlack = '#0f0f0f';
var colorOrange = "#EFB643";
var colorDarkBlue = "#5487A3";

var graphTemplate = []


var indicatorGraphArray = [
		{key:"no_pc_awareness", "title":"# of PC awareness and sensitization meetings conducted", dataObject:graphTemplate},{key:"no_stakeholders", "title":"# of stakeholders who acquired knowledge from the PC information and awareness raising activities",  dataObject:graphTemplate},
		{key:"no_pc_framework", "title":"# of PC materials and resources developed within the PC information framework.",  dataObject:graphTemplate},{key:"no_webinars", "title":"# of webinars conducted",  dataObject:graphTemplate},
		{key:"no_newsletter", "title":"# of news letters sent out",  dataObject:graphTemplate}, {key:"no_delegates", "title":"# of delegates that attend/participate in the tri-annual APCA conference",  dataObject:graphTemplate},{key:"no_social", "title":"Social Media engagement",  dataObject:graphTemplate}
	];
	
var serviceDeliveryGraphArray = [
		{key:"no_supported_facilities", "title":"# of supported health facilities with established PC services "},{key:"no_pc_patients_provided", "title":"# of PC patients provided with/accessing PC services"},
		{key:"no_pc_referrals_done", "title":"# of PC referrals done",  dataObject:graphTemplate}
		];
		
var policyGraphArray = [
			{key:"no_targeted", "title":"# of targeted countries with PC integrated/recognized into national frameworks/health plans /stand alone"},{key:"no_palliative_care", "title":"# of palliative care advocacy activities/meetings conducted to integrate PC into health policies and guidelines."},
			{key:"no_people_attended_policy", "title":"# of people who attended policy related activities/meetings ",  dataObject:graphTemplate}, {key:"no_countries_active_national_policy", "title":"# of countries with active national PC advocacy teams",  dataObject:graphTemplate},
			{key:"no_countries_including_PC_indicators", "title":"# of countries including PC indicators into national HMIS",  dataObject:graphTemplate},{key:"no_countries_conducted_national_PC", "title":"# of countries that conducted a national PC situational analysis during this period",  dataObject:graphTemplate}
		];
		
var medicationTechnologyGraphArray = [
			{key:"no_legal_prescribers", "title":"# of legal prescribers trained on palliative care medications and opioids"},{key:"no_ountries_essential_medications", "title":"# of countries with essential PC medications included on the national essential medicines list/policy/guidelines during this period"},
			{key:"no_african_countries_submitting", "title":"# of African countries submitting annual returns for morphine",  dataObject:graphTemplate}, {key:"no_people_accessing_palliative_care", "title":"# of people accessing palliative care medications",  dataObject:graphTemplate},
			{key:"no_equipment_purchased", "title":"# of equipment purchased (capital improvement)"}
		];
		
		var educationGraphArray = [
								{key:"no_countries_developed_specialist", title:"# of countries that developed specialist PC training programs during this period"},
								{key:"no_ountries_developed_national_PC", title:"# of countries that developed a national PC training package during this period"},
								{key:"no_institutions_organizations", title:"# of institutions/organizations provided with PC training materials, resources and equipment"},
								{key:"no_care_providers_received", title:"# of care providers who received pre-service PC training"},
								{key:"no_care_providers_educators", title:"# of care providers and educators supported to have PC training skills (ToT)"},
								{key:"no_community_volunteers", title:"# of community volunteers who successfully completed a PC training programme"}
						  ]

var africaPalliativeGraphArray = [
			{key:"no_functional_research_pc", "title":"A functional research network for PC in place in Africa"},
			{key:"no_africa_functional_research", "title":"# of African PC research network task forces/committees formed during this period"},
			{key:"no_organizations_recruited", "title":"# of organizations recruited in the research network during this period"},
			{key:"no_members_recruited", "title":"# of members recruited in the research network during this period"},
			{key:"no_active_research_work", "title":"# of active research network hubs during this period"},
			{key:"no_research_collaborations", "title":"# of new research collaborations established during this period"},
		];
		

var researchAgendaGraphArray = [
								{key:"no_palliative_publications_developed", title:"# of palliative care publications developed during this period"},
								{key:"no_palliative_publications_disseminated", title:"# of palliative care publications disseminated during this period"},
								{key:"no_palliative_publications_surveys", title:"# of national research PC related surveys/studies/needs assessments conducted"}
						  ]
						  
var improvedSkillGraphArray = [
								{key:"no_institutions_supported", title:"# of institutions supported on skills and knowledge in PC research during this period"},
								{key:"no_individuals_supported", title:"# of individuals supported on skills and knowledge in PC research during this period"},
								{key:"no_guidelines_developed", title:"# of guidelines developed for PC research curricula during this period"},
						 		{title:"# of PC research guidelines disseminated during this period", key:"no_pc_research_guidelines"}, {title:"# of PhD students supported for training and mentored for and on PC during this period", key:"no_PhD_students_supported"},
						 		{title:"# of PhD students supported for training and mentored for and on PC during this period", key:"no_PhD_students_supported"}, {title:"# of senior PC researchers that are active in the regional hubs in Africa", key:"no_senior_PC_researchers"},	
						  ]
var webBasedGraphArray = [
								{key:"no_researchers_resource", title:"# of researchers/resource persons listed in database"},
								{title:"# of palliative care research resources developed", key:"no_palliative_researchers_developed"},
								{title:"# of palliative care research resources disseminated", key:"no_palliative_researchers_disseminated"}, {title:"# of modules developed under palliative care", key:"no_modules_developed"}
									
						  ]
var apcaGraphArray = [
								{key:"governance_strategy", title:"Governance strategy developed"}, {title:"# of new policies/policy amendments approved/ratified by BOD during this period", key:"no_approved_ratified"},
								{title:"# of BOD meetings held", key:"no_BOD_meetings_held"}, {title:"# of SMT meetings held", key:"no_members_recruited"}, {title:"Annual report produced and published", key:"no_annual_report_produced"},
								{title:"Annual general meeting held", key:"no_annual_general_meeting"}, {title:"# of Annual BOD assessments done", key:"no_annual_BOD_assessments"}, {title:"# of personal development plans for BOD implemented", key:"no_personal_development"},
								{title:"# of regional and international engagements", key:"no_regional_international"}
									
						  ]
						  
var humanResoursesGraphArray = [
								{key:"no_organization_update", title:"Annual review and update of the organization structure done"},
								{title:"# of staff appraisals conducted according to schedule during this period", key:"no_appraisals_conducted"},
								{title:"# of staff who completed personal development trainings/workshops/activities", key:"no_personal_development"},
								{title:"APCA staff retention strategy developed", key:"_no_retention_strategy"}, {title:"# of staff who have left APCA", key:"no_staff_left_apca"},
								{title:"Annual staffing plan for APCA in place", key:"no_annual_staffing"}, {title:"A succession planning strategy for APCA in place", key:"no_succession_planning"},
								{title:"# of new staff recruited during this period", key:"no_taff_recruited"}, {title:"Total number of staff at the end of the financial year", key:"no_number_staff"}
									
						  ]
var policyPartnershipGraphArray = [
								{key:"no_partnership_database", title:"A partnership database developed"},
								{key:"no_no_partnership_framework", title:"A partnership framework developed for APCA"},
								{key:"no_partnerships_developed", title:"# of new partnerships developed during this period"},
								{key:"no_capacity_building", title:"A capacity building framework developed"},
						
			
						  ]
						  
						  
	
	
		
function initData(type)
{
	graphTemplate = [
						{data:[], name: '2022',yAxis:0,type: 'column',color: colorGreen, type:type },
						{data:[], name: 'Total SAR',yAxis:0,type: 'column',color: colorBlue, type:type },
						{data:[], name: 'FY 1',yAxis:0,type: 'column',color: colorYellow, type:type },
						{data:[], name: 'FY 2',yAxis:0,type: 'column',color: colorDarkBlue, type:type },
						{data:[], name: 'FY 3',yAxis:0,type: 'column',color: colorDarkGreen, type:type },
						{data:[], name: 'FY 4',yAxis:0,type: 'column',color: colorOrange, type:type },
					]
}


$(document).ready(function(){
	
	getGraphData();
	
	$("#filterCharts").click(function(e){
		getGraphData();
	})
	
})

var date_from='2016,11,28';
var date_to='2017';


function getGraphData()
{
	var year = $("#year").val();
	var country = $("#country").val();
	initData("column");
	buildChart(indicatorGraphArray, graphTemplate, "indicatorCharts", year, "indicator", country);
	initData("line");
	buildChart(serviceDeliveryGraphArray, graphTemplate, "serviceDeliveryChart", year, "service_delivery", country);
	initData("column");
	buildChart(policyGraphArray, graphTemplate, "policyChart", year, "policy", country);
	initData("column");
	buildChart(medicationTechnologyGraphArray, graphTemplate, "medicationTechnologyChart", year, "medication-technology", country);
	
	initData("column");
	buildChart(educationGraphArray, graphTemplate, "educationChart", year, "education", country);
	
	initData("column");
	buildChart(africaPalliativeGraphArray, graphTemplate, "functionalPalliativeChart", year, "africa_palliative_care", country);
	
	
	initData("column");
	buildChart(researchAgendaGraphArray, graphTemplate, "researchAgendaChart", year, "research_agenda", country);
	
	initData("column");
	buildChart(improvedSkillGraphArray, graphTemplate, "improvedSkillsChart", year, "improved_knowledge", country);
	
	initData("column");
	buildChart(webBasedGraphArray, graphTemplate, "webBasedPCChart", year, "web_base_pc", country);
	
	initData("column");
	buildChart(apcaGraphArray, graphTemplate, "apcaManagementChart", year, "apca_management", country);
	
	initData("column");
	buildChart(humanResoursesGraphArray, graphTemplate, "humanResourcesChart", year, "human_resources", country);
	
	initData("column");
	buildChart(policyPartnershipGraphArray, graphTemplate, "partnershipPolicyChart", year, "partnership_policy", country);
	
}

function buildChart(graphArray, graphData, chartDiv, year, type, country)
{
	$.ajax({
		url:"../get-data-for-type",
		type:"GET",
		data:{type:type, country:country, year:year},
		success:function(response){
			var data = JSON.parse(response);
			var xAxisCategories = [];
			for(var i=0; i<graphArray.length; i++)
			{
				var key = graphArray[i]["key"];
				var janMar = (typeof data["data"][key+"__jan_mar"] != "undefined") ? data["data"][key+"__apr_jun"]["value"]: 0;
				var aprJun = (typeof data["data"][key+"__apr_jun"] != "undefined") ? data["data"][key+"__apr_jun"]["value"]: 0;
				var julSept = (typeof data["data"][key+"__jul_sept"] != "undefined") ? data["data"][key+"__jul_sept"]["value"]: 0;
				var octDec = (typeof data["data"][key+"__oct_dec"] != "undefined") ? data["data"][key+"__oct_dec"]["value"]: 0;
				var totalYear = parseFloat(janMar) + parseFloat(aprJun) + parseFloat(julSept) + parseFloat(octDec);
				
				var totalSar = (typeof data["data"][key+"_fy__total_sar"] != "undefined") ? data["data"][key+"_fy__total_sar"]["value"]: 0;
				var fy1 = (typeof data["data"][key+"_fy__fy1"] != "undefined") ? data["data"][key+"_fy__fy1"]["value"]: 0;
				var fy2 = (typeof data["data"][key+"_fy__fy2"] != "undefined") ? data["data"][key+"_fy__fy2"]["value"]: 0;
				var fy3 = (typeof data["data"][key+"_fy__fy3"] != "undefined") ? data["data"][key+"_fy__fy3"]["value"]: 0;
				var fy4 = (typeof data["data"][key+"_fy__fy4"] != "undefined") ? data["data"][key+"_fy__fy4"]["value"]: 0;
				xAxisCategories.push(graphArray[i]["title"]);
				
				graphData[0]["data"].push(parseFloat(totalYear));
				graphData[1]["data"].push(parseFloat(totalSar));
				graphData[2]["data"].push(parseFloat(fy1));
				graphData[3]["data"].push(parseFloat(fy2));
				graphData[4]["data"].push(parseFloat(fy3));
				graphData[5]["data"].push(parseFloat(fy4));
				
				
				//chartData.push(graphArray[i]["dataObject"]);
			}
			
			
			renderCharts(graphData, xAxisCategories, chartDiv);
			
		},
		error:function(error){
			console.log(error);
		}
		
	})
	
}



function renderCharts(chartData, xAxisCategories, chartDiv)
{
  
  console.log(chartDiv)
  console.log(chartData)
  console.log(xAxisCategories);
  Highcharts.chart(chartDiv, {
	/*chart: {
        type: 'bar'
    },*/
   
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
      //type: 'datetime',
      //min: minDate.getTime(),
      //max: maxDate.getTime(),
      //showLastLabel: false,
      //tickLength: 0,
      //tickWidth:0,
      //tickAmount:1,
      categories: xAxisCategories,// ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
      //tickInterval: 1000 * 3600 * 24 * 365,
      //minorTickLength:0,
      
      //plotBands: iitData
    },
  
    tooltip: {
      xDateFormat: '%Y-%m-%d',
      shared: true
    },
  
    yAxis: [{
      title: {
        text: 'Total Numbers',
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
      //min: 0,
      //max: maxPickup,
      reversed: false,
      tickAmount:1,
      lineWith:1,
      lineColor: '#FF0000',
  
      },
     
    ],
  
  
    series:chartData
  
  
  
  });
}



