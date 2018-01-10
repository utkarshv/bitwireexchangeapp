app.controller('historyCtrl', function($scope, $rootScope, $state, $ionicPopup, $ionicLoading, PetService) {
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
        switch ($scope.bid) {
          case "inr":
            $scope.balance = success.data.user.bidsINR;
            $scope.askBalance = success.data.user.asksINR;
            break;
          case "btc":
            $scope.balance = success.data.user.bidsBTC;
            $scope.askBalance = success.data.user.asksBTC;
            break;
          case "bch":
            $scope.balance = success.data.user.bidsBCH;
            $scope.askBalance = success.data.user.asksBCH;
            break;
          case "ltc":
            $scope.balance = success.data.user.bidsLTC;
            $scope.askBalance = success.data.user.asksLTC;
            break;
          case "usd":
            $scope.balance = success.data.user.bidsUSD;
            $scope.askBalance = success.data.user.asksUSD;
            break;
          case "eur":
            $scope.balance = success.data.user.bidsEUR;
            $scope.askBalance = success.data.user.asksEUR;
            break;
          case "gbp":
            $scope.balance = success.data.user.bidsGBP;
            $scope.askBalance = success.data.user.asksGBP;
            break;
          case "brl":
            $scope.balance = success.data.user.bidsBRL;
            $scope.askBalance = success.data.user.asksBRL;
            break;
          case "pln":
            $scope.balance = success.data.user.bidsPLN;
            $scope.askBalance = success.data.user.asksPLN;
            break;
          case "cad":
            $scope.balance = success.data.user.bidsCAD;
            $scope.askBalance = success.data.user.asksCAD;
            break;
          case "try":
            $scope.balance = success.data.user.bidsTRY;
            $scope.askBalance = success.data.user.asksTRY;
            break;
          case "rub":
            $scope.balance = success.data.user.bidsRUB;
            $scope.askBalance = success.data.user.asksRUB;
            break;
          case "mxn":
            $scope.balance = success.data.user.bidsMXN;
            $scope.askBalance = success.data.user.asksMXN;
            break;
          case "czk":
            $scope.balance = success.data.user.bidsCZK;
            $scope.askBalance = success.data.user.asksCZK;
            break;
          case "ils":
            $scope.balance = success.data.user.bidsILS;
            $scope.askBalance = success.data.user.asksILS;
            break;
          case "nzd":
            $scope.balance = success.data.user.bidsNZD;
            $scope.askBalance = success.data.user.asksNZD;
            break;
          case "jyp":
            $scope.balance = success.data.user.bidsJYP;
            $scope.askBalance = success.data.user.asksJYP;
            break;
          case "sek":
            $scope.balance = success.data.user.bidsSEK;
            $scope.askBalance = success.data.user.asksSEK;
            break;
          case "aud":
            $scope.balance = success.data.user.bidsAUD;
            $scope.askBalance = success.data.user.asksAUD;
            break;
          default:
            $scope.balance = success.data.user.bidsINR;
            $scope.askBalance = success.data.user.asksINR;
        }

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
