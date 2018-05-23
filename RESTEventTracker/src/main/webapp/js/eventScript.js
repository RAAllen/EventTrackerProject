window.addEventListener('load', function(e){
    init();
});

// Initialize
function init(){
    document.activityLookup.lookUpActivityById.addEventListener('click', function(event){
        event.preventDefault();
        var activityId = document.activityLookup.activityId.value;
        if(!isNaN(activityId) && activityId > 0){
            getActivity(activityId);
        }
    });

    document.showAllActivities.showAllActivities.addEventListener('click', function(event){
        event.preventDefault();
        getAllActivities();
    });

    document.getActivityForm.getCreateActivityForm.addEventListener('click', function(event){
        event.preventDefault();
        if(createActivityForm.style.display === "none"){
            createActivityForm.style.display = "block";
        }
        else{
            createActivityForm.style.display = "none";
        }
    });

    document.newActivity.sendNewActivity.addEventListener('click', sendNewActivity);

    document.formToReplaceActivity.sendReplaceActivity.addEventListener('click', sendReplaceActivity);

}

// Get One
function getActivity(activityId){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'api/activities/' + activityId, true);
    xhr.onreadystatechange = function(){
        if(this.readyState === 4){
            if(this.status === 200){
                var activityJSON = this.responseText;
                if(activityJSON !== ""){
                    var activityObject = JSON.parse(activityJSON);
                    displayActivity(activityObject);
                }
            }
            else{
                displayActivityNotFound(activityId);
            }
        }
        else{
            displayActivityNotFound(activityId);
        }
    }
    xhr.send(null);
}

// Print One
function getActivityHTML(activityObject){
    var activityDiv = document.createElement('div');
    activityDiv.textContent = "";
    var nameH2 = document.createElement('h2');
    nameH2.textContent = activityObject.name;
    activityDiv.appendChild(nameH2);
    var list = document.createElement('ul');
    for(property in activityObject){
        if(property !== "name" && property !== "category"){
            var item = document.createElement('li');
            item.textContent = property + ": " + activityObject[property];
            list.appendChild(item);
        }
    }
    activityDiv.appendChild(list);
    var deleteActivityButton = document.createElement('button');
    deleteActivityButton.innerHTML = "Delete Activity";
    deleteActivityButton.class = "btn btn-info";
    activityDiv.appendChild(deleteActivityButton);
    deleteActivityButton.addEventListener('click', function(event){
        if(confirm("Delete activity?")){
            deleteActivity(activityObject.id);
        }
    });
    var editActivityForm = document.createElement('form');
    editActivityForm.name = "editActivityForm";
    var editActivityButton = document.createElement('button');
    editActivityButton.id = "editActivityButton";
    editActivityButton.type = "submit";
    editActivityButton.innerHTML = "Edit Activity";
    editActivityButton.class = "btn btn-info";
    editActivityForm.appendChild(editActivityButton);
    editActivityButton.activityObject = activityObject;
    activityDiv.appendChild(editActivityForm);
    editActivityButton.addEventListener('click', function(event){
        event.preventDefault();
        initializeEditActivityForm(event.target.activityObject);
    });
    return activityDiv;
}

// Pass in Values To Edit
function initializeEditActivityForm(activityObject) {
    var editForm = document.formToReplaceActivity;
    editForm.activityName.value = activityObject.name;
    editForm.activityDescription.value = activityObject.description;
    editForm.activityStartTime.value = activityObject.startTime;
    editForm.activityEndTime.value = activityObject.endTime;
    editForm.style.display = 'block';
}

// Print One
function displayActivity(activityObject){
    var activityDiv = document.getElementById('displayActivity');
    activityDiv.textContent = "";
    activityDiv.appendChild(getActivityHTML(activityObject));
}

// Not Found
function displayActivityNotFound(activityId){
    var activityDiv = document.getElementById('displayActivity');
    activityDiv.textContent = "";
    activityDiv.textContent = "Activity " + activityId + " Not Found!";
}

// Get All
function getAllActivities(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'api/activities/', true);
    xhr.onreadystatechange = function(){
        if(this.readyState === 4){
            if(this.status === 200){
                var activitiesJSON = this.responseText;
                var activitiesListObject = JSON.parse(activitiesJSON);
                getAllActivitiesHTML(activitiesListObject);
            }
        }
    }
    xhr.send(null);
}

// Print All
function getAllActivitiesHTML(activitiesList){
    var activityDiv = document.getElementById('displayActivity');
    activityDiv.textContent = "";
    for (var i=0; i<activitiesList.length;i++) {
        var aDiv = getActivityHTML(activitiesList[i]);
        console.log(aDiv);
        activityDiv.appendChild(aDiv);
    }
    return activityDiv;
}

// Create
function sendNewActivity(evt){
    evt.preventDefault();
    var form = document.newActivity;
    var activity = {
        name: form.activityName.value,
        description: form.activityDescription.value,
        startTime: form.activityStartTime.value,
        endTime: form.activityEndTime.value
    };
    var activityJSON = JSON.stringify(activity);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'api/activities/', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onreadystatechange = function(){
        if(this.readyState === 4){
            if(this.status === 200 || this.status === 201){
                var newActitityJSON = this.responseText;
                var newActivity = JSON.parse(newActitityJSON);
                displayActivity(newActivity);
            }
            else{
                displayError();
            }
        }
    };
    xhr.send(activityJSON);
}

function displayError(){
    var errorDiv = document.getElementById('displayError');
    errorDiv.textContent = "An Error Occurred.";
}

// Update
function replaceActivity(event){
    evt.preventDefault();
    var form = document.formToReplaceActivity;
    var activity = {
        id: event.target.id,
        name: form.activityName.value,
        description: form.activityDescription.value,
        startTime: form.activityStartTime.value,
        endTime: form.activityEndTime.value
    };
    var activityJSON = JSON.stringify(activity);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'api/activities/', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onreadystatechange = function(){
        if(this.readyState === 4){
            if(this.status === 200 || this.status === 201){
                var newActitityJSON = this.responseText;
                var newActivity = JSON.parse(newActitityJSON);
                displayActivity(newActivity);
            }
            else{
                displayError();
            }
        }
    };
    xhr.send(activityJSON);
}

// Delete
function deleteActivity(activityObjectId){
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'api/activities/' + activityObjectId, true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                getAllActivities();
            }
        }
    }
    xhr.send(null);
}
