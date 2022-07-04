var saveLocallyInterval;
var fieldsDirty = false;
/*stateId;
lgaId;
facilityId;*/
var siteSelected = false;
var lastField;
$(document).ready(function () {
    //window.localStorage.clear();
    /*saveLocallyInterval = setInterval(function(){
       autoSaveToLocal();
   }, 10000);*/

    $(".entry-control").focus(function (e) {
        lastField = $(this);
        //alert("hello");
    })
    $(".entry-control").blur(function (e) {

        //autoSaveToLocal();
    })

    /*$(".fieldsToSave").blur(function(e){

        autoSaveToGeneric();
    })*/

    $("#switchSpoke").click(function (e) {
        spokeText = "";
        siteSelected = false;//this is used to check that a site (state, lga, facility or spoke) has been selected
        if (switchType == "state") {
            spokeText = $("#stateIdFooter option:selected").text();
            $("#facilityLabel").html("State");
            siteSelected = ($("#stateIdFooter").val() > 0) ? true : false;

            $(".stateTarget").html("<i class='fa fa-spinner fa-spin'></i>");
            var stateId = $("#stateIdFooter").val();

            getPrepopulatedData(moduleId, stateId, 0, 0, 0, "2022-01-01", "2022-03-31")

        } else if (switchType == "lga") {
            spokeText = $("#lgaIdFooter option:selected").text();
            $("#facilityLabel").html("LGA");
            siteSelected = ($("#lgaIdFooter").val() > 0) ? true : false;

            $(".stateTarget").html("<i class='fa fa-spinner fa-spin'></i>");
            var stateId = $("#stateIdFooter").val();

            getPrepopulatedData(moduleId, stateId, 0, 0, 0, "2022-01-01", "2022-03-31")
        } else if (switchType == "facility") {
            spokeText = $("#facilityIdFooter option:selected").text();
            $("#facilityLabel").html("Facility");
            siteSelected = ($("#facilityIdFooter").val() > 0) ? true : false;
        } else if (switchType == "spoke") {

            $("#facilityLabel").html("Spoke");
            spokeText = $("#spokeIdFooter option:selected").text();
            siteSelected = ($("#spokeIdFooter").val() > 0) ? true : false;
            //alert("switch type"+spokeText);
        }

        if (typeof $("#lgaIdFooter").val() != "undefined") {
            lgaId = $("#lgaIdFooter").val();
        }
        if (typeof $("#stateIdFooter").val() != "undefined") {
            stateId = $("#stateIdFooter").val();
        }
        if (typeof $("#facilityIdFooter").val() != "undefined") {
            facilityId = $("#facilityIdFooter").val();
        }

        if (typeof $("#spokeIdFooter").val() != "undefined") {
            spokeId = $("#spokeIdFooter").val();
        }


//alert(stateId+" "+lgaId);
        if (siteSelected == false) {
            alert("Please select a site");
        } else {

            if (switchType == "spoke" && spokeId > 0) {
                getRemoteData();
            }


            $("#spokeText").html(spokeText)
            $("#changeSpokeModal").modal("hide");
        }

    })

    $("#showSwitchModal").click(function (e) {

        $("#changeSpokeModal").modal("show");
        e.preventDefault();
        return false;
    })

    $("#saveMonthly").click(function (e) {
        if ($("#dataEntryForm").valid()) {
            //we have passed the first error validation. Next. We need to do the custom validation
            if (validateCustom()) {
                //console.log("good to go");
                saveToRemote();
            }
            //
        }
    })

    $("#saveDqa").click(function () {
        if ($("#genericForm").valid()) {
            if (facilityId == 0) {
                alert("Please select facility");
            } else {
                saveDqaForm();
            }

        }
    })


    $("#saveCategory").click(function (e) {
        //validate first
        if ($("#addCategoryForm").valid()) {
            $("#saveCategory").attr("disabled", "disabled");
            $("#saveCategory").html("Saving...");
            var category = $("#category").val();
            $.ajax({
                url: "../save-category",
                type: "GET",
                data: {category: category},
                success: function (response) {
                    toastr.success('Saved Successfully', 'Category has been successfully saved', {
                        positionClass: 'toast-top-right',
                        containerId: 'toast-top-right'
                    });
                    setTimeout(function () {
                        window.location = "view-categories";
                    }, 1000);
                },
                error: function (xhr, status) {
                    $("#saveCategory").removeAttr("disabled");
                    $("#saveCategory").html("Save");
                    console.log(xhr)
                }
            })
        }
    })


    $("#addSubCategory").click(function () {
        if ($("#addSubCategoryForm").valid()) {
            $("#addSubCategory").attr("disabled", "disabled");
            $("#addSubCategory").html("Saving...");
            var categoryId = $("#categoryId").val();
            var subcategory = $("#subcategory").val();
            $.ajax({
                url: "../save-subcategory",
                type: "GET",
                data: {categoryId: categoryId, subCategory: subcategory},
                success: function (response) {
                    toastr.success('Saved Successfully', 'Sub category has been successfully saved', {
                        positionClass: 'toast-top-right',
                        containerId: 'toast-top-right'
                    });
                    setTimeout(function () {
                        window.location = "view-subcategories";
                    }, 1000);
                },
                error: function (xhr, status) {
                    $("#addSubCategory").removeAttr("disabled");
                    $("#addSubCategory").html("Save");
                    console.log(xhr)
                }

            })

        }
    })

    $("#addUser").click(function (e) {

        if ($("#addUserForm").valid()) {
            $("#addUser").attr("disabled", "disabled");
            $("#addUser").html("Saving...");
            var username = $("#username").val();
            var password = $("#password").val();

            var role = $("#role").val();
            var modules = $("#modules").val();
            var moduleString = modules.join(",");
            var countries = $("#countryId").val();
            var countryString = countries.join(",");


            $.ajax({
                url: "../save-user",
                type: "GET",
                data: {
                    id: 0,
                    username: username,
                    password: password,
                    role: role,
                    countries: countryString,
                    modules: moduleString
                },
                success: function (response) {
                    console.log("oyisco " + response);

                    if (response=='User already exist!') {

                        toastr.error('User already exist!', 'User with this username exist.', {
                            positionClass: 'toast-top-right',
                            containerId: 'toast-top-right'
                        });

                    } else if (response=='User registered successfully!') {
                        toastr.success('Saved Successfully', 'User has been added successfully.', {
                            positionClass: 'toast-top-right',
                            containerId: 'toast-top-right'
                        });

                    }



                    setTimeout(function () {
                        window.location = "view-users";
                    }, 1000);

                }
                ,
                error: function (xhr, status) {
                    $("#addUser").removeAttr("disabled");
                    $("#addUser").html("Save");
                    console.log(xhr)
                }

            })
        }
    })

    $("#filterLanding").click(function (e) {
        var year = $("#year").val();
        var country = $("#country").val();
        $.ajax({
            type: 'GET',
            url: endPoint + "/landing-page/get-all-by-year-country?year=" + year + "&countryId=" + country,
            data: {get_param: 'value'},
            dataType: 'json',
            success: function (data) {
                $.each(data, function (index, element) {

                    var numberPartner = element.partners;
                    $('#numberPartnerDashbaord').text(numberPartner);

                    var projects = element.projects;
                    $('#numberCompletedProjectsDashbaord').text(projects);

                    var individual = element.individual;
                    $('#numberIndividualMembershipDashbaord').text(individual);  //url: "ajax.aspx?ajaxid=4&UserID=" + UserID + "&EmailAddress=" + encodeURIComponent(EmailAddress),

                    var institutional = element.institutional;
                    $('#numberInstitutionalMembershipDashbaord').text(institutional);

                    var grants = element.grants;
                    $('#numberSmallGrantsAwarededDashbaord').text(grants);

                    var scholarships = element.scholarships;
                    $('#numberEducationalScholarshipsAwarded').text(scholarships);

                    var adult = element.adult;
                    $('#numberAdultPatientsReceivingPalliativeCare').text(adult);

                    var children = element.children;
                    $('#numberChildren').text(children);

                    var facilities = element.facilities;
                    $('#numberFacilitiesSupported').text(facilities);

                    var countries = element.countries;
                    $('#numberAfricanCountrieswith').text(countries);

                    var hmis = element.hmis;
                    $('#numberCountriesincludingPCindicators').text(hmis);

                    var morphine = element.morphine;
                    $('#numberGeneralAvailabilityofImmediate').text(morphine);

                    var publications = element.publications;
                    $('#numberPublicationsinPeer').text(publications);

                    var palliative = element.palliative;
                    $('#numberPalliativeCarePhDs').text(palliative);

                    var research = element.research;
                    $('#numberNetworkMembership').text(research);

                    console.log("oyisco " + numberPartner);
                });
            }
        });


    });


    $(document).ready(function () {

        $.ajax({
            type: 'GET',
            url: endPoint + "/landing-page/sum-landing-page",
            data: {get_param: 'value'},
            dataType: 'json',
            success: function (data) {
                $.each(data, function (index, element) {

                    var numberPartner = element.partners;
                    $('#numberPartnerDashbaord').text(numberPartner);

                    var projects = element.projects;
                    $('#numberCompletedProjectsDashbaord').text(projects);

                    var individual = element.individual;
                    $('#numberIndividualMembershipDashbaord').text(individual);

                    var institutional = element.institutional;
                    $('#numberInstitutionalMembershipDashbaord').text(institutional);

                    var grants = element.grants;
                    $('#numberSmallGrantsAwarededDashbaord').text(grants);

                    var scholarships = element.scholarships;
                    $('#numberEducationalScholarshipsAwarded').text(scholarships);

                    var adult = element.adult;
                    $('#numberAdultPatientsReceivingPalliativeCare').text(adult);

                    var children = element.children;
                    $('#numberChildren').text(children);

                    var facilities = element.facilities;
                    $('#numberFacilitiesSupported').text(facilities);

                    var countries = element.countries;
                    $('#numberAfricanCountrieswith').text(countries);

                    var hmis = element.hmis;
                    $('#numberCountriesincludingPCindicators').text(hmis);

                    var morphine = element.morphine;
                    $('#numberGeneralAvailabilityofImmediate').text(morphine);

                    var publications = element.publications;
                    $('#numberPublicationsinPeer').text(publications);

                    var palliative = element.palliative;
                    $('#numberPalliativeCarePhDs').text(palliative);

                    var research = element.research;
                    $('#numberNetworkMembership').text(research);

                    console.log("oyisco " + numberPartner);
                });
            }
        });


    });


    function saveLandingPage() {
        $("#addUser1").attr("disabled", "disabled");
        $("#addUser1").html("<i class='fa fa-spinner fa-spin'></i>");
        //perform login at this point
        if ($("#addUserForm1").valid()) {
            var year = $("#year").val();
            var country = $("#country").val();

            var partners = $("#partners").val();
            //var moduleString = modules.join(",");
            var projects = $("#projects").val();
            var individual = $("#individual").val();


            var institutional = $("#institutional").val();
            var scholarships = $("#scholarships").val();
            var adult = $("#adult").val();
            var children = $("#children").val();
            var grants = $("#grants").val();
            var facilities = $("#facilities").val();

            var countries = $("#countries").val();
            var hmis = $("#hmis").val();
            var morphine = $("#morphine").val();
            var research = $("#research").val();
            var publications = $("#publications").val();
            //var moduleString = modules.join(",");
            var palliative = $("#palliative").val();
        }
        $.ajax({
            url: endPoint + "/landing-page",
            type: "POST",
            //contentType: "application/json",
            data: {
                year: year,
                country: country,
                partners: partners,
                projects: projects,
                individual: individual,
                institutional: institutional,
                scholarships: scholarships,
                adult: adult,
                children: children,
                facilities: facilities,
                countries: countries,
                grants: grants,
                hmis: hmis,
                morphine: morphine,
                research: research,
                publications: publications,
                palliative: palliative

            },
            success: function (response) {

                toastr.success('Saved Successfully', 'Landing Page has been added successfully.', {
                    positionClass: 'toast-top-right',
                    containerId: 'toast-top-right'

                });
                $("#addUser1").removeAttr("disabled");
                $("#addUser1").html("Save");
            },


            error: function (xhr, status) {
                $("#addUser1").removeAttr("disabled");
                $("#addUser1").html("Save");
                console.log(xhr)
            }


        })
    }

    $("#addUser1").click(function (e) {
        // alert("Karim and Oyisco doing coding ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
        saveLandingPage();
        // if ($("#addUserForm1").valid())
        // {
        //     $("#addUser1").attr("disabled", "disabled");
        //     $("#addUser1").html("Saving...");
        //     var year = $("#year").val();
        //     var country = $("#country").val();
        //     var hmis = $("#hmis").val();
        //     var partners = $("#partners").val();
        //     //var moduleString = modules.join(",");
        //     var projects = $("#projects").val();
        //     var individual = $("#individual").val();
        //
        //
        //     var institutional = $("#institutional").val();
        //     var scholarships = $("#scholarships").val();
        //     var adult = $("#adult").val();
        //     var children = $("#children").val();
        //     //var moduleString = modules.join(",");
        //     var facilities = $("#facilities").val();
        //
        //     var countries = $("#countries").val();
        //     var morphine = $("#morphine").val();
        //     var research = $("#research").val();
        //     var publications = $("#publications").val();
        //     //var moduleString = modules.join(",");
        //     var palliative = $("#palliative").val();
        //
        //
        //
        //     $.ajax({
        //         url: "../landing-page",
        //         type: "POST",
        //         data: {
        //             year : year,
        //             country : country,
        //             hmis : hmis,
        //             partners : partners,
        //             projects : projects,
        //             individual : individual,
        //             institutional : institutional,
        //             scholarships : scholarships,
        //             adult : adult,
        //             facilities : facilities,
        //             countries : countries,
        //             morphine : morphine,
        //             research : research,
        //             publications : publications,
        //             palliative : palliative
        //
        //         },
        //         success: function (response) {
        //
        //             toastr.success('Saved Successfully', 'Landing Page has been added successfully.', {
        //                 positionClass: 'toast-top-right',
        //                 containerId: 'toast-top-right'
        //             });
        //             setTimeout(function () {
        //                 window.location = "#";
        //             }, 1000);
        //
        //         }
        //         ,
        //         error: function (xhr, status) {
        //             $("#addUser1").removeAttr("disabled");
        //             $("#addUser1").html("Save");
        //             console.log(xhr)
        //         }
        //
        //     })
        //}
    })


    $("#editUser").click(function (e) {
        if ($("#addUserForm").valid()) {
            $("#editUser").attr("disabled", "disabled");
            $("#editUser").html("Updating...");
            var id = $("#id").val();
            var username = $("#username").val();
            var password = $("#password").val();
            var readOnly = $('input[name=readonly]:checked').val()
            var firstName = $("#firstName").val();
            var lastName = $("#lastName").val();
            var email = $("#email").val();
            var modules = $("#modules").val();
            var moduleString = modules.join(",");

            var role = $("#role").val();

            var roleId = $("#" + role + "Id").val();
            if (typeof roleId == "undefined") {
                roleId = 1;
            }

            if (typeof roleId != "object") {
                roleId = [roleId];
            }
            $.ajax({
                url: "../update-user",
                type: "GET",
                data: {
                    id: id,
                    username: username,
                    password: "",
                    role: role,
                    modules: moduleString,
                    roleIds: roleId,
                    readOnly: readOnly,
                    email: email,
                    firstName: firstName,
                    lastName: lastName
                },
                success: function (response) {
                    toastr.success('Saved Successfully', 'User has been updated successfully', {
                        positionClass: 'toast-top-right',
                        containerId: 'toast-top-right'
                    });
                    setTimeout(function () {
                        window.location = "view-users";
                    }, 1000);
                },
                error: function (xhr, status) {
                    $("#addUser").removeAttr("disabled");
                    $("#addUser").html("Save");
                    console.log(xhr)
                }

            })
        }
    })

    $("#addValidationRule").click(function (e) {
        if ($("#addValidationForm").valid()) {
            $("#addValidationRule").attr("disabled", "disabled");
            $("#addValidationRule").html("Saving...");
            var rightSide = $("#rightSide").val();
            var leftSide = $("#leftSide").val();
            var condition = $("#condition").val();
            var errorMessage = $("#errorMessage").val();

            var moduleId = $("#moduleId").val();

            $.ajax({
                url: "../save-validation-rule",
                type: "GET",
                data: {
                    moduleId: moduleId,
                    leftSide: leftSide,
                    rightSide: rightSide,
                    condition: condition,
                    errorMessage: errorMessage
                },
                success: function (response) {
                    toastr.success('Saved Successfully', 'Validation rule has been added successfully', {
                        positionClass: 'toast-top-right',
                        containerId: 'toast-top-right'
                    });
                    setTimeout(function () {
                        window.location = "view-validations";
                    }, 1000);
                },
                error: function (xhr, status) {
                    $("#addUser").removeAttr("disabled");
                    $("#addUser").html("Save");
                    console.log(xhr)
                }

            })
        }
    })


})


