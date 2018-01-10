app.controller('ForgotPasswordCtrl', function($scope, $rootScope, $state, $ionicPopup, $ionicLoading, PetService) {
  // ionicMaterialInk.displayEffect();

  console.log("$rootScope.useremailIdtest ::: " + localStorage.getItem('userMailId'));
  $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function() {
    $ionicLoading.hide();
  };
  $scope.user = {
    "userMailId": ""
  }

  $scope.otpvalue = {
    "userMailId": "",
    "otp": ""
  }


  $scope.forgotPassword = function(user) {
    console.log("local+" + localStorage.setItem('useremailId', $scope.user.userMailId));
    if ($scope.user.userMailId == "") {
      var alertPopup = $ionicPopup.alert({
        title: "Please enter email id",
      });
    }
    // else if (ConnectivityMonitor.isOffline()) {
    //   Materialize.toast("internet is disconnected on your device !!", 4000);
    // }
    else {
      $scope.show($ionicLoading);
      PetService.forgotPassword($scope.user).then(function(response) {
        if (response.data.statusCode == 200) {
          $scope.hide($ionicLoading);
          $scope.user = {};
          console.log("Setting mailid ::: " + response.data.userMailId)
          localStorage.setItem('emailId', response.data.userMailId);
          var alertPopup = $ionicPopup.show({
            template: '<input type="password" placeholder="One Time Password" ng-model="otpvalue.otp" autofocus>',
            title: 'Enter One Time Password ',
            scope: $scope,
            buttons: [{
              text: 'Cancel',
              onTap: function(e) {
                return true;
              }
            }, {
              text: '<b>Submit</b>',
              type: 'button-positive',
              onTap: function(e) {
                // if (ConnectivityMonitor.isOffline()) {
                //   Materialize.toast("internet is disconnected on your device !!", 4000);
                // }
                // else
                {
                  $scope.show($ionicLoading);
                  PetService.VerifyEmail({
                    "userMailId": response.data.userMailId,
                    "otp": $scope.otpvalue.otp
                  }).then(function(response) {
                    if (response.data.statusCode == 200) {
                      localStorage.setItem('useremailId', response.data.userMailId)
                      $scope.hide($ionicLoading);
                      $scope.otpvalue = {
                        "userMailId": response.data.userMailId,
                        "otp": ""
                      }
                      $state.go('changePassword');
                    } else {
                      $scope.hide($ionicLoading);
                      var alertPopup = $ionicPopup.alert({
                        title: response.data.message,
                      });
                    }
                  });
                }
              }
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
        }
      });
    }
  }


  $scope.newPasswordvalue = {
    "userMailId": localStorage.getItem('useremailId'),
    "newPassword": "",
    "confirmNewPassword": ""
  }

  $scope.newPassword = function(newPasswordvalue) {
    console.log(" userMailId = =" + angular.toJson($scope.newPasswordvalue.userMailId))
    if ($scope.newPasswordvalue.newPassword == "") {
      var alertPopup = $ionicPopup.alert({
        title: "please enter new password",
      });
    } else if ($scope.newPasswordvalue.confirmNewPassword == "") {
      var alertPopup = $ionicPopup.alert({
        title: "password enter confirm new password ",
      });
    }
    //  else if (ConnectivityMonitor.isOffline()) {
    //   Materialize.toast("internet is disconnected on your device !!", 4000);
    // }
    //  else
    {
      $scope.show($ionicLoading);
      PetService.updateForgotPassord($scope.newPasswordvalue).then(function(response) {
        if (response.data.statusCode == 200) {
          $scope.hide($ionicLoading);
          var alertPopup = $ionicPopup.alert({
            title: "password update successfully",
          });
          $scope.newPasswordvalue = {
            "userMailId": $rootScope.useremailIdtest,
            "newPassword": "",
            "confirmNewPassword": ""
          };
          $localStorage.$reset();
          $state.go('signin');
        } else {
          $scope.hide($ionicLoading);
          var alertPopup = $ionicPopup.alert({
            title: response.data.message,
          });
          $scope.newPasswordvalue = {
            "newPassword": "",
            "confirmNewPassword": ""
          };
        }
      });
    }
  }
});