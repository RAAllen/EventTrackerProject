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

    // document.getActivityForm.getCreateActivityForm.addEventListener('click', function(event){
    //     event.preventDefault();
    //     getCategoryOptions(event);
    // });

    // document.newActivity.save.addEventListener('click', sendNewActivity);
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
    }
    xhr.send(null);
}

function displayActivity(activityObject){
    // target and clear out activity div
    var activityDiv = document.getElementById('displayActivity');
    activityDiv.textContent = "";
    // dynamically create content to display the activity
    var nameH2 = document.createElement('h2');
    nameH2.textContent = activityObject.name;
    activityDiv.appendChild(nameH2);
    var list = document.createElement('ul');
    // grab the object properties and dynamically create the rest of the content
    for(property in activityObject){

        if(property !== "name" && property !== "category"){
            var item = document.createElement('li');
            item.textContent = property + ": " + activityObject[property];
            list.appendChild(item);
        }
        // else if (property === "category") {
            // need to make getcategoryforactivity method in order to implement this
            // var subList = document.createElement('ul');
            // for (var variable in object) {
            //     if (object.hasOwnProperty(variable)) {
            //         var subItem = document.createElement('li');
            //         subItem.textContent = object[variable];
            //         subList.appendChild(subItem);
            //     }
            // }
            // list.appendChild(subList);
        // }
    }
    activityDiv.appendChild(list);
}

function displayActivityNotFound(activityId){
    var activityDiv = document.getElementById('displayActivity');
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
                var activityDiv = document.getElementById('displayActivity');
                activityDiv.textContent = "";
                for (var i = 0; i < activitiesListObject.length; i++) {
                    displayAllActivities(activityDiv, activitiesListObject[i]);
                }
            }
        }
    }
    xhr.send(null);
}

function displayAllActivities(location, object){
    // dynamically create content to display the activity
    var nameH2 = document.createElement('h2');
    nameH2.textContent = object.name;
    location.appendChild(nameH2);
    var list = document.createElement('ul');
    // grab the object properties and dynamically create the rest of the content
    for(property in object){
        if(property !== "name" && property !== "category"){
            var item = document.createElement('li');
            item.textContent = property + ": " + object[property];
            list.appendChild(item);
        }
        // else if (property === "category") {
            // need to make getcategoryforactivity method in order to implement this
            // var subList = document.createElement('ul');
            // for (var variable in object) {
            //     if (object.hasOwnProperty(variable)) {
            //         var subItem = document.createElement('li');
            //         subItem.textContent = object[variable];
            //         subList.appendChild(subItem);
            //     }
            // }
            // list.appendChild(subList);
        // }
    }
    location.appendChild(list);
}

function getCategoryOptions(event){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'api/categories/', true);
    xhr.onreadystatechange = function(){
        if(this.readyState === 4){
            if(this.status === 200){
                var categoryJson = this.responseText;
                var categoryList = JSON.parse(categoryJson);
                createCategoryOptions(categoryList);
                console.log(categoryList);
            }
        }
        else{
            console.log("categories not found");
        }
    }
    xhr.send(null);
}

// function createCategoryOptions(categoryList){
//     var select = document.getElementById('categorySelectList');
//     for (var i = 0; i < categoryList.length; i++) {
//         var option = document.createElement('option');
//         option.textContent = "label=" + '"' + categoryList[i].name + '"' + "value=" + '"' + categoryList[i].id + '"';
//         select.appendChild(option);
//     }
// }

// function sendNewActivity(evt){
//     evt.preventDefault();
// }

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
    // target and clear out category div, then dynamically create content
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
