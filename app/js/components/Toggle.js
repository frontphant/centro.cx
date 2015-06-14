(function() {
  'use strict';

  FPH.component.Toggle = FPH.core.Component.extend({
    isSupported: function() {
      return true;
    },

    start: function () {
      this.setup();
      this.bind();
    },

    setup: function() {
      this.targetSelector = this.element.data('target') || ('#' + this.data.id);
      this.event = this.element.data('event') || 'click';
      this.target = jQuery(this.targetSelector);
      this.isClose = this.element.data('close');
      this.element.attr('disabled', false);
    },

    bind: function () {
      var _this = this;

      this.element.on(this.event, function (e) {
        // e.preventDefault();
        _this.action();

        jQuery(document).trigger({
          type: 'Anchor.' + _this.event + 'ed',
          anchor: _this.element,
          target: _this.target
        });

        _this.target.trigger('Anchor.toggled');
      });

      if (!this.isClose) {
        jQuery(document).on('click', function(e) {
          var target = jQuery(e.target);
          if (target.closest(_this.target).length <= 0 && target.closest(_this.element).length <= 0) {
            _this.target.removeClass('is-active');
          }
        });
      }
    },

    action: function() {
      this.target.toggleClass('is-active');
    }
  });
})();

