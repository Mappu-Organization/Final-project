//////REQUEST MANAGEMENT SYSTEM/////////////
$(document).ready(function () {

    // Retrieve userInfo from localStorage
    const userInfoString = localStorage.getItem("userInfo");

    // Parse the JSON string back to an object
    const userInfo = JSON.parse(userInfoString);

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

    $("#logOutBtn").on("click", function() {
        console.log("log out btn click");
        // Remove the userInfo item from localStorage
        localStorage.removeItem("userInfo");
        window.location.href = "logingformforadmin.html";
    });

});

function updateAttendance(r, status){
    let sid = $(r).attr('data-x');
    $.ajax({
        url:`http://localhost:8080/api/v1/admin-bff/attendance/mark`,
        method:"POST",
        contentType:"application/json",
        data:JSON.stringify({
            studentRegId:sid,
            status:status
        }),
        success: (response, textStatus, jqXHR) => {
            $("#attendanceHistoryTable tbody").empty();
            response.forEach((att) => {
              let row = `
                    <tr>
                        <td>${att.registerStudent.studentRegId}</td>
                        <td>${att.registerStudent.fullName}</td>
                        <td>${att.registerStudent.className}</td>
                        <td>${att.date}</td>
                        <td>${att.status}</td>
                    </tr>
                `;
              $("#attendanceHistoryTable tbody").append(row);
            });
            
        }
    })
}

$(document).ready(function () {

    $.ajax({
        url:`http://localhost:8080/api/v1/admin-bff/timetable`,
        method:"GET",
        contentType:"application/json",
        success: (response, textStatus, jqXHR) => {
            $("#timetable_table tbody").empty();
            console.log(response);
            response.forEach((timeTable) => {
              let row = `
                    <tr>
                        <td>${timeTable.timetableId}</td>
                        <td>${timeTable.day}</td>
                        <td>${timeTable.period}</td>
                        <td>${timeTable.stdClass}</td>
                        <td>${timeTable.year}</td>
                        <td>${timeTable.subject}</td>
                    </tr>
                `;
              $("#timetable_table tbody").append(row);
            });
            
        }
    })

    $("#addRecordBtn").on('click',function(){
  
        let day = $('#day').val();
        let period = $('#period').val();
        let classId = $('#classId').val();
        let year = $('#year').val();
        let subject = $('#subject').val();
      
        $.ajax({
            url:`http://localhost:8080/api/v1/admin-bff/timetable/save`,
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify({
                stdClass: classId,
                subject: subject,
                year: year,
                day: day,
                period: period
            }),
            success: (response, textStatus, jqXHR) => {
                $("#timetable_table tbody").empty();
                response.forEach((timeTable) => {
                  let row = `
                        <tr>
                            <td>${timeTable.timetableId}</td>
                            <td>${timeTable.day}</td>
                            <td>${timeTable.period}</td>
                            <td>${timeTable.stdClass}</td>
                            <td>${timeTable.year}</td>
                            <td>${timeTable.subject}</td>
                        </tr>
                    `;
                  $("#timetable_table tbody").append(row);
                });
                
            }
        })
        
      })
    
    $.ajax({
        url:`http://localhost:8080/api/v1/admin-bff/attendance`,
        method:"GET",
        contentType:"application/json",
        success: (response, textStatus, jqXHR) => {
            $("#attendanceHistoryTable tbody").empty();
            response.forEach((att) => {
              let row = `
                    <tr>
                        <td>${att.registerStudent.studentRegId}</td>
                        <td>${att.registerStudent.fullName}</td>
                        <td>${att.registerStudent.className}</td>
                        <td>${att.date}</td>
                        <td>${att.status}</td>
                    </tr>
                `;
              $("#attendanceHistoryTable tbody").append(row);
            });
            
        }
    })

    // Event handler for class filter dropdown
    $("#classSelect").on("change", function () {
        var selectedClass = $(this).val();
        if(selectedClass == ""){
            alert("Please select  a class.");
            return;
        }
        $.ajax({
            url: `http://localhost:8080/api/v1/admin-bff/register/class/${selectedClass}`,
            method:"GET",
            success: (response, textStatus, jqXHR) => {
                console.log(response)
                $("#AtTable tbody").empty();
                response.forEach((std) => {
                  let row = `
                        <tr>
                            <td>${std.studentRegId}</td>
                            <td>${std.fullName}</td>
                            <td>${std.className}</td>
                            <td>${new Date().toISOString()}</td>
                            <td>${std.status}</td>
                            <td>
                                <button data-x="${std.studentRegId}" onclick='updateAttendance(this,"a")' class='same_btn reject absent'>Absent</button>
                                <button data-x="${std.studentRegId}" onclick='updateAttendance(this,"p")' class='same_btn present'>Present</button>
                            </td>   
                        </tr>
                    `;
                  $("#AtTable tbody").append(row);
                });
                
            }
        })
    });
});

