var lastNotificationOffset = 0;
$(document).ready(function(){
	
	jQuery.validator.addMethod("lessThan2", 
				function(value, element, params) {
					//console.log(params);
					var compareTo = params.compareTo;
					var minusDays = (typeof params.minusDays != "undefined") ? params.minusDays : 0;
					var plusDays = (typeof params.plusDays != "undefined") ? params.plusDays : 0;
					if(value == "")
					{
						return true;
					}else{
						if($(compareTo).val() != "")
						{
							var compareToDate = new Date($(compareTo).val());
							compareToDate.setDate(compareToDate.getDate() -minusDays);
							compareToDate.setDate(compareToDate.getDate() + plusDays);	
							if(new Date(value) < compareToDate )
							{
								return true;
							}
							else{
								return false;
							}
						}
						else{
							return false;
						}
					}
				   
				},'Must be less than {0}.');
	
	jQuery.validator.addMethod("greaterThan2", 
				function(value, element, params) {
					//console.log(params);
					var compareTo = params.compareTo;
					var minusDays = (typeof params.minusDays != "undefined") ? params.minusDays : 0;
					var plusDays = (typeof params.plusDays != "undefined") ? params.plusDays : 0;
					if(value == "")
					{
						return true;
					}else{
						if($(compareTo).val() != "")
						{
							var compareToDate = new Date($(compareTo).val());
							compareToDate.setDate(compareToDate.getDate() -minusDays);
							compareToDate.setDate(compareToDate.getDate() + plusDays);	
							if(new Date(value) > compareToDate )
							{
								return true
							}
							else{
								return false;
							}
						}
						else{
							return false;
						}
					}
				   
				},'Must be less than {0}.');

	
	//by default, let all fields be disabled
	$(".entry-control").attr("disabled", "disabled");
	
	/*$(".entry-control").change(function(e){
		$(this).addClass("changing");
	})*/
	
    $("#revealPassword").click(function(e){
        toggleReveal();
    });
    if($(".select2").length > 0)
        $(".select2").select2();

        if($( '.daterange' ).length > 0){
            //Daterange picker
            $( '.daterange' ).daterangepicker(
                {
                    
                    locale: {
                        format: 'YYYY-MM-DD',
                       
                    }
                }
            );
        }
        if( $('.datepicker').length > 0){
            $('.datepicker').daterangepicker({
                autoUpdateInput: false,
                singleDatePicker: true,
                showDropdowns: true,
                //autoUpdateInput: false,
                //drops: "up", // up/down
                locale: {
                    format: 'YYYY-MM-DD',
                    cancelLabel: 'Clear'
                   
                },
                //startDate:moment().subtract(7, 'days'),
                //maxDate: moment().add(0, 'days'),
            });

            $('.datepicker').on('apply.daterangepicker', function(ev, picker) {
                $(this).val(picker.startDate.format('YYYY-MM-DD') );
            });
          
            $('.datepicker').on('cancel.daterangepicker', function(ev, picker) {
                $(this).val('');
            });
            
            
        }
        
        
   $("#patientId").keyup(function(e){
		var value = $(this).val();
		getDQAData(value)
	})
        
   $('.autosum').keyup(function (e) {    
    
    
    $(this).removeClass("saved");
    $(this).addClass("changing");
    	
       var charCode = (e.which) ? e.which : event.keyCode 
    
    	var dataSubGroup = $(this).attr("data-subgroup");
    	var catId = $(this).attr("data-catid");
    	var subCatId = $(this).attr("data-subcatId");
    	var dataTotal = $(this).attr("data-total");
    	
    	var grandTotal = 0;
    	
    	var rowTotal = 0;
    	var columnTotal = 0;
    	
    	
    	//calculate total for the row
    	$("."+dataSubGroup).each(function(e){
			var value = $(this).val();
			if(value !== "")
			{
				rowTotal += parseFloat(value);
			}
			
		})
		
		$("#"+dataSubGroup+"_total").html(rowTotal);
		
		
		
		$("."+dataTotal).each(function(e){
			var value = $(this).val();
			if(value !== "")
			{
				columnTotal += parseFloat(value);
			}
			//console.log(columnTotal);
		})
		
		//lets also do totals for those with gender 
		var subGrandTotal = new Number($("#el"+catId+"_"+subCatId+"_male_total").html()) + new Number($("#el"+catId+"_"+subCatId+"_female_total").html());
		
		//console.log("#el"+catId+"_"+subCatId+"__total", subGrandTotal);
		
		$("#el"+catId+"_"+subCatId+"_total").html(subGrandTotal);
		
		
		
		
		$("#"+dataTotal+"_total").html(columnTotal);
		$(".el"+catId).each(function(index, element){
			//console.log("cat id", catId);
			var value = new Number($(element).html());
			grandTotal += value
			
		})
		
		//if(grandTotal > 0)
		if(typeof grandTotal != undefined){// this is useful for scenario where there are no sub categories
			
			console.log("three", catId, subCatId, grandTotal);
			if(grandTotal == 0)
			{
				//check other areas too.
				$("input[data-catid='"+catId+"']").each(function(index, element){
					var value = new Number($(element).val());
					grandTotal += value;
				})
			}
			console.log(grandTotal)
			$("#el"+catId+"__total").html(grandTotal);
			
		}
		
		//var percentage = (new Number($("#el46__total").html()) / new Number($("#el55__total").html()) * 100).toFixed(2);
    	var percentage = (new Number($("#el46_34_total").html()) / new Number($("#el55__total").html()) * 100).toFixed(0);
    	$("#percentage").html(percentage+"%");
		
		//we also need to recalculate the total
		
    	                                
    });
        
    $(".confirm").click(function(e){
        
        if(confirm("Are you sure")){
            return true;
        }
        else{
            e.preventDefault();
            return false;
        }
    })

    $(".confirm2").click(function(e){
            const url = $(this).attr("data-href");
            const title = $(this).attr("data-title");
            const message = $(this).attr("data-message");
            confirmAction(title, message, url);
            e.preventDefault();
    
    });



     //click the notification icon to show notifications 
     $("#showNotifications").click(function(e){
         setTimeout(function(){
            if($(".dropdown-menu-right").hasClass("show"))
            {
                getNotifications();
            }
         }, 400);
        
    });

    $(".social_icon").hover(function(){
        $(this).removeClass("filter_white");
    }, function(){
        $(this).addClass("filter_white");
    })
    
    /*$("#saveDqa").click(function(){
		
	})*/



$("#stateId2").change(function(e){
				var stateId = $("#stateId2").val();
				getLgas(stateId).then(function(data){
					var html = "<option value=''>Select LGA</option>";
				
					for(var i=0; i<data.length; i++)
					{
						html += "<option value='"+data[i]["lgaCode"]+"'>"+data[i]["lgaName"]+"</option>";
					}
					
					$("#lgaId2").html(html);
					
				});
			})
			
			$("#lgaId2").change(function(e){
				var lgaId = $("#lgaId2").val();
				getFacilities(lgaId).then(function(data){
					var html = "<option value=''>Select Facility</option>";
				
					for(var i=0; i<data.length; i++)
					{
						html += "<option data-datim='"+data[i]["datimCode"]+"' value='"+data[i]["datimCode"]+"'>"+data[i]["facilityName"]+"</option>";
					}
					
					$("#facilityId2").html(html);
					
				});
			})
			
			
			$("#facilityId2").change(function(e){
				var facilityId = $("#facilityId").val();
				getSpokesForFacility(facilityId).then(function(data){
					var html = "<option value=''>Select Spoke</option>";
				
					for(var i=0; i<data.length; i++)
					{
						html += "<option  value='"+data[i]["id"]+"'>"+data[i]["spokeName"]+"</option>";
					}
					
					$("#spokeId").html(html);
					
				});
			})
    
   

$("#stateId").change(function(e){
				var stateId = $("#stateId").val();
				getLgas(stateId).then(function(data){
					var html = "<option value=''>Select LGA</option>";
					
					for(var i=0; i<data.length; i++)
					{
						html += "<option value='"+data[i]["lgaCode"]+"'>"+data[i]["lgaName"]+"</option>";
					}
					
					$("#lgaId").html(html);
					if(typeof selLgadId != "undefined")
					{
						$("#lgaId").val(selLgadId);
					}
					$("#lgaId").change();
					
				});
			})
			
			$("#lgaId").change(function(e){
				var lgaId = $("#lgaId").val();
				getFacilities(lgaId).then(function(data){
					var html = "<option value=''>Select Facility</option>";
				
					for(var i=0; i<data.length; i++)
					{
						html += "<option data-datim='"+data[i]["datimCode"]+"' value='"+data[i]["id"]+"'>"+data[i]["facilityName"]+"</option>";
					}
					
					$("#facilityId").html(html);
					if(typeof selFacilityId != "undefined")
					{
						$("#facilityId").val(selFacilityId);
					}
					$("#facilityId").change();
					
				});
			})
			
			
			$("#facilityId").change(function(e){
				var facilityId = $("#facilityId").val();
				getSpokesForFacility(facilityId).then(function(data){
					var html = "<option value=''>Select Spoke</option>";
				
					for(var i=0; i<data.length; i++)
					{
						html += "<option  value='"+data[i]["id"]+"'>"+data[i]["spokeName"]+"</option>";
					}
					
					$("#spokeId").html(html);
					
				});
			})
    
   
});