function saveEpmtct() {
    var registrationDate = $("#reportingPeriod").val();
    var regNo = $("#registrationNo").val();
    var surname = $("#surname").val();
    var othernames = $("#othernames").val();
    var address = $("#address").val();
    var dob = $("#dob").val();
    var lmp = $("#lmp").val();
    var gravida = $("#gravida").val();
    var parity = $("#parity").val();
    var hivTestResult = $("input[name=hivTestResult]:checked").val();
    var timeOfDiagnosis = $("#diagnosisTime").val();
    var referredForArt = $("input[name=referredForArt]:checked").val();
    var facReferredTo = $("#facReferredTo").val();
    var facReferredToOthers = "";
    var referralDate = $("#referralDate").val();
    var artStartDate = $("#artStartDate").val();
    var artInitiationTime = $("#artInitiationTime").val();
    var testedForHepatitis = $("#testedForHepatitis").val();
    var hepatitisTestResult = $("#hepatitisTestResult").val();
    var linkedForHepTreatment = $("input[name=linkedForHepTreatment]:checked").val();
    var testedForSyphilis = $("input[name=testedForSyphilis]:checked").val();
    var syphilisTestResult = $("input[name=syphilisTestResult]:checked").val();
    var treatedForSyphilis = $("input[name=treatedForSyphilis]:checked").val();
    var deliveryDate = $("#deliveryDate").val();
    var maternalOutcome = $("input[name=maternalOutcome]:checked").val();
    var childStatus = $("input[name=childStatus]:checked").val();
    var noInfants = $("#noInfants").val();
    var childReferredForVlTesting = $("input[name=childReferredForVlTesting]:checked").val();
    var firstDBSCollected = $("input[name=firstDBSCollected]:checked").val();
    var ageAtTest = $("#ageAtTest").val();
    var firstDBSDate = $("#firstDBSDate").val();
    var dateDBSResultReturned = $("#dateDBSResultReturned").val();
    var dbsResult = $("input[name=dbsResult]:checked").val();
    var hivRapidTestResultAt18months = $("input[name=hivRapidTestResultAt18months]:checked").val();
    var rapidTestResult = $("input[name=rapidTestResult]:checked").val();
    var isDobEstimated = ($("#dobEstimated").is(":checked")) ? 1 : 0;


    $.ajax({
        type: "POST",
        url: "../save-patient",
        data: {
            spokeId: spokeId,
            patientType: "epmtct",
            registrationDate: registrationDate,
            regNo: regNo,
            surname: surname,
            othernames: othernames,
            address: address,
            dob: dob,
            isDobEstimated: isDobEstimated,
            lmp: lmp,
            gravida: gravida,
            parity: parity,
            hivTestResult: hivTestResult,
            timeOfDiagnosis: timeOfDiagnosis,
            referredForArt: referredForArt,
            facReferredTo: facReferredTo,
            facReferredToOthers: facReferredToOthers,
            referralDate: referralDate,
            artStartDate: artStartDate,
            artInitiationTime: artInitiationTime,
            testedForHepatitis: testedForHepatitis,
            hepatitisTestResult: hepatitisTestResult,
            linkedForHepTreatment: linkedForHepTreatment,
            testedForSyphilis: testedForSyphilis,
            syphilisTestResult: syphilisTestResult,
            treatedForSyphilis: treatedForSyphilis,
            deliveryDate: deliveryDate,
            maternalOutcome: maternalOutcome,
            childStatus: childStatus,
            noInfants: noInfants,
            childReferredForVlTesting: childReferredForVlTesting,
            firstDBSCollected: firstDBSCollected,
            ageAtTest: ageAtTest,
            firstDBSDate: firstDBSDate,
            dateDBSResultReturned: dateDBSResultReturned,
            dbsResult: dbsResult,
            hivRapidTestResultAt18months: hivRapidTestResultAt18months,
            rapidTestResult: rapidTestResult
        },
        success: function (response) {
            console.log(response);
            if (response == "ok") {
                //show alert if we want to capture another patient or view patients
                successAction("Success", "Patient has been saved successfully!", "Register another patient", "btn-info", "new-patient", "Goto view patients", "btn-success", "view-patients")
            } else {
                showError("Error", "An error occured", 2000);
            }

        },
        error: function (xhr, status, error) {
            console.log(error);

        }
    })


}

