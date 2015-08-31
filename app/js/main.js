'use strict';

// RequestAnimationFrame
(function() {
  var lastTime = 0;
  var vendors = ['webkit', 'moz'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame){
    window.requestAnimationFrame = function(callback) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame){
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }

}());

var App = {};

//  App
(function($){
  var startHeight = $(window).height();

  App.lastScroll = 0;

  App.init = function(){
    var resizingTimeout = null;

    // App.menuColor();
    App.logo();
    App.menu();
    App.coverHeight();
    App.homePhotoHover();
    App.snapHeader();
    App.checkMedia();

    //about section hack
    App.aboutFix();
    
    App.fixieText();

    $('body#place').each(function(){
      $(window).scrollTop(0);
    });

    $('.show-smooth').addClass('fade').viewportChecker({
      classToAdd: 'animated showSmooth'
    });

    $(window).on('resize', function() {
      App.coverHeight();

      App.resizing = true;
      clearTimeout(resizingTimeout);
      resizingTimeout = setTimeout(function() {
        App.resizing = false;
        App.fixieText();
      }, 300);


      //about section hack
      App.aboutFix();
    });

  };

  App.aboutFix = function () {
    if (jQuery('.container-gap').length) {
      jQuery('.container-gap').height(jQuery('.fixie-text').height());
    }
  };

  App.checkMedia = function () {
    // media query event handler
    if (matchMedia) {
      var mq = window.matchMedia("(max-width: 992px)");
      mq.addListener(WidthChange);
      WidthChange(mq);
    }

    // media query change
    function WidthChange(mq) {

      if (mq.matches) {
        App.isMobileQuery = true;
      }
      else {
        App.isMobileQuery = false;
      }

      App.fixieText();

    }
  };

  App.coverHeight = function(){
    $('#cover').height($(window).height());
  };

  App.menu = function(){
    // Menu
    var hammertime = new Hammer(jQuery('body')[0], {
      cssProps: {
        userSelect: true
      }
    });

    hammertime.on('swiperight', function(e) {
      $('#menu, body').removeClass('is-active');
    });

    hammertime.on('swipeleft', function() {
      $('#menu, body').addClass('is-active');
    });
  };

  // App.menuColor = function(){
  //   return
  //   if($(window).scrollTop() > startHeight) {
  //     $('#menu-icon').removeClass('white').addClass('black');
  //   } else {
  //     $('#menu-icon').addClass('white').removeClass('black');
  //   }

  //   window.requestAnimationFrame( App.menuColor );
  // };

  App.logo = function() {
    // Logo
    var $logo = $('#logo');

    $('#cover').fadeTo(0,0);
    $('#cover').delay(600).fadeTo(400,1);

    $logo.each(function(){
      var randomLogo = _.random(1, 10),
          imageUrl = ['img/logos/logo_'+ randomLogo +'.png', 'img/logos-hd/logo_'+ randomLogo +'.png'];

      $.preload(imageUrl[0]).then(function(){
        return $.preload(imageUrl[1]);
      })
      .then(function() {
        return $logo.removeClass('hide').fadeOut(0).promise();
      }).then(function(){
        return $logo.addClass('logo_' + randomLogo).promise();
      }).then(function(){
        setTimeout(function(){
          var hoverInterval = false;

          $logo.fadeIn(400);

          $logo.hover(function() {
            hoverInterval = setInterval(function(){
              $logo.attr('class', 'logo_' + _.random(1, 10));
            },125);
          }, function(){
            clearInterval(hoverInterval);
          });

        }, 800);
      });

    });
  };

  App.homePhotoHover = function(){
    // Home Photo Hover
    $('#main .company').each(function(index){
      var $this = $(this),
          photoHover = $this.data('photo'),
          hovering = false;
      if (photoHover) {
        $this.on('mouseenter.photoHover', function(e){
          hovering = true;
          var offset = {top: e.clientY, left: e.clientX},
              imageUrl = 'img/photo-hover/' + photoHover;

          if ($('#photo-hover-' + index).length) {
            $('#photo-hover-' + index).css({
              top: (offset.top),
              left: (offset.left),
              display: 'none'
            }).stop().fadeIn('fast');

          } else {
            if ($this.hasClass('preloading')) {
              return;
            }

            $this.addClass('preloading');
            $.preload(imageUrl).done(function(){
              var $photo = $('<img>', {id: 'photo-hover-' + index ,src:imageUrl, 'class': 'photo-hover'});
              $photo.css({
                top: (offset.top),
                left: (offset.left),
                display: 'none'
              });
              $this.data('photo-index', 'photo-hover-' + index);
              $('#main').append($photo);
              if (hovering) {
                $photo.stop().fadeIn('fast');
              }
              $this.removeClass('preloading');
            });
          }
        }).on('mouseleave.photoHover', function(){
            hovering = false;
            var $this = $(this),
                photoIndex = $this.data('photo-index');

            if (photoIndex) {
              $('#'+photoIndex).stop().fadeOut('fast');
            }
        });
      }
    });
  };

  App.snapHeader = function(){
    return;
    var scroll = $(window).scrollTop();
    App.currentScroll = scroll;
    App.scrollDirection = App.currentScroll > App.lastScroll;

    if((scroll < startHeight) && scroll > 0 && scroll < (startHeight - 10)) {
      if (App.scrollDirection) {
        if (!App.animatingScroll) App.animateScrollTo(startHeight + 10);
      }
    }

    App.lastScroll = scroll;

    window.requestAnimationFrame( App.snapHeader );
  };

  App.animateScrollTo = function(to){
    App.animatingScroll = true;
    return $('html, body').animate({scrollTop:to}, {duration: '300', queue: false}).promise().then(function(){
      App.animatingScroll = false;
    });
  };

  App.isMobile = function() {
    return Boolean(navigator.userAgent.match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|PlayBook|BB10|Windows Phone)/i));
  };

  App.fixieText = function() {
    var $textContainers = $('.fixie-text-container');

    if (App.isMobileQuery) {
      $('.fixie-text').css({
        'position': 'relative',
        'top': 'auto',
        'left': 'auto',
        'width': ''
      });
      return;
    }

    if (App.resizing) {
      $('.fixie-text').css({
        'position': 'relative',
        'top': 'auto',
        'left': 'auto',
        'width': ''
      });
    }

    $textContainers.each(function () {
      var $this = $(this),
          $window = $(window),
          relativeTop = $this.offset().top - $window.scrollTop(),
          relativeBottom = (relativeTop + $this.height()),
          $text = $('.fixie-text', $this);

      if ($this.hasClass('gone')) {
        var textRelativeTop_ = $text.offset().top - $window.scrollTop();

        if (textRelativeTop_ >= 30) {
          $text.css({
            'position': 'fixed',
            'top': '30px',
            'left': $text.offset().left,
            'width': $text.css('width')
          });

          $this.removeClass('gone');
        }

      } else {
        if (relativeTop <= 30) {
          $text.css({
            'position': 'fixed',
            'top': '30px',
            'left': $text.offset().left,
            'width': $text.css('width')
          });
        }

        if (relativeTop > 30) {
          $text.css({
            'position': 'relative',
            'top': 'auto',
            'left': 'auto',
            'width': ''
          });
        }

        if ((relativeBottom - 30) <= $text.height()) {
          // var textRelativeTop = $text.offset().top - $window.scrollTop();
          // top final é altura total da lateral menos a altura do texto.
          $this.css({
            'position': 'relative'
          });
          $text.css({
            'position': 'absolute',
            'top': $this.height() - $text.height(), // textRelativeTop - relativeTop,
            'left': $text.offset().left - $this.offset().left
          });

          $this.addClass('gone');
        }
      }

    });



    window.requestAnimationFrame( App.fixieText );
  };

  // App.buildMap = function(){
  //     // Basic options for a simple Google Map
  //     // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
  //     var mapOptions = {
  //       // How zoomed in you want the map to start at (always required)
  //       zoom: 15,
  //       scrollwheel: false,

  //       // The latitude and longitude to center the map (always required)
  //       // center: new google.maps.LatLng(40.6700, -73.9400), // New York
  //       center: new google.maps.LatLng(-23.529246, -46.636655), // New York

  //       // How you would like to style the map.
  //       // This is where you would paste any style found on Snazzy Maps.
  //       styles: [{
  //         'featureType':'landscape',
  //         'stylers':[
  //           {'saturation':-100},
  //           {'lightness':65},
  //           {'visibility':'on'}
  //         ]
  //       },{
  //         'featureType':'poi',
  //         'stylers':[
  //           {'saturation':-100},
  //           {'lightness':51},
  //           {'visibility':'simplified'}
  //         ]
  //       },{
  //         'featureType':'road.highway',
  //         'stylers':[
  //           {'saturation':-100},
  //           {'visibility':'simplified'}
  //         ]
  //       },{
  //         'featureType':'road.arterial',
  //         'stylers':[
  //           {'saturation':-100},
  //           {'lightness':30},
  //           {'visibility':'on'}
  //         ]
  //       },{
  //         'featureType':'road.local',
  //         'stylers':[
  //           {'saturation':-100},
  //           {'lightness':40},
  //           {'visibility':'on'}
  //         ]
  //       },{
  //         'featureType':'transit',
  //         'stylers':[
  //           {'saturation':-100},
  //           {'visibility':'simplified'}
  //         ]
  //       },{
  //         'featureType':'administrative.province',
  //         'stylers':[
  //           {'visibility':'off'}
  //         ]
  //       },{
  //         'featureType':'water',
  //         'elementType':'labels',
  //         'stylers':[
  //           {'visibility':'on'},
  //           {'lightness':-25},
  //           {'saturation':-100}
  //         ]
  //       },{
  //         'featureType':'water',
  //         'elementType':'geometry',
  //         'stylers':[
  //           {'hue':'#ffff00'},
  //           {'lightness':-25},
  //           {'saturation':-97}
  //         ]
  //       }]
  //     };
  //     // Get the HTML DOM element that will contain your map
  //     // We are using a div with id='map' seen below in the <body>
  //     var mapElement = document.getElementById('map-container');

  //     // Create the Google Map using our element and options defined above
  //     var map = new google.maps.Map(mapElement, mapOptions);

  //     var pinIcon = {
  //         path: 'M71.5,39c0,12.15-22,44-22,44s-22-31.85-22-44c0-12.151,9.849-22,22-22C61.65,17,71.5,26.849,71.5,39  z',
  //         fillColor: 'black',
  //         fillOpacity: 1,
  //         scale: 1,
  //         strokeColor: 'black',
  //         strokeWeight: 1
  //       };

  //     // Let's also add a marker while we're at it
  //     var marker = new google.maps.Marker({
  //         // position: new google.maps.LatLng(40.6700, -73.9400),
  //         position: new google.maps.LatLng(-23.529246, -46.636655),
  //         icon: pinIcon,
  //         map: map
  //     });

  //     console.log();
  // };

  App.init();
  // google.maps.event.addDomListener(window, 'load', App.buildMap);
})(jQuery);
