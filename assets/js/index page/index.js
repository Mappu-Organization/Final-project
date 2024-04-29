//////////////// passpaper table body dynamicaly change/////////////////

document.addEventListener("DOMContentLoaded", function () {
  let paperIdCounter = 1; // Counter to generate unique IDs for papers

  const requestButtons = document.querySelectorAll(
    ".passpaper_view .pdf_description a"
  );

  requestButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      const parentPasspaperView = button.closest(".passpaper_view");
      const imageSrc = parentPasspaperView
        .querySelector("img")
        .getAttribute("src");
      const paperDetails =
        parentPasspaperView.querySelector(".pdf_description p").textContent;

      const paperId = `Paper${paperIdCounter++}`; // Generating dummy Paper ID

      const newRow = document.createElement("tr");
      newRow.innerHTML = `
                <td>${paperId}</td>
                <td>${paperDetails}</td>
                <td>Paper Type</td>
                <td>
                    <a href="${imageSrc}" download>
                        <button>Pending</button>
                    </a>
                </td>
            `;

      const tableBody = document.getElementById("paperTableBody");
      tableBody.appendChild(newRow);
    });
  });
});


//////////// Exam Results And Attendence////////////////

document.addEventListener("DOMContentLoaded", function () {
  var yearSelection = document.getElementById("yearSelection");
  var termSelection = document.getElementById("termSelection");

  yearSelection.addEventListener("change", function () {
    updateResults(yearSelection.value, termSelection.value);
  });

  termSelection.addEventListener("change", function () {
    updateResults(yearSelection.value, termSelection.value);
  });

  // Initial rendering of table and chart
  updateResults("2022", "term1"); // Initial year and term
});