var formData = {"data": {}};


function getPrepopulatedData(moduleId, stateId, lgaId, facilityId, spokeId, startPeriod, endPeriod) {
    $.ajax({
        url: "../get-prepopulated-data",
        type: "GET",
        data: {
            moduleId: moduleId,
            periodType: 'quarterly',
            startPeriod: startPeriod,
            endPeriod: endPeriod,
            stateId: stateId,
            lgaId: lgaId,
            facilityId: facilityId,
            spokeId: spokeId
        },
        success: function (response) {
            var data = JSON.parse(response);
            for (var i = 0; i < data.length; i++) {
                var categoryId = data[i]["categoryId"];
                var subCategoryId = (data[i]["subCategoryId"] == 0) ? "" : data[i]["subCategoryId"];
                var value = data[i]["value"];
                if (stateId > 0) {

                    $("#el" + categoryId + "_" + subCategoryId + "_total").html(value);
                }
            }
        },
        error: function (xhr, status, error) {
            console.log(xhr);
        }
    })
}

function saveDqaForm() {
    $("#saveDqa").attr("disabled", "disabled");
    $("#saveDqa").html("Saving...");

    /*var cohort = $("#quarter").val();
    var patientId = $("#patientId").val();
    var hospitalNo = $("#hospitalNo").val();
    var sex = $('input[type=radio][name=gender]').val();
    var phone = $("#phone").val();
    var consentGiven = $('input[type=radio][name=consentGiven]').val();
    var noConsentReason = $("#noConsentReason").val();
    var optForCallBack = $('input[type=radio][name=optForCallBack]').val();
    var callbackDateTime = $("#whatDateTime").val();
    var firstTimePositive = $("#firstTimePositive").val();
    var tookArvAfterPositive = $('input[type=radio][name=clientTakeArv]').val();
    var arvDuration = $("#arvDuration").val();
    var firstTreatmentFacility = $("#firstTreatmentFacility").val();
    var firstDrugPickup =  $("#firstDrugPickup").val();
    var lastDrugPickup = $("#lastDrugPickup").val();
    var lastVlDate = $("#lastViralLoadDate").val();
    var receivedTxFromAnotherFac = $('input[type=radio][name=optForCallBack]').val();
    var */
    var dataToSave = {};
    $(".fieldsToSave").each(function (index, element) {
        var elValue = $(element).val();
        var type = $(element).attr("type");
        var elName = $(element).attr("name");
        if (type == "radio") {
            elValue = $('input[name="' + elName + '"]:checked').val();
        }
        if (type == "checkbox") {
            var valueArrays = [];

            $("input:checkbox[name=" + elName + "]:checked").each(function () {
                valueArrays.push($(this).val());
            });
            elValue = valueArrays.join(",");
        }

        dataToSave[elName] = elValue;
    })
    dataToSave["stateId"] = stateId;
    dataToSave["lgaId"] = lgaId;
    dataToSave["facilityId"] = facilityId;


    $.ajax({
        url: "../save-dqa",
        type: "POST",
        data: dataToSave,
        success: function (response) {
            console.log(response);
            $("#saveDqa").removeAttr("disabled", "disabled");
            $("#saveDqa").html("Save");
            toastr.success('Saved Successfully', 'DQA has been successfully saved', {
                positionClass: 'toast-top-right',
                containerId: 'toast-top-right'
            });
            /*setTimeout(function(){
                location.reload();
            }, 2000)*/
        }, error: function (xhr, status, error) {

        }
    })
}

