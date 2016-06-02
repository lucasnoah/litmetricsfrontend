'use strict';

/**
 * @ngdoc overview
 * @name litmetricsfrontendApp
 * @description
 * # litmetricsfrontendApp
 *
 * Main module of the application.
 */

//var urlBase = 'http://api.litmetrics.com/'
var urlBase = 'http://127.0.0.1:8000/'
angular
  .module('litmetricsfrontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'formly',
    'formlyBootstrap',
    'ngStorage',
    'naif.base64',
    'ngFileUpload',
    'ui.bootstrap',
    'angularSpinner',
    'satellizer'
  ])


  .constant('API_URL', urlBase)
  //.constant('API_URL', 'http://127.0.0.1:8000/')




  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/corpusitemselection', {
        templateUrl: 'views/corpusitemselction.html',
        controller: 'CorpusitemselctionCtrl',
        controllerAs: 'corpusitemselction',
        loginRequired: true
      })
      .when('/topicmodeling', {
        templateUrl: 'views/topicmodeling.html',
        controller: 'TopicmodelingCtrl',
        controllerAs: 'topicmodeling',
        loginRequired: true
      })
      .when('/filters', {
        templateUrl: 'views/filters.html',
        controller: 'FiltersCtrl',
        controllerAs: 'filters'
      })
      .when('/topics', {
        templateUrl: 'views/topics.html',
        controller: 'TopicsCtrl',
        controllerAs: 'topics'
      })
      .when('/corpusediting', {
        templateUrl: 'views/corpusediting.html',
        controller: 'CorpuseditingCtrl',
        controllerAs: 'corpusediting'
      })
      .when('/bibliography', {
        templateUrl: 'views/bibliography.html',
        controller: 'BibliographyCtrl',
        controllerAs: 'bibliography'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .config(['usSpinnerConfigProvider', function (usSpinnerConfigProvider) {
    usSpinnerConfigProvider.setDefaults({color: 'blue'});
}])

.config(function ($httpProvider,  $authProvider, $sceDelegateProvider) {
  //$httpProvider.interceptors.push('authInterceptor');
  $httpProvider.defaults.useXDomain = false;

  $httpProvider.defaults.withCredentials = false;
    $authProvider.httpInterceptor = function() { return true; },
  $authProvider.withCredentials = false;
  $authProvider.tokenRoot = null;
  $authProvider.baseUrl = urlBase;
  $authProvider.loginUrl = 'auth/login/';
  $authProvider.signupUrl = '/auth/register/';
  $authProvider.unlinkUrl = '/auth/unlink/';
  $authProvider.tokenName = 'auth_token';
  $authProvider.tokenPrefix = 'satellizer';
  $authProvider.authHeader = 'Authorization';
  $authProvider.authToken = 'Token';
  $authProvider.storageType = 'localStorage';
    //delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    // Allow loading from outer templates domain.
	'self',
    'http://litmetrics.com/*',
    'http://www.litmetrics.com/*',
    'http://api.litmetrics.com/*',

	'http://localhost:9000/*',
	'http://127.0.0.1:8000'

  ]);

	})


;
