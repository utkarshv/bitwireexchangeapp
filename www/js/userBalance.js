app
  .controller('userBalanceCtrl', function($scope, $ionicPopup, $ionicLoading, PetService, $state) {
    console.log("userBalancectrl")

    $scope.show = function() {
      $ionicLoading.show({
        template: '<p>Loading...</p><ion-spinner></ion-spinner>'
      });
    };

    $scope.hide = function() {
      $ionicLoading.hide();
    };
    $scope.items = ["BTC", "BCH", "LTC", "INR", "USD", "EUR", "GBP", "BRL",
      "PLN", "CAD", "TRY", "RUB", "MXN", "CZK", "ILS", "NZD", "JPY", "SEK", "AUD"
    ]



    var userMailId = {
      "userMailId": localStorage.getItem('useremailId')
    }

    function userBalance(userMailId) {
      PetService.getBalance(userMailId).then((success) => {
        if (success.data.statusCode == 200) {
          $scope.balance = success.data.user;
        } else {
          $scope.hide($ionicLoading);
          var alertPopup = $ionicPopup.alert({
            title: response.data.message,
          });
        }
      })
    }
    userBalance(userMailId);

  });