(function() {
	'use strict';

	FPH.core.Component = Class.extend({
		init: function(data, element) {
			var _this = this;

			//attributes
			this.isAttached = true;
			this.defaultConfig = {};
			this.config = {};
			this.data = data;
			this.element = element? jQuery(element) : null;

			//setup configurations
			this.setDefaultConfig();
			this.config = this.getConfig();

			//handle template
			if (this.element) {
				this.ready();
			} else {
				this.element = jQuery(this.getTemplate());
				this.isAttached = false;
			}
		},

		isSupported: function() {
			return FPH.i.client.hasSupport;
		},

		setDefaultConfig: function() {
			this.defaultConfig = {};
		},

		getConfig: function() {
			var customConfig = FPH.config[this.data.id];
			if (customConfig) {
				return jQuery.extend(true, {}, this.defaultConfig, customConfig);
			}
			return this.defaultConfig;
		},

		getTemplate: function() {
			return FPH.i.util.getRenderedTemplate(this.data.templateId, this.data);
		},

		appendTo: function(container) {
			this.element.appendTo(container);
			this.isAttached = true;
			this.ready();
		},

		prependTo: function(container) {
			this.element.prependTo(container);
			this.isAttached = true;
			this.ready();
		},

		ready: function() {
			if (!this.isSupported()) {
				return;
			}
			this.bindResize();
			this.start();
		},

		bindResize: function() {
			var _this = this;

			jQuery(document).on('Main.resized', function() {
				_this.resize();
			});
		},

		resize: function() {
			//implement
		},

		destroy: function() {
			//implement
		},

		start: function() {
			//implement
		}
	});
})();