function updateResults(selectedYear, selectedTerm) {
  fetchResults(selectedYear, selectedTerm)
    .then((data) => {
      updateTableWithData(data);
      updateChartWithData(data);
      calculateAverage(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function fetchResults(year, term) {
  return new Promise((resolve, reject) => {
    // Simulated data for different years and terms
    let data = [];

    if (year === "2022" && term === "term1") {
      data = [
        { subject: "Mathematics", result: 85 },
        { subject: "Science", result: 20 },
        { subject: "English", result: 20 },
        { subject: "History", result: 75 },
        { subject: "Geography", result: 80 },
        { subject: "Sinhala", result: 60 },
        { subject: "Tamil", result: 88 },
        { subject: "Art", result: 76 },
        { subject: "Information Technology", result: 92 },
      ];
    } else if (year === "2022" && term === "term2") {
      data = [
        { subject: "Mathematics", result: 85 },
        { subject: "Science", result: 78 },
        { subject: "English", result: 70 },
        { subject: "History", result: 75 },
        { subject: "Geography", result: 80 },
        { subject: "Sinhala", result: 60 },
        { subject: "Tamil", result: 88 },
        { subject: "Art", result: 76 },
        { subject: "Information Technology", result: 92 },
      ];
    } else if (year === "2022" && term === "term3") {
      data = [
        { subject: "Mathematics", result: 85 },
        { subject: "Science", result: 78 },
        { subject: "English", result: 70 },
        { subject: "History", result: 75 },
        { subject: "Geography", result: 80 },
        { subject: "Sinhala", result: 60 },
        { subject: "Tamil", result: 88 },
        { subject: "Art", result: 76 },
        { subject: "Information Technology", result: 92 },
      ];
    }

    if (year === "2023" && term === "term1") {
      data = [
        { subject: "Mathematics", result: 85 },
        { subject: "Science", result: 78 },
        { subject: "English", result: 70 },
        { subject: "History", result: 75 },
        { subject: "Geography", result: 80 },
        { subject: "Sinhala", result: 60 },
        { subject: "Tamil", result: 88 },
        { subject: "Art", result: 76 },
        { subject: "Information Technology", result: 92 },
      ];
    } else if (year === "2023" && term === "term2") {
      data = [
        { subject: "Mathematics", result: 85 },
        { subject: "Science", result: 78 },
        { subject: "English", result: 70 },
        { subject: "History", result: 75 },
        { subject: "Geography", result: 80 },
        { subject: "Sinhala", result: 60 },
        { subject: "Tamil", result: 88 },
        { subject: "Art", result: 76 },
        { subject: "Information Technology", result: 92 },
      ];
    } else if (year === "2023" && term === "term3") {
      data = [
        { subject: "Mathematics", result: 85 },
        { subject: "Science", result: 50 },
        { subject: "English", result: 49 },
        { subject: "History", result: 75 },
        { subject: "Geography", result: 80 },
        { subject: "Sinhala", result: 60 },
        { subject: "Tamil", result: 44 },
        { subject: "Art", result: 49 },
        { subject: "Information Technology", result: 92 },
      ];
    }
    // Add conditions for other years and terms if needed

    // Simulate a delay in fetching data (remove this in actual implementation)
    setTimeout(() => {
      resolve(data);
    }, 500); // Simulating 500ms delay for fetching data
  });
}
//

function updateTableWithData(data) {
  var tableBody = document.querySelector("#resultsTable tbody");
  tableBody.innerHTML = "";

  data.forEach((item) => {
    var row = document.createElement("tr");
    var percentage = ((item.result / 100) * 100).toFixed(2);
    row.innerHTML = `
      <td>${item.subject}</td>
      <td>${item.result}</td>
      <td>${percentage}%</td>
    `;
    tableBody.appendChild(row);
  });
}

function calculateAverage(data) {
  var sum = data.reduce((acc, item) => acc + item.result, 0);
  var average = (sum / data.length).toFixed(2);

  document.getElementById("averageResult").innerText = average;
}

function updateChartWithData(data) {
  var ctx = document.getElementById("myChart").getContext("2d");

  var chartData = {
    labels: data.map((item) => item.subject),
    values: data.map((item) => item.result),
    colors: data.map((item) => {
      if (item.result < 50) {
        return "#FF0000"; // Set red color for results less than 50
      } else if (item.result > 50) {
        return "#0000FF"; // Set blue color for results greater than 50
      } else {
        return generateRandomColor(); // Use a random color for other cases (if result equals 50)
      }
    }),
  };

  // Destroy previous chart if it exists
  if (window.myPieChart !== undefined) {
    window.myPieChart.destroy();
  }

  window.myPieChart = createPieChart(ctx, chartData);
}

// Function to create the pie chart using Chart.js
function createPieChart(ctx, data) {
  var pieChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.labels,
      datasets: [
        {
          backgroundColor: data.colors,
          data: data.values,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Subject Results",
      },
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1, // Aspect ratio of 1 maintains a square chart
      // You can adjust the aspectRatio to your desired value for the height
    },
  });

  return pieChart;
}

function generateRandomColors(count) {
  var colors = [];
  for (var i = 0; i < count; i++) {
    colors.push(getRandomColor());
  }
  return colors;
}

function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}



////////////end results sheet


//////////////////// Attendece table /////////////////////////////

// Sample data for 7 days (you can replace this with your actual data)
const attendanceData = [];

// Generating attendance data for 7 days
for (let i = 1; i <= 7; i++) {
  const day = i < 10 ? `Day 0${i}` : `Day ${i}`;
  const attended = Math.random() < 0.5; // Adjust this probability as needed
  const description = `Description for ${day}`; // Replace this with your description logic
  attendanceData.push({
    date: day,
    attended: attended,
    description: description,
  });
}

// Function to populate the table with attendance data
function populateTable(data) {
  const tableBody = document.querySelector("#attendanceTable tbody");
  tableBody.innerHTML = "";

  data.forEach((entry) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.date}</td>
      <td>${entry.attended ? "Present" : "Absent"}</td>
      <td>${entry.description}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Call the populateTable function with attendanceData
populateTable(attendanceData);

///////////LOGING PAGE AND INDEX LINK
function login() {
  // You can add login logic here if required

  // Redirect to index.html after login button is clicked
  window.location.href = "index.html";
}

// Function to generate a chart based on attendance data
function generateChart(data) {
  const dates = data.map((entry) => entry.date);
  const attendance = data.map((entry) => (entry.attended ? 1 : 0));

  const ctx = document.getElementById("attendanceChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Attendance",
          data: attendance,
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 1,
          ticks: {
            stepSize: 1,
            callback: (value) => (value === 1 ? "Present" : "Absent"),
          },
        },
      },
    },
  });
}

// Usage:
// Populate the table and generate the chart with the attendance data
populateTable(attendanceData);
generateChart(attendanceData);

