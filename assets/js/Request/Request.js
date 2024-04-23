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
            <td>${addrequest.requestId}</td>
            <td>${addrequest.requestType}</td>
            <td>${addrequest.studentId}</td>
            <td>${addrequest.description}</td>`);
  
            tableBody.append(row);
  
        });
  
    },
    error: function(req, err) {
      console.log(req);
    }
  });