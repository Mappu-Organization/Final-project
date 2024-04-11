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
