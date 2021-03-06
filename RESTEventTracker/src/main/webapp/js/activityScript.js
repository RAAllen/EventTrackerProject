window.addEventListener('load', function(e){
    init();
});

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

    document.categoryLookup.lookUpCategoryById.addEventListener('click', function(event){
        event.preventDefault();
        var categoryId = document.categoryLookup.categoryId.value;
        if(!isNaN(categoryId) && categoryId > 0){
            getCategory(categoryId);
        }
    });

    document.showAllCategories.showAllCategories.addEventListener('click', function(event){
        event.preventDefault();
        getAllCategories();
    })

    document.getActivityForm.getCreateActivityForm.addEventListener('click', function(event){
        event.preventDefault();
        if(createActivityForm.style.display === "none"){
            //  had to comment these out because they were giving me 500 errrors when trying to save the new activity
            // getCategoryOptions();
            createActivityForm.style.display = "block";
        }
        else{
            createActivityForm.style.display = "none";
        }
    });

    document.newActivity.sendNewActivity.addEventListener('click', sendNewActivity);

    document.formToReplaceActivity.sendReplaceActivity.addEventListener('click', sendReplaceActivity);

}

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

function getActivituyHTML(activityObject){
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
        //  had to comment these out because they were giving me 500 errrors when trying to save the new activity
        // else if (property === "category") {
        //     var categoryObject = activityObject[property];
        //     var item = document.createElement('li');
        //     item.textContent = property + ": " + categoryObject.name.value;
        //     list.appendChild(item);
        //     // var categoryObject = this.property.value;
        //     // var subList = document.createElement('ul');
        //     // for (property in categoryObject) {
        //     //     if (categoryObject.hasOwnProperty(property)) {
        //     //         var subItem = document.createElement('li');
        //     //         subItem.textContent = categoryObject[property];
        //     //         subList.appendChild(subItem);
        //     //     }
        //     // }
        //     // list.appendChild(subList);
        // }
    }
    activityDiv.appendChild(list);
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
    editActivityButton.activityObject = activityObject;
    activityDiv.appendChild(editActivityForm);
    editActivityButton.addEventListener('click', function(event){
        event.preventDefault();
        initializeEditActivityForm(event.target.activityObject);
    });
    return activityDiv;
}

function initializeEditActivityForm(activityObject) {
    var editForm = document.formToReplaceActivity;
    editForm.activityName.value = activityObject.name;
    editForm.activityDescription.value = activityObject.description;
    editForm.activityStartTime.value = activityObject.startTime;
    editForm.activityEndTime.value = activityObject.endTime;
    editForm.style.display = 'block';
}

