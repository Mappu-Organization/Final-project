$(document).ready(function () {

    console.log('request js loaded');

    getAllUserNotificationRequest();

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


    $.ajax({
      url: "http://localhost:8080/api/v1/admin-bff/request/book",
      method: "GET",
      success: function (data) {
        let requestList = data;

        $("#requesttable tbody").empty();
        requestList.forEach(function (item) {
            let btnApprove = ``
          var row = `
                <tr>
                    <td>${item.registerStudent.registerStuId}</td>
                    <td>${item.book.bookId}</td>
                    <td>${item.requestBookId}</td>
                    <td>${item.registerStudent.fullName}</td>
                    <td>${item.registerStudent.className}</td>
                    <td>${item.book.bookName}</td>
                    <td>${item.requestStatus}</td>
                    <td class="view_btn">
                        <button onclick="updateStatus(this,'a')" data-x='${item.requestBookId}' class="approve same_btn">Approve</button>
                        <button onclick="updateStatus(this,'r')" data-x='${item.requestBookId}' class="reject btn-reject same_btn">Reject</button>
                    </td>
                </tr>
            `;
            $("#requesttable tbody").append(row);
        });
      },
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
                <td>${item.userDto.fullName}</td>
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

function addNotification() {
    var request_type = document.getElementById("requestType").value;
    var request_date = document.getElementById("date").value;
    var request_description = document.getElementById("description").value;
    var userId = $("#userId").text();
  
    let notificationRequestDto = {
      userDto:{
        userId:userId
      },
      requestType:request_type,
      date:request_date,
      description:request_description
    }
  
    console.log(notificationRequestDto);

    // AJAX call to add the student record
    $.ajax({
      url: "http://localhost:8080/api/v1/admin-bff/request/notification/save",
      method: "POST",
      data: JSON.stringify(notificationRequestDto),
      contentType: 'application/json',
      success: function(data) {
          console.log("Response from Server:", data);
          getAllUserNotificationRequest();
      },
      error: function(req, err) {
          console.log("Error:", req, err);
      }
    });
}

function getAllUserNotificationRequest() {

    var userId = $("#userId").text();

    //display the timetable 
    $.ajax({
        url: `http://localhost:8080/api/v1/admin-bff/request/notification/${userId}`,
        method: "GET",
        success: function(data) {
    
        let notiRequestList = data;

        var tableBody = $("#notificationTableBody");

        tableBody.empty();

        notiRequestList.forEach(function (item) {
        var row = `
            <tr>
                <td>${item.requestId}</td>
                <td>${item.requestType}</td>
                <td>${item.date}</td>
                <td>${item.description}</td>
                <td>${item.approvedStatus}</td>
            </tr>
        `;
        tableBody.append(row);
    });
        },
        error: function(req, err) {
        console.log(req);
        }
    });
    
}