/*function autoSaveToGeneric()//actually, this is auto save to local
{
	
	var formData = {};
	formData["facilityId"] = facilityId;
	formData["lgaId"] = lgaId;
	formData["stateId"] = stateId;
	var patientId = $("patientId").val();
	if(fieldsDirty == true && patientId != ""){

		$(".fieldsToSave").each(function(index, element){
			
			if(typeof formData["data_"+patientId] == "undefined")
			{
				formData["data_"+patientId] = {};
			}
			
			var name = $(this).attr("id");
			var type = "select";
			var value = $(this).val();
			
			if(typeof type != "undefined")
			{
				$(this).attr("type");
			}
			
			formData["data_"+patientId] = {};
			
			formData["data"]["cat_"+categoryId]["sub_"+subCategoryId]["gender_"+gender]["disagg_"+disagg] = 
					{categoryId: categoryId, subCategoryId:subCategoryId, gender:gender, disaggr:disagg, value:$(element).val()}		
		})	

		var reportingPeriod = $("#reportingPeriod").val();
		var reportingDate = "";
		
		//if(reportingPeriod != ""){//only save to local when the reportingPeriod is selected
			
	
			//with requirements changing per second, we could have other dimensions. Classic example, vaccination post. As such, we will also be collecting key suffix to append to the end of the key
			
			var localStoreKey = 'formData_'+moduleId+"_"+stateId+"_"+lgaId+"_"+facilityId+"_"+spokeId+"_"+periodType+"_"+reportingDate;
			if(typeof keySuffix != "undefined" )
			{
				localStoreKey = localStoreKey + keySuffix;
			}
			
			window.localStorage.setItem(localStoreKey, JSON.stringify(formData));	
			
			//we don't like the message at the left bottom corner
			//toastr.info('Data has been saved to your device', 'Saved Successfully', {positionClass: 'toast-bottom-left', containerId: 'toast-bottom-left' });
			
			fieldsDirty = false;
			
			//update the most recently changed field to green
			lastField.removeClass("changing");
			lastField.addClass("saved");
			console.log("saved")
			console.log("last field saved", lastField);
		}
	//}
	/*else{
		console.log("no change yet");
	}*/