$(document).ready(function () {

  console.log('first ready');

  const numVisibleColumns = 8;
  const columnWidth = 100; // Set the width of each column
  const $table = $(".scrollable-table table");
  const $hiddenColumns = $table.find(".hidden-column");
  let columnsRevealed = 0;

  // Update visibility based on columns revealed
  function updateVisibility() {
    $hiddenColumns.slice(0, columnsRevealed).show();
    $hiddenColumns.slice(columnsRevealed).hide();
  }

  // Previous and Next buttons
  $("#prevBtn").on("click", function () {
    if (columnsRevealed > 0) {
      columnsRevealed--;
      updateVisibility();
      $table.animate(
        {
          scrollLeft: `-=${columnWidth}`,
        },
        "slow"
      );
    }
  });

  $("#nextBtn").on("click", function () {
    if (columnsRevealed < $hiddenColumns.length) {
      $hiddenColumns.eq(columnsRevealed).show();
      columnsRevealed++;
      $table.animate(
        {
          scrollLeft: `+=${columnWidth}`,
        },
        "slow"
      );
    }
  });

  // Initial visibility setup
  updateVisibility();

  // Function to populate the table with dummy data
  function populateTableWithDummyData() {
    // Dummy data array
    var dummyData = [
      {
        column1: "Data 1",
        column2: "Data 2",
        column3: "Data 3",
        column4: "Data 4",
        column5: "Data 5",
        column6: "Data 6",
        column7: "Data 7",
        column8: "Data 8",
        column9: "Data 9",
        column10: "Data 10",
        kycStatus: "Active",
        action: "Action Data",
      },
      // Add more dummy data objects as needed
    ];

    // Iterate through the dummy data and add rows to the table
    dummyData.forEach((item) => {
      addRow(item);
    });
  }

  // Function to add a new row to the table body
  function addRow(data) {
    var newRow =
      "<tr>" +
      "<td>" +
      data.column1 +
      "</td>" +
      "<td>" +
      data.column2 +
      "</td>" +
      "<td>" +
      data.column3 +
      "</td>" +
      "<td>" +
      data.column4 +
      "</td>" +
      "<td>" +
      data.column5 +
      "</td>" +
      "<td>" +
      data.column6 +
      "</td>" +
      "<td>" +
      data.column7 +
      "</td>" +
      "<td>" +
      data.column8 +
      "</td>" +
      '<td class="hidden-column">' +
      data.column9 +
      "</td>" +
      '<td class="hidden-column">' +
      data.column10 +
      "</td>" +
      '<td class="hidden-column">' +
      data.kycStatus +
      "</td>" +
      '<td class="hidden-column">' +
      data.action +
      "</td>" +
      "</tr>";

    // Append the new row to the table body
    $("#tableBody").append(newRow);
  }

  // Call the function to populate the table with dummy data
  populateTableWithDummyData();
});

 
//////////// REQUEST ///////////

function addNotification() {
  var request_type = document.getElementById("requestType").value;
  var request_date = document.getElementById("date").value;
  var request_description = document.getElementById("description").value;
  // var userId = document.getElementById("stuid").value;
  // var userId = $("#stuid").val();
  const stuInfoString = localStorage.getItem("studentInfo");
  // Parse the JSON string back to an object
  const studentInfo = JSON.parse(stuInfoString);

  let notificationRequestDto = {
    userDto:{
      userId:studentInfo.userId
    },
    requestType:request_type,
    date:request_date,
    description:request_description
  }

  console.log(notificationRequestDto);


  // AJAX call to add the student record
  $.ajax({
    url: "http://localhost:8080/api/v1/admin-bff/request/notification/save",
    method: "POST",
    data: JSON.stringify(notificationRequestDto),
    contentType: 'application/json',
    success: function(data) {
        console.log("Response from Server:", data);
        // clearData();
        // window.location.href = "dashboard.html";
    },
    error: function(req, err) {
        console.log("Error:", req, err);
    }
  });

  // var tableBody = document.getElementById("notificationTableBody");
  // var newRow = tableBody.insertRow();

  // var cell1 = newRow.insertCell(0);
  // var cell2 = newRow.insertCell(1);
  // var cell3 = newRow.insertCell(2);
  // var cell4 = newRow.insertCell(3);

  // cell1.innerHTML = title;
  // cell2.innerHTML = date;
  // cell3.innerHTML = description;
  // cell4.innerHTML = "Pending";
}
//////////end Request


// page change
const activeButtons = document.querySelectorAll(".sec_button");
const panels = document.querySelectorAll(".pannel");

activeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const clickedButton = button;
    const buttonId = clickedButton.id;

    

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

////////TABLE TO LOAD DATA ADD BOOK//////////////////

