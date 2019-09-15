// from data.js
var tableData = data;

// YOUR CODE HERE!
console.log(tableData[0].datetime);

var tableBody = d3.select("tbody")



function build_table(varList)
{
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

build_table(tableData);

function HandleClick()
{
    var date = d3.select("#datetime").property("value");
    var filteredData = tableData; 

    filteredData = filteredData.filter(row => row.datetime === date)
    build_table(filteredData);

}

d3.selectAll("#filter-btn").on("click", HandleClick);
