
var dispatchQueue = {};
var tempQueue = [];
$(document).ready(function(){
    setupPendingRequestClickHandler();
    
    $("#filterRequests").click(function(e){
        var requestCityId = $("#requestCityId").val();
        var requestVehicleType = $("#requestVehicleType").val();
        $("#requestLoading").removeClass("hidden")
        getActiveDeliveries(200, 0, requestCityId, requestVehicleType);
        
    })
    $("#filterDispatchers").click(function(e){
        var dispatcherCityId = $("#dispatcherCityId").val();
        var dispatcherVehicleType = $("#dispatcherVehicleType").val();
        $("#dispatchLoading").removeClass("hidden");
        getFreeDispatchers(200, 0, dispatcherCityId, dispatcherVehicleType);
        
    })
    
})

function setupPendingRequestClickHandler()
{
    $(".pendingRequest").unbind("click");
    $(".pendingRequest").click(function(e){
        var requestId = $(this).attr("data-requestId");
       
        highlightRequest(requestId)
        e.preventDefault();
    })
}


function highlightRequest(requestId)
{
    //check if this is highlighted already
    if($("#request"+requestId).hasClass("pendingRequest")){

        if($("#request"+requestId).hasClass("bg-blue-grey"))
        {
            $("#request"+requestId).removeClass("bg-blue-grey bg-lighten-5 border-right-primary border-right-2");
            //remove from queue
            var indexToRemove = tempQueue.indexOf(requestId);
            if(indexToRemove > -1)
            {
                tempQueue.splice(indexToRemove, 1);
            }
            //tempQueue.push(requestId);
        }else{
            $("#request"+requestId).addClass("bg-blue-grey bg-lighten-5 border-right-primary border-right-2");
            tempQueue.push(requestId);
        }
    }
}





function addAllDeliveryToList(data)
{
    var html = "";
    for(var i=0; i<data.length; i++)
    {
        var requestDetails = data[i];
        var firstChar = requestDetails["firstName"].substr(0, 1).toUpperCase();
        var profilePic = requestDetails["profilepic"];
        var dateCreated = timeago.format(requestDetails["dateCreated"]);
        var description = (requestDetails["itemDescription"].length > 50)? requestDetails["itemDescription"]+"..." : requestDetails["itemDescription"]; 
        var pickupAddress = requestDetails["pickupAddress"];
        var deliveryAddress = requestDetails["dropoffAddress"];
        var statusText = "";
        var classText = "";
        if(requestDetails["status"] == 1)
        {
            statusText += '<span class="badge badge-danger mr-1">Pending</span>';
            classText = "pendingRequest";
        }
        else if(requestDetails["status"] == 2)
        {
            statusText += '<span class="badge badge-primary mr-1">Sent to dispatcher</span>';
        }
        else if(requestDetails["status"] == 3)
        {
            statusText += '<span class="badge badge-info mr-1">Being dispatched</span>'
        }
        var profilePicText = "";
        if(profilePic == "" || profilePic == null)
        {
            profilePicText += '<span class="media-object rounded-circle text-circle bg-info">'+firstChar+'</span>';
        }
        else{
            profilePicText += '<img class="media-object rounded-circle" src="/uploads/'+profilePic+'" alt="Profile">';
        }
        html += '<a href="#" class="media '+classText+'" data-requestId="'+requestDetails["id"]+'"  id="request'+requestDetails["id"]+'">'
        html += '<div class="media-left pr-1">'
        html += '<span class="avatar avatar-md">'
                html += profilePicText;
            html += '</span>';
        html += '</div>';
        html += '<div class="media-body w-100" >';
            html += '<h6 class="list-group-item-heading text-bold-500">'+requestDetails["firstName"]+' '+requestDetails["lastName"]+'';
                html += '<span class="float-right"><span class="font-small-2 primary">'+dateCreated+'</span></span>';
            html += '</h6>';
            html += '<p class="list-group-item-text text-truncate text-bold-600 mb-0">'+description+'</p>';
            html += '<p class="list-group-item-text mb-0">From '+pickupAddress+' to '+deliveryAddress+'<span class="float-right primary queueStatus">'+statusText+' </span></p>';
        html += '</div>'
        html += '</a>';
    }
   
    $("#requestList").html(html);
    setupPendingRequestClickHandler();

}

