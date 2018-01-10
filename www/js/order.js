app.controller('orderCtrl', function($scope, $rootScope, $state, $ionicPopup, $ionicLoading, PetService) {
  $scope.bid = '';
  $scope.bidTab = 1;
  $scope.askTab = 0;

  $scope.tab = (value)=>
  {
    if(value == 'ask')
    {
      $scope.bidTab = 0;
      $scope.askTab = 1;
    }
    else {
      $scope.bidTab = 1;
      $scope.askTab = 0;
    }
  }
  $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function() {
    $ionicLoading.hide();
  };

  var userMailId = {
    "userMailId": localStorage.getItem('useremailId')
  }

  $scope.userBalance = function (userMailId) {
    PetService.getBalance(userMailId).then((success) => {
      if (success.data.statusCode == 200) {
        $scope.bid = localStorage.getItem('currency');
        var value = 'bids'+localStorage.getItem('currency').toUpperCase();
        var askValue = 'asks'+localStorage.getItem('currency').toUpperCase();
        console.log("value:  ",value)
        $scope.balance = success.data.user[value];
        $scope.askBalance = success.data.user[askValue];
        console.log($scope.balance)
      } else {
        $scope.hide($ionicLoading);
        var alertPopup = $ionicPopup.alert({
          title: response.data.message,
        });
      }
    })
  }
  $scope.userBalance(userMailId);

$scope.removeAsk = (askIdINR)=>{
  console.log("in")
  var data = {
    askIdINR:askIdINR,
    askownerId: (JSON.parse(localStorage.getItem('credentials'))).user.id
  }
  PetService.removeask(data).then((success) => {
    if (success.statusCode == 200) {
      console.log("success:::: ",success)
      $scope.userBalance(userMailId);
      // $route.reload();
    }
    else {
      console.log("error:::: ",success)
    }
})
}
$scope.removeBid = (bidIdINR)=>{
  console.log("in")
  var data = {
    bidIdINR:bidIdINR,
    bidownerId: (JSON.parse(localStorage.getItem('credentials'))).user.id
  }
  PetService.removebid(data).then((success) => {
    if (success.statusCode == 200) {
      console.log("success:::: ",success)
      $scope.userBalance(userMailId);
        // $route.reload();
    }
    else {
      $scope.hide($ionicLoading);
      var alertPopup = $ionicPopup.alert({
        title: response.data.message,
      });
    }
})
}

})
