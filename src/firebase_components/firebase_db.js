// var firebase = require('firebase');
import firebase from "@firebase/app";
import ResourceDataService from "../services/resource.service";

/**
 * search for search_input in each field in target_fields of each row, pass the results to the callback function
 */
function search_with_keywords(search_input, callback, target_fields = ['Title', 'Tags', 'Categorization', 'Author'], /**search options */) {
    var done = false;
    for (var i = 0; i < target_fields.length; i++) {
        target_fields[i] = target_fields[i][0].toLowerCase() + target_fields[i].substring(1);
    }
    
    search_input = search_input.toLowerCase();
    
    ///\W / filters out special characters besides space
    // replaces all non-word charachters (except space) with ''
    var keys = search_input.replace(/(?![ ])[\W]/g,'').split(' ');
    
    // var allResources = getResources();
    // console.log(allResources);
    // console.log(typeof allResources);
    let getSearchResults = (search_results) => getResources(function(allResources) {
        //console.log(allResources);
        
        //var search_results = []; // empty the results
        allResources.map(resource => {
            //console.log(resource);
            // search for the entire string
            var found = false;
            for (var i = 0; i < target_fields.length; i++) {
                //console.log(resource[target_fields[i]]);
                if (resource[target_fields[i]].toLowerCase().includes(search_input)) {
                    found = true;
                    break;
                }
            }
            // if current row has a match, found = true now
            
            // 2. search with the individual words in the search string
            if(!found) {
                // search for the string
                for (i = 0; i < target_fields.length; i++) {
                    for (var j = 0; j < keys.length; j++) {
                        var search_input_substr = keys[j];
                        //for small substrings in the search term, adding " " checks that the match is it's own word
                        if (search_input_substr.length < 3) {
                            search_input_substr = search_input_substr + " ";
                        }
                        if (resource[target_fields[i]].toLowerCase().includes(search_input_substr)) {
                            found = true;
                            break;
                        }
                    }
                }

            }
            if (found) {
                search_results.push(resource);
            }
        })
        console.log("internal search results", search_results);
        console.log("internal search results type: ", typeof search_results); 
        done = true;
    });
    // ResourceDataService.getAll()
    // .then(response => {
    //     console.log(response.data);
    //     allResources = response.data
    //     console.log(allResources);
    // })
    // .catch(e => {
    // console.log(e);
    // });


    var search_results_output = [];
    getSearchResults(search_results_output);

    
    console.log("called search_with_keywords") 
    console.log("search results", search_results_output);
    console.log("search results type: ", typeof search_results_output); 

    //if(done)
    {   
        callback(search_results_output, done);
    }   
    
}

/**
 * generate a list of strings that would be used for autocomplete, pass the results to the callback function
 */
function get_autoComplete(callback, target_fields = ['Title', 'Author', 'Tags', 'Description']) {
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

function getResources(callback) {
    ResourceDataService.getAll()
    .then(response => {
       // console.log(response.data);
        callback(response.data); 
    })
    .catch(e => {
    console.log(e);
    });
}


export { search_with_keywords, get_autoComplete, getResourceWithID, getMultipleResourceWithIDS, getSavedResourcesWithUID}