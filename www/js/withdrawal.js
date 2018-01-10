app.controller('withdrawalCtrl', ['$rootScope', '$scope', '$ionicPopup', '$ionicActionSheet', '$timeout','PetService', function($rootScope, $scope, $cordovaClipboard, $cordovaSocialSharing, $ionicPopup, $ionicActionSheet, $timeout, $localStorage, MyPayService, ConnectivityMonitor,ionicMaterialInk) {
  $scope.currencies = ['inr', 'usd', 'eur', 'gbp', 'brl', 'pln', 'cad', 'try', 'rub', 'mxn', 'czk', 'ils', 'nzd', 'jpy', 'sek', 'aud']
  $scope.balance = (JSON.parse(localStorage.getItem('credentials'))).user.INRbalance;

$scope.valueOfCurrency = 'inr';
$scope.checkingCurrency = (valueOfCurrency)=>{
  $scope.balance = (JSON.parse(localStorage.getItem('credentials'))).user[valueOfCurrency.toUpperCase()+'balance'];
}
}]);
