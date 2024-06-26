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
  // updateResults("2022", "term1"); // Initial year and term
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
    let regStuId = $("#regStuId").text();
    console.log(regStuId);
    let data = [];

    // ajax call to get all papers
    $.ajax({
      url: `http://localhost:8080/api/v1/admin-bff/examresult/${regStuId}/${year}/${term}`,
      method: "GET",
      success: function(response) {
        console.log(response);
        data = response;
      },
      error: function(req, err) {
        console.log(req);
      }
    });

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
        return "#cfb018"; // Use a random color for other cases (if result equals 50)
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


$(document).ready(function () {

  // console.log('first ready');

  $('#currDateTime').text(new Date().toLocaleString());

  // getStudentTimeTable();


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

  $("#logOutBtn").on("click", function() {
    console.log("log out btn click");
    // Remove the userInfo item from localStorage
    localStorage.removeItem("studentInfo");
    window.location.href = "logingform.html";
});

});

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

  // console.log('thired ready');

  $("#stuFullName").text(studentInfo.fullName);
  $("#userId").text(studentInfo.userId);
  $("#stuRegId").text(studentInfo.studentRegisterId);
  $("#regStuId").text(studentInfo.registerStuId);

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

$(document).ready(function () {

  // console.log('second ready');

  getStudentAttendenceDetails();
  getAttendenceForSection();

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

function getStudentAttendenceDetails() {
  var stuId = $("#regStuId").text();
  // ajax call to get all papers
  $.ajax({
    url: `http://localhost:8080/api/v1/admin-bff/attendance/${stuId}`,
    method: "GET",
    success: function(data) {

      // console.log(data);
      
      let attendanceList = data;

      const tableBody = $("#stuAttendenceTable");

      tableBody.empty();

      attendanceList.forEach((attendance) => {
        const row = $("<tr>");

        row.html(`
            <td>${attendance.date}</td>
            <td>${attendance.status}</td>`);

            tableBody.append(row);

        });

    },
    error: function(req, err) {
      console.log(req);
    }
  });

}

function getStudentTimeTable() {
  var stuRegId = $("#regStuId").text();
  // ajax call to get all papers
  // $.ajax({
    // url: `http://localhost:8080/api/v1/admin-bff/timetable/${stuRegId}`,
    // method: "GET",
    // success: function(data) {

      // console.log(data);
      
      // let attendanceList = data;

      // const tableBody = $("#tblTimrTable");

      // tableBody.empty();

      // attendanceList.forEach((attendance) => {
      //   const row = $("<tr>");

      //   row.html(`
      //       <td>${attendance.date}</td>
      //       <td>${attendance.status}</td>`);

      //       tableBody.append(row);

      //   });

    // },
    // error: function(req, err) {
      // console.log(req);
    // }
  // });
}

function getAttendenceForSection() {
  var stuId = $("#regStuId").text();
  console.log(stuId);
  // ajax call to get all papers
  $.ajax({
    url: `http://localhost:8080/api/v1/admin-bff/attendance/${stuId}`,
    method: "GET",
    success: function(data) {

      console.log('attendance section data');
      console.log(data);
      
      let attendanceList = data;

      const tableBody = $("#attendanceTableSection");

      tableBody.empty();

      attendanceList.forEach((attendance) => {
        const row = $("<tr>");

        row.html(`
            <td>${attendance.date}</td>
            <td>${attendance.status}</td>`);

            tableBody.append(row);

        });

    },
    error: function(req, err) {
      console.log(req);
    }
  });
}
