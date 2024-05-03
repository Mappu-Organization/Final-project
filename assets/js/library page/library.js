$(document).ready(function () {
  $.ajax({
    url: "http://localhost:8080/api/v1/admin-bff/book",
    method: "GET",
    success: (resp) => {
      const tableBody = $("#adminlibraryTable tbody");

      resp.forEach((book) => {
        const row = $("<tr>");
        const statusClass =
          book.availability == true ? "available-btn" : "not-available-btn";
        const statusText =
          book.availability == false ? "Available" : "Not available";

        row.html(`
        <td>${book.bookId}</td>
        <td>${book.bookName}</td>
        <td>${book.bookType}</td>
        <td>${book.bookDescription}</td>
        <td style="text-align: center;">
          <button class="status-btn ${statusClass}" ${
          book.availability == true ? "disabled" : ""
        } 
            data-bs-toggle="modal" data-bs-target="#bookDetailsModal" data-student="${
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
            $("#bookDetailsModal").modal("show");
          });
        }

        tableBody.append(row);
      });
    },
  });

  loadTableBooks();
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
  function addRow(
    studentId,
    bookId,
    requestNo,
    studentName,
    className,
    bookName
  ) {
    var table = document
      .getElementById("requesttable")
      .getElementsByTagName("tbody")[0];
    var newRow = table.insertRow();

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);
    var cell6 = newRow.insertCell(5);
    var cell7 = newRow.insertCell(6);
    var cell8 = newRow.insertCell(7);

    cell1.innerHTML = studentId;
    cell2.innerHTML = bookId;
    cell3.innerHTML = requestNo;
    cell4.innerHTML = studentName;
    cell5.innerHTML = className;
    cell6.innerHTML = bookName;
    cell7.innerHTML = "Pending"; // Initial status
    cell8.innerHTML =
      "<button class='approve same_btn' onclick='approveRequestbook(this)'>Approve</button>" +
      "<button class='reject same_btn' onclick='rejectRequestbook(this)'>Reject</button>";
  }

  // Sample data to populate the table
  var requestData = [
    {
      studentId: 101,
      bookId: 10,
      requestNo: 1,
      studentName: "John Doe",
      className: "Math",
      bookName: "Algebra",
    },
    {
      studentId: 102,
      bookId: 11,
      requestNo: 2,
      studentName: "Jane Smith",
      className: "Science",
      bookName: "Physics",
    },
    {
      studentId: 104,
      bookId: 12,
      requestNo: 3,
      studentName: "Alice Johnson",
      className: "English",
      bookName: "Literature",
    },
  ];

  // Populate the table with sample data
  requestData.forEach(function (data) {
    addRow(
      data.studentId,
      data.bookId,
      data.requestNo,
      data.studentName,
      data.className,
      data.bookName
    );
  });
});

//////////////////REQUEST TABLE(download)/////////////////////

// Function to handle approving a request
function approveRequestbook(button) {
  var row = button.parentNode.parentNode;
  var statusCell = row.cells[6];
  statusCell.innerHTML = "Approved";
}

// Function to handle rejecting a request
function rejectRequestbook(button) {
  var row = button.parentNode.parentNode;
  var statusCell = row.cells[6];
  var comment = prompt("Please enter your comment for rejection:");
  if (comment !== null) {
    statusCell.innerHTML = "Rejected (" + comment + ")";
  }
}

////////////////// ADD BOOK /////////////////////
function updateTableAddBook() {
  // Get form values
  var book_name = document.getElementById("bookName").value.trim();
  var book_description = document
    .getElementById("bookDescription")
    .value.trim();
  var book_type = document.getElementById("bookType").value;

  // Check if any field is missing
  if (!book_name || !book_description || book_type === "none") {
    alert("Please fill in all required fields.");
    return false; // Stop execution and prevent form submission if any field is missing
  }

  //create formData object for send data to back end
  var formData = new FormData();
  formData.append("fileImage", $("#imagebookUploader")[0].files[0]);
  formData.append(
    "bookDto",
    JSON.stringify({
      bookName: book_name,
      bookType: book_type,
      bookDescription: book_description,
      availability: true,
    })
  );
  formData.append("filePDF", $("#formFileMd")[0].files[0]);

  // ajax call to add a book
  $.ajax({
    url: `http://localhost:8080/api/v1/admin-bff/book/add-book`,
    method: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      console.log(data);
      loadTableBooks();
    },
    error: function (req, err) {
      console.log(req);
    },
  });
}

////////////////// LOAD ALL BOOKS /////////////////////
function loadTableBooks() {
  // ajax call to get all book
  $.ajax({
    url: `http://localhost:8080/api/v1/admin-bff/book`,
    method: "GET",
    success: function (data) {
      let bookList = data;

      const tableBody = $("#bookTable tbody");

      bookList.forEach((book) => {
        const row = $("<tr>");

        row.html(`
                <td>${book.bookId}</td>
                <td>${book.bookName}</td>
                <td>${book.bookDescription}</td>
                <td>${book.bookType}</td>`);

        tableBody.append(row);
      });
    },
    error: function (req, err) {
      console.log(req);
    },
  });
}

//File uploader visible and hidden
$(document).ready(function () {
  $("#bookType").on("change", function () {
    var selectedOption = $(this).val();
    if (selectedOption === "pdf") {
      $("#fileUploader").show();
    } else {
      $("#fileUploader").hide();
    }
  });
});
