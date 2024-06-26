jQuery(document).ready(function ($) {

  $(".error-message1").hide();

  var $form_modal = $(".user-modal"),
    $form_login = $form_modal.find("#login"),
    $form_signup = $form_modal.find("#signup"),
    $form_forgot_password = $form_modal.find("#reset-password"),
    $form_modal_tab = $(".switcher"),
    $tab_login = $form_modal_tab.children("li").eq(0).children("a"),
    $tab_signup = $form_modal_tab.children("li").eq(1).children("a"),
    $forgot_password_link = $form_login.find(".form-bottom-message a"),
    $back_to_login_link = $form_forgot_password.find(".form-bottom-message a"),
    $new_account_link = $form_modal.find("ul.switcher li:nth-child(2) a"); // Selecting "New account" link

  // Function to hide all forms except for the specified one
  // function showForm(formToShow) {
  //   $form_modal
  //     .find("div[id^=signup], div[id^=login], div[id^=reset-password]")
  //     .removeClass("is-selected");
  //   formToShow.addClass("is-selected");
  // }

  // Function to show the "Reset password" form
  // function resetPasswordForm() {
  //   showForm($form_forgot_password);
  //   // Trigger a click on the "New account" link
  //   $new_account_link.click();
  // }

  // Click event handler for "New account" link
  $new_account_link.on("click", function (event) {
    event.preventDefault();
    // resetPasswordForm(); // Show "Reset password" form
  });

  //close modal
  $(".user-modal").on("click", function (event) {
    if ($(event.target).is($form_modal) || $(event.target).is(".close-form")) {
      $form_modal.removeClass("is-visible");
    }
  });

  //close modal when clicking the esc keyboard button
  $(document).keyup(function (event) {
    if (event.which == "27") {
      $form_modal.removeClass("is-visible");
    }
  });

  //switch from a tab to another
  $form_modal_tab.on("click", function (event) {
    event.preventDefault();
    $(event.target).is($tab_login) ? login_selected() : signup_selected();
  });

  //hide or show password
  $(".hide-password").on("click", function () {
    var $this = $(this),
      $password_field = $this.prev("input");

    "password" == $password_field.attr("type")
      ? $password_field.attr("type", "text")
      : $password_field.attr("type", "password");
    "Show" == $this.text() ? $this.text("Hide") : $this.text("Show");
    //focus and move cursor to the end of input field
    $password_field.putCursorAtEnd();
  });

  //show forgot-password form
  $forgot_password_link.on("click", function (event) {
    event.preventDefault();
    forgot_password_selected();
  });

  //back to login from the forgot-password form
  $back_to_login_link.on("click", function (event) {
    event.preventDefault();
    // login_selected();
  });

  function login_selected() {
    $form_login.addClass("is-selected");
    $form_signup.removeClass("is-selected");
    $form_forgot_password.removeClass("is-selected");
    $tab_login.addClass("selected");
    $tab_signup.removeClass("selected");
  }

  function signup_selected() {
    $form_login.removeClass("is-selected");
    $form_signup.addClass("is-selected");
    $form_forgot_password.removeClass("is-selected");
    $tab_login.removeClass("selected");
    $tab_signup.addClass("selected");
  }

  function forgot_password_selected() {
    $form_login.removeClass("is-selected");
    $form_signup.removeClass("is-selected");
    $form_forgot_password.addClass("is-selected");
  }

  $form_login.find('input[type="submit"]').on("click", function (event) {
    event.preventDefault();

    let stuRegNumber = $form_login.find('input[type="text"]').val();
    let password = $form_login.find('input[type="password"]').val();

    if (stuRegNumber && password) {

      console.log(stuRegNumber);
      console.log(password);

      $.ajax({
        url: `http://localhost:8080/api/v1/admin-bff/login/student?userName=${stuRegNumber}&password=${password}`,
        method: "GET",
        // dataType: "json",
        success: function(data) {
          if(data != "User Not Found"){
            // console.log(data);
            const stringifiedObj = JSON.stringify(data)
            localStorage.setItem("studentInfo",stringifiedObj);
            window.location.href = "index.html";
          }else{
            console.log("data: - " + data);
          }
        },
        error: function(req, err) {
          console.log(req);
        }
      });

    }else {
        $form_login
      .find('input[type="text"]')
      .toggleClass("has-error")
      .next("span")
      .toggleClass("is-visible");

    $form_login
      .find('input[type="password"]')
      .toggleClass("has-error")
      .next("span")
      .toggleClass("is-visible");
    }
  });

  // Use jQuery to select the dropdown menu
  let dropdown = $("#signup .dropdown-menu");

  // Add a click event listener to the dropdown items
  dropdown.find(".dropdown-item").on("click", function() {
      // Get the text of the clicked item
      let selectedValue = $(this).text();
      
      // Log the selected value
      console.log(selectedValue);

      $("#drop-select-value").text(selectedValue);

      let value = $form_login.find('#drop-select-value').val();
      console.log(value);
  });

  $form_signup.find('input[type="submit"]').on("click", function (event) {
    event.preventDefault();

    console.log('clicked');

    //first method
    // let stuRegNumber = $form_login.find('input[type="text"]').val();
    // let password = $form_login.find('input[type="password"]').val();
    
    //second method
    var regStuId = $("#signup-reg-id").val();
    var fullName = $("#signup-fullname").val();
    var userName = $("#signup-username").val();
    var password = $("#signup-password").val();
    // var user = $("#drop-select-value").val();
    var user = $form_login.find('#drop-select-value').val();
    
    // if (fullName && userName && password && user) {

      let userDto = {
        fullName: fullName,
        userName: userName,
        password: password,
        rolesDto: {
          id: 2,
          roleName: "student"
        },
        registerStudentId: regStuId
      }

      console.log(userDto);

      $.ajax({
        url: `http://localhost:8080/api/v1/admin-bff/register`,
        method: "POST",
        contentType: 'application/json',
        data: JSON.stringify(userDto),
        success: function(data) {
          console.log(data);
        },
        error: function(req, err) {
          console.log(req);
        }
      });

    // }
    // $form_signup
    //   .find('input[type="email"]')
    //   .toggleClass("has-error")
    //   .next("span")
    //   .toggleClass("is-visible");
  });


  //onclick to check enterd student regid is exist
  $('#submitBtn').click(function() {

    var regStuId = $("#signup-reg-id").val();

    // ajax call to check student reg id
    $.ajax({
      url: `http://localhost:8080/api/v1/admin-bff/register/check-reg-id?studentRegId=${regStuId}`,
      method: "GET",
      success: function(data) {
        // console.log(data);
        if (data === false) {
          $(".error-message1").show();
          // $(".fieldset input").prop("disabled", true);
      } else {
          $(".error-message1").hide();
          // $(".fieldset input").prop("disabled", false);
      }
      },
      error: function(req, err) {
        console.log(req);
      }
  });

  });

  //IE9 placeholder fallback
  //credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
  if (!Modernizr.input.placeholder) {
    $("[placeholder]")
      .focus(function () {
        var input = $(this);
        if (input.val() == input.attr("placeholder")) {
          input.val("");
        }
      })
      .blur(function () {
        var input = $(this);
        if (input.val() == "" || input.val() == input.attr("placeholder")) {
          input.val(input.attr("placeholder"));
        }
      })
      .blur();
    $("[placeholder]")
      .parents("form")
      .submit(function () {
        $(this)
          .find("[placeholder]")
          .each(function () {
            var input = $(this);
            if (input.val() == input.attr("placeholder")) {
              input.val("");
            }
          });
      });
  }



});
//credits https://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
jQuery.fn.putCursorAtEnd = function () {
  return this.each(function () {
    // If this function exists...
    if (this.setSelectionRange) {
      // ... then use it (Doesn't work in IE)
      // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
      var len = $(this).val().length * 2;
      this.setSelectionRange(len, len);
    } else {
      // ... otherwise replace the contents with itself
      // (Doesn't work in Google Chrome)
      $(this).val($(this).val());
    }
  });
};

//  $(document).ready(function () {
//    $("#signup-username").on("input", function () {
//      var registrationId = $(this).val();
//      if (registrationId.trim() !== "") {
//        $(
//          "#signup-fullname, #signup-username, #signup-password, #signup-confirm-password"
//        ).prop("disabled", false);
//      } else {
//        $(
//          "#signup-fullname, #signup-username, #signup-password, #signup-confirm-password"
//        ).prop("disabled", true);
//      }
//    });
//  });