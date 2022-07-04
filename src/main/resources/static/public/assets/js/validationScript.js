
$(document).ready(function(){
    
    $(".numberonly").keyup(function(e){//this is necessary to capture backspace
		if(e.keyCode == 8)
		{
			fieldsDirty = true;
		}
	})
	
	 $(".fieldsToSave").keyup(function(e){//this is necessary to capture backspace
		if(e.keyCode == 8)
		{
			fieldsDirty = true;
		}
		
	})
	
    $('.numberonly').keypress(function (e) {    
    
        var charCode = (e.which) ? e.which : event.keyCode    
        if (String.fromCharCode(charCode).match(/[^0-9]/g)) 
        {
			
			return false;  
		}   
		else{
			fieldsDirty = true;
		}                            
   });  
   
   $('.textinput').change(function (e) {      
		fieldsDirty = true;       
   });    
    
});
function validateAddCategory()
{
    
    $('#addCategoryForm').data('validator', null);
    $("#addCategoryForm").unbind('validate');
    $("#addCategoryForm").validate({
      ignore:[],
      rules: {
        category:{
            required:true,
        },

      },
      messages: {
        category:{
            required:"Please fill out the category/element name",
        },
        
      }
    });
}


function validateSubCategory()
{
    
    $('#addSubCategoryForm').data('validator', null);
    $("#addSubCategoryForm").unbind('validate');
    $("#addSubCategoryForm").validate({
      ignore:[],
      rules: {
        categoryId:{
            required:true,
        },
        subcategory:{
            required:true,
        },

      },
      messages: {
        categoryId:{
            required:"Select category",
        },
        subcategory:{
            required:"Fill out sub category",
        },
        
      }
    });
}
function validateAddSpoke()
{
    
    $('#addSpokeForm').data('validator', null);
    $("#addSpokeForm").unbind('validate');
    $("#addSpokeForm").validate({
      ignore:[],
      rules: {
        stateId:{
            required:true,
        },
        lgaId:{
            required:true,
        },
        facilityId:{
            required:true,
        },
        address:{
            required:true,
        },
        spoke:{
            required:true,
        },
        facilityType:{
            required:true,
        },
        lng:{
            required:true,
        },
        lat:{
            required:true,
        },

      },
      messages: {
        stateId:{
            required:"Select State",
        },
        lgaId:{
            required:"Select LGA",
        },
        facilityId:{
            required:"Select Hub/Facility",
        },
        address:{
            required:"Fill out address",
        },
        spoke:{
            required:"Fill out spoke name",
        },
        facilityType:{
            required:"Select facility type",
        },
        lng:{
            required:"Fill out longitude",
        },
        lat:{
            required:"fill out latitude",
        },

        
      }
    });
}

function validateAddValidation()
{
    
    $('#addValidationForm').data('validator', null);
    $("#addValidationForm").unbind('validate');
    $("#addValidationForm").validate({
      ignore:[],
      rules: {
        categoryId:{
            required:true,
        },
        subCategoryId:{
            required:true,
        },
        condition:{
            required:true,
        },
        compareCategoryId:{
            required:true,
        },
        compareSubCategoryId:{
            required:true,
        },
        errorMessage:{
            required:true,
        },
        

      },
      messages: {
        categoryId:{
            required:"Category is required",
        },
        subCategoryId:{
            required:"Sub category is required",
        },
        condition:{
            required:"Select the condition",
        },
        compareCategoryId:{
            required:"Select to category to compare to ",
        },
        compareSubCategoryId:{
            required:"Select the sub category to compare to",
        },
        errorMessage:{
            required:"Fill out the error message",
        },
        
      }
    });
}