function addAllDispatchersToList(data)
{
    var html = "";
    console.log(data);
    for(var i=0; i<data.length; i++)
    {
        var dispatcherDetails = data[i];
        var firstChar = dispatcherDetails["firstName"].substr(0, 1).toUpperCase();
        var profilePic = dispatcherDetails["profilepic"];
        var email = dispatcherDetails["email"];
        var phone = dispatcherDetails["phone"];
        var city = dispatcherDetails["city"];
        var state = dispatcherDetails["state"];
        var dateCreated = timeago.format(dispatcherDetails["dateCreated"]);
        //var description = (requestDetails["itemDescription"].length > 50)? requestDetails["itemDescription"]+"..." : requestDetails["itemDescription"]; 
        //var pickupAddress = requestDetails["pickupAddress"];
        //var deliveryAddress = requestDetails["dropoffAddress"];
        var statusText = "";
        
            statusText += '<span class="badge badge-warning mr-1">Empty</span>';
        
        var profilePicText = "";
        if(profilePic == "" || profilePic == null)
        {
            profilePicText += '<span class="media-object rounded-circle text-circle bg-info">'+firstChar+'</span>';
        }
        else{
            profilePicText += '<img class="media-object rounded-circle" src="/uploads/'+profilePic+'" alt="Profile">';
        }
        html += '<a href="javascript:void(0);" class="media  border-bottom-1 dispatcherItem" data-userId="'+dispatcherDetails["id"]+'"  id="userId'+dispatcherDetails["id"]+'" data-toggle="popover" data-content=\'<a href="#" data-userId="'+dispatcherDetails["id"]+'" class="btn btn-info btn-sm addToQueue " style="margin-bottom:5px;">Add to queue</a><br/><a href="#" data-userId="'+dispatcherDetails["id"]+'" class="btn btn-success btn-sm dispatchQueue">Dispatch</a>\' data-original-title="<b>Action</b>" data-html="true" data-placement="bottom">';
        html += '<div class="media-left pr-1">'
        html += '<span class="avatar avatar-md">'
                html += profilePicText;
            html += '</span>';
        html += '</div>';
        html += '<div class="media-body w-100" >';
            html += '<h6 class="list-group-item-heading text-bold-500">'+dispatcherDetails["firstName"]+' '+dispatcherDetails["lastName"]+'';
                html += '<span class="float-right"><span class="font-small-2 primary">'+dateCreated+'</span></span>';
            html += '</h6>';
            html += '<p class="list-group-item-text text-truncate text-bold-100 mb-0">Phone: '+phone+'<br/>  email: '+email+'</p>';
            html += '<p class="list-group-item-text mb-0">Last location: '+city+', '+state+'<span class="float-right primary dispatcherStatus">'+statusText+' <i class="font-medium-1 ft-star blue-grey lighten-3"></i></span></p>';
        html += '</div>'
        html += '</a>';
    }
   
    $("#dispatcherList").html(html);
    setupDispatcherQueueHandler();

}

function setupDispatcherQueueHandler()
{

    $(".dispatcherItem").unbind("click");
    $(".dispatcherItem").unbind("contextMenu2");
    $(".dispatcherItem").contextMenu2({
        menuSelector: "#contextMenu2",
        menuSelected: function (invokedOn, selectedMenu) {
           
            var userId = $(selectedMenu).attr("data-userId");
            var elId = $(selectedMenu).attr("id");
            console.log(elId);
            console.log(userId);
            if(elId == "addToQueue")
            {
                addTempToQueue(userId);
                
            }else{
                
                addTempToQueue(userId);
                //check if queue is empty, then there is nothing to dispatch
                if(dispatchQueue.hasOwnProperty("userId"+userId))
                {
                    if(dispatchQueue["userId"+userId].length >0)
                    {
                        //start dispatching
                        beginDispatch(userId);

                    }
                    else{
                        toastr.warning('Warning', 'Nothing to dispatch!');
                    }
                }
                else{
                    //nothing to dispatch
                    toastr.warning('Warning', 'Nothing to dispatch!');
                }
            }
            return false;
            //var msg = "You selected the menu item '" + selectedMenu.text() +
               // "' on the value '" + invokedOn.text() + "'";
            //alert(msg);
        }
    });

    $(".dispatcherItem").click(function(e){
        var userId = $(this).attr("data-userid");
        $("#addToQueue").attr("data-userId", userId)
        $("#dispatchQueue").attr("data-userId", userId);
    })

    /*$('[data-toggle="popover"]').popover().on('shown.bs.popover', function() {
		$(".dispatchQueue").unbind("click");
        $(".addToQueue").unbind("click");
        


        /*$(".addToQueue").click(function(e){
            $('[data-toggle="popover"]').popover('hide');
            var userId = $(this).attr("data-userId");
            
            addTempToQueue(userId);
            
            e.preventDefault();
            return false;
        })*/

        /*$(".dispatchQueue").click(function(e){
            
            var userId = $(this).attr("data-userId");
            //also check if anything is highlighted and add it to queue

            addTempToQueue(userId);
            //check if queue is empty, then there is nothing to dispatch
            if(dispatchQueue.hasOwnProperty("userId"+userId))
            {
                
            }
            else{
                
            }
            //else dispatch the queue

            

            e.preventDefault();
            return false;
        })
	});*/
    
}




