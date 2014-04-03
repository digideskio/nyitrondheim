var nitControllers = angular.module('nitControllers', []);

nitControllers.controller('MainController',
['$scope', '$routeParams', 'localStorageService', function($scope, $routeParams, localStorageService) {

  $scope.fraternities = ["Abakus", "Online", "Volvox og Alkymisten", "Pareto", "EMIL", "Nabla", "Delta", "Janus", "AF Smørekoppen", "Mordi", "C++"];

  $scope.name = $routeParams.slug;
  $scope.chosenFraternity = localStorageService.get('fraternity');

  $scope.modalOpen = false;
  $scope.openModal = function() {
    $scope.modalOpen = true;
  };

  $scope.closeModal = function() {
    $scope.modalOpen = false;
  };

  $scope.chooseFraternity = function(fraternity) {
    $scope.chosenFraternity = fraternity;
    localStorageService.add('fraternity', fraternity);
    $scope.closeModal();
  };
}]);

nitControllers.controller('PageController', ['$scope', '$routeParams', function($scope, $routeParams) {
  console.log($scope.chosenFraternity)
}]);