function validateAddUser()
{
    
    $('#addUserForm').data('validator', null);
    $("#addUserForm").unbind('validate');
    $("#addUserForm").validate({
      ignore:[],
      rules: {
        username:{
            required:true,
            remote:{
				url:"../check-user",
				type:"GET",
				data:{
					requestData: function(){
						return $("#username").val();	
					},
					userId:function(){
						return $("#id").val();
					},
					requestType: function(){
						return "username"
					}
					
				}
			},
        },
        email:{
            required:true,
            remote:{
				url:"../check-user",
				type:"GET",
				data:{
					requestData: function(){
						return $("#email").val();	
					},
					userId:function(){
						return $("#id").val();
					},
					requestType: function(){
						return "email"
					}
					
				}
			},
        },
        password:{
            required:true,
        },
        role:{
            required:true,
        },

      },
      messages: {
        username:{
            required:"Fill out username",
            remote:"Username exists"
        },
        email:{
            required:"Fill out email address",
            remote:"email exists"
        },
        password:{
            required:"Fill out password",
        },
        role:{
            required:"Select user role",
        },
        
      }
    });
}


function validateMonthlycPMTCT()
{
    
    $('#dataEntryForm').data('validator', null);
    $("#dataEntryForm").unbind('validate');
    $("#dataEntryForm").validate({
      ignore:[],
      invalidHandler: function(e, validator){
        
        
	        var closestId = $(validator.errorList[0].element).closest(".tab-pane").attr('id')
	       
	        $('.nav-tabs a[href="#'+closestId+'"]').tab('show');
	        $('html, body').animate({
	            scrollTop: ($(validator.errorList[0].element).offset().top-130)
	        }, 1000);
       },
      rules: {
		 year:{required:true},
		 country:{required:true},
      },
      messages: {
       	country:{required:"Please select country"},
       	year:{required:"Please select year"}

      }
    });
    
    
    /*$(".numberonly").each(function(index, element){
		$(this).rules('add', {  
		    required: true, 
		    messages: {
		        required: "Required",   
		    }
		});	
	})*/
}

function validateGenericForm()
{
    
    $('#genericForm').data('validator', null);
    $("#genericForm").unbind('validate');
    $("#genericForm").validate({
      ignore:[],
      invalidHandler: function(e, validator){
        
	        var closestId = $(validator.errorList[0].element).closest(".tab-pane").attr('id')
	       
	        $('.nav-tabs a[href="#'+closestId+'"]').tab('show');
	        $('html, body').animate({
	            scrollTop: ($(validator.errorList[0].element).offset().top-130)
	        }, 1000);
	        //console.log($(validator.errorList[0].element));
       },
      rules: {
		 reportingPeriod:{required:true}
      },
      messages: {
       	reportingPeriod:{required:"Please select reporting period"}

      }
    });
    
    
    jQuery.validator.addMethod("greaterThan", 
		function(value, element, params) {
		
		    if (!/Invalid|NaN/.test(new Date(value))) {
		        return new Date(value) > new Date($(params).val());
		    }
		
		    return isNaN(value) && isNaN($(params).val()) 
		        || (Number(value) > Number($(params).val())); 
		},'Must be greater than {0}.');
		    
    $(".requiredfield").each(function(index, element){
	
		//alert("hello");
		var errorMessage = ($(element).attr("data-error") != "") ? $(element).attr("data-error") : "This field is required";
		$(this).rules('add', {  
		    required: true, 
		    messages: {
		        required: errorMessage,   
		    }
		});	
	})
}


function validateWeeklycPMTCT()
{
    
    $('#weeklyCPMTCT').data('validator', null);
    $("#weeklyCPMTCT").unbind('validate');
    $("#weeklyCPMTCT").validate({
      ignore:[],
      invalidHandler: function(e, validator){
        
        
	        var closestId = $(validator.errorList[0].element).closest(".tab-pane").attr('id')
	       
	        $('.nav-tabs a[href="#'+closestId+'"]').tab('show');
	        $('html, body').animate({
	            scrollTop: ($(validator.errorList[0].element).offset().top-130)
	        }, 1000);
       },
      rules: {
		 reportingPeriod:{required:true}
      },
      messages: {
       	reportingPeriod:{required:"Please select reporting period"}

      }
    });
    
    
    $(".numberonly").each(function(index, element){
		
		$(this).rules('add', {  
		    required: true, 
		    messages: {
		        required: "Required",   
		    }
		});	
	})
}



