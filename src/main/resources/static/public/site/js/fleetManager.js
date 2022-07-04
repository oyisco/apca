$(document).ready(function(e){

})


function getStates(countryId, stateId)
{
    var countryVal = $("#"+countryId).val();

    $.ajax({
        url:"app/includes/snippets/get-states-for-country",
        data:{countryId:countryVal},
        type:"GET",
        success:function(response){
            var states = $.parseJSON(response);
            var html = "";
            for(key in states)
            {
                if(states.hasOwnProperty(key))
                {
                    html += "<option value='"+states[key]["id"]+"'>"+states[key]["name"]+"</option>";
                }
            }
            $("#"+stateId).html(html);
        }
    })
}

function getMake(makeId, modelId)
{
    var makeVal = $("#"+makeId).val();

    $.ajax({
        url:"app/includes/snippets/get-models-for-make",
        data:{makeId:makeVal},
        type:"GET",
        success:function(response){
            var models = $.parseJSON(response);
            var html = "";
            for(key in models)
            {
                if(models.hasOwnProperty(key))
                {
                    html += "<option value='"+models[key]["id"]+"'>"+models[key]["title"]+"</option>";
                }
            }
            $("#"+modelId).html(html);
        }
    })
}
function getModels(makeId, modelId)
{
    var makeVal = $("#"+makeId).val();

    $.ajax({
        url:"/user/get-models-for-makes",
        data:{makeId:makeVal},
        type:"GET",
        success:function(response){
            console.log(response);
            var data = $.parseJSON(response);
            var models = data["data"];
            var html = "";
            for(key in models)
            {
                if(models.hasOwnProperty(key))
                {
                    html += "<option value='"+models[key]["value"]+"'>"+models[key]["label"]+"</option>";
                }
            }
            $("#"+modelId).html(html);
        }
    })
}


function setupDriverRegisterValidation()
{
    $("#driverRegister").data('validator', null);
	$("#driverRegister").unbind('validate');
    $("#driverRegister").validate({
        rules: {
            email:{
                    required:true,
                    remote: {
                    url: "app/includes/snippets/checker",
                    type: "GET",
                    data: {
                      email: function() {
                        return $.trim($( "#email" ).val())
                      },
                      requestType:function(){
                          return "checkemail"
                      },
                      id:function()
                      {
                        return 0
                      }


                    }
                  }
                },
            countryId:{required:true,},
            stateId:{required:true,},
            phone:{
                        required:true,
                        remote: {
                            url: "app/includes/snippets/checker.php",  
                            type: "GET",
                            data: {
                                phone: function() {
                                    return $('#phone').val();
                                },
                                
                                id:function()
                                {
                                    return $("#id").val();
                                }
                                ,
                                requestType:function(){
                                    return "checkphone";
                                },
                                
                            }
                        }
                    },
            firstName:{required:true,},
            lastName:{required:true,}

        },
        messages: {
            email:{
                    required:"Fill out email address",
                    remote:"Email address is in use"
                },
            countryId:{
                    required:"Select Current country",
                },
            stateId:{
                        required:"Select current city",
                    },
            phone:{
                        required:"Fill out phone number",
                        remote:"Phone number is in user"
                    },
            firstName:{
                            required:"Fill out first name",
                        },
            
            lastName:{
                            required:"Fill out last name",
                        },
        

        }
    });
}


function processStep1()
{

    if(validateSingleFields("driverRegister", new Array("email", "countryId", "stateId", "phone", "firstName", "lastName")))
    {
        $("#saveStep1").attr("disabled", "disabled");
        var email = $("#email").val();
        var countryId = $("#countryId").val();
        var stateId = $("#stateId").val();
        var phone  = $("#phone").val();
        var password = $("#password").val();
        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        saveStep({step: 1, email:email, password:password, countryId:countryId, stateId:stateId, phone:phone, firstName:firstName, lastName:lastName})
        //go to step two


    }
    else {

    }
}




function saveStep(data)
{
    var step = data["step"];
    
    $.ajax({
        url:"app/includes/processors/admin/save-fleet-step",
        data:data,
        type:"POST",
        success:function(response){
            if(response > 0)
            {
                if(response > 0){
                   // $("#errorMsg").removeClass("hidden");
                   window.location = "app/dashboard.php#ajax/fleet/update-profile"
                }

            }
            else {

                $("#errorMsg").removeClass("hidden");
            }
        },
        error:function(xhr, status)
        {
            console.log(xhr)
        },
        complete:function()
        {
            $("#saveStep1").removeAttr("disabled");
            $("#saveStep2").removeAttr("disabled");
        }
    })
}


function validateSingleFields(formId, fieldIds)
{
    var returnVal = true;
    for(var i=0; i<fieldIds.length; i++)
    {
        if(!$("#"+formId).validate().element("#"+fieldIds[i]))
        {
            returnVal = false;
            break;
        }
    }
    return returnVal;
}


