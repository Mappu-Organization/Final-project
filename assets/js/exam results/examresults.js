// button action pass to ajax call

$(document).ready(function(){
  $('#addExamResults').click(function () {

    var yearInput = $("yearInput").val();
    var termInput = $("termInput").val();
    var studentIdInput = $("studentIdInput").val();
    var subject = $("subjectInput").val();
    var resultsInput = $("resultsInput").val();
  
    let examresults = {
      year: yearInput,
      term: termInput,
      studentRegId: studentIdInput,
      subject: subject,
      result: resultsInput,
    };
  
    // AJAX call to add the student record
    $.ajax({
      url: "http://localhost:8080/api/v1/admin-bff/examresult/save",
      method: "POST",
      data: JSON.stringify(examresults),
      contentType: "application/json",
      success: function (response) {
        $("#examresults tbody").empty();
        console.log(response)
        response.forEach((examresult) => {
          let row = `
                      <tr>
                          <td>${examresult.year}</td>
                          <td>${examresult.term}</td>
                          <td>${examresult.registerStudent.registerStuId}</td>
                          <td>${examresult.subject}</td>
                          <td>${examresult.result}</td>
                      </tr>
                  `;
          $("#examresults tbody").append(row);
        });
      },
      error: function (req, err) {
        console.log("Error:", req, err);
      },
    });
  
    // Clear the form fields after saving
    document.getElementById("yearInput").value = "";
    document.getElementById("termInput").value = "";
    document.getElementById("studentIdInput").value = "";
    document.getElementById("subjectInput").value = "";
    document.getElementById("resultsInput").value = "";
  })
})

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

$(document).ready(function () {
  
  $.ajax({
    url: "http://localhost:8080/api/v1/admin-bff/examresult",
    method: "GET",
    contentType: "application/json",
    success: function (data) {
      $("#examresults tbody").empty();
      response.forEach((examresult) => {
        let row = `
                    <tr>
                        <td>${examresult.year}</td>
                        <td>${examresult.term}</td>
                        <td>${examresult.registerStudent.registerStuId}</td>
                        <td>${examresult.subject}</td>
                        <td>${examresult.result}</td>
                    </tr>
                `;
        $("#examresults tbody").append(row);
      });
    },
    error: function (req, err) {
      console.log("Error:", req, err);
    },
  });

})