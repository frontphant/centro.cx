/**
 * @author msouza, bmoura
 * @version 
 */

FPH.core.ClientDetect = Class.extend({
	
	init: function () {
		this.supportedBrowsers = {};
		this.exceptionBrowsers = {};
		this.browser = null;
		this.version = null;
		this.os = null;
		this.osVersion = null;
		this.userAgent = navigator.userAgent.toLowerCase();
		
		this.config();
		this.setUp();

		this.hasCanvasSupport = this.testCanvas();
		
		this.hasSupport = this.isSupported();

		this.isIOS = this.testIOS();
	},
	
	config: function() {
		this.supportedBrowsers = {
			firefox: {minVersion: 4},
			chrome: {minVersion: 9},
			safari: {minVersion: 5, os: ['mac', 'ipad', 'iphone','android']},
			opera: {minVersion: 10},
			msie: {minVersion: 6}
		};
		
//		this.exceptionBrowsers = {
//			//chrome: {minVersion: 10, maxVersion:10, os:['windows'], osVersion:['seven']}
//		};
	},
	
	setUp: function() {
		if (this.userAgent.search('android') != -1) {
			var i = this.userAgent.search('android ');
			this.os = 'android';
			this.browser = 'safari';
			this.dimensions = {
				height : screen.height,
				width : screen.width,
				ratio : window.devicePixelRatio
			};

			this.osVersion = parseFloat(this.userAgent.substr((i + 8)));	
		} else {
			
			if (this.userAgent.search('firefox') != -1) {
				this.browser = 'firefox';
			}
			else if (this.userAgent.search('chrome') != -1) {
				this.browser = 'chrome';
			}
			else if (this.userAgent.search('safari') != -1) {
				this.browser = 'safari';
			}
			else if (this.userAgent.search('opera') != -1) {
				this.browser = 'opera';
			}
			else if (this.userAgent.search('msie') != -1) {
				this.browser = 'msie';
			}
			
			if (this.userAgent.search('windows') != -1) {
				this.os = 'windows';
				if (this.userAgent.search('windows nt 6.1') != -1) {
					this.osVersion = 'seven';
				}
				else if (this.userAgent.search('windows nt 6.0') != -1) {
					this.osVersion = 'vista';
				}
			}
			else if (this.userAgent.search('linux') != -1) {
				this.os = 'linux';
			} 
			else if (this.userAgent.search('ipad') != -1) {
				this.os = 'ipad';

				var i = this.userAgent.search('os ');
				this.osVersion = parseInt(this.userAgent.substr(i + 3, 8));
			} 
			else if (this.userAgent.search('ipod') != -1) {
				this.os = 'ipod';

				var i = this.userAgent.search('os ');
				this.osVersion = parseInt(this.userAgent.substr(i + 3, 8));
			} 
			else if (this.userAgent.search('iphone') != -1) {
				this.os = 'iphone';

				var i = this.userAgent.search('os ');
				this.osVersion = parseInt(this.userAgent.substr(i + 3, 8));
			}
			else if (this.userAgent.search('mac') != -1) {
				this.os = 'mac';
			}
			
			if (this.browser == 'firefox' || this.browser == 'chrome') {
				var i = this.userAgent.search(this.browser+'/');
				this.version = parseFloat(this.userAgent.substr((i + this.browser.length + 1)));
			}
			else if (this.browser == 'safari' || this.browser == 'opera') {
				var i = this.userAgent.search('version/');
				this.version = parseFloat(this.userAgent.substr((i + 8)));
			}
			else if (this.browser == 'msie') {
				var i = this.userAgent.search('msie ');
				this.version = parseFloat(this.userAgent.substr((i + 5)));
			}
		}
	},

	testCanvas: function() {
		var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
	},

	testIOS: function() {
		switch(this.os) {
			case 'ipad':
			case 'ipod':
			case 'iphone':
				return true;
		}

		return false;
	},
	
	isSupported: function() {
		if (location.search.indexOf('fallback') != -1) {
			return false;
		}
		//test os
		switch (this.os) {
			case 'ipad':
			case 'ipod':
			case 'iphone':
				if (this.osVersion > 6) {
					return true;
				}
				return false;
			case 'android':
				if (this.osVersion > 4) {
					return true;
				}

				return false;
		}
		//test browser
		switch (this.browser) {
			case 'msie':
				if (this.version < 9) {
					return false;
				}

		}
		//test canvas
		if (this.hasCanvasSupport) {
			return true;
		}

		return false;

	}
	
});