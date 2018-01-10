app


  // A simple controller that fetches a list of data from a service
  .controller('PetIndexCtrl', function($scope, PetService, $ionicPopup, $state, $ionicLoading, $rootScope) {
    // io.socket.get('');
    $scope.btc = true;
    $scope.bch = false;
    $scope.ltc = false;
    $scope.sellRate = '';
    $scope.buyRate = '';
    $scope.value = {
      currenc: 'inr'
    };
    $scope.currencies = ['inr', 'usd', 'eur', 'gbp', 'brl', 'pln', 'cad', 'try', 'rub', 'mxn', 'czk', 'ils', 'nzd', 'jpy', 'sek', 'aud']
localStorage.setItem('currency',$scope.value.currenc)
$rootScope.currencyMarket = $scope.value.currenc;
    $scope.show = function() {
      $ionicLoading.show({
        template: '<p>Loading...</p><ion-spinner></ion-spinner>'
      });
    };

    $scope.hide = function() {
      $ionicLoading.hide();
    };
    console.log("checking:   ", $scope.value.currenc.toUpperCase())
    io.socket.on($scope.value.currenc.toUpperCase()+'_ASK_ADDED', function(obj) {
      console.log("in socket: ", obj)
      if ($scope.btc == true || $scope.btc == 'true')
        $scope.btcF($scope.value.currenc);
      else if ($scope.bch == true || $scope.bch == 'true')
        $scope.bchF($scope.value.currenc);
      else if ($scope.ltc == true || $scope.ltc == 'true')
        $scope.ltcF($scope.value.currenc);
    });
    io.socket.on($scope.value.currenc.toUpperCase()+'_BID_ADDED', function(obj) {
      console.log("in socket: ", obj)
      if ($scope.btc == true || $scope.btc == 'true')
        $scope.btcF($scope.value.currenc);
      else if ($scope.bch == true || $scope.bch == 'true')
        $scope.bchF($scope.value.currenc);
      else if ($scope.ltc == true || $scope.ltc == 'true')
        $scope.ltcF($scope.value.currenc);
    });

    $scope.btcF = function(value) {
      localStorage.setItem('currency',$scope.value.currenc)
      console.log("value>>   ", value)
      $scope.bch = false;
      $scope.ltc = false;
      PetService.getAllBid(value).then(function(response) {
        if (response.statusCode >= 400) {
          var alertPopup = $ionicPopup.alert({
            title: "Server Message :" + response.message,
          });
        } else {
          $scope.btc = true;
          // console.log("getAllBid:   ", JSON.stringify(response.bidsINR))
          $scope.bids = response.bidsINR;
          $scope.bidSum = response.bidAmountINRSum
        }
      });
      PetService.getAllAsk(value).then(function(response) {
        if (response.statusCode >= 400) {
          var alertPopup = $ionicPopup.alert({
            title: "Server Message :" + response.message,
          });
        } else {
          // console.log("getAllBid:   ", JSON.stringify(response.bidsINR))
          $scope.inrs = response.asksINR;
          $scope.askSum = response.askAmountINRSum
        }
      });
    }
    $scope.btcF($scope.value.currenc);


    $scope.bchF = function(value) {
      localStorage.setItem('currency',$scope.value.currenc)
      console.log("in bch")
      $scope.btc = false;
      $scope.ltc = false;
      $scope.bch = true;
      console.log("====== ", $scope.btc, $scope.ltc, $scope.bch = true)
      PetService.getAllBidBch(value).then(function(response) {
        if (response.statusCode >= 400) {
          var alertPopup = $ionicPopup.alert({
            title: "Server Message :" + response.message,
          });
        } else {
          // console.log("getAllBid:   ", JSON.stringify(response.bidsINR))
          $scope.bids = response.bidsINR;
          $scope.bidSum = response.bidAmountINRSum
        }
      });
      PetService.getAllAskBch(value).then(function(response) {
        if (response.statusCode >= 400) {
          var alertPopup = $ionicPopup.alert({
            title: "Server Message :" + response.message,
          });
        } else {
          // console.log("getAllBid:   ", JSON.stringify(response.bidsINR))
          $scope.inrs = response.asksINR;
          $scope.askSum = response.askAmountINRSum
        }
      });
    }
    $scope.ltcF = function(value) {
      localStorage.setItem('currency',$scope.value.currenc)
      $scope.btc = 0;
      $scope.bch = 0;
      $scope.ltc = 1;
      PetService.getAllBidLtc(value).then(function(response) {
        if (response.statusCode >= 400) {
          var alertPopup = $ionicPopup.alert({
            title: "Server Message :" + response.message,
          });
        } else {
          // console.log("getAllBid:   ", JSON.stringify(response.bidsINR))
          $scope.bids = response.bidsINR;
          $scope.bidSum = response.bidAmountINRSum
        }
      });
      PetService.getAllAskLtc(value).then(function(response) {
        if (response.statusCode >= 400) {
          var alertPopup = $ionicPopup.alert({
            title: "Server Message :" + response.message,
          });
        } else {
          // console.log("getAllBid:   ", JSON.stringify(response.bidsINR))
          $scope.inrs = response.asksINR;
          $scope.askSum = response.askAmountINRSum
        }
      });
    }
    $scope.change = function() {
      localStorage.setItem('currency',$scope.value.currenc)
      console.log("in change function value==   ", $scope.value.currenc, $scope.btc, $scope.bch, $scope.ltc)
      if ($scope.btc == true)
        $scope.btcF($scope.value.currenc);
      else if ($scope.bch == true)
        $scope.bchF($scope.value.currenc);
      else if ($scope.ltc == true)
        $scope.ltcF($scope.value.currenc);
    }
    $scope.buy = (buy, sell) => {
      localStorage.setItem('currency',$scope.value.currenc)
        $scope.show($ionicLoading);
        var data = {
          "bidAmountBTC": parseFloat(buy) * parseFloat(sell),
          "bidAmountINR": buy,
          "bidRate": sell,
          "bidownerId": (JSON.parse(localStorage.getItem('credentials'))).user.id
          // "bidownerId": 2
        }
        console.log("data = ", data)
        PetService.buyIRNtoBTC(data).then((success) => {
          $scope.hide($ionicLoading);
          if (success.statusCode >= 400) {
            var alertPopup = $ionicPopup.alert({
              title: "Server Message :" + success.message,
            });
          } else {
            console.log("bid done:   ", JSON.stringify(success.message))
          }
        })
      },
      $scope.sell = (buy, sell) => {
        localStorage.setItem('currency',$scope.value.currenc)
        $scope.show($ionicLoading);
        var data = {
          "askAmountBTC": parseFloat(buy) * parseFloat(sell),
          "askAmountINR": buy,
          "askRate": sell,
          "askownerId": (JSON.parse(localStorage.getItem('credentials'))).user.id
          // "askownerId": 2
        }
        console.log("data = ", data)
        PetService.sellIRNtoBTC(data).then((success) => {
          $scope.hide($ionicLoading);
          if (success.statusCode >= 400) {
            var alertPopup = $ionicPopup.alert({
              title: "Server Message :" + success.message,
            });
          } else {
            console.log("bid done:   ", JSON.stringify(success.message))

          }
        })
      }
  })


// A simple controller that shows a tapped item's data



// .controller('PetDetailCtrl', function($scope, $stateParams, PetService) {
//   // "Pets" is a service returning mock data (services.js)
//   // $scope.pet = PetService.get($stateParams.petId);
// });
