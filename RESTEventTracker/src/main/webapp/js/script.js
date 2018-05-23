window.addEventListener('load', function(e){
    init();
});

// INITIALIZE REQUIRED INITIAL ONCLICKS
function init(){

    document.showAllActivities.showAllActivities.addEventListener('click', function(event){
        event.preventDefault();
        getAllActivities();
    });

    document.activityLookup.lookUpActivityById.addEventListener('click', function(event){
        event.preventDefault();
        var activityId = document.activityLookup.activityId.value;
        if(!isNaN(activityId) && activityId > 0){
            getActivity(activityId);
        }
    });

    document.getActivityForm.getCreateActivityForm.addEventListener('click', createActivityForm);

}

// SHOW ALL ACTIVITIES
function activityIndex(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'api/activities/', true);
    xhr.onreadystatechange = function(){
        if(this.readyState === 4){
            if(this.status === 200){
                var activitiesJSON = this.responseText;
                var activitiesListObject = JSON.parse(activitiesJSON);
                var activityDiv = document.getElementById('displayActivity');
                activityDiv.textContent = "";
                for (var i = 0; i < activitiesListObject.length; i++) {
                    displayActivity(activityDiv, activitiesListObject[i]);
                }
            }
        }
    }
    xhr.send(null);
}

// GET SINGLE ACTIVITY
function getActivityById(id){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'api/activities/' + activityId, true);
    xhr.onreadystatechange = function(){
        if(this.readyState === 4){
            if(this.status === 200){
                var activityJSON = this.responseText;
                if(activityJSON !== ""){
                    var activityObject = JSON.parse(activityJSON);
                    var activityDiv = displayActivity(activityObject);
                    appendButtons(activityDiv);
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

// PRINT SINGLE ACTIVITY TO SCREEN
function displayActivity(activityDiv, activityObject){
    var nameH2 = document.createElement('h2');
    nameH2.textContent = object.name;
    activityDiv.appendChild(nameH2);
    var list = document.createElement('ul');
    for(property in object){
        if(property !== "name" && property !== "category"){
            var item = document.createElement('li');
            item.textContent = property + ": " + object[property];
            list.appendChild(item);
        }
    }
    activityDiv.appendChild(list);
    return activityDiv;
}

// PRINT ACTIVITY NOT FOUND
function displayActivityNotFound(activityId){
    var errorDiv = document.getElementById('displayError');
    errorDiv.textContent = "";
    errorDiv.textContent = "Activity " + activityId + " Not Found!";
}

// PRINT AN ERROR TO SCREEN
function displayError(){
    var errorDiv = document.getElementById('displayError');
    errorDiv.textContent = "";
    errorDiv.textContent = "An Error Occurred.";
}

// APPEND BUTTONS TO ACTIVITY DISPLAY
function appendButtons(htmlLocation){
    var deleteActivityButton = document.createElement('button');
    deleteActivityButton.innerHTML = "Delete Activity";
    activityDiv.appendChild(deleteActivityButton);
    deleteActivityButton.addEventListener('click', function(event){
        if(confirm("Delete activity?")){
            console.log(activityObject.id);
            deleteActivity(activityObject.id);
        }
    });
    var editActivityForm = document.createElement('form');
    editActivityForm.name = "editActivityForm";
    var editActivityButton = document.createElement('button');
    editActivityButton.id = "editActivityButton";
    editActivityButton.type = "submit";
    editActivityButton.innerHTML = "Edit Activity";
    editActivityForm.appendChild(editActivityButton);
    activityDiv.appendChild(editActivityForm);
    editActivityButton.addEventListener('click', initializeEditActivityForm);
}

// MAKE FORM TO CREATE ACTIVITIY
function createActivityForm(){
    var formDiv = document.getElementById('displayForm');
    var form = document.createElement('form');
    form.id = "createActivityForm";
    form.name = "newActivity";
    var h2 = document.createElement('h2');
    h2.textContent = "Create an Activity";
    form.appendChild(h2);
    var label = document.createElement('label');
    label.name = "activityName";
    label.innerHTML = "Enter an activity name: ";
    form.appendChild(label);
    var input = document.createElement('input');
    input.name = "activityName";
    input.type = 'text';
    input.placeholder = 'Activity Name';
    form.appendChild(input);
    label.name = "activityDescription";
    label.innerHTML = "Enter an activity description: ";
    form.appendChild(label);
    input.name = "activityDescription";
    input.placeholder = 'Activity Description';
    form.appendChild(input);
    label.name = "activityStartTime";
    label.innerHTML = "Enter when the activity began: ";
    form.appendChild(label);
    input.name = "activityStartTime";
    input.type = "datetime-local";
    form.appendChild(input);
    label.name = "activityEndTime";
    label.innerHTML = "Enter when the activity ended: ";
    form.appendChild(label);
    input.name = "activityEndTime";
    form.appendChild(input);
    var button = document.createElement('button');
    button.type = "submit";
    button.id = "sendNewActivity";
    button.innerHTML = "Create Activity";
    form.appendChild(button);
    button.addEventListener('click', sendNewActivity);
    formDiv.appendChild(form);
    return formDiv;
}

// PREPOPULATE THE EDIT FORM WITH CURRENT OBJECTS VALUES
function initializeEditActivityForm(activityObject){
    var createCreateActivityForm = createActivityForm();
    var editForm = document.formToReplaceActivity;
    editForm.activityName.value = activityObject.name;
    editForm.activityDescription.value = activityObject.description;
    editForm.activityStartTime.value = activityObject.startTime;
    editForm.activityEndTime.value = activityObject.endTime;
    editForm.style.display = 'block';
    editForm.id = "editActivityForm";
}

// SEND NEW ACTIVITY TO DATABASE
function sendNewActivity(event){
    evt.preventDefault();
    var form = document.newActivity;
    console.log(form.value);
    var activity = {
        name: form.activityName.value,
        description: form.activityDescription.value,
        startTime: form.activityStartTime.value,
        endTime: form.activityEndTime.value,
    };
    var activityJSON = JSON.stringify(activity);
    console.log(activity);
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

// SEND DELETE ACTIVITY TO DATABASE
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
