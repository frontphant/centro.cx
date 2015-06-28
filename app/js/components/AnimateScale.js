(function() {
  'use strict';

  FPH.component.AnimateScale = FPH.core.Component.extend({
    start: function () {
      this.setup();
      this.bind();
    },

    setup: function () {
      var attrData = this.element.data();

      this.start = _.has(attrData, 'start')? attrData.start : this.element.offset().top;
      this.end = _.has(attrData, 'end')? attrData.end : (this.element.offset().top + this.element.height());
      this.from = _.has(attrData, 'from')? attrData.from : 1;
      this.to = _.has(attrData, 'to')? attrData.to : 1;
      this.deltaScroll = Math.abs(this.end - this.start);
      this.deltaAnimation = Math.abs(this.to - this.from);
    },

    bind: function () {
      var _this = this;

      jQuery(window).on('load scroll', function () {
        _this.update();
      });
    },

    update: function () {
      var scroll = jQuery(window).scrollTop(),
          percent = Math.min(Math.max((scroll - this.start) / this.deltaScroll, 0), 1);

      FPH.i.util.setTransform(this.element, 'scale(' + (this.from + (percent*this.deltaAnimation)) + ')');
    }

  });

})();
