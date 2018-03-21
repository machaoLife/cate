/**
 * Created by Administrator on 2018/1/6.
 * http://192.168.12.100/AngularDoc/
 */
(function(){
    angular.module("app",["ui.router","app.controller","app.service","app.directive","app.filter","me-lazyload"])
        .run(function($rootScope,$log,$state,$transitions){

            $transitions.onStart({},function(trans){
                var currentView = trans.$to().name;

                $rootScope.flag = currentView == 'home'?1:0;
            });
        })
        .config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){
            $urlRouterProvider.otherwise('/home');
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'view/home.html',
                    controller:'homeController'
                })
                .state('menu', {
                    url: '/menu',
                    templateUrl: 'view/menu.html',
                    controller:'menuController'
                })
                .state('healthy', {
                    url: '/healthy',
                    templateUrl: 'view/healthy.html',
                    controller:'healthyController'
                })
                .state('material', {
                    url: '/material',
                    templateUrl: 'view/material.html',
                    controller:'materialController'
                })
                .state('forum', {
                    url: '/forum',
                    templateUrl: 'view/forum.html',
                    controller:'forumController'
                })
                .state('menuDetails', {
                    url: '/menuDetails?menuId',
                    templateUrl: 'view/menuDetails.html',
                    controller:'menuDetailsController'
                })
                .state('materialDetails', {
                    url: '/materialDetails?materialId',
                    templateUrl: 'view/materialDetails.html',
                    controller:'materialDetailsController'
                })
                .state('healthyDetails', {
                    url: '/healthyDetails?healthyId',
                    templateUrl: 'view/healthyDetails.html',
                    controller:'healthyDetailsController'
                })
                .state('forumDetails', {
                    url: '/forumDetails?forumId',
                    templateUrl: 'view/forumDetails.html',
                    controller:'forumDetailsController'
                })
                .state('issue', {
                    url: '/issue',
                    templateUrl: 'view/issue.html',
                    controller:'issueController'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'view/login.html',
                    controller:'loginController'
                })
                .state('register', {
                    url: '/register',
                    templateUrl: 'view/register.html',
                    controller:'registerController'
                })
                .state('personal', {
                    url: '/personal',
                    templateUrl: 'view/personal.html',
                    controller:'personalController'
                })
                .state('personal.centre', {
                    url: '/centre',
                    templateUrl: 'view/centre.html',
                    controller:'centreController'
                }).state('personal.data', {
                    url: '/data',
                    templateUrl: 'view/data.html',
                    controller:'dataController'
                })
                .state('personal.password', {
                    url: '/password',
                    templateUrl: 'view/password.html',
                    controller:'passwordController'
                })
                .state('personal.step', {
                    url: '/step',
                    templateUrl: 'view/step.html',
                    controller:'stepController'
                })
                .state('search', {
                    url: '/search?keyword',
                    templateUrl: 'view/search.html',
                    controller:'searchController'
                })
            ;
        }])

}());