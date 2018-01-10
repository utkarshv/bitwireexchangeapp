// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.services'])
  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'RegistraionCtrl'
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      })
      .state('forgotPassword', {
        url: '/forgotPassword',
        templateUrl: 'templates/forgotPassword.html',
        controller: 'ForgotPasswordCtrl'
      })
      .state('changePassword', {
        url: '/changePassword',
        templateUrl: 'templates/changePassword.html',
        controller: 'ForgotPasswordCtrl',
        authenticate: false
      })
      .state('changeSpendingPassword', {
        url: '/changeSpendingPassword',
        templateUrl: 'templates/changeSpendingPassword.html',
        controller: 'ChangeSpendingPassword',
        authenticate: false
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'templates/settings.html',
        controller: 'SettingCtrl'
      })
      .state('userBalance', {
        url: '/userBalance',
        templateUrl: 'templates/userBalance.html',
        controller: 'userBalanceCtrl'
      })
      .state('order', {
        url: '/order',
        templateUrl: 'templates/order.html',
        controller: 'orderCtrl'
      })
      .state('deposit', {
        url: '/deposit',
        templateUrl: 'templates/deposit.html',
        controller: 'depositCtrl'
      })
      .state('withdrawal', {
        url: '/withdrawal',
        templateUrl: 'templates/withdrawal.html',
        controller: 'withdrawalCtrl'
      })
      .state('ticket', {
        url: '/ticket',
        templateUrl: 'templates/ticket.html',
        controller: 'ticketCtrl'
      })
      .state('history', {
        url: '/history',
        templateUrl: 'templates/history.html',
        controller: 'historyCtrl'
      })
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        controller: 'PetIndexCtrl'
      })
      .state('tab.pet-index', {
        url: '/dashboard',
        views: {
          'pets-tab': {
            templateUrl: 'templates/pet-index.html',
            controller: 'PetIndexCtrl'
          }
        }
      })
      .state('tab.adopt', {
        url: '/adopt',
        views: {
          'adopt-tab': {
            templateUrl: 'templates/adopt.html'
          }
        }
      })

      .state('tab.about', {
        url: '/about',
        views: {
          'about-tab': {
            templateUrl: 'templates/about.html'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/signin');

  });
