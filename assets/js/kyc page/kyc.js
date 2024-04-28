// button action pass to ajax call
$("#nextBtn7").click(function(){
  //method includes the ajax method
  addKycUser();
  });

function upload() {
  const fileInput = document.getElementById("finput");
  const file = fileInput.files[0]; // Assuming only one file is selected

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const uploadedImage = document.createElement("img");
      uploadedImage.src = e.target.result;

      // Set width and height of the image
      uploadedImage.style.width = "100%";
      uploadedImage.style.height = "auto";

      // Append the image to the image container
      const imageContainer = document.getElementById("imageContainer");
      imageContainer.innerHTML = ""; // Clear previous images
      imageContainer.appendChild(uploadedImage);
    };

    reader.readAsDataURL(file);
  } else {
    alert("No file selected!");
  }
}

function addKycUser() {
 
  // Get form values
  var firstName = document.getElementById("validationServer01").value.trim();
  var lastName = document.getElementById("validationServer02").value.trim();
  var fullName = document.getElementById("validationServerFullname").value.trim();
  var sclRegNumber = document.getElementById("validationServerRegistration").value.trim();
  var classVal = document.getElementById("validationServerClass").value.trim();
  var medium = document.getElementById("validationServerMedium").value.trim();
  var residenceNumber = document.getElementById("validationServerResidenceNumber").value.trim();
  var address = document.getElementById("validationServerAddress").value.trim();
  var parentName = document.getElementById("validationServerParentname").value.trim();
  var parentRelation = document.getElementById("validationServerParentRelation").value.trim();
  var mobileNo = document.getElementById("validationServerMobileNumber").value.trim();
  var religion = document.getElementById("validationServerReligion").value.trim();
  // var imgVal = $('#imageUploader')[0].files[0];

   // Validate if all required fields are filled
   if (
    !firstName ||
    !lastName ||
    !fullName ||
    !sclRegNumber ||
    !classVal ||
    !medium ||
    !religion||
    !residenceNumber ||
    !address ||
    !parentName ||
    !parentRelation ||
    !mobileNo
) {
    alert("Please fill in all required fields.");
    return;
}

//create formData object for send data to back end
var formData = new FormData();
    //need insert the users image object
    formData.append('fileImage', $('#imageUploader')[0].files[0]);
    formData.append('kycStudentRecordsDto', JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      fullName: fullName,
      schoolRegNumber: sclRegNumber,
      classNumber: classVal,
      medium: medium,
      religion: religion,
      parentName: parentName,
      parentRelation: parentRelation,
      mobileNumber: mobileNo,
      residenceNumber: residenceNumber,
      address: address
  }));

// AJAX call to add the student record
$.ajax({
    url: "http://localhost:8080/api/v1/admin-bff/kyc-student-records/save",
    method: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function(data) {
        console.log("Response from Server:", data);
        clearData();
        window.location.href = "dashboard.html";
    },
    error: function(req, err) {
        console.log("Error:", req, err);
    }
});
}

function clearData(){
    // Clear the form fields after saving
  document.getElementById("validationServer01").value = "";
  document.getElementById("validationServer02").value = "";
  document.getElementById("validationServerFullname").value = "";
  document.getElementById("validationServerRegistration").value = "";
  document.getElementById("validationServerClass").value = "";
  document.getElementById("validationServerMedium").value = "";
  document.getElementById("validationServerReligion").value = "";
  document.getElementById("validationServerParentname").value = "";
  document.getElementById("validationServerParentRelation").value = "";
  document.getElementById("validationServerMobileNumber").value = "";
  document.getElementById("validationServerResidenceNumber").value = "";
  document.getElementById("validationServerAddress").value = "";
}