//on ckecking all city
function getSubCategoriesForCategory(categoryId)
{



	var token = window.localStorage.getItem('token');
	console.log("token",token);
	

	
    //perform login at this point
   const promise = new Promise(function(resolve, reject){
	    $.ajax({
			url:"../get-subcategories-for-category",
			data:{categoryId:categoryId},
			type:"GET",
			success:function(response){
				//console.log(response);
	
				var data = JSON.parse(response);
				//var spokes = data["facility"];
				
				resolve(data);
			},
			error:function(xhr, status){
				reject(xhr);
			}
			
		})
	});
	return promise;
	

 
}


function checkAll(stateId, type)
{
    var status = 0;
    if($("#grand"+type+stateId).prop("checked") == true)
    {
        //check all vehicle types for this city
        $("#all"+type+'bicycle'+stateId).prop("checked", true);
        $("#all"+type+'Bike'+stateId).prop("checked", true);
        $("#all"+type+'SmallTrucks'+stateId).prop("checked", true);
        $("#all"+type+'LargeTrucks'+stateId).prop("checked", true);
        $(".all"+type+"City"+stateId).prop("checked", true);
        
        status = 1;
    }
    else{
        //uncheck all vehicle types for this city
        $("#all"+type+'bicycle'+stateId).prop("checked", false);
        $("#all"+type+'Bike'+stateId).prop("checked", false);
        $("#all"+type+'SmallTrucks'+stateId).prop("checked", false);
        $("#all"+type+'LargeTrucks'+stateId).prop("checked", false);
        $(".all"+type+"City"+stateId).prop("checked", false)
    }
    $("#all"+type+'bicycle'+stateId).change();
    $("#all"+type+'Bike'+stateId).change();
    $("#all"+type+'SmallTrucks'+stateId).change();
    $("#all"+type+'LargeTrucks'+stateId).change();
    updateCoverage(stateId, 0, type, "all", status);
}







