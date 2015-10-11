/*global define */
define(['angular', 'services-module', 'underscore'], function (angular, services, _) {
	'use strict';

	var DataLoader = function(DS, $q) {
        var baseURL = "http://www.eliteinsite.com/api/amigo/";
        var apiKey = "eliteinsite.com";
		var ds = {
			login: DS(baseURL+'login/?apiKey='+apiKey+'&:uname&:pw')
		};


		var getLogin = function(un,passw) {
            return ds.login.get({uname:un,pw:passw});
        };

		// This is done in order to seperate the actual calling of the service from the
		// generating of input because events for both maybe different.
		// @overloaded method.
		var input = function(item, value) {
			// The object to insert to the payload.
			var object = {};

			if(typeof value === 'undefined' && typeof item === 'object') {
				_.extend(object, item);
			}

			if(typeof value !== 'undefined' && typeof item !== 'undefined') {
				object[item] = value;
			}

			// Add the object to the payload.
			_.extend(payload, object);

			return payload;
		};

		return {
			getLogin: getLogin,
			input: input
		};
	};

	// Factory function. Generate an instance of the parts loader.
	var Factory = function() {
		var loader = DataLoader.apply(null, arguments);

		window.loader = loader;
		return loader;
	};

	// Register the parts loader.
	services.factory('data.loader', ['ds', '$q', Factory]);
	return services;
});
