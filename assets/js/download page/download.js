//////REQUEST MANAGEMENT SYSTEM/////////////
$(document).ready(function () {

    // Retrieve userInfo from localStorage
    const userInfoString = localStorage.getItem("userInfo");

    // Parse the JSON string back to an object
    const userInfo = JSON.parse(userInfoString);

    // Now you can use the userInfo object
    console.log(userInfo);

    $("#userId").text(userInfo.userId);
    $("#userName").text(userInfo.fullName);


    // Handle the Reject button click to show modal
    $(document).on("click", ".btn-reject", function () {
        // Clear the textarea inside the modal when the Reject button is clicked
        $("#commentText").val("");
    });

    // Handle comment submission
    $("#submitComment").click(function () {
        var comment = $("#commentText").val();
        console.log(comment); // For demonstration: print comment to console, replace with your logic
        $("#commentModal").modal("hide");
    });

    

    // Add event listeners for the new "Present" and "Absent" buttons if needed
    $(document).on("click", ".presentButton", function () {
        // Implement actions for when the "Present" button is clicked
        console.log("Present button clicked");
    });

    $(document).on("click", ".absentButton", function () {
        // Implement actions for when the "Absent" button is clicked
        console.log("Absent button clicked");
    });

    // $("#logOutBtn").on("click", function() {
    //     console.log("log out btn click");
    //     // Remove the userInfo item from localStorage
    //     // localStorage.removeItem("userInfo");
    //     // window.location.href = "logingformforadmin.html";
    // });

});





$(document).ready(function () {
    // Function to add a row to the attendance table
    function addRow(tableID, studentID, studentName, className, date) {
        var table = $("#" + tableID + " tbody");
        var newRow = $("<tr>");

        newRow.append("<td>" + studentID + "</td>");
        newRow.append("<td>" + studentName + "</td>");
        newRow.append("<td>" + className + "</td>");
        newRow.append("<td>" + date + "</td>");
        newRow.append("<td>Pending</td>");
        newRow.append(
            "<td><button class='same_btn reject absent'>Absent</button><button class='same_btn present'>Present</button></td>"
        );

        table.append(newRow);
    }

    // Sample data to populate the current attendance table
    var currentAttendanceData = [
        {
            studentID: 101,
            studentName: "John Doe",
            className: "Grade 10 A",
            date: "2024-02-10",
        },
        {
            studentID: 102,
            studentName: "Jane Smith",
            className: "Grade 10 B",
            date: "2024-02-10",
        },
        {
            studentID: 103,
            studentName: "Alice Johnson",
            className: "Grade 10 C",
            date: "2024-02-10",
        },
        {
            studentID: 104,
            studentName: "Michael Brown",
            className: "Grade 10 A",
            date: "2024-02-10",
        },
        {
            studentID: 105,
            studentName: "Emma Wilson",
            className: "Grade 10 B",
            date: "2024-02-10",
        },
        {
            studentID: 106,
            studentName: "Daniel Lee",
            className: "Grade 10 C",
            date: "2024-02-10",
        },
    ];

    // Populate the current attendance table with sample data
    currentAttendanceData.forEach(function (data) {
        addRow(
            "AtTable",
            data.studentID,
            data.studentName,
            data.className,
            data.date
        );
    });

    // Event delegation to handle absent and present buttons for current attendance table
    $("#AtTable").on("click", ".absent", function () {
        var row = $(this).closest("tr");
        var studentID = row.find("td:eq(0)").text();
        var studentName = row.find("td:eq(1)").text();
        var className = row.find("td:eq(2)").text();
        var date = row.find("td:eq(3)").text();

        // Update status in current attendance table
        var statusCell = row.find("td:eq(4)");
        statusCell.text("Absent");

        // Update attendance history table
        updateAttendanceHistory(studentID, studentName, className, date, "Absent");
    });

    $("#AtTable").on("click", ".present", function () {
        var row = $(this).closest("tr");
        var studentID = row.find("td:eq(0)").text();
        var studentName = row.find("td:eq(1)").text();
        var className = row.find("td:eq(2)").text();
        var date = row.find("td:eq(3)").text();

        // Update status in current attendance table
        var statusCell = row.find("td:eq(4)");
        statusCell.text("Present");

        // Update attendance history table
        updateAttendanceHistory(studentID, studentName, className, date, "Present");
    });

    // Function to update attendance history table
    function updateAttendanceHistory(
        studentID,
        studentName,
        className,
        date,
        status
    ) {
        var table = $("#attendanceHistoryTable tbody");
        var newRow = $("<tr>");

        newRow.append("<td>" + studentID + "</td>");
        newRow.append("<td>" + studentName + "</td>");
        newRow.append("<td>" + className + "</td>");
        newRow.append("<td>" + date + "</td>");
        newRow.append("<td>" + status + "</td>");

        table.append(newRow);
    }

    // Event handler for class filter dropdown
    $("#classSelect").on("change", function () {
        var selectedClass = $(this).val();
        if (selectedClass === "") {
            $("#AtTable tbody tr").show();
        } else {
            $("#AtTable tbody tr").hide();
            $("#AtTable tbody tr").each(function () {
                var className = $(this).find("td:eq(2)").text();
                if (className === selectedClass) {
                    $(this).show();
                }
            });
        }
    });
});

