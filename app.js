// const fileId = '1X5P4j2ozUwJJQWiFhkvJT16_mX0LtmeQ'; // Replace with your file ID
// const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
// https://drive.google.com/file/d/1X5P4j2ozUwJJQWiFhkvJT16_mX0LtmeQ/view?usp=sharing

const url = 'data/dictionary.csv';

// load the csv file to a variable

let csvData = [];


// Fetch CSV file from URL and parse it
fetch(url)
  .then(response => response.text())
  .then(data => {
    const rows = data.split('\n');
    rows.forEach(row => {
      csvData.push(row.split(';'));
    });
    dictionary_loaded();
  });
function dictionary_loaded() {
  console.log("Dictionary data loaded successfully!");
  console.log(csvData);
}

function cleanup() {
    document.getElementById('result-word').innerText = "";
    document.getElementById('result-definition').innerText = "";
    document.getElementById('result-extra-info').innerText = "";
    document.getElementById('result-image').src = "";
    document.getElementById('result-card').hidden = true;
}

function searchWord() {
  const word = document.getElementById('search-word').value;
  if (word == "") {
    console.log("No word entered!");
    cleanup();
    return;
  }
  for (let i = 0; i < csvData.length; i++) {
    if (csvData[i][0].toLowerCase().includes(word.toLowerCase())) {
      console.log("Found word: " + csvData[i][0]);
      document.getElementById('result-word').innerText = csvData[i][0];
      document.getElementById('result-definition').innerText = csvData[i][1];
      document.getElementById('result-extra-info').innerText = csvData[i][2];
      document.getElementById('result-image').src = csvData[i][3];
      document.getElementById('result-card').hidden = false;
      break;
    }
  }
}
