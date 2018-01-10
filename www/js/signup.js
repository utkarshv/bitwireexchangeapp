app
  .controller('RegistraionCtrl', function($state, $scope, $ionicPopup, $ionicLoading, PetService) {
    console.log("in signup ctrl")
    // ionicMaterialInk.displayEffect();
    $scope.user = {
      "email": "",
      "password": "",
      "confirmPassword": "",
      "spendingpassword": "",
      "confirmspendingpassword": "",
      "googlesecreatekey": "abcdefgh"
    }
    $scope.useremailId = "";
    $scope.otpvalue = {
      "userMailId": "",
      "otp": ""
    }

    $scope.createNewUser = function(user) {
      console.log("user: ", user)
      if ($scope.user.email == "") {
        var alertPopup = $ionicPopup.alert({
          title: "Please enter email id",
        });
      } else if ($scope.user.password == "") {
        var alertPopup = $ionicPopup.alert({
          title: "Please enter password",
        });
      } else if ($scope.user.confirmPassword == "") {
        var alertPopup = $ionicPopup.alert({
          title: "Please enter confirmPassword",
        });
      } else if ($scope.user.spendingpassword == "") {
        var alertPopup = $ionicPopup.alert({
          title: "Please enter spendingpassword",
        });
      } else if ($scope.user.confirmspendingpassword == "") {
        var alertPopup = $ionicPopup.alert({
          title: "Please enter confirmspendingpassword",
        });
      }
      // else if (ConnectivityMonitor.isOffline()) {
      //   Materialize.toast("internet is disconnected on your device !!", 4000);
      // }
      else {
        console.log("userrrrrrr:    ", $scope.user)
        $scope.show($ionicLoading);
        PetService.createNewUser($scope.user).then(function(response) {
          if (response.data.statusCode == 200) {
            console.log("signup = = " + angular.toJson(response));
            $scope.hide($ionicLoading);
            //$scope.user = {};
            console.log("Setting mailid ::: " + response.data)
            localStorage.setItem('emailId', response.data.userMailId);
            var alertPopup = $ionicPopup.show({
              template: '<input type="password" placeholder="One Time Password" ng-model="otpvalue.otp" autofocus>',
              title: 'Enter One Time Password ',
              scope: $scope,
              buttons: [{
                text: 'Cancel',
                onTap: function(e) {
                  $scope.user = {};
                  // Materialize.toast("account created please login and verify !!", 4000);
                  $state.go('signin');
                }
              }, {
                text: '<b>Submit</b>',
                type: 'button-positive',
                onTap: function(e) {
                  // if (ConnectivityMonitor.isOffline()) {
                  //   Materialize.toast("internet is disconnected on your device !!", 4000);
                  // }
                  // else {
                  console.log("user mail id = = " + response.data.userMailId)
                  $scope.show($ionicLoading);

                  MyPayService.VerificationEmail({
                    "userMailId": response.data.userMailId,
                    "otp": $scope.otpvalue.otp
                  }).then(function(response) {
                    if (response.data.statusCode == 200) {
                      $scope.hide($ionicLoading);
                      $scope.otpvalue = {
                        "otp": ""
                      }
                      $scope.user = {};
                      Materialize.toast("SignUp successfully !!", 4000);
                      $state.go('userlogin');
                    } else {
                      $scope.hide($ionicLoading);
                      var alertPopup = $ionicPopup.alert({
                        title: response.data.message,
                      });
                    }
                  });
                }
                //}
              }, ]
            }).then(function(res) {
              console.log('Tapped!', res);
            }, function(err) {
              console.log('Err:', err);
            }, function(msg) {
              console.log('message:', msg);
            });
          } else {
            $scope.hide($ionicLoading);
            var alertPopup = $ionicPopup.alert({
              title: response.data.message,
            });
            $scope.user = {};
          }
        });
      }

    };

    $scope.show = function() {
      $ionicLoading.show({
        template: '<p>Loading...</p><ion-spinner></ion-spinner>'
      });
    };

    $scope.hide = function() {
      $ionicLoading.hide();
    };
  });