function showSuccess(title, message, duration )
{
    toastr.success(title, message, { timeOut: duration });
}
function showError(title, message, duration)
{
    toastr.error(title, message, { timeOut: duration });
  
}

function toggleReveal() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
        $(".password-field").find("i").removeClass("fa-eye");
        $(".password-field").find("i").addClass("fa-eye-slash");
    } else {
        x.type = "password";
        $(".password-field").find("i").removeClass("fa-eye-slash");
        $(".password-field").find("i").addClass("fa-eye");
    }
}


function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
function getDaysAgo(date)
{
    return date;
}

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  String.prototype.trunc = String.prototype.trunc ||
      function(n){
          return (this.length > n) ? this.substr(0, n-1) + '&hellip;' : this;
      };

function confirmAction(title,text,action){
    
        swal({
            title: title,
            text: text,
            icon: "warning",
            showCancelButton: true,
            buttons: {
                cancel: {
                    text: "Cancel",
                    value: null,
                    visible: true,
                    className: "btn-warning",
                    closeModal: true,
                },
                confirm: {
                    text: "Yes",
                    value: true,
                    visible: true,
                    className: "",
                    closeModal: true
                }
            }
        }).then(isConfirm => {
            if (isConfirm) {
               window.location = action;
            } else {
               
            }
        
    });
}

