// button action pass to ajax call

$(document).ready(function(){
  $('#addExamResults').click(function () {

    var yearInput = $("#yearInput").val();
    var termInput = $("#termInput").val();
    var studentIdInput = $("#studentIdInput").val();
    var subject = $("#subjectInput").val();
    var resultsInput = $("#resultsInput").val();
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
        response.forEach((examresult) => {
          let row = `
                      <tr>
                          <td>${examresult.year}</td>
                          <td>${examresult.term}</td>
                          <td>${examresult.registerStudent.studentRegId}</td>
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

$(document).ready(function () {
  
  $.ajax({
    url: "http://localhost:8080/api/v1/admin-bff/examresult",
    method: "GET",
    contentType: "application/json",
    success: function (response) {
      $("#examresults tbody").empty();
      response.forEach((examresult) => {
        let row = `
                    <tr>
                        <td>${examresult.year}</td>
                        <td>${examresult.term}</td>
                        <td>${examresult.registerStudent.studentRegId}</td>
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