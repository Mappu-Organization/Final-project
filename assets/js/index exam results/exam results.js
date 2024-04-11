function saveResult() {
  var year = document.getElementById("yearInput").value.trim();
  var termName = document.getElementById("termInput").value.trim();
  var studentIdName = document.getElementById("studentIdInput").value.trim();
  var subject = document.getElementById("subjectInput").value.trim();
  var results = document.getElementById("resultsInput").value.trim();

  if (!year || !termName || !studentIdName || !subject || !results) {
    alert("Please fill in all required fields.");
    return;
  }

  var table = document
    .getElementById("examresults")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.rows.length);

  newRow.insertCell(0).innerHTML = year;
  newRow.insertCell(1).innerHTML = termName;
  newRow.insertCell(2).innerHTML = studentIdName;
  newRow.insertCell(3).innerHTML = subject;
  newRow.insertCell(4).innerHTML = results;

  document.getElementById("yearInput").value = "";
  document.getElementById("termInput").value = "";
  document.getElementById("studentIdInput").value = "";
  document.getElementById("subjectInput").value = "";
  document.getElementById("resultsInput").value = "";

  alert("Result saved successfully!");
}

function downloadResults() {
  // Placeholder for functionality to download results
  alert("Download feature not yet implemented.");
}