function successAction(title, text, cancelText, cancelClass, cancelAction, confirmText,  confirmClass, confirmAction){
    
        swal({
            title: title,
            text: text,
            icon: "success",
            showCancelButton: true,
            buttons: {
                deny: {
                    text: cancelText,
                    value: null,
                    visible: true,
                    className: cancelClass,
                    closeModal: true,
                },
                confirm: {
                    text: confirmText,
                    value: true,
                    visible: true,
                    className: confirmClass,
                    closeModal: true
                }
            }
        }).then(isConfirm => {
            if (isConfirm) {
				window.location = confirmAction;
            } else {
               window.location = cancelAction
            }
        
    });
}


function getDQAData(value)
{
	$("#patientIdLoader").removeClass("hidden");
	$.ajax({
		url:"../get-dqa",
		type:"GET",
		data:{patientId:value, facilityId:facilityId},
		success:function(response){
			$("#patientIdLoader").addClass("hidden");
			var data = JSON.parse(response);
			
			if(data["hasData"] == 1)
			{
				
				var cohort = data["cohort"]; 
				if(cohort == "TX_New")
				{
					console.log(value);
					$(".tx_new").removeClass("hidden");
				}
				else if(cohort == "Duplicate")
				{
					$(".duplicate").removeClass("hidden");
					console.log(value);
				}
				else if(cohort == "Recency")
				{
					$(".recency").removeClass("hidden");
					console.log(value);
					//$("#whenDidClientStartTreatment").remove("greaterThan");
				}
				else if(cohort == "Walk-in")
				{
					$(".tx_new").removeClass("hidden");
					$(".duplicate").removeClass("hidden");
					$(".recency").removeClass("hidden");
					console.log(value);
					//$("#whenDidClientStartTreatment").remove("greaterThan");
				}
				
				//displayQuestions();
				
				
				
				$("#hospitalNo").val(data["hospitalNo"]);
				$("#phone").val(data["phone"]);
				$('input[name=gender][value=' + data["gender"] + ']').prop('checked',true);
				$('input[name=consentGiven][value=' + data["consentGiven"] + ']').prop('checked',true);
				
				$("#noConsentReason").val(data["noConsentReason"]);
				
				$('input[name=optForCallBack][value=' + data["optForCallBack"] + ']').prop('checked',true);
				
				$("#whatDateTime").val(data["whatDateTime"]);
				var cohort = data["cohort"];
				var cohortValues = cohort.split(",");
				for(var i=0; i<cohortValues.length; i++)
				{
					$("#"+cohortValues[i]).prop("checked", true);
				}
				$("#cohort").val(data["cohort"]);
				$("#firstTimePositive").val(data["firstTimeTestedPositive"]);
				//$("#firstTimePositiveFacility").val();
				//$("#firstTimePositiveFacility").val(data["facTestedPositive"])
				
			
				
			
				//$("#firstTimePositiveFacility").select2().select2("val", ""+data["facTestedPositive"]+"");
				//$("#firstTimePositiveFacility").val(""+data["facTestedPositive"]+"");
				//$('#firstTimePositiveFacility').select2('destroy');
				$("#firstTimePositiveFacility").select2().select2("val", [""+data["facTestedPositive"]+""]);
				$("#firstTreatmentFacility").select2().select2("val", [data["firstTxFacility"]])
				
				$("#refillDays").val(data["refillDays"]);

				$('input[name=retestedAfterFirstYes][value=' + data["hasRetested"] + ']').prop('checked',true).trigger("change");
				$("#noTimeRetested").val(data["noTimeRetested"]);
				$("#lastRetest").val(data["lastRetest"]);
				//$('input[name=hivRetestReasons][value=' + data["hivRetestReasons"] + ']').prop('checked',true)
				
				$('input[name=inComfortablePlace][value=' + data["inComfortablePlace"] + ']').prop('checked',true).trigger("change");
				
				//$("#hivRetestReasons").select2("val", data["hivRetestReasons"]);
				$("#hivRetestReasons").select2().select2("val", [data["hivRetestReasons"]]);
				$("#otherReasonForRetesting").val(data["otherRetestReason"]);
				$("#noTimeRetested").val(data["noTimesRetested"]);
	
				$("#reasonForNoInterview").val(data["reasonForNoInterview"]);
				$("#arvDuration").val(data["arvDuration"]);
				$("#whenDidClientStartTreatment").val(data["whenDidClientStartTreatment"]);
				$("#firstDrugPickup").val(data["firstDrugPickup"]);
				
				
				$('input[name=recievedTxFromAnother][value=' + data["inComfortablePlace"] + ']').prop('checked',true).trigger('change');
				
				$("#lastDrugPickup").val(data["lastDrugPickup"]);
				$("#lastViralLoadDate").val(data["lastViralLoad"]);
				$("#recievedTxFromAnother").val(data["receivedTxFromAnother"]);
				$("#anotherFacReason").val(data["anotherFacReason"]);
				$("#whatDateTime").val(data["callbackDatetime"]);
				$("#otherRemarks").val(data["otherRemarks"]);
				$("#noConsentReason").val(data["noConsentReason"]);
				$('input[name=receivingFromOther][value=' + data["receivingFromAnotherFac"] + ']').prop('checked',true).trigger('change');
				
				$("#receivingFromAnotherReason").val(data["otherFacReason"]);
				$("#otherLocationTestedFirstTime").val(data["otherLocationTestedFirstTime"]);
				$("#otherTreatmentFacility").val(data["otherTxFacs"]);
				
				
				$('input[name=clientTakeArv][value=' + data["clientTookArv"] + ']').prop('checked',true).trigger('change');
				
				
				
				
			    
				//trigger change for radios
				/*$('input[type=radio][name=recievedTxFromAnother]').change();
				$('input[type=radio][name=optForCallBack]').change();
				$('input[type=radio][name=receivingFromOther]').change();
				$('input[type=radio][name=retestedAfterFirstYes]').trigger("change");
				alert("heel");*/
				//retestedAfterFirstYes
				//$('input[type=radio][name=inComfortablePlace]').change();
				//$('input[type=radio][name=consentGiven]').change();
				
				if(data["clientTookArv"] == 'No') {
			        $(".clientTakeArv").addClass("hidden");
			    }
			    else if(data["clientTookArv"] == 'Yes') {
			        $(".clientTakeArv").removeClass("hidden");  
			    }
				
				if(data["inComfortablePlace"] == "Yes")
				{
			         $("#noConsentReasonArea2").addClass("hidden");
		        	$("#consentGivenArea").removeClass("hidden");
			    }
			    else if (data["inComfortablePlace"] == "No") {
			        $("#noConsentReasonArea2").removeClass("hidden");
			        $("#consentGivenArea").addClass("hidden");
			        $("#dqaQuestionsArea").addClass("hidden");
			    }
			    
			    
			    if(data["optForCallBack"] == "Yes")
				{
			        $("#whatTimeArea").removeClass("hidden")
			    }
			    else if (data["optForCallBack"] == "No") {
			        $("#whatTimeArea").addClass("hidden")
			    }
			    
				
				//lets now display or hide things
				if(data["consentGiven"] == "Yes")
				{
			       $("#noConsentReasonArea").addClass("hidden");
			        $("#noConsentReasonArea2").addClass("hidden");
			        $("#dqaQuestionsArea").removeClass("hidden");
			    }
			    else if (data["consentGiven"] == "No") {
			        $("#noConsentReasonArea").removeClass("hidden");
		        	$("#noConsentReasonArea2").removeClass("hidden");
		        	$("#dqaQuestionsArea").addClass("hidden");
			    }
			
			}
			
		},error:function(xhr, status){
			
		}
	})
}


