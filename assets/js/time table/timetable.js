document.getElementById("addRecordBtn").addEventListener("click", function () {
  var tableId = document.getElementById("tableId").value;
  var day = document.getElementById("day").value;
  var period = document.getElementById("subject").value;
  var classId = document.getElementById("classId").value;
  var year = document.getElementById("year").value;
  var subject = document.getElementById("subject").value;

  if (!tableId || !day || !period || !classId || !year || !subject) {
    alert("Please fill in all required fields.");
    return;
  }

  var tableBody = document.getElementById("timetable_body");
  var newRow = tableBody.insertRow();

  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);
  var cell4 = newRow.insertCell(3);
  var cell5 = newRow.insertCell(4);
  var cell6 = newRow.insertCell(5);

  cell1.innerHTML = tableId;
  cell2.innerHTML = day;
  cell3.innerHTML = period;
  cell4.innerHTML = classId;
  cell5.innerHTML = year;
  cell6.innerHTML = subject;

  document.getElementById("tableId").value = "";
  document.getElementById("day").value = "Sunday";
  document.getElementById("subject").value = "";
  document.getElementById("classId").value = "";
  document.getElementById("year").value = "";
});
$("#addRecordBtn").click(function(){
  addTimeTableItem();
})

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