// Function to add a new row to the table body

//// CSV FILE UPLOADER///////////////
$(document).ready(function () {
    // Function to handle file upload
    $("#formFile").change(function (event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var csv = e.target.result;
            var data = $.csv.toArrays(csv);
            populateTable(data);
        };
        reader.readAsText(file);
    });

    // Function to populate table with data from CSV
    function populateTable(data) {
        // Clear previous data
        $("#tableBody").empty();

        // Loop through each row in the CSV data
        for (var i = 0; i < data.length; i++) {
            var row = data[i];
            var rowData = {
                column1: row[0], // Assuming the first column contains First Name
                column2: row[1], // Assuming the second column contains Last Name
                column3: row[2], // Assuming the third column contains Full Name
                column4: row[3], // Assuming the fourth column contains Scl_reg_number
                column5: row[4], // Assuming the fifth column contains Class
                column6: row[5], // Assuming the sixth column contains Medium
                column7: row[6], // Assuming the seventh column contains religion
                column8: row[7], // Assuming the eighth column contains Parent Name
                column9: row[8], // Assuming the ninth column contains Parent Relation
                column10: row[9],
                column11: row[10],
                column11: row[11], // Assuming the tenth column contains Mobile No
                kycStatus: row[12], // Assuming the eleventh column contains KYC Status
                action: row[13], // Assuming the twelfth column contains Action
            };
            addRow(rowData); // Add the row to the table
        }
    }

    // Function to add a row to the table
    function addRow(data) {
        var newRow = `<tr>
            <td>${data.column1}</td>
            <td>${data.column2}</td>
            <td>${data.column3}</td>
            <td>${data.column4}</td>
            <td>${data.column5}</td>
            <td>${data.column6}</td>
            <td>${data.column7}</td>
            <td>${data.column8}</td>
            <td>${data.column9}</td>
            <td>${data.column10}</td>
            <td>${data.column11}</td>
            <td>${data.column12}</td>
            <td class="hidden-column kyc-status">${data.kycStatus}</td>
            <td class="hidden-column action-column">
                <button class="select-button">${data.action}</button>
            </td>
        </tr>`;

        // Append the new row to the table body
        $("#tableBody").append(newRow);

        // Apply styles based on KYC status for the last added row
        var lastRow = $("#tableBody tr:last");
        var kycStatus = lastRow.find(".kyc-status").text();
        var selectButton = lastRow.find(".action-column button");

        if (kycStatus === "Active") {
            // KYC is active, set button color to green
            selectButton.css("background-color", "green");

            // Attach a click event handler to the "Select" button
            selectButton.on("click", function () {
                // Call the function to handle the "Select" button click
                handleSelectButtonClick(data);
            });
        } else {
            // KYC is not active, disable the button and set a different color
            selectButton.prop("disabled", true);
            selectButton.css("background-color", "gray");
        }
    }

    // Function to handle "Select" button click
    function handleSelectButtonClick(data) {
        // Check if KYC status is active
        if (data.kycStatus === "Active") {
            // Populate kyc_user_record with student data
            populateKYCUserRecord(data);

            // Populate bulk_user_record with student data
            populateBulkUserRecord(data);
        } else {
            console.log("KYC status is not active for this student.");
        }
    }

    // Function to populate KYC user record
    // Function to populate KYC user record with all columns
    function populateKYCUserRecord(data) {
        console.log(data); // Print the data object to the console
        // Example: Assuming kyc_user_record is a div with class 'kyc_user_record'
        $(".kyc_user_record").empty(); // Clear previous data
        // Populate KYC user record with the selected student's data
        var kycUserData = `<p>First Name: ${data.column1}</p>
                 <p>Last Name: ${data.column2}</p>
                 <p>Full Name: ${data.column3}</p>
                 <p>Scl_reg_number: ${data.column4}</p>
                 <p>Class: ${data.column5}</p>
                 <p>Medium: ${data.column6}</p>
                 <p>Religion: ${data.column7}</p>
                 <p>Parent Name: ${data.column8}</p>
                 <p>Parent Relation: ${data.column9}</p>
                 <p>Mobile No: ${data.column10}</p>
                 <p>KYC Status: ${data.kycStatus}</p>
                 <p>Action: ${data.action}</p>`;
        $(".kyc_user_record").append(kycUserData);
    }

    // Function to populate bulk user record with all columns
    function populateBulkUserRecord(data) {
        // Example: Assuming bulk_user_record is a div with class 'bulk_user_record'
        $(".bulk_user_record").empty(); // Clear previous data
        // Populate bulk user record with the selected student's data
        var bulkUserData = `<p>First Name: ${data.column1}</p>
                  <p>Last Name: ${data.column2}</p>
                  <p>Full Name: ${data.column3}</p>
                  <p>Scl_reg_number: ${data.column4}</p>
                  <p>Class: ${data.column5}</p>
                  <p>Medium: ${data.column6}</p>
                  <p>Religion: ${data.column7}</p>
                  <p>Parent Name: ${data.column8}</p>
                  <p>Parent Relation: ${data.column9}</p>
                  <p>Mobile No: ${data.column10}</p>
                  <p>KYC Status: ${data.kycStatus}</p>
                  <p>Action: ${data.action}</p>`;
        $(".bulk_user_record").append(bulkUserData);
    }
    // Function to handle search input
    $(".form-control").on("keyup", function () {
        var value = $(this).val().toLowerCase(); // Get the value of the input and convert it to lowercase
        $("#tableBody tr").filter(function () {
            // Filter table rows
            $(this).toggle(
                $(this).find("td:nth-child(4)").text().toLowerCase().indexOf(value) > -1
            ); // Toggle row display based on search value in the fourth column
        });
    });
});

