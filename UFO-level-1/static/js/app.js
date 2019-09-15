// Define functions 

function build_table(varList)
{// Build table to show (i.e load data)
    tableBody.html("");
    
    varList.forEach(element => {
        var row = tableBody.append("tr");

        // Loop through each field in the object and add
        // each value as a table cell (td)
        Object.values(element).forEach((val) => {
        var cell = row.append("td");
          cell.text(val);
        }
      );
    });

}

function HandleClick()
{ // Define the filter actions
    var date = d3.select("#datetime").property("value");
    var filteredData = tableData; 

    filteredData = filteredData.filter(row => row.datetime === date)
    
    // Check if the filtered table has data
    // If no data, send a warning and reset the page
    if (filteredData.length == 0 ){
      alert("Date not found!\nEnter a new date between 1/1/2010 and 1/13/2010");
      document.getElementById("datetime").value="1/1/2010";
      build_table(tableData);
    }
    // else show the filtered data
    else {
      build_table(filteredData);
    }
    

}


////////////////////
// Main
// from data.js
// Assign table data in tableData
var tableData = data;

// Select table area using d3
var tableBody = d3.select("tbody")


build_table(tableData);
d3.selectAll("#filter-btn").on("click", HandleClick);
