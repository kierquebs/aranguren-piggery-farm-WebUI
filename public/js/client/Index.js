var API = 'https://app-5609cb46-7bb7-4ea3-9258-b20b3bf65b1a.cleverapps.io/API'

$(document).ready(function(){
    document.getElementById("loginBtn").onclick = function () {
        location.href = "https://app-60a5d999-64e1-4df9-b489-3791717d943a.cleverapps.io/admin/login";
    };

    RequestContent();

    function RequestContent(){
        $.ajax({
          url: API+ '/web/Contents',
          type: 'get',
          async: false,
          success : function(req) {
            var response = JSON.parse(JSON.stringify(req));
            var price_content = "";
            var about_content = ""; 
            var facebook_content = "";
            var email_content = ""; 
            var address_content = "";
            var mobile_content = "";
            for (let i = 0; i < response.length; i++) {
                if (response[i].title == "price") {
                    price_content += response[i].value + " per kilo";
                } else if (response[i].title == "facebook") {
                    facebook_content += response[i].value;
                } else if (response[i].title == "about") {
                    about_content += response[i].value;
                } else if (response[i].title == "email") {
                    email_content += response[i].value;
                } else if (response[i].title == "address") {
                    address_content += response[i].value;
                } else if (response[i].title == "mobile") {
                    mobile_content += response[i].value;
                }
            }
            document.getElementById("price_content").innerHTML = price_content;
            document.getElementById("facebook_content").innerHTML = facebook_content;
            document.getElementById("about_content").innerHTML = about_content;
            document.getElementById("email_content").innerHTML = email_content;
            document.getElementById("address_content").innerHTML = address_content;
            document.getElementById("mobile_content").innerHTML = mobile_content;
          },
          error : function(){
      
          }
        });
      }
});

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 72,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
