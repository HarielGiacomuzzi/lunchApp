'use strict';

var lunchApp = angular.module('lunchApp', []);

lunchApp.controller('mainController', ['$scope','$http', 'socketio', function($scope, $http, socketio){

	socketio.on('newVote', function(msg){
		console.log('SOCKET MSG: ', msg);
	});

	const handleErrorOnGet = function(error){
		console.info('Sorry, there\'s a problem loading data from server');
		console.debug('Error info:', error);
	}

	const handleErrorOnPost = function(error){
		console.info('Sorry, there\'s a problem updating data on server');
		console.debug('Error info:', error);
	}

	const handleListOfReataurants = function(response){
		$scope.lunchOptions = response.data;
	}

	$http.get('/restaurants')
	.then(handleListOfReataurants, handleErrorOnGet);

	function validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	$scope.selectedOption = function (restaurant){
		if($scope.voterEmail && validateEmail($scope.voterEmail) || true){
			$http.post('/restaurants', {'restaurantId' : restaurant._id, 'email': $scope.voterEmail})
			.catch(handleErrorOnPost);
			restaurant.totalVotes++;
		}
	}

}])
.factory('socketio', ['$rootScope', function ($rootScope) {
        'use strict';
        
        var socket = io.connect();
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
    }]);