//  function updateTableAddBook() {
//    // Get form values
//    var bookId = document.getElementById("bookId").value.trim();
//    var bookName = document.getElementById("bookName").value.trim();
//    var bookDescription = document
//      .getElementById("bookDescription")
//      .value.trim();
//    var bookType = document.getElementById("bookType").value;

//    // Check if any field is missing
//    if (!bookId || !bookName || !bookDescription || bookType === "none") {
//      alert("Please fill in all required fields.");
//      return false; // Stop execution and prevent form submission if any field is missing
//    }

//    // Proceed with adding to the table
//    var table = document
//      .getElementById("bookTable")
//      .getElementsByTagName("tbody")[0];
//    var newRow = table.insertRow();

//    // Insert cells and assign them the input values
//    var cell1 = newRow.insertCell(0);
//    var cell2 = newRow.insertCell(1);
//    var cell3 = newRow.insertCell(2);
//    var cell4 = newRow.insertCell(3);

//    cell1.innerHTML = bookId;
//    cell2.innerHTML = bookName;
//    cell3.innerHTML = bookDescription;
//    // Optionally show a user-friendly value for the book type
//    cell4.innerHTML = bookType === "pdf" ? "PDF" : "Hard Copy";

//    // Reset form for next input, ensuring book type defaults back properly
//    document.getElementById("bookId").value = "";
//    document.getElementById("bookName").value = "";
//    document.getElementById("bookDescription").value = "";
//    document.getElementById("bookType").selectedIndex = 0; // Reset to the first option

//    // Optionally, you might want to hide the file uploader if it's not relevant
//    document.getElementById("fileUploader").style.display = "none";

//    alert("Book details saved successfully!");
//    return false; // Prevent form submission
//  }


