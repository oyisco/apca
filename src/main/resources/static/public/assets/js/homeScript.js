var spokeId = 0;
var spokeText = "";
$(document).ready(function(){
	if(document.getElementsByClassName("select2").length > 0)
	{
		$(".select2").select2();
	}
	
   $("#login").click(function(){
        processLogin();
   })
   
   $("#changePasswordBtn").click(function(){
		changePassword();
	})
   
});

function processLogin()
{
    $("#login").attr("disabled", "disabled");
    $("#login").html("<i class='fa fa-spinner fa-spin'></i>");
    //perform login at this point
    var username = $("#username").val().trim();
    var password = $("#password").val().trim();
    $.ajax({
		url:endPoint+"/authenticate",
		type:"POST",
		contentType: "application/json",
		data:JSON.stringify({username:username, password:password}),
		success:function(response){

			//$("#loginSuccess").removeClass("hidden");
            $("#loginError").addClass("hidden");
			userId = response.userId;
			username = response.username;
			token = response.jwttoken
			readOnly = response.readOnly
			firstTime = response.firstTime;
			window.localStorage.setItem('userId', userId);
			window.localStorage.setItem('username', username);	
			window.localStorage.setItem('token', token);
			window.localStorage.setItem("firstTime", firstTime);
			window.localStorage.setItem("readOnly", readOnly);
			saveSession(username, token, userId, firstTime, readOnly);
		},
		error:function(xhr, status){
			console.log("login failed", xhr)
			 $("#loginError").removeClass("hidden");
            $("#loginSuccess").addClass("hidden");
            $("#login").removeAttr("disabled");
            $("#login").html("<i class='ft-unlock'></i> Login");
    
		}
		
	})

    /*setTimeout(function(){
        if(username != "" && password != "")
        {
            $("#loginSuccess").removeClass("hidden");
            $("#loginError").addClass("hidden");
        }
        else{
            $("#loginError").removeClass("hidden");
            $("#loginSuccess").addClass("hidden");
            $("#login").removeAttr("disabled");
        }
        window.location = "user/welcome";
    }, 2000);*/
}


function getStates()
{
    //perform login at this point
   const promise = new Promise(function(resolve, reject){
    $.ajax({
		url:"../get-states",
		data:{},
		type:"GET",
		success:function(response){

			
			var data = JSON.parse(response);
			resolve(data);
		},
		error:function(xhr, status){
			reject(xhr);
		}
		
	})
	});
	return promise;
	

 
}

function getLgas(stateId)
{
	console.log(stateId);
    //perform login at this point
   const promise = new Promise(function(resolve, reject){
    $.ajax({
		url:"../get-lgas",
		data:{},
		type:"GET",
		success:function(response){

			
			var data = JSON.parse(response);
			var lgas = data["lgas"];
			var lgaForState = [];
			for(var i=0; i<lgas.length; i++)
			{
				if(lgas[i]["stateCode"] == stateId)
				{
					lgaForState.push(lgas[i]);
				}
			}
			
			resolve(lgaForState);
		},
		error:function(xhr, status){
			reject(xhr);
		}
		
	})
	});
	return promise;
	

 
}

function getFacilities(lgaCode)
{
	console.log(lgaCode);
    //perform login at this point
   const promise = new Promise(function(resolve, reject){
    $.ajax({
		url:"../get-facilities",
		data:{},
		type:"GET",
		success:function(response){
			console.log(response);
			
			var data = JSON.parse(response);
			var facilities = data["facility"];
			var facilitiesForLGAs = [];
			for(var i=0; i<facilities.length; i++)
			{
				if(facilities[i]["lgaCode"] == lgaCode)
				{
					facilitiesForLGAs.push(facilities[i]);
				}
			}
			resolve(facilitiesForLGAs);
		},
		error:function(xhr, status){
			reject(xhr);
		}
		
	})
	});
	return promise;
	

 
}




function getSpokesForFacility(facilityId)
{
    //perform login at this point
   const promise = new Promise(function(resolve, reject){
    $.ajax({
		url:"../get-spokes-for-facility",
		data:{facilityId: facilityId},
		type:"GET",
		success:function(response){
			console.log(response);

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


function saveSession(username, token, userId, firstTime, readOnly)
{
	console.log(token);
	$.ajax({
		url:"save-session",
		type:"GET",
		data:{username:username, token:token, userId: userId, firstTime:firstTime, readOnly:readOnly},
		success:function(response){

			window.location = "user/welcome";
			
		},
		error:function(xhr, status, error){
			console.log(error)			
		}
		
	})
}


function saveUser()
{
	var userId = window.localStorage.getItem('userId');	
	var token = window.localStorage.getItem('token');
	$.ajax({
		url:"save-session",
		type:"POST",
		data:JSON.stringify({userId:userId, token: token}),
		success:function(response){
			console.log(response);
			//toastr.success('Success!', 'User has been successfully created', {positionClass: 'toast-top-right', containerId: 'toast-top-right' });
		},
		error:function(xhr, status, error){
			toastr.error('Error!', 'An error occured. Please try again', {positionClass: 'toast-top-right', containerId: 'toast-top-right' });
			console.log(error)			
		}
		
	})
}


function changePassword()
{
	if($("#changePasswordForm").valid()){
		$("#changeError").addClass("hidden");
	
		$(this).attr("disabled", "disabled");
		$(this).html("Changing...");
		var newPassword = $("#newPassword").val();
		var oldPassword = $("#oldPassword").val();
		$.ajax({
		url:"../change-password",
		data:{newPassword:newPassword, oldPassword:oldPassword},
		type:"POST",
		success:function(response){
		
			if(response == "not-matched")
			{
				$("#changeError").removeClass("hidden");
			}
			else if(response == "changed"){
				$("#changeSuccess").removeClass("hidden");
				setTimeout(function(){
					window.location = "welcome";
				}, 1000)
			}
		},
		error:function(xhr, status){
			reject(xhr);
		}
		
	});
	}
}



