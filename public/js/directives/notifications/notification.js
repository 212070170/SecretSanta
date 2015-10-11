define(['angular', 'directives-module', 'jquery'], function(angular, module, $) {
	var Notification = function($timeout, cms) {
		var successTime = 3000;
		var infoTime = 3000;
		var warningTime = 5000;
		var errorTime = 7000;

		return {
			restrict: 'E',
			templateUrl: './public/js/directives/notifications/notification.html',
			replace: true,
			scope: {
				type: "@",
				message: "@"
			},
			link: function($scope, element, attrs) {
				var timeout = 	$scope.type === 'alert-success' ? successTime :
								$scope.type === 'alert-info' ? infoTime :
								$scope.type === 'alert-warning' ? warningTime :
								errorTime;

				$timeout(function() {
					$(element).fadeOut(2000, function() {
						$(element).remove();
					});
				}, timeout);
			}
		};
	};

	module.directive('notification', ["$timeout", Notification]);
});