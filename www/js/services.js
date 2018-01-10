angular.module('starter.services', [])

  /**
   * A simple example service that returns some data.
   */
  .factory('PetService', function($http) {
    // Might use a resource here that returns a JSON array
    let baseUrl = 'http://162.213.252.66:1338'
    let baseUrlForProduction = 'http://209.188.21.216:1338'
    let content = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }

    return {
      getAllBidBch: function(value) {
        return $http.get(baseUrlForProduction + 'trademarketbch' + value + '/getAllBid' + value.toUpperCase(), content)
          .then(function(response) {
            return response.data;
          });
      },
      getAllAskBch: function(value) {
        return $http.get(baseUrlForProduction + '/trademarketbch' + value + '/getAllAsk' + value.toUpperCase(), content)
          .then(function(response) {
            return response.data;
          });
      },
      getAllBidLtc: function(value) {
        return $http.get(baseUrlForProduction + 'trademarketltc' + value + '/getAllBid' + value.toUpperCase(), content)
          .then(function(response) {
            return response.data;
          });
      },
      getAllAskLtc: function(value) {
        return $http.get(baseUrlForProduction + '/trademarketltc' + value + '/getAllAsk' + value.toUpperCase(), content)
          .then(function(response) {
            return response.data;
          });
      },
      getAllBid: function(value) {
        return $http.get(baseUrlForProduction + '/trademarketbtc' + value + '/getAllBid' + value.toUpperCase(), content)
          .then(function(response) {
            return response.data;
          });
      },

      getAllAsk: function(value) {
        return $http.get(baseUrlForProduction + '/trademarketbtc' + value + '/getAllAsk' + value.toUpperCase(), content)
          .then(function(response) {
            return response.data;
          });
      },
      VerifyEmail: function(user) {
        return $http.post(baseUrlForProduction + '/user/verifyOtpToEmailForgotPassord', user, content).then(function(response) {
          return response;
        });
      },
      loginUser: function(user) {
        return $http.post(baseUrlForProduction + '/auth/authentcate', user, content).then(function(response) {
          console.log("response:  ",response)
          return response;
        });
      },
      createNewUser: function(user) {
        return $http.post(baseUrlForProduction + '/user/createNewUser', user, content).then(function(response) {
          return response;
        });
      },
      forgotPassword: function(user) {
        return $http.post(baseUrlForProduction + '/user/sentOtpToEmailForgotPassword', user, content).then(function(response) {
          return response;
        });
      },

      updateForgotPassord: function(user) {
        user.userMailId = localStorage.getItem('useremailId');
        return $http.post(baseUrlForProduction + '/user/updateForgotPassordAfterVerify', user, content).then(function(response) {
          return response;
        });
      },
      changepasswords: function(passwordValue) {
        return $http.post(baseUrlForProduction + '/user/updateCurrentPassword', passwordValue, content).then(function(response) {
          return response;
        });
      },
      OtpToUpdateSpendingPassword: function(currentpasswordValue) {
        return $http.post(baseUrlForProduction + '/user/sentOtpToUpdateSpendingPassword', currentpasswordValue, content).then(function(response) {
          return response;
        });
      },
      OtpToEmailForgotSpendingPassord: function(currentpasswordValue) {
        return $http.post(baseUrlForProduction + '/user/verifyOtpToEmailForgotSpendingPassord', currentpasswordValue, content).then(function(response) {
          return response;
        });
      },
      setNewSpendingPassord: function(newSpendingPasswordvalue) {
        return $http.post(baseUrlForProduction + '/user/updateForgotSpendingPassordAfterVerify', newSpendingPasswordvalue, content).then(function(response) {
          return response;
        });
      },
      getBalance: function(userMailId) {
        console.log("in service:  ", userMailId)
        return $http.post(baseUrlForProduction + '/user/getAllDetailsOfUser', userMailId, content).then(function(response) {
          // console.log("response :", JSON.stringify(response.data.user))
          return response;
        });
      },
      buyIRNtoBTC: function(data) {
        console.log("in service:  ", data)
        return $http.post(baseUrlForProduction + '/trademarketbtcinr/addBidINRMarket', data, content).then(function(response) {
          console.log("response :", response)
          return response.data;
        });
      },
      sellIRNtoBTC: function(data) {
        console.log("in service:  ", data)
        return $http.post(baseUrlForProduction + '/trademarketbtcinr/addAskINRMarket', data, content).then(function(response) {
          console.log("response :", response)
          return response.data;
        });
      },
      removeask: function(data) {
        console.log("in service:  ", data)
        return $http.post(baseUrlForProduction + '/trademarketbtcinr/removeAskINRMarket', data, content).then(function(response) {
          console.log("response :", response)
          return response.data;
        });
      },
      removebid: function(data) {
        console.log("in service:  ", data)
        return $http.post(baseUrlForProduction + '/trademarketbtcinr/removeBidINRMarket', data, content).then(function(response) {
          console.log("response :", response)
          return response.data;
        });
      },
      generateTicket: function(data) {
        console.log("in service:  ", data)
        return $http.post(baseUrlForProduction + '/ticket/generateTicket', data, content).then(function(response) {
          console.log("response :", response)
          return response.data;
        });
      }

    }
  });