////////bulk user record//////////
$(document).ready(function () {
    // Function to handle file upload
    $("#formFile").change(function (event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var csv = e.target.result;
            var data = $.csv.toArrays(csv);
            populateTable(data);
        };
        reader.readAsText(file);
    });

    // Function to populate table with data from CSV
    function populateTable(data) {
        // Clear previous data
        $("#bulktableBody").empty(); // Updated here

        // Loop through each row in the CSV data
        for (var i = 0; i < data.length; i++) {
            var row = data[i];
            var rowData = {
                column1: row[0], // Assuming the first column contains First Name
                column2: row[1], // Assuming the second column contains Last Name
                column3: row[2], // Assuming the third column contains Full Name
                column4: row[3], // Assuming the fourth column contains Scl_reg_number
                column5: row[4], // Assuming the fifth column contains Class
                column6: row[5], // Assuming the sixth column contains Medium
                column7: row[6], // Assuming the seventh column contains religion
                column8: row[7], // Assuming the eighth column contains Parent Name
                column9: row[8], // Assuming the ninth column contains Parent Relation
                column10: row[9], // Assuming the tenth column contains Mobile No

            };
            addRow(rowData); // Add the row to the table
        }
    }

    // Function to add a row to the table
    function addRow(data) {
        var newRow = `<tr>
            <td>${data.column1}</td>
            <td>${data.column2}</td>
            <td>${data.column3}</td>
            <td>${data.column4}</td>
            <td>${data.column5}</td>
            <td>${data.column6}</td>
            <td>${data.column7}</td>
            <td>${data.column8}</td>
            <td>${data.column9}</td>
            <td>${data.column10}</td>
           
        </tr>`;

        // Append the new row to the table body
        $("#bulktableBody").append(newRow); // Updated here

        // Apply styles based on KYC status for the last added row
        var lastRow = $("#bulktableBody tr:last"); // Updated here
        var kycStatus = lastRow.find(".kyc-status").text();
        var selectButton = lastRow.find(".action-column button");

        if (kycStatus === "Active") {
            // KYC is active, set button color to green
            selectButton.css("background-color", "green");

            // Attach a click event handler to the "Select" button
            selectButton.on("click", function () {
                // Call the function to handle the "Select" button click
                handleSelectButtonClick(data);
            });
        } else {
            // KYC is not active, disable the button and set a different color
            selectButton.prop("disabled", true);
            selectButton.css("background-color", "gray");
        }
    }

    // Function to handle "Select" button click
    function handleSelectButtonClick(data) {
        // Check if KYC status is active
        if (data.kycStatus === "Active") {
            // Populate kyc_user_record with student data
            populateKYCUserRecord(data);

            // Populate bulk_user_record with student data
            populateBulkUserRecord(data);
        } else {
            console.log("KYC status is not active for this student.");
        }
    }

    // Function to populate KYC user record
    // Function to populate KYC user record with all columns
    function populateKYCUserRecord(data) {
        // Example: Assuming kyc_user_record is a div with class 'kyc_user_record'
        $(".kyc_user_record").empty(); // Clear previous data
        // Populate KYC user record with the selected student's data
        var kycUserData = `<p>First Name: ${data.column1}</p>
                 <p>Last Name: ${data.column2}</p>
                 <p>Full Name: ${data.column3}</p>
                 <p>Scl_reg_number: ${data.column4}</p>
                 <p>Class: ${data.column5}</p>
                 <p>Medium: ${data.column6}</p>
                 <p>Religion: ${data.column7}</p>
                 <p>Parent Name: ${data.column8}</p>
                 <p>Parent Relation: ${data.column9}</p>
                 <p>Mobile No: ${data.column10}</p>
                 <p>KYC Status: ${data.kycStatus}</p>
                 <p>Action: ${data.action}</p>`;
        $(".kyc_user_record").append(kycUserData);
    }

    // Function to populate bulk user record with all columns
    function populateBulkUserRecord(data) {
        // Example: Assuming bulk_user_record is a div with class 'bulk_user_record'
        $(".bulk_user_record").empty(); // Clear previous data
        // Populate bulk user record with the selected student's data
        var bulkUserData = `<p>First Name: ${data.column1}</p>
                  <p>Last Name: ${data.column2}</p>
                  <p>Full Name: ${data.column3}</p>
                  <p>Scl_reg_number: ${data.column4}</p>
                  <p>Class: ${data.column5}</p>
                  <p>Medium: ${data.column6}</p>
                  <p>Religion: ${data.column7}</p>
                  <p>Parent Name: ${data.column8}</p>
                  <p>Parent Relation: ${data.column9}</p>
                  <p>Mobile No: ${data.column10}</p>
                  <p>KYC Status: ${data.kycStatus}</p>
                  <p>Action: ${data.action}</p>`;
        $(".bulk_user_record").append(bulkUserData);
    }
    // Function to handle search input
    $(".form-control").on("keyup", function () {
        var value = $(this).val().toLowerCase(); // Get the value of the input and convert it to lowercase
        $("#bulktableBody tr").filter(function () {
            // Filter table rows
            $(this).toggle(
                $(this).find("td:nth-child(4)").text().toLowerCase().indexOf(value) > -1
            ); // Toggle row display based on search value in the fourth column
        });
    });
});



