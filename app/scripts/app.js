'use strict';

/**
 * @ngdoc overview
 * @name litmetricsfrontendApp
 * @description
 * # litmetricsfrontendApp
 *
 * Main module of the application.
 */
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




  ])

  .constant('API_URL', 'http://127.0.0.1:8000/')


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
        controllerAs: 'corpusitemselction'
      })
      .when('/topicmodeling', {
        templateUrl: 'views/topicmodeling.html',
        controller: 'TopicmodelingCtrl',
        controllerAs: 'topicmodeling'
      })
      .when('/filters', {
        templateUrl: 'views/filters.html',
        controller: 'FiltersCtrl',
        controllerAs: 'filters'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

.config(function ($httpProvider, $sceDelegateProvider) {
  $httpProvider.interceptors.push('authInterceptor');
   $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = false;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    // Allow loading from outer templates domain.
	'self',
    'http://morning-reef-4788.herokuapp.com/**',
	'http://nxl.com/**',
	'http://localhost:9000/**',
	'http://morning-reef-4788.herokuapp.com/auth/me/',
	'http://127.0.0.1:8000'

  ]);

	})


;