function displayActivity(activityObject){
    var activityDiv = document.getElementById('displayActivity');
    activityDiv.textContent = "";
    activityDiv.appendChild(getActivituyHTML(activityObject));
    // var nameH2 = document.createElement('h2');
    // nameH2.textContent = activityObject.name;
    // activityDiv.appendChild(nameH2);
    // var list = document.createElement('ul');
    // for(property in activityObject){
    //
    //     if(property !== "name" && property !== "category"){
    //         var item = document.createElement('li');
    //         item.textContent = property + ": " + activityObject[property];
    //         list.appendChild(item);
    //     }
    //     //  had to comment these out because they were giving me 500 errrors when trying to save the new activity
    //     // else if (property === "category") {
    //     //     var categoryObject = activityObject[property];
    //     //     var item = document.createElement('li');
    //     //     item.textContent = property + ": " + categoryObject.name.value;
    //     //     list.appendChild(item);
    //     //     // var categoryObject = this.property.value;
    //     //     // var subList = document.createElement('ul');
    //     //     // for (property in categoryObject) {
    //     //     //     if (categoryObject.hasOwnProperty(property)) {
    //     //     //         var subItem = document.createElement('li');
    //     //     //         subItem.textContent = categoryObject[property];
    //     //     //         subList.appendChild(subItem);
    //     //     //     }
    //     //     // }
    //     //     // list.appendChild(subList);
    //     // }
    // }
    // activityDiv.appendChild(list);
    // var deleteActivityButton = document.createElement('button');
    // deleteActivityButton.innerHTML = "Delete Activity";
    // activityDiv.appendChild(deleteActivityButton);
    // deleteActivityButton.addEventListener('click', function(event){
    //     if(confirm("Delete activity?")){
    //         console.log(activityObject.id);
    //         deleteActivity(activityObject.id);
    //     }
    // });
    // var replaceActivityForm = document.createElement('form');
    // replaceActivityForm.name = "replaceActivityForm";
    // var replaceActivityButton = document.createElement('button');
    // replaceActivityButton.id = "replaceActivityButton";
    // replaceActivityButton.type = "submit";
    // replaceActivityButton.innerHTML = "Replace Activity";
    // replaceActivityForm.appendChild(replaceActivityButton);
    // activityDiv.appendChild(replaceActivityForm);
    // replaceActivityButton.addEventListener('click', function(event){
    //     event.preventDefault();
    //     if(formToReplaceActivity.style.display === "none"){
    //         //  had to comment these out because they were giving me 500 errrors when trying to save the new activity
    //         // getCategoryOptions();
    //         formToReplaceActivity.style.display = "block";
    //     }
    //     else{
    //         formToReplaceActivity.style.display = "none";
    //     }
    // });
    //
    // var editActivityForm = document.createElement('form');
    // editActivityForm.name = "editActivityForm";
    // var editActivityButton = document.createElement('button');
    // editActivityButton.id = "editActivityButton";
    // editActivityButton.type = "submit";
    // editActivityButton.innerHTML = "Edit Activity";
    // editActivityForm.appendChild(editActivityButton);
    // activityDiv.appendChild(editActivityForm);
    // editActivityButton.addEventListener('click', function(event){
    //     event.preventDefault();
    //     if(editActivityForm.style.display === "none"){
    //         //  had to comment these out because they were giving me 500 errrors when trying to save the new activity
    //         // getCategoryOptions();
    //         editActivityForm.style.display = "block";
    //     }
    //     else{
    //         editActivityForm.style.display = "none";
    //     }
    // });
}






function displayActivityNotFound(activityId){
    var activityDiv = document.getElementById('displayActivity');
    activityDiv.textContent = "";
    activityDiv.textContent = "Activity " + activityId + " Not Found!";
}

function getAllActivities(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'api/activities/', true);
    xhr.onreadystatechange = function(){
        if(this.readyState === 4){
            if(this.status === 200){
                var activitiesJSON = this.responseText;
                var activitiesListObject = JSON.parse(activitiesJSON);
                displayAllActivities(activitiesListObject);
            }
        }
    }
    xhr.send(null);
}

function getAllActivitiesHTML(activitiesList){
    var activitiesDiv = document.createElement('div');
    console.log(activitiesList);

    for (var i=0; i<activitiesList.length;i++) {
        var aDiv = getActivituyHTML(activitiesList[i]);
        console.log(aDiv);
        activitiesDiv.appendChild(aDiv);
    }
    return activitiesDiv;


    // var activitiesDiv = document.createElement('div');
    // var nameH2 = document.createElement('h2');
    // nameH2.textContent = object.name;
    // activityDiv.appendChild(nameH2);
    // var list = document.createElement('ul');
    // for(property in object){
    //     if(property !== "name" && property !== "category"){
    //         var item = document.createElement('li');
    //         item.textContent = property + ": " + object[property];
    //         list.appendChild(item);
    //     }
    //     //  had to comment these out because they were giving me 500 errrors when trying to save the new activity
    //     // else if (property === "category") {
    //     //     var subList = document.createElement('ul');
    //     //     for (var variable in object) {
    //     //         if (object.hasOwnProperty(variable)) {
    //     //             var subItem = document.createElement('li');
    //     //             subItem.textContent = object[variable];
    //     //             subList.appendChild(subItem);
    //     //         }
    //     //     }
    //     //     list.appendChild(subList);
    //     // }
    // }
    // activityDiv.appendChild(list);
    // var replaceActivityForm = document.createElement('form');
    // replaceActivityForm.name = "replaceActivityForm";
    // var replaceActivityButton = document.createElement('button');
    // replaceActivityButton.id = "replaceActivityButton";
    // replaceActivityButton.type = "submit";
    // replaceActivityButton.innerHTML = "Replace Activity";
    // replaceActivityForm.appendChild(replaceActivityButton);
    // activityDiv.appendChild(list);
    // activityDiv.appendChild(replaceActivityForm);
    // replaceActivityButton.addEventListener('click', function(event){
    //     event.preventDefault();
    //     if(formToReplaceActivity.style.display === "none"){
    //         //  had to comment these out because they were giving me 500 errrors when trying to save the new activity
    //         // getCategoryOptions();
    //         formToReplaceActivity.style.display = "block";
    //     }
    //     else{
    //         formToReplaceActivity.style.display = "none";
    //     }
    // });
    //
    // var editActivityForm = document.createElement('form');
    // editActivityForm.name = "editActivityForm";
    // var editActivityButton = document.createElement('button');
    // editActivityButton.id = "editActivityButton";
    // editActivityButton.type = "submit";
    // editActivityButton.innerHTML = "Edit Activity";
    // editActivityForm.appendChild(editActivityButton);
    // activityDiv.appendChild(editActivityForm);
    // editActivityButton.addEventListener('click', function(event){
    //     event.preventDefault();
    //     if(editActivityForm.style.display === "none"){
    //         // getCategoryOptions();
    //         editActivityForm.style.display = "block";
    //     }
    //     else{
    //         editActivityForm.style.display = "none";
    //     }
    // });

}

