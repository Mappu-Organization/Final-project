$(document).ready(function () {
  // Dummy data for the table
  const dummyData = [
    {
      bookId: 1,
      bookName: "paper A",
      bookType: "Fiction",
      description: "Lorem ipsum",
      status: "Available",
    },
    {
      bookId: 2,
      bookName: "paper B",
      bookType: "Non-Fiction",
      description: "Dolor sit amet",
      status: "Not available",
      studentName: "John Doe",
      borrowedDate: "2024-01-29",
      returnDate: "2024-02-10",
    },
    // Add more dummy data as needed
  ];

  // Function to dynamically add rows to the table
  function populateTable() {
    const tableBody = $("#choutpaperTable tbody");

    dummyData.forEach((book) => {
      const row = $("<tr>");
      const statusClass =
        book.status === "Available" ? "available-btn" : "not-available-btn";
      const statusText =
        book.status === "Available" ? "Available" : "Not available";

      row.html(`
        <td>${book.bookId}</td>
        <td>${book.bookName}</td>
        <td>${book.bookType}</td>
        <td>${book.description}</td>
        <td style="text-align: center;">
          <button class="status-btn ${statusClass}" ${
        book.status === "Available" ? "disabled" : ""
      } 
            data-bs-toggle="modal" data-bs-target="#courceDetailsModal" data-student="${
              book.studentName
            }"
            data-borrowed="${book.borrowedDate}" data-return="${
        book.returnDate
      }">
            ${statusText}
          </button>
        </td>
      `);

      // Add click event listener for "Not available" button
      if (book.status === "Not available") {
        row.find(".status-btn").on("click", function () {
          const studentName = $(this).data("student");
          const borrowedDate = $(this).data("borrowed");
          const returnDate = $(this).data("return");

          // Update modal content with book details
          $("#studentName").text(`Student Name: ${studentName}`);
          $("#borrowedDate").text(`Borrowed Date: ${borrowedDate}`);
          $("#returnDate").text(`Return Date: ${returnDate}`);

          // Show the modal
          $("#courceDetailsModal").modal("show");
        });
      }

      tableBody.append(row);
    });
  }

  // Call the function to populate the table with dummy data
  populateTable();

  loadTablePapers();
});

/////STUDENT REGISTRATION ////////////////
function registerStudent() {
  // Display a confirmation message (you can customize this)

  var successMessage = document.getElementById("successMessage");
  successMessage.style.display = "block";

  // Automatically hide the success message after 3000ms (3 seconds)
  setTimeout(function () {
    successMessage.style.display = "none";
  }, 3000);
}

////////// STUDENT REJECT ///////////////

function rejectStudent() {
  // Show the reject popup
  document.getElementById("rejectPopup").style.display = "block";
}

function submitRejection() {
  // Add logic to handle the rejection submission
  var reason = document.getElementById("reason").value;
  alert("Student rejected for the following reason:\n" + reason);
  console.log(reason);

  // Hide the reject popup after submission
  document.getElementById("rejectPopup").style.display = "none";
}

////////////////REQUEST TABLE ///////////////////////
$(document).ready(function () {
  // Function to add a row to the table with buttons for approving and rejecting
  function addRow(requestNo, studentName, className, paperName) {
    var table = document
      .getElementById("corerequesttable")
      .getElementsByTagName("tbody")[0];
    var newRow = table.insertRow();

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);

    cell1.innerHTML = requestNo;
    cell2.innerHTML = studentName;
    cell3.innerHTML = className;
    cell4.innerHTML = paperName;
    cell5.innerHTML = "Pending"; // Initial status
    cell6.innerHTML =
      "<button class='approve same_btn' onclick='approveRequest(this)'>Approve</button>" +
      "<button class='reject same_btn' onclick='rejectRequest(this)'>Reject</button>";
  }

  // Sample data to populate the table
  var requestData = [
    {
      requestNo: 1,
      studentName: "John Doe",
      className: "Math",
      paperName: "Algebra",
    },
    {
      requestNo: 2,
      studentName: "Jane Smith",
      className: "Science",
      paperName: "Physics",
    },
    {
      requestNo: 3,
      studentName: "Alice Johnson",
      className: "English",
      paperName: "Literature",
    },
  ];

  // Populate the table with sample data
  requestData.forEach(function (data) {
    addRow(data.requestNo, data.studentName, data.className, data.paperName);
  });
});

////////////////// ADD PAPER /////////////////////

function updatePaperTable() {
  // Get form values
  // var paperId = document.getElementById("paperId").value.trim();
  var paper_name = document.getElementById("paperName").value.trim();
  var paper_description = document
    .getElementById("paperDescription")
    .value.trim();
  var paper_type = document.getElementById("paperType").value;

  // Check if any field is missing
  if (!paper_name || !paper_description || paper_type === "none") {
    alert("Please fill in all required fields.");
    return false; // Stop execution and prevent form submission if any field is missing
  }

  //create formData object for send data to back end
  var formData = new FormData();
  formData.append('fileImage', $('#imageUploaderPaper')[0].files[0]);
  formData.append('paperDto', JSON.stringify({
      "paperName": paper_name,
      "paperType": paper_type,
      "paperDescription": paper_description,
      "availability": true
  }));
  formData.append('filePDF', $('#formFileMdPaper')[0].files[0]);

  // ajax call to add a paper
  $.ajax({
      url: `http://localhost:8080/api/v1/admin-bff/papers/add`,
      method: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function(data) {
        console.log(data);
        loadTablePapers();
      },
      error: function(req, err) {
        console.log(req);
      }
  });

}

////////////////// LOAD ALL PAPERS /////////////////////
function loadTablePapers() {

  $("#paperTable tbody").empty();
  
  // ajax call to get all papers
  $.ajax({
      url: `http://localhost:8080/api/v1/admin-bff/papers`,
      method: "GET",
      success: function(data) {

        let paperList = data;

        const tableBody = $("#paperTable tbody");

        paperList.forEach((papers) => {
          const row = $("<tr>");

          row.html(`
              <td>${papers.paperId}</td>
              <td>${papers.paperName}</td>
              <td>${papers.paperDescription}</td>
              <td>${papers.paperType}</td>`);

              tableBody.append(row);

          });

      },
      error: function(req, err) {
        console.log(req);
      }
  });
}

//Paper File uploader visible and hidden
$(document).ready(function () {
    $("#paperType").on("change", function () {
        var selectedOption = $(this).val();
        if (selectedOption === "pdf") {
            $("#fileUploader1").show();
        } else {
            $("#fileUploader1").hide();
        }
    });
});