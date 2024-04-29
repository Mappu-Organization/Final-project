$(document).ready(function () {

    console.log('request js loaded');
    // Handle the Reject button click to show modal
    $(document).on("click", ".btn-reject", function () {
        // Clear the textarea inside the modal when the Reject button is clicked
        $("#commentText").val("");
    });

    // Handle comment submission
    $("#submitComment").click(function () {
        var comment = $("#commentText").val();
        console.log(comment); // For demonstration: print comment to console, replace with your logic
        $("#commentModal").modal("hide");
    });

    // Event listener for the "View" buttons
    $(document).on("click", ".viewButton", function () {
        var row = $(this).closest("tr");
        var requestId = row.find("td:first").text();
        var requestType = row.find("td:eq(1)").text();
        var studentId = row.find("td:eq(2)").text();
        var description = row.find("td:eq(3)").text();

        alert(
            "Request ID: " +
            requestId +
            "\nRequest Type: " +
            requestType +
            "\nStudent ID: " +
            studentId +
            "\nDescription: " +
            description
        );
    });

    


//display the timetable 
$.ajax({
    url: `http://localhost:8080/api/v1/admin-bff/request/notification`,
    method: "GET",
    success: function(data) {
  
      let requestList = data;

      var tableBody = $("#requestTableBody");

      requestList.forEach(function (item) {
      var row = `
          <tr>
              <td>${item.requestId}</td>
              <td>${item.date}</td>
              <td>${item.requestType}</td>
              <td>${item.userDto.userId}</td>
              <td>${item.description}</td>
              <td class="view_btn">
                  <button class="approve same_btn">Approve</button>
                  <button class="reject btn-reject same_btn" data-toggle="modal" data-target="#commentModal">Reject</button>
              </td>
          </tr>
      `;
      tableBody.append(row);
  });
    },
    error: function(req, err) {
      console.log(req);
    }
  });
});