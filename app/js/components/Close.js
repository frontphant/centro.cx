(function() {
  'use strict';

  FPH.component.Close = FPH.component.Toggle.extend({
    bind: function () {
      var _this = this;

      this.element.on('click', function (e) {
        // e.preventDefault();
        _this.action();
      });
    },

    action: function() {
      this.target.removeClass('is-active');
    }
  });
})();

