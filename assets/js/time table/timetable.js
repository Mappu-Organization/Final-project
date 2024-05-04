

//add a timetable item
function addTimeTableItem() {

  // Get form values
  var day = document.getElementById("day").value.trim();
  var period = document.getElementById("period").value.trim();
  var classId = document.getElementById("classId").value.trim();
  var year = document.getElementById("year").value.trim();
  var subject = document.getElementById("subject").value.trim();


  // Validate if all required fields are filled
  if (
    !day ||
    !period ||
    !classId ||
    !year ||
    !subject ) 
   {
    alert("Please fill in all required fields.");
    return;
  }

  // upsupported media type error occurs 
  //create formData object for send data to back end
  let timetable = {
    today: day,
    Period: period,
    class: classId,
    curentYear: year,
    periodSubject: subject
  }

  // Log the bulkuser object to the console for debugging
  console.log("Tiem table item:", timetable);

  // AJAX call to add the student record
  $.ajax({
    url: "http://localhost:8080/api/v1/admin-bff/timetable/save",
    method: "POST",
    data: timetable,
    processData: false,
    contentType: false,
    success: function (data) {
      console.log("Response from Server:", data);
      alert("You have submitted successfully");
      //loadTableBooks(); // Assuming this function loads or updates the table
    },
    error: function (req, err) {
      console.log("Error:", req, err);
    }
  });
  alert("You have submitted successfully");

  // Clear the form fields after saving
  document.getElementById("day").value = "";
  document.getElementById("period").value = "";
  document.getElementById("classId").value = "";
  document.getElementById("year").value = "";
  document.getElementById("subject").value = "";

}

//display the timetable 
$.ajax({
  url: `http://localhost:8080/api/v1/admin-bff/timetable`,
  method: "GET",
  success: function(data) {

    let timetableList = data;

    const tableBody = $("#timetable_body tbody");

    timetableList.forEach((addperiod) => {
      const row = $("<tr>");

      row.html(`
          <td>${addperiod.day}</td>
          <td>${addperiod.period}</td>
          <td>${addperiod.classId}</td>
          <td>${addperiod.year}</td>
          <td>${addperiod.subject}</td>`);

          tableBody.append(row);

      });

  },
  error: function(req, err) {
    console.log(req);
  }
});



