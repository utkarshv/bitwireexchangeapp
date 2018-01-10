app
  .controller('LoginCtrl', function($scope, $ionicPopup, $ionicLoading, PetService, $state) {
    console.log("inlogin ctrl")
    // ionicMaterialInk.displayEffect();
    $scope.show = function() {
      $ionicLoading.show({
        template: '<p>Loading...</p><ion-spinner></ion-spinner>'
      });
    };

    $scope.hide = function() {
      $ionicLoading.hide();
    };
    //
    // // if (AuthService.isAuthenticated()) {
    // //   $state.go('app.dashboard', {}, {
    // //     reload: true
    // //   });
    // // }
    //
    $scope.user = {
      "email": "",
      "password": ""
    }

    $scope.doLogin = function(user) {
      console.log("in login function")
      if ($scope.user.email == "") {
        var alertPopup = $ionicPopup.alert({
          title: "Please enter user name ",
        });
      } else if ($scope.user.password == "") {
        var alertPopup = $ionicPopup.alert({
          title: "Please enter password",
        });
      }
      // else if (ConnectivityMonitor.isOffline()) {
      //   Materialize.toast("internet is disconnected on your device !!", 4000);
      // }
      else {
        $scope.show($ionicLoading);
        PetService.loginUser($scope.user).then(function(response) {
          if (response.data.statusCode == 200) {
            console.log("data", response)
            localStorage.setItem('credentials', JSON.stringify(response.data));
            $scope.hide($ionicLoading);
            $state.go('tab.pet-index');
          } else if (response.data.statusCode >= 400) {
            $scope.hide($ionicLoading);
            var alertPopup = $ionicPopup.alert({
              title: response.data.message,
            });
          }
        });
      }
    };

    $scope.goToRegister = function() {
      $state.go('signup');
    }

  });