//}
function autoSaveToLocal() {

    if (fieldsDirty == true) {
        $(".entry-control").each(function (index, element) {
            var categoryId = $(element).attr("data-catId");
            var subCategoryId = $(element).attr("data-subcatId");
            var disagg = $(element).attr("data-disagg");
            var gender = $(element).attr("data-gender");


            if (typeof formData["data"]["cat_" + categoryId] == "undefined") {
                formData["data"]["cat_" + categoryId] = {};
            }

            if (typeof formData["data"]["cat_" + categoryId]["sub_" + subCategoryId] == "undefined") {
                formData["data"]["cat_" + categoryId]["sub_" + subCategoryId] = {};
            }
            if (typeof formData["data"]["cat_" + categoryId]["sub_" + subCategoryId]["gender_" + gender] == "undefined") {
                formData["data"]["cat_" + categoryId]["sub_" + subCategoryId]["gender_" + gender] = {};
            }

            formData["data"]["cat_" + categoryId]["sub_" + subCategoryId]["gender_" + gender]["disagg_" + disagg] =
                {
                    categoryId: categoryId,
                    subCategoryId: subCategoryId,
                    gender: gender,
                    disaggr: disagg,
                    value: $(element).val()
                }
        })


        var reportingPeriod = $("#reportingPeriod").val();
        var reportingDate = "";

        if (reportingPeriod != "") {//only save to local when the reportingPeriod is selected
            if (periodType == "monthly") {
                d = getLastDateFromMonth(reportingPeriod);
                reportingDate = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
            } else if (periodType == "weekly") {//reporting period is weekly

                var lastDate = getLastDateFromWeekNumber(reportingPeriod)
                reportingDate = lastDate.getFullYear() + "-" + lastDate.getMonth() + "-" + lastDate.getDate();

            } else {//daily. Use the date like that
                reportingDate = new Date(reportingPeriod);
                reportingDate = reportingDate.getFullYear() + "-" + reportingDate.getMonth() + "-" + reportingDate.getDate();
            }

            //var facilityId = 1;
            //var spokeId = 1;

            formData["facilityId"] = facilityId;
            formData["lgaId"] = lgaId;
            formData["stateId"] = stateId;
            formData["spokeId"] = spokeId;
            formData["period"] = reportingDate;
            formData["dateCreated"] = new Date().getTime();
            formData["periodType"] = periodType;


            //with requirements changing per second, we could have other dimensions. Classic example, vaccination post. As such, we will also be collecting key suffix to append to the end of the key
            var localStoreKey = 'formData_' + moduleId + "_" + stateId + "_" + lgaId + "_" + facilityId + "_" + spokeId + "_" + periodType + "_" + reportingDate;
            if (typeof keySuffix != "undefined") {
                localStoreKey = localStoreKey + keySuffix;
            }

            window.localStorage.setItem(localStoreKey, JSON.stringify(formData));


            //we don't like the message at the left bottom corner
            //toastr.info('Data has been saved to your device', 'Saved Successfully', {positionClass: 'toast-bottom-left', containerId: 'toast-bottom-left' });

            fieldsDirty = false;

            //update the most recently changed field to green
            lastField.removeClass("changing");
            lastField.addClass("saved");
            console.log("saved")
            console.log("last field saved", lastField);
        }
    } else {
        console.log("no change yet");
    }


}