function validateMonthlyHTS()
{
    
    $('#monthlyHTS').data('validator', null);
    $("#monthlyHTS").unbind('validate');
    $("#monthlyHTS").validate({
      ignore:[],
      invalidHandler: function(e, validator){
        
        
	        var closestId = $(validator.errorList[0].element).closest(".tab-pane").attr('id')
	       
	        $('.nav-tabs a[href="#'+closestId+'"]').tab('show');
	        $('html, body').animate({
	            scrollTop: ($(validator.errorList[0].element).offset().top-130)
	        }, 1000);
       },
      rules: {
		 reportingPeriod:{required:true}
      },
      messages: {
       	reportingPeriod:{required:"Please select reporting period"}

      }
    });
    
    
    $(".numberonly").each(function(index, element){
		$(this).rules('add', {  
		    required: true, 
		    messages: {
		        required: "Required",   
		    }
		});	
	})
	
	/*$(".textinput]").each(function(index, element){
		$(this).rules('add', {  
		    required: true, 
		    messages: {
		        required: "Required",   
		    }
		});	
	})*/
}


function validateWeeklyHTS()
{
    
    $('#weeklyHTS').data('validator', null);
    $("#weeklyHTs").unbind('validate');
    $("#weeklyHTS").validate({
      ignore:[],
      invalidHandler: function(e, validator){
        
        
	        var closestId = $(validator.errorList[0].element).closest(".tab-pane").attr('id')
	       
	        $('.nav-tabs a[href="#'+closestId+'"]').tab('show');
	        $('html, body').animate({
	            scrollTop: ($(validator.errorList[0].element).offset().top-130)
	        }, 1000);
       },
      rules: {
		 reportingPeriod:{required:true}
      },
      messages: {
       	reportingPeriod:{required:"Please select reporting period"}

      }
    });
    
    
    $(".numberonly").each(function(index, element){
		
		$(this).rules('add', {  
		    required: true, 
		    messages: {
		        required: "Required",   
		    }
		});	
	})
}


function validateChangePasswordForm()
{
    
    $('#changePasswordForm').data('validator', null);
    $("#changePasswordForm").unbind('validate');
    $("#changePasswordForm").validate({
      ignore:[],
      
      rules: {
		oldPassword:{
        	required:true,
        	
        },
        newPassword:{
            required:true,
        },
        confirmPassword:{
            required:true,
            equalTo: "#newPassword"
        },
      },
      messages: {
       	 oldPassword:{
            required:"Fill out old password",
        },
        newPassword:{
            required:"Fill out new password",
        },
        confirmPassword:{
            required:"Confirm password",
            equalTo:"Passwords do not match",
        },

      }
    });
    
    
}

function validateCustom()
{
	var errors = [];//initialize the errors variable
	$(".totals").removeClass("error");//remove error class
	$(".customError").remove();//remove all errors and start afresh
	
	for(var i=0; i<validationData.length; i++)
	{
		
		var leftSide = validationData[i]["leftSide"];
		var rightSide = validationData[i]["rightSide"];
		var condition = validationData[i]["valueCondition"];
		var errorMessage = validationData[i]["errorMessage"];
			
		var leftSideData = leftSide.split("#");
		leftSideData.shift();
		
		var rightSideData = rightSide.split("#");
		rightSideData.shift()
		
		var leftSideExpressionData = buildExpressionFromSide(leftSideData)
		var leftSideExpression = leftSideExpressionData[0];
		var leftSideElement = leftSideExpressionData[1];
		var leftSideType = leftSideExpressionData[2];
		var rightSideExpressionData = buildExpressionFromSide(rightSideData);
		var rightSideExpression = rightSideExpressionData[0];
		
		var errorValue = checkError2(leftSideExpression, condition, rightSideExpression);
		
		if(!errorValue)
		{
			errors.push({element:leftSideElement, type:leftSideType, error:errorMessage});
		}
		//console.log(compareElId);
		//console.log(compareElValue);
		
		
	}
	
	//console.log(errors)
	if(errors.length > 0)
	{
		for(var i=0; i<errors.length; i++)
		{
			var elId = errors[i]["element"];
			var type = errors[i]["type"];
			var errorMessage = errors[i]["error"];
			//$("#el"+elId).addClass("error");
			
			elId.addClass("error");
			
			$("<i class='fa fa-info-circle error customError'   title='"+errorMessage+"'></i>&nbsp;&nbsp;&nbsp; ").insertAfter(elId);
			
			if(i == 0)
			{//for the very first error, go to the tab and scroll to the error
				var closestId = elId.closest(".tab-pane").attr('id');
		        $('.nav-tabs a[href="#'+closestId+'"]').tab('show');
		        
		        $('html, body').animate({
					
		            scrollTop: (elId.offset().top-130)
		        }, 1000);
			}
			
	        
	        //for weekly
	        //elId = elId.replace("__total", "");
	         //$("<i class='fa fa-info-circle error customError' title='"+errorMessage+"'></i>&nbsp;&nbsp;&nbsp; ").insertAfter(elId);//for weekly
	        //var closestId = elId.closest(".tab-pane").attr('id')
	       // $('.nav-tabs a[href="#'+closestId+'"]').tab('show');
	        
	        
	       
			
	        
	        
		}
		
		$('.customError').tooltip({
			title: 'Tooltip Show Event',
			trigger: 'click',
			placement: 'right'
			}).on('show.bs.tooltip', function() {
				alert('Show event fired.');
		});
		//switch to the first error
		
		return false;
	}
	return true;
}

