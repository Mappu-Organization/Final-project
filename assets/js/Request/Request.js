//display the timetable 
$.ajax({
    url: `http://localhost:8080/api/v1/admin-bff/request`,
    method: "GET",
    success: function(data) {
  
      let requestList = data;
  
      const tableBody = $("#requestTableBody tbody");
  
      requestList.forEach((addrequest) => {
        const row = $("<tr>");
  
        row.html(`
            <td>${addrequest.yearInput}</td>
            <td>${addrequest.termInput}</td>
            <td>${addrequest.studentIdInput}</td>
            <td>${addrequest.subjectInput}</td>
            <td>${addrequest.resultsInput}</td>`);
  
            tableBody.append(row);
  
        });
  
    },
    error: function(req, err) {
      console.log(req);
    }
  });