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

    App.menuColor();
    App.logo();
    App.menu();
    App.coverHeight();
    App.homePhotoHover();
    App.snapHeader();

    $('#cover').mousemove(function(e){
        var centerX = $(window).width() / 2;
        var centerY = $(window).height() / 2;

        var amountMovedX = ((centerX - e.pageX) * 1 / 20);
        var amountMovedY = ((centerY - e.pageY) * 1 / 20);
        $('.cover-pic', $(this)).css('background-position', (amountMovedX * 0.2) + 'px ' + (amountMovedY * 0.2) + 'px');
    });
  };

  App.coverHeight = function(){
    $('#cover').height(startHeight);
  };

  App.menu = function(){
    // Menu
    $('#menu-icon, #menu .close').off('click.menu').on('click.menu', function(e){
      e.preventDefault();
      $('#menu').toggleClass('open');
    });
  };

  App.menuColor = function(){
    if($(window).scrollTop() > startHeight) {
      $('#menu-icon').removeClass('white').addClass('black');
    } else {
      $('#menu-icon').addClass('white').removeClass('black');
    }

    window.requestAnimationFrame( App.menuColor );
  };

  App.logo = function() {
    // Logo
    var $logo = $('#logo');

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
          $logo.fadeIn(300);
        }, 300);
      });

    });
  };

  App.homePhotoHover = function(){
    // Home Photo Hover
    $('#main .company').each(function(index){
      var $this = $(this),
          photoHover = $this.data('photo');
      if (photoHover) {
        $this.off('mouseenter.photoHover').on('mouseenter.photoHover', function(e){
          console.log(e);
          var offset = {top: e.clientY, left: e.clientX},
              imageUrl = 'img/photo-hover/' + photoHover;

          $.preload(imageUrl).done(function(){
            var $photo = $('<img>', {id: 'photo-hover-' + index ,src:imageUrl, 'class': 'photo-hover'});
            $photo.css({
              top: (offset.top),
              left: (offset.left),
              display: 'none'
            });
            $this.data('photo-index', 'photo-hover-' + index);
            $('#main').append($photo);
            $photo.fadeIn('fast');
          });
        }).off('mouseleave.photoHover').on('mouseleave.photoHover', function(){
          var $this = $(this),
              photoIndex = $this.data('photo-index');

          if (photoIndex) {
            $('#'+photoIndex).fadeOut('fast').promise().then(function(){
              $('#'+photoIndex).remove();
            });
          }
        }).off('mousemove.photoHover').on('mousemove.photoHover', function(e){
          var $this = $(this),
              photoIndex = $this.data('photo-index');

          if (photoIndex) {

            var offset = {top: e.clientY, left: e.clientX},
                _class = {
                  top: (offset.top),
                  left: (offset.left)
                };

            $('#'+photoIndex).css(_class);

          }
        });
      }
    });
  };

  App.snapHeader = function(){
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

  App.init();
})(jQuery);
