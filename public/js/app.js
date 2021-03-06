'use strict';

angular.module('lunchApp', []).controller('mainController', ['$scope','$http', 'socketio', function($scope, $http, socketio){

	socketio.on('newVote', function(msg){
		$scope.lunchOptions.forEach(function(item, index) {
			if(item._id === msg._id){
				$scope.lunchOptions[index] = msg;	
			}
		}, this);
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

	const setWinner = function(response){
		console.log(response.data)
		$scope.winner = response.data.name;
	}

	$http.get('/restaurants')
	.then(handleListOfReataurants, handleErrorOnGet);

	function validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	$scope.selectedOption = function (restaurant){
		if($scope.voterEmail && validateEmail($scope.voterEmail)){
			$http.post('/restaurants', {'restaurantId' : restaurant._id, 'email': $scope.voterEmail, 'dateVoted': new Date()})
			.catch(handleErrorOnPost);
		}
	}

	$scope.endVoting = function (){
		$http.get('/endVoting')
		.then(setWinner, handleErrorOnGet);
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
