FPH.core.Util = Class.extend({
	instantiateHTMLComponents: function (context) {
		context.find('[data-component]').each(function() {
			var $this = jQuery(this),
				components = _.compact($this.data('component').split(' ')),
				id = $this.attr('id') || _.uniqueId('fph_');

			$this.attr('id', id);

			_.each(components, function(component) {
				if ($this.data(component)) {
					return;
				}

				if (FPH.component[component]) {
					FPH.i[id] = new FPH.component[component]({'id':id}, $this);
					FPH.i[id].element.data(component, FPH.i[id]);
				} else {
					throw new Error('Component "' + component + '" not found!');
				}
			});
		});
	},
	
	getRenderedTemplate: function(id, data) {
		var template = FPH.templates[id];
		if (template) {
			return template(data);
		}
		return null;
	},

	getUrlParam: function(key) {
		key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var result = (new RegExp("[\\?&]"+key+"=([^&#]*)")).exec(window.location.href);

		return result && result.length? result[1] : null;
	},

	isMobile: function() {
		return Boolean(navigator.userAgent.match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|PlayBook|BB10|Windows Phone)/i));
	},

	isTouch: function() {
		return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
	},

	openWindow: function(url, target, pageName) {
		if (pageName) {
			FPH.i.track.link(null, url, pageName);
		}
		
		target = target || null;
		
		var win = window.open(url, target);
		
		/*if (url.search('mailto:') != -1) {
			win.close();
		}*/
	},

	setTransform: function(elem, transformation) {
		elem.css({
			'webkitTransform': transformation,
			'MozTransform': transformation,
			'msTransform': transformation,
			'OTransform': transformation,
			'transform': transformation
		});
	}
});