function addTempToQueue(userId)
{
    if(!dispatchQueue.hasOwnProperty("userId"+userId))
    {
        dispatchQueue["userId"+userId] = [];
    }
    var currQueueForDispatcher = dispatchQueue["userId"+userId];
    
    dispatchQueue["userId"+userId] = currQueueForDispatcher.concat(tempQueue);
    changeStatusTextToQueued(userId);
    tempQueue = [];
    //also clear the colors
    $(".bg-blue-grey").removeClass("bg-blue-grey bg-lighten-5 border-right-primary border-right-2");
    //console.log(dispatchQueue)
            
}

function changeStatusTextToQueued(userId)//this is the dispatcher ID (userId) whose queue they have been added to
{
    for(var i=0; i<tempQueue.length; i++)
    {
        $("#request"+tempQueue[i]).find(".queueStatus").html('<span class="badge badge-warning mr-1">Added to queue</span>');
        $("#request"+tempQueue[i]).removeClass("pendingRequest");
        $("#request"+tempQueue[i]).addClass("queuedRequest");
        $("#request"+tempQueue[i]).attr("data-dispatcherId", userId);
        $("#request"+tempQueue[i]).attr("data-toggle", "popover");
        $("#request"+tempQueue[i]).attr("data-original-title", "Action");
        $("#request"+tempQueue[i]).attr("data-placement", "bottom");
        
        
        $("#request"+tempQueue[i]).attr("data-content", '<a href="javascript:void(0);" data-dispatcherId="'+userId+'" data-requestId="'+tempQueue[i]+'" class="btn btn-warning btn-sm removeFromQueue ">Remove from queue</a>');
        $("#request"+tempQueue[i]).attr("data-html", "true");
        setQueueCountBadge(userId);
        setupPendingRequestClickHandler();
        setupRemoveFromQueue();
        
    }

}


function setupRemoveFromQueue()
{
    /*$('.queuedRequest').popover({
		title: 'Action',
		content: '<a href="javascript:void(0);" class="btn btn-sm btn-warning removeFromQueue" >Remove from queue</a>',
        trigger: 'click',
        html:true,
		placement: 'bottom'
	}).on('shown.bs.popover', function() {
        setupRemoveFromQueueHandler();
    });*/

    $(".queuedRequest").unbind("click");
    $(".queuedRequest").click(function(e){
        
        var userId = $(this).attr("data-dispatcherId");
        var requestId = $(this).attr("data-requestId");
        $("#removeFromQueue").attr("data-dispatcherId", userId);
        $("#removeFromQueue").attr("data-requestId", requestId);
        
    })

    $(".queuedRequest").contextMenu({
        menuSelector: "#contextMenu",
        menuSelected: function (invokedOn, selectedMenu) {
            var requestId = $(selectedMenu).attr("data-requestId");
            var dispatcherId = $(selectedMenu).attr("data-dispatcherid");
            console.log(dispatcherId);
            var indexToRemove = dispatchQueue["userId"+dispatcherId].indexOf(requestId);
            dispatchQueue["userId"+dispatcherId].splice(indexToRemove, 1);
            $(".queuedRequest").unbind("click");//this needs to happen here
            $("#request"+requestId).find(".queueStatus").html('<span class="badge badge-danger mr-1">Pending</span>');
            $("#request"+requestId).addClass("pendingRequest");
            $("#request"+requestId).removeClass("queuedRequest");
            $("#request"+requestId).removeAttr("data-dispatcherId");
            $("#request"+requestId).removeAttr("data-toggle");
            $("#request"+requestId).removeAttr("data-original-title");
            $("#request"+requestId).removeAttr("data-placement");
            $("#request"+requestId).removeAttr("data-content");
            $("#request"+requestId).removeAttr("data-html");
            $("#request"+requestId).popover('dispose');
            setQueueCountBadge(dispatcherId);
            setupRemoveFromQueue();
            setupPendingRequestClickHandler();

        }
    });

    /*$('.queuedRequest').popover().on('shown.bs.popover', function() {
        setupRemoveFromQueueHandler();
    });*/
    
}