function displayAllActivities(object){
    var activitiesDiv = document.getElementById('displayActivities');
    console.log(activitiesDiv);
    activitiesDiv.textContent = '';
    activitiesDiv.appendChild(getAllActivitiesHTML(object));
    // var nameH2 = document.createElement('h2');
    // nameH2.textContent = object.name;
    // activityDiv.appendChild(nameH2);
    // var list = document.createElement('ul');
    // for(property in object){
    //     if(property !== "name" && property !== "category"){
    //         var item = document.createElement('li');
    //         item.textContent = property + ": " + object[property];
    //         list.appendChild(item);
    //     }
    //     //  had to comment these out because they were giving me 500 errrors when trying to save the new activity
    //     // else if (property === "category") {
    //     //     var subList = document.createElement('ul');
    //     //     for (var variable in object) {
    //     //         if (object.hasOwnProperty(variable)) {
    //     //             var subItem = document.createElement('li');
    //     //             subItem.textContent = object[variable];
    //     //             subList.appendChild(subItem);
    //     //         }
    //     //     }
    //     //     list.appendChild(subList);
    //     // }
    // }
    // activityDiv.appendChild(list);
    // var replaceActivityForm = document.createElement('form');
    // replaceActivityForm.name = "replaceActivityForm";
    // var replaceActivityButton = document.createElement('button');
    // replaceActivityButton.id = "replaceActivityButton";
    // replaceActivityButton.type = "submit";
    // replaceActivityButton.innerHTML = "Replace Activity";
    // replaceActivityForm.appendChild(replaceActivityButton);
    // activityDiv.appendChild(list);
    // activityDiv.appendChild(replaceActivityForm);
    // replaceActivityButton.addEventListener('click', function(event){
    //     event.preventDefault();
    //     if(formToReplaceActivity.style.display === "none"){
    //         //  had to comment these out because they were giving me 500 errrors when trying to save the new activity
    //         // getCategoryOptions();
    //         formToReplaceActivity.style.display = "block";
    //     }
    //     else{
    //         formToReplaceActivity.style.display = "none";
    //     }
    // });

    // var editActivityForm = document.createElement('form');
    // editActivityForm.name = "editActivityForm";
    // var editActivityButton = document.createElement('button');
    // editActivityButton.id = "editActivityButton";
    // editActivityButton.type = "submit";
    // editActivityButton.innerHTML = "Edit Activity";
    // editActivityForm.appendChild(editActivityButton);
    // activityDiv.appendChild(editActivityForm);
    // editActivityButton.addEventListener('click', function(event){
    //     event.preventDefault();
    //     if(editActivityForm.style.display === "none"){
    //         // getCategoryOptions();
    //         editActivityForm.style.display = "block";
    //     }
    //     else{
    //         editActivityForm.style.display = "none";
    //     }
    // });

}


//  had to comment these out because they were giving me 500 errrors when trying to save the new activity
// function getCategoryOptions(event){
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', 'api/categories/', true);
//     xhr.onreadystatechange = function(){
//         if(this.readyState === 4){
//             if(this.status === 200){
//                 var categoryJson = this.responseText;
//                 var categoryList = JSON.parse(categoryJson);
//                 createCategoryOptions(categoryList);
//                 console.log(categoryList);
//             }
//         }
//         else{
//             console.log("categories not found");
//         }
//     }
//     xhr.send(null);
// }

