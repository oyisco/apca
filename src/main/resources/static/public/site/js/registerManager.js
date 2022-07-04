$(document).ready(function(e){

})

function haveCar()
{
    if($("#hasCar").is(":checked"))
    {
        $("#carDetails").slideDown(function(){
            $("#makeId").rules( "add", {
              required: true,
              messages: {
                required: "Select car manufacturer",
                
              }
            });
        $("#modelId").rules( "add", {
              required: true,
              messages: {
                required: "Select car model",
                
              }
            });
        $("#carYear").rules( "add", {
              required: true,
              messages: {
                required: "Select car year",
                
              }
            });    
        });
        

    }
    else {
        $("#carDetails").slideUp();
    }
}
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
                                    return 0;
                                }
                                ,
                                requestType:function(){
                                    return "checkphone";
                                },
                                
                            }
                        }
                    },

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
                        remote:"phone number is in use"
                    },

        }
    });
}

function setupDriverRegisterValidation2()
{
 
    $("#driverRegister").data('validator', null);
	$("#driverRegister").unbind('validate');
    $("#driverRegister").validate({
        rules: {
            firstName:{required:true,},
            lastName:{required:true,},
            

        },
        messages: {
            firstName:{
                    required:"Fill out first name"
                },
            lastName:{
                    required:"Fill out last name",
                },

        }
    });
}

function setupDriverRegisterValidation3()
{
    $("#driverRegister").data('validator', null);
    $("#driverRegister").unbind('validate');
    $("#driverRegister").validate({
        rules: {
            nationalId:{required:true,},
            idFile:{required:true,},
            driverLicense:{required:true,},
            driverLicenseFile:{required:true,},
            

        },
        messages: {
            nationalId:{
                    required:"National ID No. is required"
                },
            idFile:{
                    required:"Please upload a file",
                },
            driverLicense:{
                    required:"Fill out your driver's license details"
                },
            driverLicenseFile:{
                    required:"License File is required",
                },

        }
    });
}

function processStep1()
{

    if(validateSingleFields("driverRegister", new Array("email", "countryId", "stateId", "phone")))
    {
        $("#saveStep1").attr("disabled", "disabled");
        var email = $("#email").val();
        var countryId = $("#countryId").val();
        var stateId = $("#stateId").val();
        var phone  = $("#phone").val();
        var password = $("#password").val();
        saveStep({step: 1, email:email, password:password, countryId:countryId, stateId:stateId, phone:phone})
        //go to step two


    }
    else {

    }
}

function processStep2()
{

    var fieldsToValidate = new Array();
    fieldsToValidate[0] = "firstName";
    fieldsToValidate[1] = "lastName";
    var hasCar = 0;
    if($("#hasCar").is(":checked"))
    {
        hasCar = 1;
        fieldsToValidate[2] = "makeId";
        fieldsToValidate[3] = "modelId";
        fieldsToValidate[4] = "carYear";
    }

    if(validateSingleFields("driverRegister", fieldsToValidate))
    {
        //disable the button
        $("#saveStep2").attr("disabled", "disabled");
        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var hasCar = $("#hasCar").is(":checked") ? 1: 0;
        var makeId = $("#makeId").val();
        var modelId  = $("#modelId").val();
        var carYear = $("#carYear").val();
        var carLicense = $("#carLicense").val();
        saveStep({step: 2, hasCar:hasCar, firstName:firstName, lastName:lastName, makeId:makeId, modelId:modelId, carYear:carYear, carLicense:carLicense})
        //go to step two

    }
    else {

    }
}
function processStep3()
{
    $("#saveStep3").attr("disabled", "disabled");
    var fieldsToValidate = new Array();
    fieldsToValidate[0] = "nationalId";
    fieldsToValidate[1] = "idFile";
    fieldsToValidate[2] = "driverLicense";
    fieldsToValidate[3] = "driverLicenseFile";
    
    if(validateSingleFields("driverRegister", fieldsToValidate))
    {
        var nationalId = $("#nationalId").val();
        var driverLicense = $("#driverLicense").val();

        var datas = new FormData();
        var license = document.getElementById("driverLicenseFile").files[0];
        var idFile = document.getElementById("idFile").files[0];
        datas.append('ajax', true);
        datas.append('license', license);
        datas.append('idFile', idFile);
        datas.append('nationalId', nationalId);
        datas.append('driverLicense', driverLicense);
        datas.append('step', 3);
        saveStep3(datas)
        //go to step two

    }
    else {

    }
}

function saveStep(data)
{
    var step = data["step"];
    
    $.ajax({
        url:"app/includes/processors/admin/save-step",
        data:data,
        type:"POST",

        success:function(response){
            if(response > 0)
            {
                if(step == 1)
                {
                    $("#saveStep1").removeAttr("disabled");
                    $("#step1").hide('fade', 100, function(){
                        $("#step2").show('fade', 100);
                        setupDriverRegisterValidation2();
                    });
                }else if(step == 2)
                {
                    $("#step2").hide('fade', 100, function(){
                        $("#step3").show('fade', 100);
                        setupDriverRegisterValidation3();
                    });
                }
                else {
                    window.location = "http://google.com";
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
function saveStep3(data)
{
    $.ajax({
        url:"app/includes/processors/admin/save-step3",
        data:data,
        type:"POST",
        processData: false,
        contentType: false,
        success:function(response){
            
            if(response > 0){

               // $("#errorMsg").removeClass("hidden");
               window.location = "app/dashboard.php#ajax/driver/dashboard"
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
