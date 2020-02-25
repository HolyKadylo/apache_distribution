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
	unsorted = JSON.parse(unsortedRaw)
	smelist = unsorted["SMEs"]

	var sorted = distribute (unsorted["CSs"], smelist)

	// distributes the current people on the shift	
	// sorted contains actual commands	
	//var sorted = distribute(unsorted, smelist)
	//var sorted = []
	//sorted[0] = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]
	//sorted[1] = ["1","2","3","4","5","6","7","8","9","10","11","12"]
	//sorted[2] = ["1","2","3","4","5","6","7","8"]
	//console.log(sorted.length)

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
	skills = JSON.parse(skillsRaw);
	var diffcount = []
	var ratecount = []	
	var sorted = []

	// initializing
	for (var i = 0; i < smelist.length; i++){
		sorted[i] = [" ", ": "]
		diffcount[i] = 0
		ratecount[i] = 0
	}

	// working on addition
	for (var i = 0; i < unsorted.length; i++){
			
		//adding by difficulty to the SME that has the lower total diff
		var mindiff = Array.min(diffcount)
		var minrate = Array.min(ratecount)
		for (var j = 0; j < smelist.length; j++){
			
			if (diffcount[j] == mindiff){
				
				// adding to resulting array
				sorted[j].push(unsorted[i]["name"]);
				var pushedName = unsorted[i]["name"]
				
				// finding the skill
				var skill = ""
				for (var k = 0; k < unsorted.length; k++){
					if (pushedName.localeCompare(skills["people"][k]["name"]) == 0){
						skill = skills["people"][k]["skill"]
					}						
				}
				
				diffcount[j] += parseInt(skills["diff-coeffs"][skill])
				ratecount[j] += parseInt(skills["rate-coeffs"][skill])
				break;
			}	
		}
	}
	return sorted;
}


//https://stackoverflow.com/questions/8934877/obtain-smallest-value-from-array-in-javascript
// returns smallest value in array
Array.min = function( array ){
    return Math.min.apply( Math, array );
};