function updateStatus(r,s){
    let id = $(r).attr('data-x');
    $.ajax({
        url:`http://localhost:8080/api/v1/admin-bff/request/book/update/${id}/${s}`,
        method:"PUT",
        success:(response, textStatus, jqXHR)=>{
            if(jqXHR.status == 200){
                let msg = document.getElementById("successMessage")
                msg.innerHTML = "Bulk Save successful";
                msg.classList.remove("error-message")
                msg.classList.add("success-message")
                msg.style.display = "block";
                setTimeout(function () {
                    msg.style.display = "none";
                }, 3000);
            }else{
                let msg = document.getElementById("successMessage")
                msg.innerHTML = "Something went wrong while saving the information.";
                msg.classList.remove("success-message")
                msg.classList.add("error-message")
                msg.style.display = "block";
                setTimeout(function () {
                    msg.style.display = "none";
                }, 3000);
            }
        }
    })
}

function updatePaperStatus(r,s){
    let id = $(r).attr('data-x');
    $.ajax({
        url:`http://localhost:8080/api/v1/admin-bff/request/papers/update/${id}/${s}`,
        method:"PUT",
        success:(response, textStatus, jqXHR)=>{
            if(jqXHR.status == 200){
                let msg = document.getElementById("successMessage")
                msg.innerHTML = "Bulk Save successful";
                msg.classList.remove("error-message")
                msg.classList.add("success-message")
                msg.style.display = "block";
                setTimeout(function () {
                    msg.style.display = "none";
                }, 3000);
            }else{
                let msg = document.getElementById("successMessage")
                msg.innerHTML = "Something went wrong while saving the information.";
                msg.classList.remove("success-message")
                msg.classList.add("error-message")
                msg.style.display = "block";
                setTimeout(function () {
                    msg.style.display = "none";
                }, 3000);
            }
        }
    })
}

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

    $("#saveBulkRecodes").on('click',function(){
        let  recodedData=[];
        $("#bulktableBody tr").each(function(i,row){
            recodedData.push({
                firstName: $(row).find('td')[0].innerHTML,
                lastName: $(row).find('td')[1].innerHTML,
                fullName: $(row).find('td')[2].innerHTML,
                schoolRegNumber: $(row).find('td')[3].innerHTML,
                className: $(row).find('td')[4].innerHTML,
                medium: $(row).find('td')[5].innerHTML,
                religion: $(row).find('td')[6].innerHTML,
                residenceNumber: $(row).find('td')[7].innerHTML,
                address: $(row).find('td')[8].innerHTML,
                parentName: $(row).find('td')[9].innerHTML,
                parentRelation: $(row).find('td')[10].innerHTML,
                mobileNumber: $(row).find('td')[11].innerHTML,
            });
        })
        
        $.ajax({
            url:"http://localhost:8080/api/v1/admin-bff/bulk-student-records/bulkSave",
            method:"POST",
            contentType:"application/json",
            data:JSON.stringify(recodedData),
            success:(response, textStatus, jqXHR)=>{
                if(jqXHR.status == 200){
                    let msg = document.getElementById("successMessage")
                    msg.innerHTML = "Bulk Save successful";
                    msg.classList.remove("error-message")
                    msg.classList.add("success-message")
                    msg.style.display = "block";
                    setTimeout(function () {
                        msg.style.display = "none";
                    }, 3000);
                }else{
                    let msg = document.getElementById("successMessage")
                    msg.innerHTML = "Something went wrong while saving the information.";
                    msg.classList.remove("success-message")
                    msg.classList.add("error-message")
                    msg.style.display = "block";
                    setTimeout(function () {
                        msg.style.display = "none";
                    }, 3000);
                }
                recodedData = null;
                $("#bulktableBody").empty();
            }
        })
    })

    // Function to populate table with data from CSV
    function populateTable(data) {
        // Clear previous data
        $("#bulktableBody").empty();

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
        $("#bulktableBody").append(newRow);

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
        $("#tableBod tr").filter(function () {
            // Filter table rows
            $(this).toggle(
                $(this).find("td:nth-child(4)").text().toLowerCase().indexOf(value) > -1
            ); // Toggle row display based on search value in the fourth column
        });
    });
});