$(document).ready(function () {

  console.log('second ready');

  // Initialize slick slider
  var slider = $(".form_slide");

  slider.slick({
    // Slick options
    dots: false,
    customPaging: function (slider, i) {
      return '<button class="custom-dot"></button>';
    },
    prevArrow:
      '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
    nextArrow:
      '<button class="slick-next" aria-label="Next" type="button">Next</button>',
    autoplaySpeed: 2500,
    autoplay: false,
    fade: true,
    fadeSpeed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          prevArrow:
            '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
          nextArrow:
            '<button class="slick-next" aria-label="Next" type="button">Next</button>',
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          prevArrow:
            '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
          nextArrow:
            '<button class="slick-next" aria-label="Next" type="button">Next</button>',
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          prevArrow:
            '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
          nextArrow:
            '<button class="slick-next" aria-label="Next" type="button">Next</button>',
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  // Set the "Next" button to trigger the slider's next slide action
  $("#nextBtn1").click(function () {
    slider.slick("slickNext");
  });

  $("#nextBtn2").click(function () {
    slider.slick("slickNext");
  });

  $("#nextBtn3").click(function () {
    slider.slick("slickNext");
  });
});

function upload() {
  var imgcanvas = document.getElementById("canv1");
  var fileinput = document.getElementById("finput");
  var image = new SimpleImage(fileinput);
  image.drawTo(imgcanvas);
}

(function () {
  ("use strict");

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: "smooth",
    });
  };

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("body").classList.toggle("mobile-nav-active");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let body = select("body");
        if (body.classList.contains("mobile-nav-active")) {
          body.classList.remove("mobile-nav-active");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });


  /////// WEEKLY ATTENDECE TO DATA ADD

  $(document).ready(function () {
    // AJAX request to fetch data
    $.ajax({
      url: "your_backend_endpoint_url_here", // Replace with your backend endpoint URL
      method: "GET", // Use GET method to fetch data
      success: function (response) {
        // On success, populate the table with received data
        populateAttendanceTable(response);
      },
      error: function (xhr, status, error) {
        // Handle errors if any
        console.error(error);
      },
    });

    // Function to populate the attendance table with received data
    function populateAttendanceTable(data) {
      const tableBody = $("#attendance_table_body");

      // Clear existing table rows
      tableBody.empty();

      // Loop through received data and add rows to the table
      data.forEach((item) => {
        const row = `
          <tr>
            <td>${item.date}</td>
            <td>${item.attendance}</td>
          </tr>
        `;
        tableBody.append(row);
      });
    }
  });

  /**
   * Hero type effect
   */
  const typed = select(".typed");
  if (typed) {
    let typed_strings = typed.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /**
   * passpaper filter
   */
  // window.addEventListener("load", () => {
  //   let languageContainer = select(".passpaper_co");
  //   if (languageContainer) {
  //     let lanIsotope = new Isotope(languageContainer, {
  //       itemSelector: ".passpaper_view",
  //     });

  //     let lanFilters = select("#language-flters li", true);

  //     on(
  //       "click",
  //       "#language-flters li",
  //       function (e) {
  //         e.preventDefault();
  //         lanFilters.forEach(function (el) {
  //           el.classList.remove("filter-active");
  //         });
  //         this.classList.add("filter-active");

  //         lanIsotope.arrange({
  //           filter: this.getAttribute("data-filter"),
  //         });
  //         lanIsotope.on("arrangeComplete", function () {
  //           AOS.refresh();
  //         });
  //       },
  //       true
  //     );
  //   }
  // });



  ///////////LIBRARY TABLE CHANGE
  document.addEventListener("DOMContentLoaded", function () {
    let paperIdCounter = 1; // Counter to generate unique IDs for papers

    const requestButtons = document.querySelectorAll(
      ".passpaper_view .library_description a"
    );

    requestButtons.forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.preventDefault();

        const parentPasspaperView = button.closest(".passpaper_view");
        const imageSrc = parentPasspaperView
          .querySelector("img")
          .getAttribute("src");
        const paperDetails = parentPasspaperView.querySelector(
          ".library_description p"
        ).textContent;

        const paperId = `Paper${paperIdCounter++}`; // Generating dummy Paper ID

        const newRow = document.createElement("tr");
        newRow.innerHTML = `
                <td>${paperId}</td>
                <td>${paperDetails}</td>
                <td>Paper Type</td>
                <td>
                    <a href="${imageSrc}" download>
                        <button>Pending</button>
                    </a>
                </td>
            `;

        const tableBody = document.getElementById("libraryTable");
        tableBody.appendChild(newRow);
      });
    });
  });

  //   // password show and hide
  //   document.addEventListener("DOMContentLoaded", function () {
  //     const togglePassword = document.querySelector(".toggle-password");
  //     const eye = document.querySelector(".fas");
  //     const passwordField = document.getElementById("password");
  //     const icon = document.querySelector(".toggle-password i");
  //     eye.addEventListener("click", function () { });
  //     // Add a click event listener to toggle password visibility
  //     togglePassword.addEventListener("click", function () {
  //       if (passwordField.type === "password") {
  //         passwordField.type = "text";
  //         icon.classList.remove("fa-eye");
  //         icon.classList.add("fa-eye-slash");
  //       } else {
  //         passwordField.type = "password";
  //         icon.classList.remove("fa-eye-slash");
  //         icon.classList.add("fa-eye");
  //       }
  //     });
  //   });

  /**
   *  passpaper button
   */
  const portfolioLightbox = GLightbox({
    selector: ".passpaper-button",
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();
})();

///////STUDENT DETAILS///////////////
$(document).ready(function () {

  // Retrieve userInfo from localStorage
  const stuInfoString = localStorage.getItem("studentInfo");
  // Parse the JSON string back to an object
  const studentInfo = JSON.parse(stuInfoString);

  console.log('thired ready');

  $("#stuFullName").text(studentInfo.fullName);
  $("#stuid").text(studentInfo.userId);

  let imgElement = document.getElementById("prImageField").getElementsByTagName("img")[0];
  // Set the src attribute of the img element to the URL of the image
  imgElement.src = studentInfo.studentImage;

  // Icon click event handler
  $("#userIcon").click(function () {
    // Show the modal
    
    // Populate modal with data
    $("#ekycNumber").text(studentInfo.ekycNumber);
    $("#bulkNumber").text(studentInfo.bulkNumber);
    $("#RegisterdNumber").text(studentInfo.userName);
    $("#firstName").text(studentInfo.firstName);
    $("#lastName").text(studentInfo.lastName);
    $("#fullName").text(studentInfo.fullName);
    $("#registrationNumber").text(+ studentInfo.userName);
    $("#classMedium").text(studentInfo.className +" " + studentInfo.medium);
    $("#religion").text(studentInfo.religion);
    $("#parentName").text(studentInfo.parentName);
    $("#parentRelation").text(studentInfo.parentRelation);
    $("#mobileNumber").text(studentInfo.mobileNumber);
    $("#residenceNumber").text(studentInfo.residenceNumber);
    $("#address").text(studentInfo.address);
  });
});
