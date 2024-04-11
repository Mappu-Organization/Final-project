function uploadstImage(event) {
  var input = event.target;
  var preview = document.getElementById("previewImage");
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


function uploadImagekyc(event) {
  var input = event.target;
  var preview = document.getElementById("kycpreviewImage");
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

function uploadImagekycpage(event) {
  var input = event.target;
  var preview = document.getElementById("kycpagepreviewImage");
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
function uploadbookImage(event) {
  var input = event.target;
  var preview = document.getElementById("dpaperbookImage");
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

///////////////////// ADD STUDENT ///////////////
  function saveStudent() {
    // Fetch data from form fields
    var firstName = document.getElementById("validationServer01").value.trim();
    var lastName = document.getElementById("validationServer02").value.trim();
    var fullName = document
      .getElementById("validationServerFullname")
      .value.trim();
    var sclRegNumber = document
      .getElementById("validationServerRegistration")
      .value.trim();
    var classVal = document
      .getElementById("validationServerClass")
      .value.trim();
    var medium = document.getElementById("validationServerMedium").value.trim();
    var religion = ""; // You may add religion field and fetch its value
    var residenceNumber = document
      .getElementById("validationServerResidenceNumber")
      .value.trim();
    var address = document
      .getElementById("validationServerAddress")
      .value.trim();
    var parentName = document
      .getElementById("validationServerParentName")
      .value.trim();
    var parentRelation = document
      .getElementById("validationServerParentRelation")
      .value.trim();
    var mobileNo = document
      .getElementById("validationServerMobileNumber")
      .value.trim();

    // Validate if all required fields are filled
    if (
      !firstName ||
      !lastName ||
      !fullName ||
      !sclRegNumber ||
      !classVal ||
      !medium ||
      !residenceNumber ||
      !address ||
      !parentName ||
      !parentRelation ||
      !mobileNo
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Add the student data to the table
    var tableBody = document.getElementById("bulktableBody");
    var newRow = tableBody.insertRow();

    // Insert data into the cells of the new row
    newRow.insertCell().textContent = firstName;
    newRow.insertCell().textContent = lastName;
    newRow.insertCell().textContent = fullName;
    newRow.insertCell().textContent = sclRegNumber;
    newRow.insertCell().textContent = classVal;
    newRow.insertCell().textContent = medium;
    newRow.insertCell().textContent = religion;
    newRow.insertCell().textContent = residenceNumber;
    newRow.insertCell().textContent = address;
    newRow.insertCell().textContent = parentName;
    newRow.insertCell().textContent = parentRelation;
    newRow.insertCell().textContent = mobileNo;

    // Clear the form fields after saving
    document.getElementById("validationServer01").value = "";
    document.getElementById("validationServer02").value = "";
    document.getElementById("validationServerFullname").value = "";
    document.getElementById("validationServerRegistration").value = "";
    document.getElementById("validationServerClass").value = "";
    document.getElementById("validationServerMedium").value = "";
    document.getElementById("validationServerRegistrationNo").value = "";
    document.getElementById("validationServerParentName").value = "";
    document.getElementById("validationServerParentRelation").value = "";
    document.getElementById("validationServerMobileNumber").value = "";
    document.getElementById("validationServerResidenceNumber").value = "";
  }