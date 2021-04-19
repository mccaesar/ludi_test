// var firebase = require('firebase');
import firebase from "@firebase/app";

/**
 * search for search_input in each field in target_fields of each row, pass the results to the callback function
 */
function search_with_keywords(search_input, callback, target_fields = ['Title', 'Tags', 'Categorization', 'Author'], /**search options */) {
    var search_results = []; // empty the results
    var path = "1T3kXn2m5L8FmNwC-FAzTQjh81gGuyNSUTt2uyHKSGGY/Networking Resources" // this is the path of the spreadsheet data
    var dataRef = firebase.database().ref(path);
    search_input = search_input.toLowerCase();
        ///\W / filters out special characters besides space
        // replaces all non-word charachters (except space) with ''
    var keys = search_input.replace(/(?![ ])[\W]/g,'').split(' ');
    var addedResources = new Set([]);
    dataRef.once('value')
        .then(function (dataSnapshot) {
            // 1. search with the whole string
            dataSnapshot.forEach(function (childSnapshot) {
                var data = childSnapshot.val();
                // search for the string
                var found = false;
                for (var i = 0; i < target_fields.length; i++) {
                    if (data[target_fields[i]].toLowerCase().includes(search_input)) {
                        found = true;
                        break;
                    }
                }
                // if current row has a match, push current row into search_results
                if (found) {
                    search_results.push(data);
                    addedResources.add(childSnapshot.key);
                }
            });



            // 2. search with the individual words
            dataSnapshot.forEach(function (childSnapshot) {
                if(addedResources.has(childSnapshot.key)) {
                    return;
                }
                var data = childSnapshot.val();
                // search for the string
                var found = false;
                for (var i = 0; i < target_fields.length; i++) {
                    for (var j = 0; j < keys.length; j++) {
                        var search_input_substr = keys[j];
                        //for small substrings in the search term, adding " " checks that the match is it's own word
                        if(search_input_substr.length < 3){
                            search_input_substr = search_input_substr + " ";
                        }
                        if (data[target_fields[i]].toLowerCase().includes(search_input_substr)) {
                            found = true;
                            break;
                        }
                    }
                }
                // if current row has a match, push current row into search_results
                if (found) {
                    search_results.push(data); // POSSIBLE OPTIMIZATION: only save the fields we want to display
                }
            });
            // call the function that update the cards

            /**
             * ========SORTING HERE========
             * popularity/rating (in the future)
             * date added
             * alphabetical
             * matching 
             * ============================
             */
            console.log("called search_with_keywords") 
            callback(search_results);
        });
}

/**
 * generate a list of strings that would be used for autocomplete, pass the results to the callback function
 */
function get_autoComplete(callback, target_fields = ['Title', 'Categorization']) {
    var auto_complete_strings = new Set([]);
    var path = "1T3kXn2m5L8FmNwC-FAzTQjh81gGuyNSUTt2uyHKSGGY/Networking Resources" // this is the path of the spreadsheet data
    var dataRef = firebase.database().ref(path);
    dataRef.once('value')
        .then(function (dataSnapshot) {
            dataSnapshot.forEach(function (childSnapshot) {
                var data = childSnapshot.val();
                for (var i = 0; i < target_fields.length; i++) {
                    if (data[target_fields[i]] !== '') {
                        auto_complete_strings.add(data[target_fields[i]]);
                    }
                }
            });
            console.log("called get_autoComplete")
            callback([...auto_complete_strings]);
        });

}

/**
 * extract one resource from database using its id
 */
function getResourceWithID(ID, callback) {
    var path = "1T3kXn2m5L8FmNwC-FAzTQjh81gGuyNSUTt2uyHKSGGY/Networking Resources/" + ID;
    var dataRef = firebase.database().ref(path);
    dataRef.once('value')
        .then(function (data) {
            console.log("called getResourceWithID")
            callback(data.val());
        });
}

function getMultipleResourceWithIDS(IDs, callback) {
    console.log(IDs);
    var resources = []
    var path = "1T3kXn2m5L8FmNwC-FAzTQjh81gGuyNSUTt2uyHKSGGY/Networking Resources";
    var dataRef = firebase.database().ref(path);
    dataRef.once('value')
        .then(function (dataSnapshot) {
            dataSnapshot.forEach(function(childSnapshot) {
                IDs.forEach((id)=> {
                    if(id == childSnapshot.key) {
                        resources.push(childSnapshot.val());
                    }
                })
            });
            console.log(resources);
            console.log("called getMultipleResourceWithIDS")
            callback(resources);
        });
}

function getSavedResourcesWithUID(uid, callback) {
    var firebase = require('firebase');
    var path = "users"
    var dataRef = firebase.database().ref(path);
    dataRef.once('value').then((dataSnapshot)=> {
        if (dataSnapshot.hasChild(uid + "/savedResources")) {
            let resources = dataSnapshot.child("/" + uid + "/savedResources").val();
            console.log("called getSavedResourcesWithUID")
            callback(resources);
        } else {
            callback(null);
        }
    });
}

export { search_with_keywords, get_autoComplete, getResourceWithID, getMultipleResourceWithIDS, getSavedResourcesWithUID}