(function() {
  'use strict';

  FPH.component.ToggleColor = FPH.core.Component.extend({
    start: function () {
      this.setup();
      this.bind();
    },

    setup: function () {
      this.icon = this.element;
    },

    bind: function () {
      var _this = this;

      jQuery(window).on('scroll', function () {
        _this.change();
      });
    },

    change: function () {
      if (this.element.offset().top > jQuery(window).height()) {
        this.icon.removeClass('light').addClass('dark');
      }
      else {
        this.icon.removeClass('dark').addClass('light');
      }
    }

  });
})();
