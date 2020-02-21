var el_up = document.getElementById("GFG_UP");

// https://stackoverflow.com/questions/196498/how-do-i-load-the-contents-of-a-text-file-into-a-javascript-variable
var unsortedRaw = "{}";
fetch('https://sme.3-3.info/distro.json')
.then(response => response.text())
.then((data) => {
	unsortedRaw = data
})

var skillsRaw = "{}";
fetch('https://sme.3-3.info/skills.json')
.then(response => response.text())
.then((data) => {
	skillsRaw = data
})

var unsorted = JSON.parse(unsortedRaw);
var skills = JSON.parse(skillsRaw);

// https://www.tutorialrepublic.com/javascript-tutorial/javascript-json-parsing.php


function constructTable(selector) { 
	unsorted = JSON.parse(unsortedRaw);
	smelist = unsorted["SMEs"]

	// distributes the current people on the shift		
	distribute(unsorted, smelist)


    // Constructing header of the table actually
    var cols = Headers(smelist, selector);   

    // Traversing the JSON data 
    for (var i = 0; i < smelist.length; i++) { 
        var row = $('<tr/>');    
        for (var colIndex = 0; colIndex < cols.length; colIndex++) 
        { 
            var val = smelist[i][cols[colIndex]]; 
              
            // If there is any key, which is matching 
            // with the column name 
            if (val == null) val = "";   
                row.append($('<td/>').html(val)); 
        } 
          
        // Adding each row to the table 
        $(selector).append(row); 
    } 
} 

// Takes JSON of the unsorted distribution and 
// SME list (to count them easier)
// returns an array that can be easily distributed among SMEs
function distribute(unsorted, smelist){
	var teamlist = unsorted["CSGroups"]
	var teams = new Array();
	for (var i = 0; i < teamlist.length; i++){

		//each team with name and the number of teammates			
		var team = {
			name:teamlist[i]["name"], 
			numMembers:teamlist[i]["members"].length
		};
		teams.push(team);
	}

	//https://www.w3schools.com/js/js_array_sort.asp
	// TODO understand how to sort
	var sorted = teams.sort(function(a, b){
		return b.numMembers - a.numMembers
	});
	teams = sorted;
}
  
// creates header of the table
function Headers(smelist, selector) { 
    var columns = []; 
    var header = $('<tr/>'); 
      
    for (var i = 0; i < smelist.length; i++) { 
        var row = JSON.stringify(smelist[i]); 
	// console.log(row);
	row = JSON.parse(row)
	header.append ($('<th/>').html(row["name"]));
    } 
      
    // Appending the header to the table 
    $(selector).append(header); 
        return columns; 
}
