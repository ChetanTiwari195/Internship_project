// to get current year
function getYear() {
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();


// isotope js
$(window).on('load', function () {
  $('.filters_menu li').click(function () {
    $('.filters_menu li').removeClass('active');
    $(this).addClass('active');

    var data = $(this).attr('data-filter');
    $grid.isotope({
      filter: data
    })
  });

  var $grid = $(".grid").isotope({
    itemSelector: ".all",
    percentPosition: false,
    masonry: {
      columnWidth: ".all"
    }
  })
});

// nice select
$(document).ready(function () {
  $('select').niceSelect();
});

/** google_map js **/
function myMap() {
  const myLatLng = { lat: 13.04250010168604, lng: 77.62243588807002 };
  const map = new google.maps.Map(document.getElementById("googleMap"), {
    zoom: 14,
    center: myLatLng,
  });

  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Hello World!",
  });
}

//booking form
document.querySelector('#booking-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  let formdata = {
    "name": e.target[0].value,
    "phoneNumber": e.target[1].value,
    "email": e.target[2].value,
    "persons": e.target[3].value,
    "date": e.target[4].value
  }

  let response = await fetch('http://127.0.0.1:3000/reservation', { // Adjusted the URL here
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formdata)
  });

  if (response1.ok) {
    alert('Booking confirmed!');
  } else {
    alert('Error in booking. Please try again.');
  }
});

// client section owl carousel
$(".client_owl-carousel").owlCarousel({
  loop: true,
  margin: 0,
  dots: false,
  nav: true,
  navText: [],
  autoplay: true,
  autoplayHoverPause: true,
  navText: [
    '<i class="fa fa-angle-left" aria-hidden="true"></i>',
    '<i class="fa fa-angle-right" aria-hidden="true"></i>'
  ],
  responsive: {
    0: {
      items: 1
    },
    768: {
      items: 2
    },
    1000: {
      items: 2
    }
  }
});
