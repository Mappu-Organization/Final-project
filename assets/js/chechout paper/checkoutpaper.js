//////////////////REQUEST TABLE(download)/////////////////////

// Function to handle approving a request
function approveRequest(button) {
  var row = button.parentNode.parentNode;
  var statusCell = row.cells[4];
  statusCell.innerHTML = "Approved";
}

// Function to handle rejecting a request
function rejectRequest(button) {
  var row = button.parentNode.parentNode;
  var statusCell = row.cells[4];
  var comment = prompt("Please enter your comment for rejection:");
  if (comment !== null) {
    statusCell.innerHTML = "Rejected (" + comment + ")";
  }
}
