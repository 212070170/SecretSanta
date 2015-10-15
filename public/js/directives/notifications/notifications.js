define(['angular', 'directives-module'], function(angular, module) {
	var Notifications = function() {
		return {
			restrict: 'E',
			templateUrl: './public/js/directives/notifications/notifications.html',
			replace: true,
			scope: {
				store: "="
			},
			link: function($scope, element, attrs) {
				$scope.notifications = [];

				$scope.$watchCollection(function() {
					return $scope.store.all();
				}, function(notifications) {
					// Update the notifications . . . 
					$scope.notifications = notifications;
				}, true); // Deep watch enabled.
			}
		};
	};

	module.directive('notifications', [Notifications]);
});