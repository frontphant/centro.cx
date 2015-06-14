(function() {
  'use strict';

  FPH.component.Menu = FPH.component.Toggle.extend({
    start: function () {
      this.setup();
      this.bind();
    },

    setup: function () {
      this.icon = jQuery('#menu-icon');
    },

    bind: function () {
      var _this = this;

      jQuery(window).on('scroll', function () {
        _this.toggleColor();
      });
    },

    toggleColor: function () {
      if (jQuery(window).scrollTop() > jQuery(window).height()) {
        this.icon.removeClass('white').addClass('black');
      }
      else {
        this.icon.removeClass('black').addClass('white');
      }
    }

  });
})();
