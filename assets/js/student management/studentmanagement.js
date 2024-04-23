
$("#nextBtn3").click(function(){
  saveStudent();
});

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

function saveStudent() {
  // Fetch data from form fields
  var firstName = document.getElementById("validationServer01").value.trim();
  var lastName = document.getElementById("validationServer02").value.trim();
  var fullName = document.getElementById("validationServerFullname").value.trim();
  var sclRegNumber = document.getElementById("validationServerRegistration").value.trim();
  var classVal = document.getElementById("validationServerClass").value.trim();
  var medium = document.getElementById("validationServerMedium").value.trim();
  var residenceNumber = document.getElementById("validationServerResidenceNumber").value.trim();
  var address = document.getElementById("validationServerAddress").value.trim();
  var parentName = document.getElementById("validationServerParentName").value.trim();
  var parentRelation = document.getElementById("validationServerParentRelation").value.trim();
  var mobileNo = document.getElementById("validationServerMobileNumber").value.trim();
  var religion = "no need"

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

  // upsupported media type error occurs 
  // Create the bulkuser object to send to backend
  let bulkuser = {
      first_Name: firstName,
      last_Name: lastName,
      full_Name: fullName,
      scl_Reg_Number: sclRegNumber,
      class_Val: classVal,
      Medium: medium,
      Religion: religion,
      parent_Name: parentName,
      parent_Relation: parentRelation,
      mobile_No: mobileNo,
      residence_Number: residenceNumber,
      Address: address
  };


  // Log the bulkuser object to the console for debugging
  console.log("Bulk User Object:", bulkuser);

  // AJAX call to add the student record
  $.ajax({
      url: "http://localhost:8080/api/v1/admin-bff/bulk-student-records/save",
      method: "POST",
      data: bulkuser,
      processData: false,
      contentType: false,
      success: function(data) {
          console.log("Response from Server:", data);
          //loadTableBooks(); // Assuming this function loads or updates the table
      },
      error: function(req, err) {
          console.log("Error:", req, err);
      }
  });

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
  document.getElementById("validationServerAddress").value = "";
}