function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function displayQuestions()
{
	       $(".tx_new").addClass("hidden");
			$(".recency").addClass("hidden");
			$(".other").addClass("hidden");
			$(".duplicate").addClass("hidden");
			
			//get all selected values
			var selectedCohorts = [];
			$('.cohort:checked').each(function() {
			    selectedCohorts.push($(this).val());
			});
			
			if(selectedCohorts.includes("TX_New"))
			//if(value == "TX_New")
			{
				$(".tx_new").not(".other").removeClass("hidden");
			}
			if(selectedCohorts.includes("Duplicate"))
			{
				$(".duplicate").not(".other").removeClass("hidden");
			}
			if(selectedCohorts.includes("Recency"))
			{
				$(".recency").not(".other").removeClass("hidden");
				//$("#whenDidClientStartTreatment").remove("greaterThan");
			}
			if(selectedCohorts.includes("Walk-in"))
			{
				$(".tx_new").not(".other").removeClass("hidden");
				$(".duplicate").not(".other").removeClass("hidden");
				$(".recency").not(".other").removeClass("hidden");
				//$("#whenDidClientStartTreatment").remove("greaterThan");
			}
			
			//renumber the items
			var counter = 1;
			$(".sn").each(function(index, element){
				console.log($(element).parent().closest(".withMargin"))
				
				if(!$(element).parent().closest(".withMargin").hasClass("hidden"))
				{
					var sn = counter++;
					$(element).html(sn+". ");
					console.log("not hidden "+counter);
				}
				else{
					console.log("hidden "+counter);
				}
					
			})
}
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

