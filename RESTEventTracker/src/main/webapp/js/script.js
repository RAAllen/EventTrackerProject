window.addEventListener('load', function(e){
    console.log("document loaded");
    activity();
});

function activity(){
    document.activityLookup.lookUpActivityById.addEventListener('click', function(event){
        event.preventDefault();
        var activityId = document.activityLookup.activityId.value;
        console.log(activityId);
        if(!isNaN(activityId) && activityId > 0){
            getActivity(activityId);
        }
    });
}

function getActivity(activityId){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'api/activities/' + activityId, true);
    xhr.onreadystatechange = function(){
        if(this.readyState === 4){
            if(this.status === 200){
                var activityJson = this.responseText;
                var activityObject = JSON.parse(activityJson);
                displayActivity(activityObject);
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
        else if (property !== "category") {
            // need to make getcategory
            // var subList = document.createElement('ul');
            // for (var variable in object) {
            //     if (object.hasOwnProperty(variable)) {
            //         var subItem = document.createElement('li');
            //         subItem.textContent = object[variable];
            //         subList.appendChild(subItem);
            //     }
            // }
            // list.appendChild(subList);
        }
    }
    activityDiv.appendChild(list);
}

function displayActivityNotFound(activityId){
    var activityDiv = document.getElementById('displayActivity');
    activityDiv.textContent = "Activity " + activityId + " Not Found!";
}
