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
