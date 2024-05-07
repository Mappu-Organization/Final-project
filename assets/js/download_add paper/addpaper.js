/////////GET ALL PAPERS FOR USER SIDE//////////////////////
$(document).ready(function () {

  console.log('add paper js init in index.js');
  
  getAllStudentPaperRequest();

  //ajax request get all papers for user side
  $.ajax({
    url:`http://localhost:8080/api/v1/admin-bff/papers`,
    method:"GET",
    contentType:"application/json",
    success: (response, textStatus, jqXHR) => {
      let data = "";
      response.forEach(paper => {
          data += `
              <div class="col-lg-4 col-md-6 passpaper_view filter-app">
                  <div class="card passpaper_wr" style="width: 18rem;">
                      <img src="${paper.paperImageLocation}" class="card-img-top" alt="...">
                      <div class="card-body pdf_description">
                          <h5 class="card-title">${paper.paperName}</h5>
                          <p hidden>${paper.paperId}</p>
                          <p class="card-text">${paper.paperDescription}</p>
                          <a href="#" class="btn btn-primary" id="paperReqBtn">Request</a>
                      </div>
                  </div>
              </div>`;
      });
      // Append generated HTML to the container
      $(".passpaper_co").html(data);
    },
    error: (jqXHR, textStatus, errorThrown) => {
        console.error("Error:", errorThrown);
    }
  });

  // Attach click event handler to the container element that exists in the DOM when the page loads
  $(".passpaper_co").on('click', '#paperReqBtn', function(event) {
    event.preventDefault(); // Prevent default behavior of the anchor tag
    
    console.log('btn clicked!!!');
    
    // Get the value of the first <p> element relative to the clicked button
    var paperId = $(this).closest('.card-body').find('p').first().text();
    var stuId = $("#stuid").text();

    //ajax call to save student paper request
    $.ajax({
      url:`http://localhost:8080/api/v1/admin-bff/request/papers/save`,
      method:"POST",
      contentType:"application/json",
      data:JSON.stringify({
          registerStudentDto: {
            registerStuId: stuId
          },
          paperDto: {
            paperId: paperId
          },
          requestStatus: "Pending"
      }),
      success: (response, textStatus, jqXHR) => {
          console.log(response);
          getAllStudentPaperRequest();
      }
    });

  });
  

});

function getAllStudentPaperRequest() {

  var stuId = $("#stuid").text();
  // ajax call to get all papers
  $.ajax({
    url: `http://localhost:8080/api/v1/admin-bff/request/papers/${stuId}`,
    method: "GET",
    success: function(data) {

      console.log(data);
      
      let paperRequestList = data;

      const tableBody = $("#paperTableBody");

      tableBody.empty();

      paperRequestList.forEach((paperRequest) => {
        const row = $("<tr>");

        row.html(`
            <td>${paperRequest.requestPaperId}</td>
            <td>${paperRequest.paperDto.paperId}</td>
            <td>${paperRequest.paperDto.paperName}</td>
            <td>${paperRequest.paperDto.paperType}</td>
            <td>${paperRequest.requestStatus}</td>`);

            tableBody.append(row);

        });

    },
    error: function(req, err) {
      console.log(req);
    }
  });
}

function uploadImage(event) {
  var input = event.target;
  var preview = document.getElementById("dpaperImage");
  var file = input.files[0];

  var reader = new FileReader();
  reader.onload = function () {
    preview.src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}
