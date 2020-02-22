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
	// sorted contains actual commands	
	//var sorted = distribute(unsorted, smelist)
	var sorted = []
	sorted[0] = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]
	sorted[1] = ["1","2","3","4","5","6","7","8","9","10","11","12"]
	sorted[2] = ["1","2","3","4","5","6","7","8"]
	console.log(sorted.length)

	// creating SME row
	for (var i = 0; i < smelist.length; i++){
		$(selector).append(smelist[i]["name"]); 

		for (var j = 0; j < sorted[i].length; j++){
			$(selector).append(sorted[i][j]);
			$(selector).append(" ");	
		}
		$(selector).append("<br>");
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
	// teams are sorted from biggest to smallest
	// by return b.numMembers - a.numMembers

	var skills
	/*var sorted = teams.sort(function(a, b){
		
		return b.numMembers - a.numMembers
	});
	teams = sorted;*/
}
