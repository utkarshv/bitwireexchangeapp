app.controller('ticketCtrl', function($scope, $rootScope, $state, $ionicPopup, $ionicLoading, PetService) {
$scope.department = '';
$scope.title = '';
$scope.description = '';

$scope.show = function() {
  $ionicLoading.show({
    template: '<p>Loading...</p><ion-spinner></ion-spinner>'
  });
};

$scope.hide = function() {
  $ionicLoading.hide();
};
$scope.submit = (department,title,description)=>{
  $scope.show($ionicLoading);
  var data = {
    ticketOwnerId:(JSON.parse(localStorage.getItem('credentials'))).user.id,
    department:department,
    title:title,
    description:description
  }
console.log("data:   ",data)
  PetService.generateTicket(data).then((success) => {
    if (success.statusCode == 200) {
      $scope.hide($ionicLoading);
      var alertPopup = $ionicPopup.alert({
        title: success.message,
      });
      // $state.go('ticket');
    }
    else {
      $scope.hide($ionicLoading);
      var alertPopup = $ionicPopup.alert({
        title: success.message,
      });
    }
})


}
})