//(function ($, window) {

    $.fn.contextMenu = function (settings) {

        return this.each(function () {

            // Open context menu
            $(this).on("click", function (e) {
                // return native menu if pressing control
                if (e.ctrlKey) return;
                
                //open menu
                var $menu = $(settings.menuSelector)
                    .data("invokedOn", $(e.target))
                    .show()
                    .css({
                        position: "absolute",
                        left: getMenuPosition(e.clientX, 'width', 'scrollLeft'),
                        top: getMenuPosition(e.clientY, 'height', 'scrollTop')
                    })
                    .off('click')
                    .on('click', 'a', function (e) {
                        $menu.hide();
                
                        var $invokedOn = $menu.data("invokedOn");
                        var $selectedMenu = $(e.target);
                        
                        settings.menuSelected.call(this, $invokedOn, $selectedMenu);
                    });
                
                return false;
            });

            //make sure menu closes on any click
            $('body').click(function () {
                $(settings.menuSelector).hide();
            });
        });
        
        function getMenuPosition(mouse, direction, scrollDir) {
            var win = $(window)[direction](),
                scroll = $(window)[scrollDir](),
                menu = $(settings.menuSelector)[direction](),
                position = mouse + scroll;
                        
            // opening menu would pass the side of the page
            if (mouse + menu > win && menu < mouse) 
                position -= menu;
            
            return position;
        }    

    };
//})(jQuery, window);



(function ($, window) {

    $.fn.contextMenu2 = function (settings) {

        return this.each(function () {

            // Open context menu
            $(this).on("click", function (e) {
                // return native menu if pressing control
                if (e.ctrlKey) return;
                
                //open menu
                var $menu = $(settings.menuSelector)
                    .data("invokedOn", $(e.target))
                    .show()
                    .css({
                        position: "absolute",
                        left: getMenuPosition(e.clientX, 'width', 'scrollLeft'),
                        top: getMenuPosition(e.clientY, 'height', 'scrollTop')
                    })
                    .off('click')
                    .on('click', 'a', function (e) {
                        $menu.hide();
                
                        var $invokedOn = $menu.data("invokedOn");
                        var $selectedMenu = $(e.target);
                        
                        settings.menuSelected.call(this, $invokedOn, $selectedMenu);
                    });
                
                return false;
            });

            //make sure menu closes on any click
            $('body').click(function () {
                $(settings.menuSelector).hide();
            });
        });
        
        function getMenuPosition(mouse, direction, scrollDir) {
            var win = $(window)[direction](),
                scroll = $(window)[scrollDir](),
                menu = $(settings.menuSelector)[direction](),
                position = mouse + scroll;
                        
            // opening menu would pass the side of the page
            if (mouse + menu > win && menu < mouse) 
                position -= menu;
            
            return position;
        }    

    };
})(jQuery, window);

function getAgeDisagg(i)
{
	var disagg = "";
	switch(i)
	{
		case 0:
			disagg = "10_14";
			break;
		case 1:
			disagg = "15_19";
			break;
		case 2:
			disagg = "20_24";
			break;
		case 3:
			disagg = "25_29";
			break;
		case 4:
			disagg = "30_34";
			break;
		case 5:
			disagg = "35_39";
			break;
		case 6:
			disagg = "40_44";
			break;
		case 7:
			disagg = "45_49";
			break;
		case 8:
			disagg = "50";
			break;
		case 9:
			disagg = "none";
			break;
			
	}
	return disagg;
}