function buildExpressionFromSide(sideArray)
{
	//var catId = param.replace("")
	var expression = "";
	var supportedOperations = ["+", "-", "/", "*"];
	var firstElement = "";//used to point the error;
	var firstType = "";
	
	for(var i=0; i<sideArray.length; i++)//we are looping through a signle side here.
	{
		if(supportedOperations.includes(sideArray[i]))//if the current value is an operation, let's add the operation to the expression
		{
			//this is an expression
			expression += " "+sideArray[i];
		}
		else {//this is a data element. This could be one of - a single category, a category and sub category or a category subcategory and disaggregation
			
			var categoryId = 0;
			var subCategoryId = "";
			var disagg = "none";
			var gender = "none";
			
			if(sideArray[i].indexOf("!") > -1 && sideArray[i].indexOf("|") > -1 && sideArray[i].indexOf("_") > -1)
			{//this has a sub category and a disagg and a gender
				 var components = sideArray[i].split("!");
				 //index 0 = category and index 1 = sub cat, disagg and gender
				 categoryId = components[0];
				 var subComponents = components[1].split("|");
				 //index 0 = sub cat and index 1 = disagg and gender
				 subCategoryId = subComponents[0];
				 var subSubComponents = subComponents[1].split("_");
				 disagg = subSubComponents[0];
				 gender = subSubComponents[1];
				 
			}
			else if(sideArray[i].indexOf("!") > -1 && sideArray[i].indexOf("|") > -1)
			{//this has a sub category and a disagg
				 var components = sideArray[i].split("!");
				 //index 0 = category and index 1 = sub cat and disagg
				 categoryId = components[0];
				 var subComponents = components[1].split("|");
				 //index 0 = sub cat and index 1 = disagg
				 subCategoryId = subComponents[0];
				 disagg = subComponents[1];
				 
			}
			else if(sideArray[i].indexOf("!") > -1 && sideArray[i].indexOf("_") > -1)
			{//this has a sub category and a gender
				 var components = sideArray[i].split("!");
				 //index 0 = category and index 1 = sub cat and gender
				 categoryId = components[0];
				 var subComponents = components[1].split("_");
				 //index 0 = sub cat and index 1 = gender
				 subCategoryId = subComponents[0];
				 gender = subComponents[1];
				 
			}
			else if(sideArray[i].indexOf("|") > -1 && sideArray[i].indexOf("_") > -1)
			{//this has a disagg and a gender
				 var components = sideArray[i].split("|");
				 //index 0 = category and index 1 = sub cat and gender
				 categoryId = components[0];
				 var subComponents = components[1].split("_");
				 //index 0 = disagg and index 1 = gender
				 disagg = subComponents[0];
				 gender = subComponents[1];
				 
			}
			else if(sideArray[i].indexOf("!") > -1 )//only sub category
			{
				 var components = sideArray[i].split("!");
				 //index 0 = category and index 1 = sub cat
				 categoryId = components[0];
				 subCategoryId = components[1];
			}
			else if(sideArray[i].indexOf("|") > -1)//only disagg
			{
				var components = sideArray[i].split("|");
				 //index 0 = category and index 1 = sub cat
				 categoryId = components[0];
				 disagg = components[1];
			}
			else if(sideArray[i].indexOf("_") > -1)//only gender
			{
				var components = sideArray[i].split("_");
				 //index 0 = category and index 1 = gender
				 categoryId = components[0];
				 gender = components[1];
			}
			else{//no sub cat or disagg
				categoryId = sideArray[i];
			}
			
			
			/*var categoryId = components[0];
			
			if(components.length >1)
			{
				//that means there is a sub category. But it could be attached to a disaggregation,so lets check for that
				if(components[1].indexOf("!")> -1)
				{
					
				}
				var subComponents = components[1].split("");
			}
			else{
				
			}*/
			
			var dataValue = getValueFrom(categoryId, subCategoryId, disagg, gender);
			var value = dataValue["value"];
			
			//firstElement = (firstElement == "") ? elPart : firstElement;
			if(i == 0)
			{
				firstElement = dataValue["element"];
				firstType = dataValue["type"];
			}
			value = (value == "" || value == " " || typeof value == "undefined") ? 0 : value;
			expression = expression+ " "+value;	
		}
		//console.log(sideArray[i]);
		
	}
	
	return [expression, firstElement, firstType];
}

