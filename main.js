var el_up = document.getElementById("GFG_UP");
	
	// https://stackoverflow.com/questions/196498/how-do-i-load-the-contents-of-a-text-file-into-a-javascript-variable
	var json = "{}";
	fetch('https://sme.3-3.info/distro.json')
	.then(response => response.text())
	.then((data) => {
		json = data
	})
	var obj = JSON.parse(json);

	// https://www.tutorialrepublic.com/javascript-tutorial/javascript-json-parsing.php
      

        function constructTable(selector) { 
		obj = JSON.parse(json);
		smelist = obj["SMEs"]

		// distributes by number of teammates		
		distributeByTeam(obj, smelist)


            // Getting the all column names 
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
	
	// Takes JSON of the distribution and 
	// SME list (to count them easier
	// returns mapping
	// SME number : Teams
	function distributeByTeam(obj, smelist){
		var teamlist = obj["CSGroups"]
		var teams = new Array();
		for (var i = 0; i < teamlist.length; i++){

			//each team with name and the number of teammates			
			var team = {
				name:teamlist[i]["name"], 
				numMembers:teamlist[i]["members"].length
			};

			//console.log(team.name);
			//console.log(team.numMembers);
			teams.push(team);
		}

		console.log(teams.length);


		//https://www.w3schools.com/js/js_array_sort.asp
		// TODO understand how to sort
		var sorted = teams.sort(function(a, b){
			return b.numMembers - a.numMembers
		});

		for (var i = 0; i < teamlist.length; i++){
			console.log(sorted[i].name);
		}
		

		
	}
          
        function Headers(smelist, selector) { 
		// console.log(smelist);
		// console.log(JSON.stringify(smelist));
		// console.log(smelist.length);

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
