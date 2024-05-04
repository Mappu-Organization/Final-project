


// function saveResult() {
//   var year = document.getElementById("yearInput").value.trim();
//   var termName = document.getElementById("termInput").value.trim();
//   var studentIdName = document.getElementById("studentIdInput").value.trim();
//   var subject = document.getElementById("subjectInput").value.trim();
//   var results = document.getElementById("resultsInput").value.trim();

//   if (!year || !termName || !studentIdName || !subject || !results) {
//     alert("Please fill in all required fields.");
//     return;
//   }

//   // Prepare data object to send via AJAX POST request
//   var resultData = {
//     results: results,
//     termName: termName,
//     year: year,
//     studentIdName: studentIdName,
//     subject: subject,
    
// };

// // AJAX POST request to save exam result
// $.ajax({
//     url: `http://localhost:8080/api/v1/admin-bff/examresults/save`, // Add exam results endpoint
//     method: "POST",
//     data:resultData, // Convert object to JSON string
//     processData: false,
//     contentType: false,
//       success: function(data) {
//         console.log(data);
//     },
//     error: function(xhr, status, error) {
//         console.error("Error saving result:", error);
//         alert("Failed to save result. Please try again.");
//     }
// });
// alert("Result saved successfully!");
// }

function loadTableAttendance(){

  $("#examresults tbody").empty();

  // ajax call to get all papers
  $.ajax({
    url: `http://localhost:8080/api/v1/admin-bff/examresults`,
    method: "GET",
    success: function(data) {

      let examResultsDataSet = data;

      const tableBody = $("#examresults tbody");

      examResultsDataSet.forEach((results) => {
        const row = $("<tr>");

        row.html(`
            <td>${results.yearInput}</td>
            <td>${results.termInput}</td>
            <td>${results.studentIdInput}</td>
            <td>${results.subjectInput}</td>
            <td>${results.resultsInput}</td>`);

            tableBody.append(row);

        });

    },
    error: function(req, err) {
      console.log(req);
    }
});
}

function downloadResults() {
  // Placeholder for functionality to download results
  alert("Download feature not yet implemented.");
}