function setupRemoveFromQueueHandler()
{
    $(".removeFromQueue").unbind("click");
    $(".removeFromQueue").click(function(e){
        //$('[data-toggle="popover"]').popover('hide');
        var requestId = $(this).attr("data-requestId");
        var dispatcherId = $(this).attr("data-dispatcherid");
        console.log(dispatcherId);
        var indexToRemove = dispatchQueue["userId"+dispatcherId].indexOf(requestId);
        dispatchQueue["userId"+dispatcherId].splice(indexToRemove, 1);
        $("#request"+requestId).find(".queueStatus").html('<span class="badge badge-danger mr-1">Pending</span>');
        $("#request"+requestId).addClass("pendingRequest");
        $("#request"+requestId).removeClass("queuedRequest");
        $("#request"+requestId).removeAttr("data-dispatcherId");
        $("#request"+requestId).removeAttr("data-toggle");
        $("#request"+requestId).removeAttr("data-original-title");
        $("#request"+requestId).removeAttr("data-placement");
        $("#request"+requestId).removeAttr("data-content");
        $("#request"+requestId).removeAttr("data-html");
        $("#request"+requestId).popover('dispose');
        setQueueCountBadge(dispatcherId);

    });
}



function setQueueCountBadge(userId)
{
    var totalItemsInQueueForDispatcher = dispatchQueue["userId"+userId].length;
    var items = (totalItemsInQueueForDispatcher > 1 ) ? totalItemsInQueueForDispatcher+" items" : totalItemsInQueueForDispatcher + " item";
    
    if(totalItemsInQueueForDispatcher >0)
    {
        $("#userId"+userId).find(".dispatcherStatus").html('<span class="badge badge-info mr-1">'+items+'</span>');
    }else{
        $("#userId"+userId).find(".dispatcherStatus").html('<span class="badge badge-warning mr-1">empty</span>');
    }

        
}


function updateDispatchedQueue(userId)
{
    //update the status of the dispatched requests 
    var dispatchedQueue = dispatchQueue["userId"+userId];
    $(".queuedRequest").unbind("click");
    for(var i=0; i<dispatchedQueue.length; i++)
    {
        $("#request"+dispatchedQueue[i]).find(".queueStatus").html('<span class="badge badge-secondary mr-1">Sent to dispatcher</span>');
        $("#request"+dispatchedQueue[i]).removeClass("queuedRequest");
        $("#request"+dispatchedQueue[i]).addClass("dispatchedRequest");
        
    }
    
    setupRemoveFromQueue();
    //remove them from the dispatchQueue

}



function getActiveDeliveries(limit, offset, cityId, vehicleType)
{
    $.ajax({
        url:"/delivery/get-active-deliveries",
        type:"GET",
        data:{userId:userId, cityId:cityId, vehicleType:vehicleType, limit:limit, offset:offset},
        success:function(response){

            var data = JSON.parse(response);
            if(data.status != "error")
            {
                addAllDeliveryToList(data["data"]);
                $("#requestLoading").addClass("hidden")
            }
        }
    })
}

function getFreeDispatchers(limit, offset, cityId, vehicleType)
{
    $.ajax({
        url:"/delivery/get-active-dispatchers",
        type:"GET",
        data:{userId:userId, cityId:cityId, vehicleType:vehicleType, limit:limit, offset:offset},
        success:function(response){
            var data = JSON.parse(response);
            if(data.status != "error"){
                addAllDispatchersToList(data["data"]);
                $("#dispatchLoading").addClass("hidden");
            }
            
        }
    })
}


function beginDispatch(userId)
{
    $("#requestLoading").removeClass("hidden");
    $("#dispatchLoading").removeClass("hidden");
    var queueToDispatch = dispatchQueue["userId"+userId];
    $.ajax({
        url:"/delivery/dispatch-queue",
        type:"GET",
        data:{queue:queueToDispatch, userId:userId},
        success:function(response){
            var data = JSON.parse(response);
            if(data.status == "ok")
            {
                //set the status of the items 
                updateDispatchedQueue(userId);

                getActiveDeliveries(100, 0);
                getFreeDispatchers(100,0);
                
            }
        }
    })
}

