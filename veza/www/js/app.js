// Ionic Starter App
//Creator: Shantanu Acharya

angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'ionic-material', 'highcharts-ng', 'flexcalendar', 'eventcalendar', 'pascalprecht.translate'])

.run(function($rootScope, $ionicPlatform, $cordovaSplashscreen) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });

 })

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $translateProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */
        $translateProvider.translations('en', {
            JANUARY: 'January',
            FEBRUARY: 'February',
            MARCH: 'March',
            APRIL: 'April',
            MAI: 'May',
            JUNE: 'June',
            JULY: 'July',
            AUGUST: 'August',
            SEPTEMBER: 'September',
            OCTOBER: 'October',
            NOVEMBER: 'November',
            DECEMBER: 'December',

            SUNDAY: 'Sunday',
            MONDAY: 'Monday',
            TUESDAY: 'Tuesday',
            WEDNESDAY: 'Wednesday',
            THURSDAY: 'Thurday',
            FRIDAY: 'Friday',
            SATURDAY: 'Saturday'
        });

        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('escape');

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
    .state('app.feelanding', {
            url: '/feelanding',
            views: {
                'menuContent': {
                    templateUrl: 'templates/fee-landing-parent.html',
                    controller: 'FeeLandingParentCntrl'
                },
                'fabContent': {
                  template: ''
                }
            }
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
           }

        }
    })
    .state('app.createannouncement', {
        url: '/createannouncement',
        views: {
          'menuContent': {
               templateUrl: 'templates/create-announcement.html',
               controller: 'CreateAnnouncementCtrl'
          }
        }
    })
    .state('app.sharedAchievement', {
         url: '/sharedAchievement',
         views: {
            'menuContent': {
               templateUrl: 'templates/shared-achievement.html',
               controller: 'SharedAchievementCtrl'
            }
         }
     })
     .state('app.createachievement', {
          url: '/createachievement',
          views: {
             'menuContent': {
                templateUrl: 'templates/create-achievement.html',
                controller: 'CreateAchievementCtrl'
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
                  template: ''
              }
          }
     })
     .state('app.parenthomework', {
          url: '/parenthomework',
          views: {
             'menuContent': {
                templateUrl: 'templates/parent-hw-list.html',
                controller: 'ParentHomeworkCtrl'
             },
              'fabContent': {
                  template: ''
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
                    template: '<button id="fab-new-message" ng-click="composeMsg()" class="button button-fab button-fab-bottom-right expanded fab-button-cool  spin"><i class="icon ion-edit"></i></button>',
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
        })
        .state('app.parentMsgcompose', {
            url: '/parentMsgcompose',
            views: {
                'menuContent': {
                    templateUrl: 'templates/parentmsgcompose.html',
                    controller: 'ParentMsgComposeCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.chatmsg', {
            url: '/chatmsg',
            views: {
                'menuContent': {
                    templateUrl: 'templates/message-chat.html',
                    controller: 'MsgChatCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })

        .state('app.attendancelanding', {
            url: '/attendancelanding',
            views: {
                'menuContent': {
                    templateUrl: 'templates/attendance-landing.html',
                    controller: 'AttendLandingCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
    .state('app.markattendance', {
        url: '/markattendance',
        views: {
              'menuContent': {
                    templateUrl: 'templates/mark-attendance.html',
                    controller: 'MarkAttendanceCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.viewattendance', {
            url: '/viewattendance',
            views: {
                'menuContent': {
                    templateUrl: 'templates/view-attendance.html',
                    controller: 'ViewAttendanceCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.eventlandingteacher', {
            url: '/eventlandingteacher',
            views: {
                'menuContent': {
                    templateUrl: 'templates/event-landing-teacher.html',
                    controller: 'LandingEventTeacherCtrl'
                },
                'fabContent': {
                    template: '<button id="fab-new-event" ui-sref="app.createevent" class="button button-fab button-fab-bottom-right expanded fab-button-event  spin"><i class="icon ion-edit"></i></button>',
                    controller: function ($timeout) {
                        $timeout(function () {
                            document.getElementById('fab-new-event').classList.toggle('on');
                        }, 900);
                    }
                }
            }
        })
        .state('app.eventlandingparent', {
            url: '/eventlandingparent',
            views: {
                'menuContent': {
                    templateUrl: 'templates/event-landing-parent.html',
                    controller: 'LandingEventParentCtrl'
                },
                'fabContent': {
                  template: ''
                }
            }
        })
        .state('app.eventstatusteacher', {
            url: '/eventstatusteacher',
            params: {
              obj: null
            },
            views: {
                'menuContent': {
                    templateUrl: 'templates/event-status-teacher.html',
                    controller: 'EventStatusTeacherCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }

        })
        .state('app.editevent', {
            url: '/editevent',
            views: {
                'menuContent': {
                    templateUrl: 'templates/edit-event.html',
                    controller: 'EditEventCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.detaileventparent', {
            url: '/detaileventparent',
            params: {
              obj: null
            },
            views: {
                'menuContent': {
                    templateUrl: 'templates/detail-event-parent.html',
                    controller: 'DetailEventParentCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.createevent', {
            url: '/createevent',
            views: {
                'menuContent': {
                    templateUrl: 'templates/create-event.html',
                    controller: 'CreateEventCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.leavecreate', {
            url: '/leavecreate',
            views: {
                'menuContent': {
                    templateUrl: 'templates/create-leave.html',
                    controller: 'CreateLeaveCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.viewevents', {
            url: '/viewevents',
            views: {
                'menuContent': {
                    templateUrl: 'templates/view-event.html',
                    controller: 'ViewEventsCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.leaveapproval', {
            url: '/leaveapproval',
            views: {
                'menuContent': {
                    templateUrl: 'templates/leave-listing.html',
                    controller: 'ViewLeaveApprovalCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.approvedleaves', {
            url: '/approvedleaves',
            views: {
                'menuContent': {
                    templateUrl: 'templates/approved-leaves.html',
                    controller: 'ViewLeaveApprovedCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.detailspage', {
            url: '/detailspage',
            views: {
                'menuContent': {
                    templateUrl: 'templates/detail-description.html',
                    controller: 'DetailPageCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.announcedetails', {
            url: '/announcedetails',
            views: {
                'menuContent': {
                    templateUrl: 'templates/announce-description.html',
                    controller: 'DetailPageCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.achievementdetails', {
            url: '/achievementdetails',
            views: {
                'menuContent': {
                    templateUrl: 'templates/achievement-description.html',
                    controller: 'DetailPageCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.notificationdetails', {
            url: '/notificationdetails',
            views: {
                'menuContent': {
                    templateUrl: 'templates/notification-details.html',
                    controller: 'DetailPageCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.homeworkdetails', {
            url: '/homeworkdetails',
            views: {
                'menuContent': {
                    templateUrl: 'templates/homework-details.html',
                    controller: 'HWdetailCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.teacherhwdetail', {
            url: '/teacherhwdetail',
            views: {
                'menuContent': {
                    templateUrl: 'templates/teacher-hw-detail.html',
                    controller: 'THWdetailCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.leavedetails', {
            url: '/leavedetails',
            views: {
                'menuContent': {
                    templateUrl: 'templates/leave-details.html',
                    controller: 'LeaveDetailCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.approvedleavedetails', {
            url: '/approvedleavedetails',
            views: {
                'menuContent': {
                    templateUrl: 'templates/leave-approved-details.html',
                    controller: 'LeaveDetailCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.eventdetails', {
            url: '/eventdetails',
            views: {
                'menuContent': {
                    templateUrl: 'templates/event-description.html',
                    controller: 'DetailPageCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.homeworklanding', {
            url: '/homeworklanding',
            views: {
                'menuContent': {
                    templateUrl: 'templates/homework-landing.html',
                    controller: ''
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
        .state('app.eventedit', {
            url: '/eventedit',
            params: {
              'obj': null
            },
            views: {
                'menuContent': {
                    templateUrl: 'templates/event-edit.html',
                    controller: 'EditEventCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.edithomeworklisting', {
            url: '/edithomeworklisting',
            views: {
                'menuContent': {
                    templateUrl: 'templates/edit-homework.html',
                    controller: 'UnpubHwListCtrl'
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
        .state('app.homeworkedit', {
            url: '/homeworkedit',
            views: {
                'menuContent': {
                    templateUrl: 'templates/homework-edit.html',
                    controller: 'EditHomeworkCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.eventsLanding', {
            url: '/eventsLanding',
            views: {
                'menuContent': {
                    templateUrl: 'templates/events-landing.html',
                    controller: 'SharedAchievementCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.timetable', {
            url: '/timetable',
            views: {
                'menuContent': {
                    templateUrl: 'templates/time-table.html',
                    controller: 'TimeTableCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.parentattendancelanding', {
            url: '/parentattendancelanding',
            views: {
                'menuContent': {
                    templateUrl: 'templates/attendance-landing-parent.html',
                    controller: ''
                },
                'fabContent': {
                    template: '<button id="fab-leave-button" ng-click="createLeave()" class="button button-fab button-fab-bottom-right expanded bar-orange  spin"><i class="icon ion-edit"></i></button>',
                    controller: function ($timeout) {
                        $timeout(function () {
                            document.getElementById('fab-leave-button').classList.toggle('on');
                        }, 900);
                    }
                }
            }
        })
        .state('app.resultview', {
            url: '/resultview',
            views: {
                'menuContent': {
                    templateUrl: 'templates/result-view.html',
                    controller: 'ResultViewCntrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        });
   // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
});
