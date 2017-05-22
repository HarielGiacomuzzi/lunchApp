'use strict';

var lunchApp = angular.module('lunchApp', []);

lunchApp.controller('mainController', ['$scope','$http', function($scope, $http){

	const handleErrorOnGet = function(error){
		console.info('Sorry, there\'s a problem loading data from server');
		console.debug('Error info:', error);
	}

	const handleListOfReataurants = function(data){
		//$scope.hello = _.get(data, '[0].name');
		$scope.hello = data[0];
	}

	$http.get('/getRestaurants')
	.then(handleListOfReataurants, handleErrorOnGet);

}]);
