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
		console.log("initialized " + i)
	}

	// working on addition
	for (var i = 0; i < unsorted.length; i++){

		// less important
		var mindiff = Array.min(diffcount)
		var maxdiff = Array.max(diffcount)
		var diffCo = (maxdiff - mindiff) / mindiff
		// more important
		var minrate = Array.min(ratecount)
		var maxrate = Array.max(ratecount)
		var rateCo = (maxrate - minrate) / minrate
		console.log("^^^")

		if (diffCo >= rateCo) {
		console.log ("if")
		//adding by DIFF to the SME that has the lower total diff
			for (var j = 0; j < smelist.length; j++){
			
				if (diffcount[j] == mindiff){
				
					// adding to resulting array
					sorted[j].push(unsorted[i]["name"]);
					var pushedName = unsorted[i]["name"]
				
					// finding the skill
					var skill = ""
					for (var k = 0; k < skills["people"].length; k++){
						console.log(skills)
						console.log("pushed " + pushedName + " ** " + skills["people"][k]["name"])
						if (pushedName.localeCompare(skills["people"][k]["name"]) == 0){
							skill = skills["people"][k]["skill"]
							break;
						}						
					}
				
					diffcount[j] += parseInt(skills["diff-coeffs"][skill])
					ratecount[j] += parseInt(skills["rate-coeffs"][skill])
					console.log("pushing by skill to SME #" + j + " user " + unsorted[i]["name"] + " diff " + parseInt(skills["diff-coeffs"][skill]) + " skill " + skill + " total " + diffcount[j])
					break;
				}	
			}
		} else {
			console.log ("else")
			//adding by RATE to the SME that has the lower total rate
			for (var j = 0; j < smelist.length; j++){
				console.log ("ratecount " + ratecount[j])
				console.log ("minrate " + minrate)
				if (ratecount[j] == minrate){
				
					// adding to resulting array
					sorted[j].push(unsorted[i]["name"]);
					var pushedName = unsorted[i]["name"]
				
					// finding the skill
					var skill = ""
					for (var k = 0; k < skills["people"].length; k++){
						console.log("pushed " + pushedName + " ** " + skills["people"][k]["name"])
						if (pushedName.localeCompare(skills["people"][k]["name"]) == 0){
							skill = skills["people"][k]["skill"]
							break;
						}						
					}
					
					console.log(skill)
					console.log(">>> " + skills["rate-coeffs"][skill])
					diffcount[j] += parseInt(skills["diff-coeffs"][skill])
					ratecount[j] += parseInt(skills["rate-coeffs"][skill])
					console.log("pushing by rate to SME #" + j + " user " + unsorted[i]["name"] + " diff " + parseInt(skills["rate-coeffs"][skill]) + " skill " + skill + " total " + ratecount[j])
					break;
				}	
			}


		}
	}

	console.log("diff")
	for (var i = 0; i < 3; i++){
		console.log(diffcount[i])
	}
	console.log("rate")
	for (var i = 0; i < 3; i++){
		console.log(ratecount[i])
	}
	return sorted;
}


//https://stackoverflow.com/questions/8934877/obtain-smallest-value-from-array-in-javascript
// returns smallest value in array
Array.min = function( array ){
    return Math.min.apply( Math, array );
};
Array.max = function( array ){
    return Math.max.apply( Math, array );
};