/////////// registered student /////////////

$(document).ready(function () {
    var dataset = []; // Initialize an empty dataset

    // Function to initialize the table with the provided dataset
    function initializeTable(data) {
        dataset = data; // Set the dataset

        // Initialize filter options if needed

        // Show popup when the "Show Popup" button is clicked
        $("#showPopupBtn").click(function () {
            updateTable();
            $("#popupTable").toggle();
        });

        // Add data when the "Add Data" button is clicked
        $("#addDataBtn").click(function () {
            addRandomData();
            updateTable();
        });

        // Download table data when the "Download Table Data" button is clicked
        $("#downloadDataBtn").click(function () {
            downloadTableData();
        });
    }

    // Function to update the table based on the dataset
    function updateTable() {
        $("#popupTableBody").empty();

        for (var i = 0; i < dataset.length; i++) {
            var row = $("<tr>");
            row.append($("<td>").text(dataset[i].bulkStudentId));
            row.append($("<td>").text(dataset[i].registeredId));
            row.append($("<td>").text(dataset[i].schoolRegNo));
            row.append($("<td>").text(dataset[i].fullName));
            row.append($("<td>").text(dataset[i].firstName));
            row.append($("<td>").text(dataset[i].lastName));
            row.append($("<td>").text(dataset[i].class));
            row.append($("<td>").text(dataset[i].address));
            row.append($("<td>").text(dataset[i].kycId));
            row.append($("<td>").text(dataset[i].medium));
            row.append($("<td>").text(dataset[i].region));
            row.append($("<td>").text(dataset[i].parentName));
            row.append($("<td>").text(dataset[i].parentRelations));
            row.append($("<td>").text(dataset[i].mobileNo));
            row.append($("<td>").text(dataset[i].residenceTel));

            $("#popupTableBody").append(row);
        }
    }

    // Function to add random data to the dataset
    function addRandomData() {
        var randomData = {
            bulkStudentId: generateRandomId(),
            registeredId: generateRandomId(),
            schoolRegNo: generateRandomId(),
            fullName: "Random Name " + Math.floor(Math.random() * 100),
            firstName: "Random First Name",
            lastName: "Random Last Name",
            class: "Class " + Math.floor(Math.random() * 10),
            address: "Random Address",
            kycId: generateRandomId(),
            medium: "Medium " + Math.floor(Math.random() * 5),
            region: "Region " + Math.floor(Math.random() * 5),
            parentName: "Random Parent Name",
            parentRelations: "Random Relation",
            mobileNo: "Random Mobile No",
            residenceTel: "Random Residence Tel",
        };

        dataset.push(randomData);
    }

    // Function to generate a random ID
    function generateRandomId() {
        return Math.random().toString(36).substr(2, 9); // Generates a random alphanumeric string
    }

    // Function to download table data as CSV
    function downloadTableData() {
        var csvContent = "data:text/csv;charset=utf-8,";
        csvContent +=
            "Bulk Student Id,Registered Id,School reg No,Full Name,First Name,Last Name,Class,Address,Kyc Id,Medium,Region,Parent Name,Parent Relations,Mobile No,Residence tel\n";

        dataset.forEach(function (row) {
            csvContent += Object.values(row).join(",") + "\n";
        });

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "table_data.csv");
        document.body.appendChild(link);
        link.click();
    }

    // Example dataset
    var exampleData = [
        {
            bulkStudentId: "BSID001",
            registeredId: "RID001",
            schoolRegNo: "SRN001",
            fullName: "John Doe",
            firstName: "John",
            lastName: "Doe",
            class: "Class A",
            address: "123 Main St",
            kycId: "KYC001",
            medium: "English",
            region: "North",
            parentName: "Jane Doe",
            parentRelations: "Parent",
            mobileNo: "1234567890",
            residenceTel: "0987654321",
        },
        {
            bulkStudentId: "BSID002",
            registeredId: "RID002",
            schoolRegNo: "SRN002",
            fullName: "Jane Smith",
            firstName: "Jane",
            lastName: "Smith",
            class: "Class B",
            address: "456 Oak St",
            kycId: "KYC002",
            medium: "French",
            region: "South",
            parentName: "John Smith",
            parentRelations: "Parent",
            mobileNo: "9876543210",
            residenceTel: "0123456789",
        },
    ];

    // Initialize the table with the example dataset
    initializeTable(exampleData);
});

// UPLOAD IMAGE ADD BOOK

function displayImage() {
    var input = document.getElementById("finput");
    var displayedImage = document.getElementById("displayedImage");

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            displayedImage.src = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }
}
function displaypaperImage() {
    var input = document.getElementById("finbookput");
    var displayedImage = document.getElementById("displayedbookImage");

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            displayedImage.src = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }
}

// page change
const activeButtons = document.querySelectorAll(".sec_button");
const panels = document.querySelectorAll(".pannel");

activeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const clickedButton = button;
        const buttonId = clickedButton.id;

        activeButtons.forEach((btn) => {
            btn.classList.remove("active_button");
        });

        clickedButton.classList.add("active_button");

        panels.forEach((panel) => {
            panel.classList.add("d-none");
        });

        const panelId = buttonId.replace("pannel_", "pannel_") + "_content";
        const targetPanel = document.getElementById(panelId);
        targetPanel.classList.remove("d-none");

        panels.forEach((panel) => {
            if (panel.id !== panelId) {
                panel.classList.add("d-none");
            }
        });
    });
});
