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
  
  // Get filter value. Store in InFilter array
    InFilterVal = getFilterValue();
    FilterItem = getElementID();

    // Initialize the filter table with the original table
    var filteredData = tableData; 

    for (var i =0; i< InFilterVal.length; i++){
      if (InFilterVal[i] !== ""){
        filteredData = filterTable(filteredData, FilterItem[i], InFilterVal[i]);
      }
    }

    // Check if the filtered table has data
    // If no data, send a warning and reset the page
    if (filteredData.length == 0 ){
      alert("No data found.\nPlease check your input.");

      // reset input field
      document.getElementById("datetime").value="1/1/2010";
      document.getElementById("city").value="benton";
      document.getElementById("state").value="ar";
      document.getElementById("country").value="us";
      document.getElementById("shape").value="circle";
      build_table(tableData);
    }
    // else show the filtered data
    else {
      build_table(filteredData);
    }
}

// Get all ID for filter"form-control" (i.e get filter id)
function getElementID(){

  var formControlID = [] // output: array of ID
  var formControl = document.getElementsByClassName("form-control")

  for (i=0; i< formControl.length; i++){
    formControlID.push(formControl[i].id);  
  }
  return(formControlID);
}

function getFilterValue(){
  var filterItem = [];
  formID = getElementID();

  for (var i = 0; i<formID.length; i++ )
  {
    //filterItem.push("#"+formID[i].value);
    var id = "#"+formID[i];
    var val = d3.select(id).property("value");
    filterItem.push(val);
  }

  return filterItem;
}

function filterTable(table, filterKey, FilterValue){

  FilterValue =  FilterValue.toLowerCase();

  console.log(filterKey, FilterValue);
  if (filterKey == "datetime"){
    filteredTable = table.filter(row => row.datetime === FilterValue);
  }

  if (filterKey == "city"){
    filteredTable = table.filter(row => row.city === FilterValue);
  }
  
  if (filterKey == "state"){
    filteredTable = table.filter(row => row.state === FilterValue);
  }

  if (filterKey == "country"){
    filteredTable = table.filter(row => row.country === FilterValue);
  }

  if (filterKey == "shape"){
    filteredTable = table.filter(row => row.shape === FilterValue);
  }


  return filteredTable;
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

