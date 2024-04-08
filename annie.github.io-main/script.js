$(document).ready(function() {

  //sticky header
    $(window).scroll(function() {
      if ($(this).scrollTop() > 1) {
        $(".header-area").addClass("sticky");
      } else {
        $(".header-area").removeClass("sticky");
      }
  
      // Update the active section in the header
      updateActiveSection();
    });
  
    $(".header ul li a").click(function(e) {
      e.preventDefault(); 
  
      var target = $(this).attr("href");
  
      if ($(target).hasClass("active-section")) {
        return; 
      }
  
      if (target === "#home") {
        $("html, body").animate(
          {
            scrollTop: 0 
          },
          500
        );
      } else {
        var offset = $(target).offset().top - 40; 
  
        $("html, body").animate(
          {
            scrollTop: offset
          },
          500
        );
      }
  
      $(".header ul li a").removeClass("active");
      $(this).addClass("active");
    });
  

    //Initial content revealing js
    ScrollReveal({
      distance: "100px",
      duration: 2000,
      delay: 200
    });
  
    ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
      origin: "left"
    });
    ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
      origin: "right"
    });
    ScrollReveal().reveal(".project-title, .contact-title", {
      origin: "top"
    });
    ScrollReveal().reveal(".projects, .contact", {
      origin: "bottom"
    });

  // Define the Google Apps Script URL
const scriptURL = 'https://script.google.comhttps://docs.google.com/spreadsheets/d/197nVXVuhHJPW43TDLUITdphIBqnW53C-_IsDWXCkRTc/edit?usp=sharing/macros/s/AKfycbw7CGYFsNE-rjfsZN6ktcIzAj-TBjV6JQ_GAqsi/exec';

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();
    
    const form = document.forms['submitToGoogleSheet'];
    const msg = document.getElementById("msg");
    
    // Create FormData object from form
    const formData = new FormData(form);

    // Send POST request to Google Apps Script URL
    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok. Status: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            if (data.result === 'success') {
                msg.innerHTML = "Message sent successfully";
                setTimeout(function () {
                    msg.innerHTML = "";
                }, 5000);
                form.reset();
            } else {
                throw new Error('Failed to send message. Error: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error!', error.message);
            msg.innerHTML = "An error occurred. Please try again.";
        });
}

// Add event listener to the form
document.addEventListener('DOMContentLoaded', function () {
    const form = document.forms['submitToGoogleSheet'];
    form.addEventListener('submit', handleSubmit);
});

    
  });
  
  function updateActiveSection() {
    var scrollPosition = $(window).scrollTop();
  
    // Checking if scroll position is at the top of the page
    if (scrollPosition === 0) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#home']").addClass("active");
      return;
    }
  
    // Iterate through each section and update the active class in the header
    $("section").each(function() {
      var target = $(this).attr("id");
      var offset = $(this).offset().top;
      var height = $(this).outerHeight();
  
      if (
        scrollPosition >= offset - 40 &&
        scrollPosition < offset + height - 40
      ) {
        $(".header ul li a").removeClass("active");
        $(".header ul li a[href='#" + target + "']").addClass("active");
      }
    });
  }
  

 