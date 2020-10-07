//Load Json File and define nested jsons as variables
d3.json("./samples.json").then(function(data)  {
  var metadata = data.metadata;
  var samples = data.samples;



firstMeta(samples.slice(0,1));

//BarChart with 1st Menu Entry
barChart(samples.slice(0,1));

//BubbleChart with 1st Menu Entry
blowingBubbles(samples.slice(0,1));

//extraction into variables and adding to html list
function firstMeta(sample) {
  var id = metadata[0].id;
  var ethnicity = metadata[0].ethnicity;
  var gender = metadata[0].gender;
  var age = metadata[0].age;
  var location = metadata[0].location;
  var list = d3.select("#sample-metadata");
// List Generator with metadata extracted
  list.html("");
  list.html(`id: ${id}, ethnicity: ${ethnicity}, Gender: ${gender}, Age: ${age}, Location: ${location}`);
}


//Set bar chart top 10's and convert OTU's to sctings
function barChart(sample) {
  var otu_ids = samples[0].otu_ids.slice(0,10).reverse();
  var sample_values = samples[0].sample_values.slice(0,10).reverse();
  var labels = samples[0].otu_labels.slice(0,10).reverse();
  var otu_string = otu_ids.map(x => "OTU" + x.toString());

//Bar chart traces, binding and layout
  var trace1 = {
    x: sample_values,
    y: otu_string,
    text: labels,
    name: "Top 10 datapoints",
    type: "bar",
    orientation: "h"
  };
  var bind = [trace1];
  var layout = {
    title: "Top 10 OTUs"
  };

//Plot bar chart
  Plotly.newPlot("bar", bind, layout);
};


//Render bubble chart traces, binding and layout
function blowingBubbles(sample) {
    var otu_ids2 = samples[0].otu_ids;
    var sample_values2 = samples[0].sample_values;
    var labelsb = samples[0].otu_labels;

    var traceb = {
      x: otu_ids2,
      y: sample_values2,
      text: labelsb,
      mode: "markers",
      marker: {
          size: sample_values2,

        }
      }

    var bind2 = [traceb];

    var layout2 = {
      xaxis: {title: "OTU Number ID"}
    };

    Plotly.newPlot("bubble", bind2, layout2);
};
// Create a dropdown with the name id numbers
function dropDownMenu(x) {

  x.forEach(id => {
    var option = d3.select("#selDataset").append("option");
    option.text(id);

  });
}
//Call ID Function for dropdown Menu
dropDownMenu(samples.map(x => x.id));

//new data into firstmeta
function newMeta(x) {
  var id = x.id;
  var ethnicity = x.ethnicity;
  var gender = x.gender;
  var age = x.age;
  var location = x.location;
}

//New data into Barchart from ID Name selection in Dropdown
function newBarChart(selected) {
    var otu_ids = selected[0].otu_ids.slice(0,10).reverse();
    var sample_values = selected[0].sample_values.slice(0,10).reverse();
    var labels = selected[0].otu_labels.slice(0,10).reverse();
    var otu_string = otu_ids.map(x => "OTU" + x.toString());
    var updatedTrace = {
      x: [sample_values],
      y: [otu_string],
      text: [labels]
      };
    Plotly.restyle("bar", updatedTrace);
  };

//New data into Bubbles from ID Name selection in Dropdown
function newBubbleChart(selected) {
    var otu_ids2 = selected[0].otu_ids;
    var sample_values2 = selected[0].sample_values;
    var labels2 = selected[0].otu_labels;

    var newTrace = {
      x: [otu_ids2],
      y: [sample_values2],
      text: [labels2],
      marker: {
        size: sample_values2,
        }
      };
      Plotly.restyle("bubble", newTrace);
  };

  //Refresh on selection from dropdown Menu
d3.selectAll("#selDataset").on("change", changeOption);

function changeOption() {

    var dropdownMenu = d3.select("#selDataset");
    var menuID = dropdownMenu.property("value");
    var selection = samples.filter(row => row.id === menuID);

//CAll functions to update as listeners change
    newBarChart(selection);
    newBubbleChart(selection);
    newMeta(selection);
  };
});