//  had to comment these out because they were giving me 500 errrors when trying to save the new activity
// function createCategoryOptions(categoryList){
//     var selectCategories = document.getElementById('categorySelectList');
//     for (var i = 0; i < categoryList.length; i++) {
//         var option = document.createElement('option');
//         option.value = categoryList[i].id;
//         option.name = categoryList[i].name;
//         option.textContent = categoryList[i].name;
//         selectCategories.appendChild(option);
//     }
// }

function sendNewActivity(evt){
    evt.preventDefault();
    var form = document.newActivity;
    console.log(form.value);
    //  had to comment these out because they were giving me 500 errrors when trying to save the new activity
    // var categoryId = form.categorySelectList.value;
    // var thisCategory = getCategory(categoryId);
    // var categoryToSet = {
    //     id: thisCategory.id.value,
    //     name: thisCategory.name.value,
    //     description: thisCategory.description.value
    // }
    var activity = {
        name: form.activityName.value,
        description: form.activityDescription.value,
        startTime: form.activityStartTime.value,
        endTime: form.activityEndTime.value,
        //  had to comment these out because they were giving me 500 errrors when trying to save the new activity
        // category: categoryToSet
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

function displayError(){
    var errorDiv = document.getElementById('displayError');
    errorDiv.textContent = "An Error Occurred.";
}

function replaceActivity(event){
    evt.preventDefault();
    console.log("hello");
    var form = document.formToReplaceActivity;
    //  had to comment these out because they were giving me 500 errrors when trying to save the new activity
    // var categoryId = form.categorySelectList.value;
    // var thisCategory = getCategory(categoryId);
    // var categoryToSet = {
    //     id: thisCategory.id.value,
    //     name: thisCategory.name.value,
    //     description: thisCategory.description.value
    // }
    console.log(event.target.id);
    var activity = {
        id: event.target.id,
        name: form.activityName.value,
        description: form.activityDescription.value,
        startTime: form.activityStartTime.value,
        endTime: form.activityEndTime.value,
        //  had to comment these out because they were giving me 500 errrors when trying to save the new activity
        // category: categoryToSet
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

function getCategory(categoryId){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'api/categories/' + categoryId, true);
    xhr.onreadystatechange = function(){
        if(this.readyState === 4){
            if(this.status === 200){
                var categoryJSON = this.responseText;
                if(categoryJSON !== ""){
                    var categoryObject = JSON.parse(categoryJSON);
                    displayCategory(categoryObject);
                }
            }
        }
        else{
            displayCategoryNotFound(categoryId);
        }
    }
    xhr.send(null);
}

function displayCategory(categoryObject){
    var categoryDiv = document.getElementById('displayCategory');
    categoryDiv.textContent = "";
    var nameH2 = document.createElement('h2');
    nameH2.textContent = categoryObject.name;
    categoryDiv.appendChild(nameH2);
    var descriptionBlockquote = document.createElement('blockquote');
    descriptionBlockquote.textContent = categoryObject.description;
    categoryDiv.appendChild(descriptionBlockquote);
}

function displayCategoryNotFound(categoryId){
    var categoryDiv = document.getElementById('displayCategory');
    categoryDiv.textContent = "Category " + categoryId + " Not Found!";
}

function getAllCategories(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'api/categories/', true);
    xhr.onreadystatechange = function(){
        if(this.readyState === 4){
            if(this.status === 200){
                var categoriesJSON = this.responseText;
                var categoriesListObject = JSON.parse(categoriesJSON);
                var categoriesDiv = document.getElementById('displayCategory');
                categoriesDiv.textContent = "";
                for (var i = 0; i < categoriesListObject.length; i++) {
                    displayAllCategories(categoriesDiv, categoriesListObject[i]);
                }
            }
        }
    }
    xhr.send(null);
}

function displayAllCategories(location, object){
    var nameH2 = document.createElement('h2');
    nameH2.textContent = object.name;
    location.appendChild(nameH2);
    var descriptionBlockquote = document.createElement('blockquote');
    descriptionBlockquote.textContent = object.description;
    location.appendChild(descriptionBlockquote);
}
