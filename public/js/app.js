'use strict';

var lunchApp = angular.module('lunchApp', []);

lunchApp.controller('mainController', ['$scope','$http', function($scope, $http){

	const handleErrorOnGet = function(error){
		console.info('Sorry, there\'s a problem loading data from server');
		console.debug('Error info:', error);
	}

	const handleListOfReataurants = function(data){
		$scope.lunchOptions = data.data.restaurants;
	}

	$http.get('/getRestaurants')
	.then(handleListOfReataurants, handleErrorOnGet);

	$scope.selectedOption = function (restaurant){
		$http.post('/setVote?restaurantId:'+restaurant._id)
		restaurant.totalVotes++;
	}

}]);
