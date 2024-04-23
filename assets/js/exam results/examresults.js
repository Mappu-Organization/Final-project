// button action pass to ajax call
$("#addExamResults").click(function(){
  //method includes the ajax method
  saveResult();
  });

function saveResult() {
  var year = document.getElementById("yearInput").value.trim();
  var termName = document.getElementById("termInput").value.trim();
  var studentIdName = document.getElementById("studentIdInput").value.trim();
  var subject = document.getElementById("subjectInput").value.trim();
  var results = document.getElementById("resultsInput").value.trim();

  if (!year || !termName || !studentIdName || !subject || !results) {
    alert("Please fill in all required fields.");
    return;

     // upsupported media type error occurs 
  //create formData object for send data to back end
  }let examresults = {
    year: yearInput,
    term: termInput,
    studentId: studentIdInput,
    subjectId : subject,
    results: resultsInput
  }

    // Log the bulkuser object to the console for debugging
    console.log("exam results item:", examresults);

    // AJAX call to add the student record
    $.ajax({
      url: "http://localhost:8080/api/v1/admin-bff/examresult/save",
      method: "POST",
      data: examresults,
      processData: false,
      contentType: false,
      success: function (data) {
        console.log("Response from Server:", data);
        alert("You have submitted successfully");
        //loadTableBooks(); // Assuming this function loads or updates the table
      },
      error: function (req, err) {
        console.log("Error:", req, err);
      }
    });
  alert("You have submitted successfully");

  // Clear the form fields after saving
  document.getElementById("yearInput").value = "";
  document.getElementById("termInput").value = "";
  document.getElementById("studentIdInput").value = "";
  document.getElementById("subjectInput").value = "";
  document.getElementById("resultsInput").value = "";

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


function downloadResults() {
  // Placeholder for functionality to download results
  alert("Download feature not yet implemented.");
}

$("#addRecordBtn").click(function(){
  addTimeTableItem();
})

//display the timetable 
$.ajax({
  url: `http://localhost:8080/api/v1/admin-bff/examresult`,
  method: "GET",
  success: function(data) {

    let examresultList = data;

    const tableBody = $("#timetable_body tbody");

    examresultList.forEach((addresultsd) => {
      const row = $("<tr>");

      row.html(`
          <td>${addresultsd.yearInput}</td>
          <td>${addresultsd.termInput}</td>
          <td>${addresultsd.studentIdInput}</td>
          <td>${addresultsd.subjectInput}</td>
          <td>${addresultsd.resultsInput}</td>`);

          tableBody.append(row);

      });

  },
  error: function(req, err) {
    console.log(req);
  }
});