function getLocalData() {

}


function populateDataToFields(data) {
    var disaggTotals = {};//this is useful for disaggregation totals
    var subTotals = {};//this is useful for disaggregation totals
    var rowTotal = 0;//this is useful for row totals
    var grandTotals = {};

    console.log("local data", data);
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var subData = data[key];

            for (subKey in subData) {

                if (subData.hasOwnProperty(subKey)) {
                    var subSubData = subData[subKey];
                    for (subSubKey in subSubData) {
                        if (subSubData.hasOwnProperty(subSubKey)) {
                            var disaggData = subSubData[subSubKey];
                            //console.log(disaggData)
                            var rowTotal = 0;//this is useful for row totals
                            for (disaggKey in disaggData) {
                                if (disaggData.hasOwnProperty(disaggKey)) {
                                    var categoryId = disaggData[disaggKey]["categoryId"];
                                    var gender = disaggData[disaggKey]["gender"];
                                    var subCategoryId = disaggData[disaggKey]["subCategoryId"];
                                    var disaggr = disaggData[disaggKey]["disaggr"];
                                    var value = disaggData[disaggKey]["value"];
                                    //console.log(disaggData[disaggKey]);
                                    if (typeof disaggTotals[disaggr] == "undefined") {
                                        disaggTotals[disaggr] = {};
                                    }
                                    if (typeof disaggTotals[disaggr]["cat_" + categoryId] == "undefined") {
                                        //disaggTotals[disaggr]["cat_"+categoryId] = 0;
                                        disaggTotals[disaggr]["cat_" + categoryId] = {};
                                    }
                                    if (typeof disaggTotals[disaggr]["cat_" + categoryId]["subcat_" + subCategoryId] == "undefined") {
                                        disaggTotals[disaggr]["cat_" + categoryId]["subcat_" + subCategoryId] = 0;
                                    }

                                    if (typeof grandTotals["cat_" + categoryId] == "undefined") {
                                        //grandTotals["cat_"+categoryId] = 0;
                                        grandTotals["cat_" + categoryId] = {};
                                        grandTotals["cat_" + categoryId]["total"] = 0;//this is useful for grandtotals without sub categories
                                    }
                                    if (typeof grandTotals["cat_" + categoryId]["subcat_" + subCategoryId] == "undefined") {
                                        //grandTotals["cat_"+categoryId] = 0;
                                        grandTotals["cat_" + categoryId]["subcat_" + subCategoryId] = 0;
                                    }


                                    grandTotals["cat_" + categoryId]["subcat_" + subCategoryId] += new Number(value)
                                    grandTotals["cat_" + categoryId]["total"] += new Number(value)


                                    $("#entry_" + categoryId + "_" + subCategoryId + "_" + disaggr + "_" + gender).val(value);
                                    rowTotal += new Number(value);

                                    disaggTotals[disaggr]["cat_" + categoryId]["subcat_" + subCategoryId] += new Number(value);

                                }
                            }

                            $("#el" + categoryId + "_" + subCategoryId + "_" + gender + "_total").html(rowTotal);
                        }
                    }


                }

            }

        }
    }

    console.log("disagg", disaggTotals);

    for (var key in disaggTotals) {
        if (disaggTotals.hasOwnProperty(key)) {
            var disagg = key;
            //var grandTotal = 0;
            for (var subKey in disaggTotals[disagg]) {
                if (disaggTotals[disagg].hasOwnProperty(subKey)) {

                    var catId = subKey.replace("cat_", "");
                    /*var categoryId = subKey.replace("cat_", "");
                    var value = disaggTotals[disagg][subKey];
                    //grandTotal += value;
                    $("#el"+categoryId+"_"+disagg+"_total").html(value);*/
                    //var subKeysComp = subKey.
                    for (var subSubKey in disaggTotals[disagg][subKey]) {
                        var subCategoryId = subSubKey.replace("subcat_", "");
                        var value = disaggTotals[disagg][subKey][subSubKey];
                        //grandTotal += value;
                        $("#el" + catId + "_" + disagg + "_" + subCategoryId + "_total").html(value);
                        $("#el" + catId + "_" + disagg + "_total").html(value);
                        console.log("#el" + catId + "_" + disagg + "_" + subCategoryId + "_total", value);
                    }

                }
            }

        }
    }


    for (var key in grandTotals) {

        if (grandTotals.hasOwnProperty(key)) {

            console.log("first place", grandTotals[key]);
            var categoryId = key.replace("cat_", "");
            //var value = grandTotals[key];
            //$("#el"+categoryId+"__total").html(value);
            for (var subKey in grandTotals[key]) {
                console.log("totals", subKey);
                if (grandTotals[key].hasOwnProperty(subKey)) {
                    if (subKey == "total") {
                        var value = grandTotals[key]["total"];
                        $("#el" + categoryId + "__total").html(value);
                        //console.log("totals", "#el"+categoryId+"__total", value)
                    } else {
                        var subCatId = subKey.replace("subcat_", "");
                        var value = grandTotals[key][subKey];
                        $("#el" + categoryId + "_" + subCatId + "_total").html(value);
                    }
                }

            }

        }
    }
}

