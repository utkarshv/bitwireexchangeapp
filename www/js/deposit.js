app.controller('depositCtrl', ['$rootScope', '$scope', '$ionicPopup', '$ionicActionSheet', '$timeout','PetService', function($rootScope, $scope, $cordovaClipboard, $cordovaSocialSharing, $ionicPopup, $ionicActionSheet, $timeout, $localStorage, MyPayService, ConnectivityMonitor,ionicMaterialInk) {
    $scope.currencies = ['inr', 'usd', 'eur', 'gbp', 'brl', 'pln', 'cad', 'try', 'rub', 'mxn', 'czk', 'ils', 'nzd', 'jpy', 'sek', 'aud','btc','bch','ltc'];
    $scope.balance = (JSON.parse(localStorage.getItem('credentials'))).user.INRbalance;
    $scope.address = (JSON.parse(localStorage.getItem('credentials'))).user.userINRAddress;
    $scope.valueOfCurrency = 'inr';

    $scope.checkingCurrency = (valueOfCurrency)=>{
      valueOfAddress = 'user'+valueOfCurrency.toUpperCase()+"Address";
      valueOfCurrency = valueOfCurrency.toUpperCase()+"balance"
      $scope.balance = (JSON.parse(localStorage.getItem('credentials'))).user[valueOfCurrency];
      $scope.address = (JSON.parse(localStorage.getItem('credentials'))).user[valueOfAddress];
    }

}]);