let registerObj = null;

$(document).ready(() => {
    $('#stdReg').on('click',function(){
        if(registerObj  == null){
            let msg = document.getElementById("successMessage")
            msg.innerHTML = "Please select a Student first";
            msg.classList.remove("success-message")
            msg.classList.add("error-message")
            msg.style.display = "block";
            setTimeout(function () {
                msg.style.display = "none";
              }, 3000);
            return;
        }

        $.ajax({
            url:`http://localhost:8080/api/v1/admin-bff/register-student/reg`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                firstName:registerObj.fName,
                lastName:registerObj.lName,
                fullName:registerObj.fullName,
                className: registerObj.sClass,
                medium: registerObj.medium,
                religion: registerObj.religion,
                parentName: registerObj.parentName,
                parentRelation: registerObj.parentRelation,
                mobileNumber: registerObj.mobileNumber,
                studentRegId: registerObj.regNo,
                studentImage: registerObj.studentImage
            }),
            success: (response, textStatus, jqXHR)=>{
                console.log(response);
                if(jqXHR.status == 200){
                    let msg = document.getElementById("successMessage")
                    msg.innerHTML = "Student successfully registered!";
                    msg.classList.remove("error-message")
                    msg.classList.add("success-message")
                    msg.style.display = "block";
                    setTimeout(function () {
                        msg.style.display = "none";
                    }, 3000);
                }else{
                    let msg = document.getElementById("successMessage")
                    msg.innerHTML = "Something went wrong while saving the information.";
                    msg.classList.remove("success-message")
                    msg.classList.add("error-message")
                    msg.style.display = "block";
                    setTimeout(function () {
                        msg.style.display = "none";
                    }, 3000);
                }
                registerObj = null;
                $('#kycStudentDetails').empty();
                $("#previewImage").attr('src','#');

            }
        })

    })
})