function getValueFrom(categoryId, subCategoryId, disagg, gender)
{
	var value = 0;
	var element = "";
	var type = "";
	//if(disagg == "none")//this is possible a row total or a single data element
	//{

	if(typeof $("#el"+categoryId+"_"+subCategoryId+"_"+gender+"_total").html() != "undefined")//this is a row total
	{
		value = $("#el"+categoryId+"_"+subCategoryId+"_"+gender+"_total").html();
		element = $("#el"+categoryId+"_"+subCategoryId+"_"+gender+"_total");
		type = "tag";
	}
	else if(typeof $("#entry_"+categoryId+"_"+subCategoryId+"_"+disagg+"_"+gender).val() != "undefined")
	{
		value = $("#entry_"+categoryId+"_"+subCategoryId+"_"+disagg+"_"+gender).val();
		element = $("#entry_"+categoryId+"_"+subCategoryId+"_"+disagg+"_"+gender);
		type = "field";
		
	}
	else if(typeof $("#el"+categoryId+"__none_total").html() != "undefined"){
		value = $("#el"+categoryId+"__none_total").html();
		element = $("#el"+categoryId+"__none_total");
		type = "tag";
	}
	else if(typeof $("#el"+categoryId+"_none_total").html() != "undefined")
	{
		value = $("#el"+categoryId+"_none_total").html();
		element = $("#el"+categoryId+"_none_total");
		type = "tag";
	}
	else{
		value = $("#el"+categoryId+"__total").html();
		element = $("#el"+categoryId+"__total");
		type = "tag";
	}
	//}
	
	return {value:value, element:element, type:type};
	
}

function checkError(value1, value2, condition)
{
	if(condition == "<")
	{
		
		return (value1 < value2) ? true : false;
	}
	else if(condition == "<=")
	{
		return (value1 <= value2) ? true : false;
	}
	else if(condition == "=")
	{
		return (value1 == value2) ? true : false;
	}
	else if(condition == ">")
	{
		return (value1 > value2) ? true : false;
	}
	else if(condition == ">=")
	{
		return (value1 >= value2) ? true : false;
	}
	else
	{
		return false;
	}
	
	
}

function checkError2(leftSide, operation, rightSide)
{
	
	
	try{
		//console.log(leftSide+"-"+operation+"-"+rightSide)
		return eval(leftSide+""+operation+""+rightSide);
	}catch(e)
	{
		return true;
	}
	
}

function buildValidationElementId(categoryId, subCategoryId)
{
	var id = categoryId+"_";
	if(subCategoryId > 0)
	{
		id = id+subCategoryId
	}
	
	id += "_total";
	return id;
	
		
}
