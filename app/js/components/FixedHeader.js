(function() {
  'use strict';

  FPH.component.FixedHeader = FPH.core.Component.extend({
    start: function () {
      this.setup();
      this.bind();
    },

    setup: function () {
      this.header = this.element;
      this.window = jQuery(window);
      this.body = jQuery('body');
    },

    bind: function () {
      var _this = this;

      this.window.on('load scroll', function () {
        _this.handleScroll();
      });
    },

    handleScroll: function () {
      if (!jQuery('#cover').length) {
        this.body.addClass('is-fixed-header');
      }
      else {
        if (this.window.scrollTop() > this.window.height()) {
          this.body.addClass('is-fixed-header');
        }
        else {
          this.body.removeClass('is-fixed-header');
        }
      }
    }

  });

})();