function getRemoteData() {

    var year = $("#year").val();
    var countryId = $("#country").val();

    if (year != "" && countryId > 0) //ensure that a period has been selected before we enable data data entry
    {

        //get the remote data
        $.ajax({
            url: "../get-data",
            type: "GET",
            data: {year: year, countryId: countryId},
            success: function (response) {
                $(".entry-control").removeAttr("disabled");
                var data = JSON.parse(response);
                for (var i = 0; i < data.length; i++) {
                    var categoryData = data[i]["data"];
                    for (var key in categoryData) {
                        if (categoryData.hasOwnProperty(key)) {
                            var value = categoryData[key]["value"];
                            console.log(key, value);
                            $("#entry_" + key + "_none").val(value);
                        }
                    }
                }
            },
            error: function (error, xhr, status) {
                console.log(error)
            }


        })
    }

    //clear all the fields first
    $(".numberonly").val("");
    $(".totals").html("");


}


function saveToRemote() {

    $("#saveMonthly").attr("disabled", "disabled");
    $("#saveMonthly").html("Saving...");

    var dataToSave = {};

    //var facilityId = 1;
    var year = $("#year").val();

    var country = $("#country").val()
    $(".data-field-set").each(function (index, element) {

        var subData = {}
        var type = $(element).attr("id");
        if (!dataToSave.hasOwnProperty(type)) {
            dataToSave[type] = {};
            dataToSave[type]["data"] = {};
        }
        $(element).find(".entry-control").each(function (ind, element) {
            var categoryId = $(element).attr("data-catId");
            var subCategoryId = ($(element).attr("data-subcatId") == "") ? "" : $(element).attr("data-subcatId");

            var disagg = $(element).attr("data-disagg");
            var gender = $(element).attr("data-gender");
            var value = $(element).val();
            var key = categoryId + "_" + subCategoryId + "_" + disagg;

            if (value != "") {
                subData[key] = {
                    "categoryId": categoryId,
                    //"stateId": stateId,
                    "country": country,
                    //"gender": gender,
                    "disaggrregation": disagg,
                    "type": type,
                    "subCategoryId": subCategoryId,
                    "value": value
                }


                dataToSave[type]["type"] = type;
                dataToSave[type]["countryId"] = country
                dataToSave[type]["fyPeriodYear"] = year;

                dataToSave[type]["data"][key] = {
                    "categoryId": categoryId,
                    "country": country,
                    "disaggrregation": disagg,
                    "type": type,
                    "subCategoryId": subCategoryId,
                    "value": value
                }


                //dataToSave.push({data:subData, type:type, fyPeriodYear:year});


            }
        })


        $(element).find(".mini-textarea").each(function (ind, element) {
            var categoryId = $(element).attr("name");
            var subCategoryId = "";

            var disagg = "remarks";
            var value = $(element).val();
            var key = categoryId + "_" + subCategoryId + "_" + disagg;

            if (value != "") {
                subData[key] = {
                    "categoryId": categoryId,
                    //"stateId": stateId,
                    "country": country,
                    //"gender": gender,
                    "disaggrregation": disagg,
                    "type": type,
                    "subCategoryId": subCategoryId,
                    "value": value
                }


                dataToSave[type]["type"] = type;
                dataToSave[type]["fyPeriodYear"] = year;

                dataToSave[type]["data"][key] = {
                    "categoryId": categoryId,
                    "country": country,
                    "disaggrregation": disagg,
                    "type": type,
                    "subCategoryId": subCategoryId,
                    "value": value
                }


                //dataToSave.push({data:subData, type:type, fyPeriodYear:year});


            }
        })
    })
    $.ajax({
        url: "../save-data",
        type: "POST",
        data: {entryData: JSON.stringify(dataToSave), country: country, year: year},
        success: function (response) {
            toastr.success('Saved Successfully', 'Data has been successfully saved', {
                positionClass: 'toast-top-right',
                containerId: 'toast-top-right'
            });
            $("#saveMonthly").removeAttr("disabled");
            $("#saveMonthly").html("Save");

        },
        error: function (xhr, status) {
            $("#saveMonthly").removeAttr("disabled");
            $("#saveMonthly").html("Save");

            console.log(xhr)
        }

    })
    /*$(".entry-control").each(function(index, element){


            var categoryId = $(element).attr("data-catId");
            var subCategoryId = ($(element).attr("data-subcatId") == "") ? 0 : $(element).attr("data-subcatId");

            var disagg = $(element).attr("data-disagg");
            var gender = $(element).attr("data-gender");
            var value = $(element).val();
            var key = categoryId+"_"+subCategoryId+"_"+disagg;

            if(value != ""){
                dataToSave[key] = {
                    "categoryId": categoryId,
                    "stateId": stateId,
                    "country": country,
                    "gender": gender,
                    "disaggrregation": disagg,

                    "subCategoryId": subCategoryId,
                    "value": value

                }

            }
        })



        $.ajax({
            url:"../save-data",
            type:"POST",
            data:{entryData: JSON.stringify(dataToSave), country:country, year:year},
            success:function(response){
                toastr.success('Saved Successfully', 'Data has been successfully saved', {positionClass: 'toast-top-right', containerId: 'toast-top-right' });
                $("#saveMonthly").removeAttr("disabled");
                $("#saveMonthly").html("Save");

            },
            error:function(xhr, status){
                $("#saveMonthly").removeAttr("disabled");
                $("#saveMonthly").html("Save");

                console.log(xhr)
            }

         })*/
    // $("#saveLandPage").click(function(){
    //     saveLandingPage();
    // })

    // console.log(dataToSave);
    $("#saveLandPage").click(function (e) {
        //saveLandingPage();
        alert("I reach here");
        if ($("#landingPageForm").valid()) {
            $("#saveLandPage").attr("disabled", "disabled");
            $("#saveLandPage").html("Saving...");

            var year = $("#year").val();
            var country = $("#country").val();
            var hmis = $("#hmis").val();
            var partners = $("#partners").val();
            //var moduleString = modules.join(",");
            var projects = $("#projects").val();
            var individual = $("#individual").val();


            var institutional = $("#institutional").val();
            var scholarships = $("#scholarships").val();
            var adult = $("#adult").val();
            var children = $("#children").val();
            //var moduleString = modules.join(",");
            var facilities = $("#facilities").val();

            var countries = $("#countries").val();
            var morphine = $("#morphine").val();
            var research = $("#research").val();
            var publications = $("#publications").val();
            //var moduleString = modules.join(",");
            var palliative = $("#palliative").val();


            $.ajax({
                url: "../landing-page",
                type: "POST",
                data: {
                    id: 0,
                    year: year,
                    country: country,
                    hmis: hmis,
                    partners: partners,
                    projects: projects,
                    individual: individual,
                    institutional: institutional,
                    scholarships: scholarships,
                    adult: adult,
                    facilities: facilities,
                    countries: countries,
                    morphine: morphine,
                    research: research,
                    publications: publications,
                    palliative: palliative

                },
                success: function (response) {
                    toastr.success('Saved Successfully', 'Landing Page has been added successfully', {
                        positionClass: 'toast-top-right',
                        containerId: 'toast-top-right'
                    });
                    setTimeout(function () {
                        window.location = "#";
                    }, 1000);

                }
                ,
                error: function (xhr, status) {
                    $("#saveLandPage").removeAttr("disabled");
                    $("#saveLandPage").html("Save");
                    console.log(xhr)
                }

            })
        }
    })


}