function updateSelectedUser(e){
    let fName = $(e).closest('tr').find('td')[0].innerText;
    let lName = $(e).closest('tr').find('td')[1].innerText;
    let fullName = $(e).closest('tr').find('td')[2].innerText;
    let regNo = $(e).closest('tr').find('td')[3].innerText;
    let sClass = $(e).closest('tr').find('td')[4].innerText;
    let medium = $(e).closest('tr').find('td')[5].innerText;
    let religion = $(e).closest('tr').find('td')[6].innerText;
    let parentName = $(e).closest('tr').find('td')[7].innerText;
    let parentRelation = $(e).closest('tr').find('td')[8].innerText;
    let mobileNumber = $(e).closest('tr').find('td')[9].innerText;
    let studentImage = $(e).closest('tr').find('td')[11].innerText;

    registerObj = {
        fName,
        lName,
        fullName,
        regNo,
        sClass,
        medium,
        religion,
        parentName,
        parentRelation,
        mobileNumber,
        studentImage
    }

    $("#previewImage").attr('src',studentImage);
    let htmlData = `
        First Name: <b>${fName} </b><br/>
        Last Name: <b>${lName}</b><br/>
        Full Name: <b>${fullName}</b><br/>
        Registration Number : <b>${regNo}</b><br/>
        Class: <b>${sClass}</b><br/>
        Medium: <b>${medium}</b><br/>
        Religion: <b>${religion}</b><br/>
        Parent/Guardian's Name: <b>${parentName}</b><br/>
        Relation with Guardian: <b>${parentRelation}</b><br/>
        Mobile Number: <b>${mobileNumber}</b>
    `;
    $('#kycStudentDetails').append(htmlData);

}    
////////bulk user record//////////
$(document).ready(function () {

    let kycStudentDetailList = [];
    let bulkStudentDetailList = [];

    // ajax call to get All KycStudent details
    $.ajax({
        url: `http://localhost:8080/api/v1/admin-bff/kyc-student-records`,
        method: 'GET',
        success: function(data) {
            kycStudentDetailList = data;
            $("#tableBod").empty();
            for (var i = 0; i < kycStudentDetailList.length; i++) {
                var row = $("<tr>");
                row.append($("<td>").text(kycStudentDetailList[i].firstName));
                row.append($("<td>").text(kycStudentDetailList[i].lastName));
                row.append($("<td>").text(kycStudentDetailList[i].fullName));
                row.append($("<td>").text(kycStudentDetailList[i].schoolRegNumber));
                row.append($("<td>").text(kycStudentDetailList[i].classNumber));
                row.append($("<td>").text(kycStudentDetailList[i].medium));
                row.append($("<td>").text(kycStudentDetailList[i].religion));
                row.append($("<td>").text(kycStudentDetailList[i].parentName));
                row.append($("<td>").text(kycStudentDetailList[i].parentRelation));
                row.append($("<td>").text(kycStudentDetailList[i].mobileNumber));
                row.append($("<td>").text('Active'));
                row.append(`<td style="display:none">${kycStudentDetailList[i].studentImage}</td>`)
                row.append(`<td class="hidden-column action-column"><button onclick="updateSelectedUser(this)" class="select-button">Action</button></td>`)

                $("#tableBod").append(row);

                // Apply styles based on KYC status for the last added row
                // var lastRow = $("#btableBod tr:last"); // Updated here
                // var kycStatus = lastRow.find(".kyc-status").text();
                // var selectButton = lastRow.find(".action-column button");

                // if (kycStatus === "Active") {
                //     // KYC is active, set button color to green
                //     selectButton.css("background-color", "green");

                //     // Attach a click event handler to the "Select" button
                //     selectButton.on("click", function () {
                //         // Call the function to handle the "Select" button click
                //         handleSelectButtonClick(data);
                //     });
                // } else {
                //     // KYC is not active, disable the button and set a different color
                //     selectButton.prop("disabled", true);
                //     selectButton.css("background-color", "gray");
                // }
            }
        },
        error: function(req, err) {
            console.log(req);
        }
    });

    // ajax call to get All bulkStudent details
    $.ajax({
        url: `http://localhost:8080/api/v1/admin-bff/bulk-student-records`,
        method: 'GET',
        success: function(data) {
            console.log(data);
            bulkStudentDetailList = data;
            $("#bulktablBody").empty();
            for (var i = 0; i < bulkStudentDetailList.length; i++) {
                var row = $("<tr>");
                row.append($("<td>").text(bulkStudentDetailList[i].firstName));
                row.append($("<td>").text(bulkStudentDetailList[i].lastName));
                row.append($("<td>").text(bulkStudentDetailList[i].fullName));
                row.append($("<td>").text(bulkStudentDetailList[i].schoolRegNumber));
                row.append($("<td>").text(bulkStudentDetailList[i].className));
                row.append($("<td>").text(bulkStudentDetailList[i].medium));
                row.append($("<td>").text(bulkStudentDetailList[i].religion));
                row.append($("<td>").text(bulkStudentDetailList[i].residenceNumber));
                row.append($("<td>").text(bulkStudentDetailList[i].address));
                row.append($("<td>").text(bulkStudentDetailList[i].parentName));
                row.append($("<td>").text(bulkStudentDetailList[i].parentRelation));
                row.append($("<td>").text(bulkStudentDetailList[i].mobileNumber));

                $("#bulktablBody").append(row);

                // // Apply styles based on KYC status for the last added row
                // var lastRow = $("#btableBod tr:last"); // Updated here
                // var kycStatus = lastRow.find(".kyc-status").text();
                // var selectButton = lastRow.find(".action-column button");

                // if (kycStatus === "Active") {
                //     // KYC is active, set button color to green
                //     selectButton.css("background-color", "green");

                //     // Attach a click event handler to the "Select" button
                //     selectButton.on("click", function () {
                //         // Call the function to handle the "Select" button click
                //         handleSelectButtonClick(data);
                //     });
                // } else {
                //     // KYC is not active, disable the button and set a different color
                //     selectButton.prop("disabled", true);
                //     selectButton.css("background-color", "gray");
                // }
            }
        },
        error: function(req, err) {
            console.log(req);
        }
    });


    // Function to handle file upload
    // $("#formFile").change(function (event) {
    //     var file = event.target.files[0];
    //     var reader = new FileReader();
    //     reader.onload = function (e) {
    //         var csv = e.target.result;
    //         var data = $.csv.toArrays(csv);
    //         populateTable(data);
    //     };
    //     reader.readAsText(file);
    // });

    // Function to populate table with data from CSV
    // function populateTable(data) {
    //     // Clear previous data
    //     $("#bulktableBody").empty(); // Updated here

    //     // Loop through each row in the CSV data
    //     for (var i = 0; i < data.length; i++) {
    //         var row = data[i];
    //         var rowData = {
    //             column1: row[0], // Assuming the first column contains First Name
    //             column2: row[1], // Assuming the second column contains Last Name
    //             column3: row[2], // Assuming the third column contains Full Name
    //             column4: row[3], // Assuming the fourth column contains Scl_reg_number
    //             column5: row[4], // Assuming the fifth column contains Class
    //             column6: row[5], // Assuming the sixth column contains Medium
    //             column7: row[6], // Assuming the seventh column contains religion
    //             column8: row[7], // Assuming the eighth column contains Parent Name
    //             column9: row[8], // Assuming the ninth column contains Parent Relation
    //             column10: row[9], // Assuming the tenth column contains Mobile No

    //         };
    //         addRow(rowData); // Add the row to the table
    //     }
    // }

    // Function to add a row to the table
    // function addRow(data) {
    //     var newRow = `<tr>
    //         <td>${data.column1}</td>
    //         <td>${data.column2}</td>
    //         <td>${data.column3}</td>
    //         <td>${data.column4}</td>
    //         <td>${data.column5}</td>
    //         <td>${data.column6}</td>
    //         <td>${data.column7}</td>
    //         <td>${data.column8}</td>
    //         <td>${data.column9}</td>
    //         <td>${data.column10}</td>
           
    //     </tr>`;

    //     // Append the new row to the table body
    //     $("#bulktableBody").append(newRow); // Updated here

    //     // Apply styles based on KYC status for the last added row
    //     var lastRow = $("#bulktableBody tr:last"); // Updated here
    //     var kycStatus = lastRow.find(".kyc-status").text();
    //     var selectButton = lastRow.find(".action-column button");

    //     if (kycStatus === "Active") {
    //         // KYC is active, set button color to green
    //         selectButton.css("background-color", "green");

    //         // Attach a click event handler to the "Select" button
    //         selectButton.on("click", function () {
    //             // Call the function to handle the "Select" button click
    //             handleSelectButtonClick(data);
    //         });
    //     } else {
    //         // KYC is not active, disable the button and set a different color
    //         selectButton.prop("disabled", true);
    //         selectButton.css("background-color", "gray");
    //     }
    // }

    // Function to handle "Select" button click
    // function handleSelectButtonClick(data) {
    //     // Check if KYC status is active
    //     if (data.kycStatus === "Active") {
    //         // Populate kyc_user_record with student data
    //         populateKYCUserRecord(data);

    //         // Populate bulk_user_record with student data
    //         populateBulkUserRecord(data);
    //     } else {
    //         console.log("KYC status is not active for this student.");
    //     }
    // }

    // Function to populate KYC user record
    // Function to populate KYC user record with all columns
    // function populateKYCUserRecord(data) {
    //     // Example: Assuming kyc_user_record is a div with class 'kyc_user_record'
    //     $(".kyc_user_record").empty(); // Clear previous data
    //     // Populate KYC user record with the selected student's data
    //     var kycUserData = `<p>First Name: ${data.column1}</p>
    //              <p>Last Name: ${data.column2}</p>
    //              <p>Full Name: ${data.column3}</p>
    //              <p>Scl_reg_number: ${data.column4}</p>
    //              <p>Class: ${data.column5}</p>
    //              <p>Medium: ${data.column6}</p>
    //              <p>Religion: ${data.column7}</p>
    //              <p>Parent Name: ${data.column8}</p>
    //              <p>Parent Relation: ${data.column9}</p>
    //              <p>Mobile No: ${data.column10}</p>
    //              <p>KYC Status: ${data.kycStatus}</p>
    //              <p>Action: ${data.action}</p>`;
    //     $(".kyc_user_record").append(kycUserData);
    // }

    // Function to populate bulk user record with all columns
    // function populateBulkUserRecord(data) {
    //     // Example: Assuming bulk_user_record is a div with class 'bulk_user_record'
    //     $(".bulk_user_record").empty(); // Clear previous data
    //     // Populate bulk user record with the selected student's data
    //     var bulkUserData = `<p>First Name: ${data.column1}</p>
    //               <p>Last Name: ${data.column2}</p>
    //               <p>Full Name: ${data.column3}</p>
    //               <p>Scl_reg_number: ${data.column4}</p>
    //               <p>Class: ${data.column5}</p>
    //               <p>Medium: ${data.column6}</p>
    //               <p>Religion: ${data.column7}</p>
    //               <p>Parent Name: ${data.column8}</p>
    //               <p>Parent Relation: ${data.column9}</p>
    //               <p>Mobile No: ${data.column10}</p>
    //               <p>KYC Status: ${data.kycStatus}</p>
    //               <p>Action: ${data.action}</p>`;
    //     $(".bulk_user_record").append(bulkUserData);
    // }

    // Function to handle search input
    $(".form-control").on("keyup", function () {
        var value = $(this).val().toLowerCase(); // Get the value of the input and convert it to lowercase
        $("#bulktablBody tr").filter(function () {
            // Filter table rows
            $(this).toggle(
                $(this).find("td:nth-child(4)").text().toLowerCase().indexOf(value) > -1
            ); // Toggle row display based on search value in the fourth column
        });
    });
});



