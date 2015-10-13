/*global define, Messages */
define(['angular', 'filters-module'], function (angular, filters) {
	'use strict';

    filters.filter('trimmer', function() {
        return function(value, length) {
            if(typeof value === 'undefined' || typeof value.length === 'undefined') {
                return ' ';
            }

            if(value.length > length) {
                // Trim the text.
                value = value.substring(0, length);
                value = value + '...';
            }

            return value;
        };
    });
});
