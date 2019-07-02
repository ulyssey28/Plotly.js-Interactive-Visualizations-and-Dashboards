function buildMetadata(sample) {
  console.log(sample)

  d3.json(`/metadata/${sample}`).then(function(data) {

    console.log(data)
    console.log('ha]t asdasd ')
  
      var panel = d3.select('#sample-metadata')
      panel.html("")
  
    Object.entries(data).forEach(([key, value]) => {
      console.log(`Key: ${key} and Value ${value}`);
  
      var metalist = panel.append("ul")
      metalist.append('li').text(`${key} : ${value}`)
  });
  
      })


}

function buildCharts(sample) {

    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).


// ################################################################################################
// Bubble Plot
//#################################################################################################
    d3.json(`/samples/${sample}`).then(function(data) {

      var trace1 = {
  x: data.otu_ids,
  y: data.sample_values,
  mode: 'markers',
  text: data.otu_labels,
  type: "scatter",
  marker: {
    color: data.otu_ids.map(d => `rgb(${d * 9}, ${d/ 5}, ${d / 100})`),
    size: data.sample_values
  }
};

var data1 = [trace1];

var layout = {
  title: 'OTU ID vs Sample Value',
  xaxis: { title: "OTU ID" },
  yaxis: { title: "Sample Value" }
};

// var LINE = document.getElementById('line')

Plotly.newPlot('bubble', data1, layout);

// ################################################################################################
// Pie Chart
//#################################################################################################

console.log(data.sample_values.slice(0, 10))
console.log(data.otu_labels.slice(0, 10))
var trace2 = {
  labels: data.otu_ids.slice(0, 10),
  values: data.sample_values.slice(0, 10),
  type: 'pie'
};

var data2 = [trace2];

var layout = {
  title: "Pie Chart",
};

Plotly.newPlot("pie", data2, layout);




})

}






function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}


function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