/////////// registered student /////////////

$(document).ready(function () {

    let stuRegDetailList = [];

    // ajax call to add get registered student records
    $.ajax({
        url: `http://localhost:8080/api/v1/admin-bff/register-student`,
        method: 'GET',
        success: function(data) {
        
            console.log(data);

            stuRegDetailList = data;
        
            $("#popupTableBody").empty();

            for (var i = 0; i < stuRegDetailList.length; i++) {
                var row = $("<tr>");
                row.append($("<td>").text(stuRegDetailList[i].regStudId));
                row.append($("<td>").text(stuRegDetailList[i].bulkStudentId));
                row.append($("<td>").text(stuRegDetailList[i].schoolRegNo));
                row.append($("<td>").text(stuRegDetailList[i].fullName));
                row.append($("<td>").text(stuRegDetailList[i].firstName));
                row.append($("<td>").text(stuRegDetailList[i].lastName));
                row.append($("<td>").text(stuRegDetailList[i].classStudy));
                row.append($("<td>").text(stuRegDetailList[i].address));
                row.append($("<td>").text(stuRegDetailList[i].kycStudentId));
                row.append($("<td>").text(stuRegDetailList[i].medium));
                row.append($("<td>").text(stuRegDetailList[i].region));
                row.append($("<td>").text(stuRegDetailList[i].parentName));
                row.append($("<td>").text(stuRegDetailList[i].parentRelations));
                row.append($("<td>").text(stuRegDetailList[i].mobileNumber));
                row.append($("<td>").text(stuRegDetailList[i].residenceNumber));

                $("#popupTableBody").append(row);
            }
        // loadTablePapers();
        },
        error: function(req, err) {
        console.log(req);
        }
    });

    // Show popup when the "Show Popup" button is clicked
    $("#showPopupBtn").click(function () {
        // updateTable();
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

    // var dataset = []; // Initialize an empty dataset

    // Function to initialize the table with the provided dataset
    // function initializeTable(data) {
    //     // dataset = data; // Set the dataset

    //     // Initialize filter options if needed

    //     // Show popup when the "Show Popup" button is clicked
    //     $("#showPopupBtn").click(function () {
    //         updateTable();
    //         $("#popupTable").toggle();
    //     });

    //     // Add data when the "Add Data" button is clicked
    //     $("#addDataBtn").click(function () {
    //         addRandomData();
    //         updateTable();
    //     });

    //     // Download table data when the "Download Table Data" button is clicked
    //     $("#downloadDataBtn").click(function () {
    //         downloadTableData();
    //     });
    // }

    // Function to update the table based on the dataset
    // function updateTable() {
    //     $("#popupTableBody").empty();

    //     for (var i = 0; i < dataset.length; i++) {
    //         var row = $("<tr>");
    //         row.append($("<td>").text(dataset[i].bulkStudentId));
    //         row.append($("<td>").text(dataset[i].registeredId));
    //         row.append($("<td>").text(dataset[i].schoolRegNo));
    //         row.append($("<td>").text(dataset[i].fullName));
    //         row.append($("<td>").text(dataset[i].firstName));
    //         row.append($("<td>").text(dataset[i].lastName));
    //         row.append($("<td>").text(dataset[i].class));
    //         row.append($("<td>").text(dataset[i].address));
    //         row.append($("<td>").text(dataset[i].kycId));
    //         row.append($("<td>").text(dataset[i].medium));
    //         row.append($("<td>").text(dataset[i].region));
    //         row.append($("<td>").text(dataset[i].parentName));
    //         row.append($("<td>").text(dataset[i].parentRelations));
    //         row.append($("<td>").text(dataset[i].mobileNo));
    //         row.append($("<td>").text(dataset[i].residenceTel));

    //         $("#popupTableBody").append(row);
    //     }
    // }

    // Function to add random data to the dataset
    // function addRandomData() {
    //     var randomData = {
    //         bulkStudentId: generateRandomId(),
    //         registeredId: generateRandomId(),
    //         schoolRegNo: generateRandomId(),
    //         fullName: "Random Name " + Math.floor(Math.random() * 100),
    //         firstName: "Random First Name",
    //         lastName: "Random Last Name",
    //         class: "Class " + Math.floor(Math.random() * 10),
    //         address: "Random Address",
    //         kycId: generateRandomId(),
    //         medium: "Medium " + Math.floor(Math.random() * 5),
    //         region: "Region " + Math.floor(Math.random() * 5),
    //         parentName: "Random Parent Name",
    //         parentRelations: "Random Relation",
    //         mobileNo: "Random Mobile No",
    //         residenceTel: "Random Residence Tel",
    //     };

    //     dataset.push(randomData);
    // }

    // Function to generate a random ID
    // function generateRandomId() {
    //     return Math.random().toString(36).substr(2, 9); // Generates a random alphanumeric string
    // }

    // Function to download table data as CSV
    function downloadTableData() {
        var csvContent = "data:text/csv;charset=utf-8,";
        csvContent +=
            "Bulk Student Id,Registered Id,School reg No,Full Name,First Name,Last Name,Class,Address,Kyc Id,Medium,Region,Parent Name,Parent Relations,Mobile No,Residence tel\n";

        stuRegDetailList.forEach(function (row) {
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
    // var exampleData = [
    //     {
    //         bulkStudentId: "BSID001",
    //         registeredId: "RID001",
    //         schoolRegNo: "SRN001",
    //         fullName: "John Doe",
    //         firstName: "John",
    //         lastName: "Doe",
    //         class: "Class A",
    //         address: "123 Main St",
    //         kycId: "KYC001",
    //         medium: "English",
    //         region: "North",
    //         parentName: "Jane Doe",
    //         parentRelations: "Parent",
    //         mobileNo: "1234567890",
    //         residenceTel: "0987654321",
    //     },
    //     {
    //         bulkStudentId: "BSID002",
    //         registeredId: "RID002",
    //         schoolRegNo: "SRN002",
    //         fullName: "Jane Smith",
    //         firstName: "Jane",
    //         lastName: "Smith",
    //         class: "Class B",
    //         address: "456 Oak St",
    //         kycId: "KYC002",
    //         medium: "French",
    //         region: "South",
    //         parentName: "John Smith",
    //         parentRelations: "Parent",
    //         mobileNo: "9876543210",
    //         residenceTel: "0123456789",
    //     },
    // ];

    // Initialize the table with the example dataset
    // initializeTable(exampleData);
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
