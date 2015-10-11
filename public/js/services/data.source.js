/**
 *
 * Example Usage
 * =============
 * 
 * var sampleDS = DS('http://host:8080/service/posts/:id');
 * 
 * sampleDS.get().success(onSuccess); // Returns all instances of the resource.
 * sampleDS.post({ title: "Hello World" }); // CREATE
 * sampleDS.get({ id: 1 }); // RETRIEVE
 * sampleDS.put({ id: 1 }, { title: "Another Title" }); // UPDATE
 * sampleDS.remove({ id: 1 }); // DELETE
 *
 *
 * You can also specify default values while creating the data source.
 *
 * var userSearchDS = DS('http://host:8080/service/userSearch?source=:source&&sso=:sso', { source: 'ldap' });
 *
 * Can be used for RESTful resources as described above as well as for just a simple web service call.
 *
 * var serviceDS = DS('http://host:8080/service/getCatalogue/:systemId?page=:page', { page: -1 });
 * serviceDS.post();
 **/
define(['angular', 'services-module', 'underscore'], function (angular, services, _) {
	'use strict';

	// The factory.
	var Factory = function($http) {
		// The regex used for parsing dynamic parts in the URL.
		var regex = /[a-zA-Z]+/;
		// Regex for path params.
		var path = /\/:[a-zA-Z]+/g;
		// Regex for query params.
		var query = /[^\/]:[a-zA-Z]+/g;

		// The data source constructor. Supports RESTful communication.
		// The url supports path param and query params.
		// http://localhost:9090/services/projects/:id
		// http://localhost:9090/services/projects?:season&&:active
		var DataSource = function(url, defaults) {
			// The generic function for making an AJAX request.
			var invoke = function(url, method, data) {
				return $http({
	//				url: "/api/v2/proxy",
					url: url,
					method: method,
					headers: {
						"Service-End-Point": url
					},
					data: data
				}).success(function(data) {
					// Unwrap the data before returning it.
					if(typeof data.data !== 'undefined')
						data = data.data;

					// Fire that event.
					trigger(method, data);

					// Return the unwrapped data.
					return data;
				});
			};

			// The function for processing the params within the URL.
			var processParams = function(params) {
				// Initialize the params object if undefined.
				params = params || {};
				// Initialize some defaults.
				_.defaults(params, defaults);

				// First let's replace all the dynamic params. For that we will create a placeholder for the new URL created.
				var newUrl = url;

				// Let's start with path params.
				var pathParams = url.match(path);

				// Iterate over the path params matched.
				_.each(pathParams, function(param) {
					var matches = param.match(regex)

					if(matches.length !== 0) {
						var attr = matches[0];

						if(typeof attr !== 'undefined') {
							if(typeof params[attr] !== 'undefined')
								newUrl = newUrl.replace(param, "/" + params[attr]);
							else
								newUrl = newUrl.replace(param, "");
						}
					}
				});

				// Let's do query params now.
				var queryParams = url.match(query);

				// Iterate over the query params matched.
				_.each(queryParams, function(param) {
					var matches = param.match(regex);

					if(matches.length !== 0) {
						var attr = matches[0];

						if(typeof attr !== 'undefined') {
							if(typeof params[attr] !== 'undefined')
								newUrl = newUrl.replace(param, param[0] + attr + "=" + params[attr]);
							else
								newUrl = newUrl.replace(param, param[0] + attr + "=");
						}
					}
				});

				// Return the new URL.
				return newUrl;
			};

			// Method for sending out a GET request. If no params are specified, 
			// the request goes out to fetch the whole resource collection.
			var get = function(params) {
				var url = processParams(params);

				return invoke(url, "GET", {});
			};

			// Method for sending out a POST request. If the params are not specified,
			// the request goes out to the URL without the params.
			var post = function(params, data) {
				if(typeof data === 'undefined') {
					data = params;
					params = undefined;
				}

				var url = processParams(params);

				return invoke(url, "POST", data);
			};

			// Method for sending out a PUT request.
			var put = function(params, data) {
				var url = processParams(params);

				return invoke(url, "PUT", data);
			};

			// Method for sending out a DELETE request.
			var remove = function(params) {
				var url = processParams(params);

				return invoke(url, "DELETE", {});
			};

			var callbacks = {};
			var errorCallbacks = {};

			var on = function(event, callback) {
				callbacks[event] = callbacks[event] || [];

				callbacks[event].push(callback);
			};

			var trigger = function(event, data) {
				callbacks[event] = callbacks[event] || [];

				_.each(callbacks[event], function(callback) {
					callback.call(null, data);
				});
			};

			// Return the closure.
			return {
				get: get,
				post: post,
				put: put,
				remove: remove,
				on: on,
				trigger: trigger
			};
		};

		// Sneaky sneaky... Sshhhh...
		var _m = function() {
			return DataSource.apply(null, arguments);
		}

		// Put it on the browser's global scope.
		if(typeof window !== 'undefined')
			window.DS = _m;

		// Return the data source constructor.
		return _m;
	};

	// Register the data source factory.
	services.factory('ds', [ '$http', Factory ]);

	return services;
});