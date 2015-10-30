// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider

    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    })

	.state('app', {
        url: '/app',
        templateUrl: 'templates/menu.html',
        abstract: true,        
        controller: 'AppCtrl'
    })    

    .state('app.dashboard', {
        url: '/dashboard',
        views: {
            'menuContent': {
                templateUrl: 'templates/dashboard.html',
                controller: 'DashboardCtrl'
            },'fabContent': {
                template: ''
            }
        }
    })
    .state('app.notification', {
        url: '/notification',
        views: {
           'menuContent': {
                templateUrl: 'templates/notification.html',
                controller: 'NotificationCtrl'
           },'fabContent': {
                template: ''
            }
        }
    })
    .state('app.sharedNotification', {
        url: '/sharedNotification',
        views: {
           'menuContent': {
                templateUrl: 'templates/shared-notify.html',
                controller: 'SharedNotificationCtrl'
           },
            'fabContent': {
                template: '<button id="fab-new-notification" class="button button-fab button-fab-bottom-right expanded fab-button-brown spin"><i class="icon ion-edit"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-new-notification').classList.toggle('on');
                    }, 900);
                }
            }
        }
    })
    .state('app.sharedAchievement', {
         url: '/sharedAchievement',
         views: {
            'menuContent': {
               templateUrl: 'templates/shared-achievement.html',
               controller: 'SharedAchievementCtrl'
            },
             'fabContent': {
                 template: '<button id="fab-new-achievement" class="button button-fab button-fab-bottom-right expanded fab-button-brown  spin"><i class="icon ion-edit"></i></button>',
                 controller: function ($timeout) {
                     $timeout(function () {
                         document.getElementById('fab-new-achievement').classList.toggle('on');
                     }, 900);
                 }
             }
         }
     })
        .state('app.homework', {
            url: '/homework',
            views: {
                'menuContent': {
                    templateUrl: 'templates/homework-listing.html',
                    controller: 'HomeworkCtrl'
                },
                'fabContent': {
                    template: '<button id="fab-new-homework" ng-click="composeHw()" class="button button-fab button-fab-bottom-right expanded bar-pink  spin"><i class="icon ion-edit"></i></button>',
                    controller: function ($timeout) {
                        $timeout(function () {
                            document.getElementById('fab-new-homework').classList.toggle('on');
                        }, 900);
                    }
                }
            }
        })
        .state('app.hwcompose', {
            url: '/hwcompose',
            views: {
                'menuContent': {
                    templateUrl: 'templates/hwcompose.html',
                    controller: 'HwComposeCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.message', {
            url: '/message',
            views: {
                'menuContent': {
                    templateUrl: 'templates/message-listing.html',
                    controller: 'MessageCtrl'
                },
                'fabContent': {
                    template: '<button id="fab-new-message" ng-click="composeMsg()" class="button button-fab button-fab-bottom-right expanded bar-calm  spin"><i class="icon ion-edit"></i></button>',
                    controller: function ($timeout) {
                        $timeout(function () {
                            document.getElementById('fab-new-message').classList.toggle('on');
                        }, 900);
                    }
                }
            }
        })
        .state('app.msgcompose', {
            url: '/msgcompose',
            views: {
                'menuContent': {
                    templateUrl: 'templates/msgcompose.html',
                    controller: 'MsgComposeCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
});
