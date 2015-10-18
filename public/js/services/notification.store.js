define(['angular', 'services-module'], function(angular, module) {
	// The class for global notifications.
	var NotificationStore = function($log) {
		// Initialize the notifications.
		var notifications = [];

		// Method for adding a notification.
		var add = function(notification) {
			// Check if the notification is valid.
			if(notification === undefined)
				return false;

			// If it is just a message.
			if(notification.constructor === String) {
				notification = {
					message: notification
				};
			}

			if(notification.message === undefined)
				return false;

			// Default to info.
			if(notification.type === undefined)
				notification.type = "alert-info";

			if(notification.type === "alert-info") $log.info(notification.message);
			if(notification.type === "alert-success") $log.info(notification.message);
			if(notification.type === "alert-warning") $log.warn(notification.message);
			if(notification.type === "alert-error") $log.error(notification.message);

			notifications.push(notification);

			return notifications;
		};
        var clearAll = function(){
            notifications = [];
        }
		var info = function(message) {
			return add({
				type: 'alert-info',
				message: message
			});
		};

		var success = function(message) {
			return add({
				type: 'alert-success',
				message: message
			});
		};

		var warning = function(message) {
			return add({
				type: 'alert-warning',
				message: message
			});
		};

		var error = function(message) {
			return add({
				type: 'alert-danger',
				message: message
			});
		};

		var getNotifications = function() {
			return notifications;
		};

		return {
			add: add,
			all: getNotifications,
			clearAll: clearAll,
			info: info,
			success: success,
			warning: warning,
			error: error
		};
	};

	var Factory = function($log) {
		$log.info("Loaded Notification Store.");

		// Return the singleton instance of the notifications class.
		return NotificationStore.apply(null, arguments);
	};

	// Register the factory.
	module.factory('notifier', ['$log', Factory]);
});