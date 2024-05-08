$(document).ready(function () {
  
    // Function to handle the click event of the "Download" buttons
    $(document).on("click", ".approveBook", function() {
      var location = $(this).attr("data-location");
      if (location) {
        // Open the paper location in a new tab
        window.open(location, '_blank');
      } else {
        // Handle case when location is not available
        console.log("Paper location not available");
      }
    });

    function getAllStudentBookRequest() {

      var stuId = $("#regStuId").text();
      // ajax call to get all requested Books
      $.ajax({
        url: `http://localhost:8080/api/v1/admin-bff/request/book/${stuId}`,
        method: "GET",
        success: function(data) {

          // console.log(data);
          
          let bookRequestList = data;

          const tableBody = $("#libraryTable");

          tableBody.empty();

          bookRequestList.forEach((bookRequest) => {
            const row = $("<tr>");

            row.html(`
                <td>${bookRequest.requestBookId}</td>
                <td>${bookRequest.book.bookId}</td>
                <td>${bookRequest.book.bookName}</td>
                <td>${bookRequest.book.bookType}</td>
                <td>${bookRequest.requestStatus}</td>
                <td class="view_btn">
                  <button class="approveBook same_btn" ${bookRequest.requestStatus === 'approve' ? '' : 'disabled'}
                  data-location="${bookRequest.book.bookLocationPath}">Download</button>  
                </td>`);

                tableBody.append(row);

            });

        },
        error: function(req, err) {
          console.log(req);
        }
    });
  }

  //call student book request API
  getAllStudentBookRequest();

  $.ajax({
    url: "http://localhost:8080/api/v1/admin-bff/papers",
    method: "GET",
    success: (resp) => {
      const tableBody = $("#choutpaperTable tbody");

      resp.forEach((paper) => {
        const row = $("<tr>");
        const statusClass =
          paper.availability == true ? "available-btn" : "not-available-btn";
        const statusText =
          paper.availability ==true ? "Available" : "Not available";

        row.html(`
        <td>${paper.paperId}</td>
        <td>${paper.paperName}</td>
        <td>${paper.paperType}</td>
        <td>${paper.paperDescription}</td>
        <td style="text-align: center;">
          <button class="status-btn ${statusClass}" ${
          paper.availability == true ? "disabled" : ""
        } 
            data-bs-toggle="modal" data-bs-target="#courceDetailsModal" data-student="${
              paper.studentName
            }"
            data-borrowed="${paper.borrowedDate}" data-return="${
          paper.returnDate
        }">
            ${statusText}
          </button>
        </td>
      `);

        // Add click event listener for "Not available" button
        if (paper.availability == true) {
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
    },
  });

   //ajax request get books for user side
   $.ajax({
    url:`http://localhost:8080/api/v1/admin-bff/book`,
    method:"GET",
    contentType:"application/json",
    success: (response, textStatus, jqXHR) => {
      let data = "";
      response.forEach(books => {
          data += `
              <div class="col-lg-4 col-md-6 passpaper_view filter-app">
                  <div class="card" style="width: 18rem;">
                      <img src="${books.bookImageLocation}" class="card-img-top" alt="...">
                      <div class="card-body library_description">
                          <h5 class="card-title">${books.bookName}</h5>
                          <h5 class="card-title">${books.bookType}</h5>
                          <p hidden>${books.bookId}</p>
                          <p class="card-text">${books.bookDescription}</p>
                          <a href="#" class="btn btn-primary" id="bookReqBtn">Request</a>
                      </div>
                  </div>
              </div>`;
      });
      // Append generated HTML to the container
      $(".books_co").html(data);
    },
    error: (jqXHR, textStatus, errorThrown) => {
        console.error("Error:", errorThrown);
    }
  }); 

  // Attach click event handler to the container element that exists in the DOM when the page loads
  $(".books_co").on('click', '#bookReqBtn', function(event) {
    event.preventDefault(); // Prevent default behavior of the anchor tag
    
    // console.log('btn clicked!!!');
    
    // Get the value of the first <p> element relative to the clicked button
    var bookId = $(this).closest('.card-body').find('p').first().text();
    var stuId = $("#regStuId").text();

    //ajax call to save student book request
    $.ajax({
      url:`http://localhost:8080/api/v1/admin-bff/request/book/save`,
      method:"POST",
      contentType:"application/json",
      data:JSON.stringify({
          registerStudent: {
            registerStuId: stuId
          },
          book: {
            bookId: bookId
          },
          requestStatus: "Pending"
      }),
      success: (response, textStatus, jqXHR) => {
          console.log(response);
          getAllStudentBookRequest();
      }
    });

  });

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
  $.ajax({
    url: "http://localhost:8080/api/v1/admin-bff/request/papers",
    method: "GET",
    success: function (data) {
      let requestList = data;

      $("#corerequesttable tbody").empty();
      requestList.forEach(function (item) {
        // console.log(item)
        var row = `
              <tr>
                  <td>${item.requestPaperId}</td>
                  <td>${item.registerStudentDto.fullName}</td>
                  <td>${item.registerStudentDto.className}</td>
                  <td>${item.paperDto.paperName}</td>
                  <td>${item.requestStatus}</td>
                  <td class="view_btn">
                      <button onclick="updatePaperStatus(this,'a')" data-x='${item.requestPaperId}' class="approve same_btn">Approve</button>
                      <button onclick="updatePaperStatus(this,'r')" data-x='${item.requestPaperId}' class="reject btn-reject same_btn">Reject</button>
                  </td>
              </tr>
          `;
          $("#corerequesttable tbody").append(row);
      });
    },
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