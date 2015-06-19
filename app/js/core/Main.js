(function() {
  'use strict';

  FPH.core.Main = Class.extend({
    init: function() {
      // this.preloadCounter = 0;

      // this.loadConfig();
      // this.loadTemplates();
      this.bind();
      this.bindEvents();
      
      if (FPH.i.client.hasSupport) {
        jQuery('body').removeClass('fallback');
      }
    },

    loadConfig: function() {
      // this.preloadCounter++;

      jQuery.getJSON(FPH.paths.data + 'config.jsn', function(data) {
        FPH.config = data;
        jQuery(document).trigger('Main.configLoaded');
      });
    },

    loadTemplates: function() {
      // this.preloadCounter++;

      jQuery.get(FPH.paths.templates + 'templates.html', function (data) {
        jQuery(data).filter('script').each(function () {
          var elem = jQuery(this);
          FPH.templates[elem.attr('id')] = _.template(elem.html());
        });
        jQuery(document).trigger('Main.templatesLoaded');
      });
    },

    bind: function() {
      var _this = this,
        resizeTimeout = null;

      jQuery(window).on({
        resize: function() {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(function() {
            jQuery(document).trigger('Main.resized');
          }, 100);
        },

        scroll: function() {
          jQuery(document).trigger('Main.scrolled');
        },

        orientationchange: function() {
          jQuery(window).trigger('resize');
        }
      });
    },

    bindEvents: function() {
      var _this = this;

      // jQuery(document).on('Main.configLoaded Main.templatesLoaded', function() {
        // _this.preloadCounter--;

        // if (_this.preloadCounter === 0) {
          _this.instantiateComponents();
          _this.instantiateHTMLComponents();
        // }
      // });
    },

    instantiateHTMLComponents: function() {
      FPH.i.util.instantiateHTMLComponents(jQuery('html'));
    },

    instantiateComponents: function() {
      // FPH.i.track = new FPH.core.Tracking();
      // FPH.i.hashHandler = new FPH.core.HashHandler();
    }
  });
})();

/* SET PATHS */
FPH.paths = {
  data: 'data/',
  templates: 'templates/'
};

/* CREATE INSTANCES */
FPH.i.client = new FPH.core.ClientDetect();
FPH.i.util = new FPH.core.Util();

jQuery(function() {
  FPH.i.main = new FPH.core.Main();
});