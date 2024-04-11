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
