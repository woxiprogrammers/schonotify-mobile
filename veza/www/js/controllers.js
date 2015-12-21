/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,$state, $ionicModal, $ionicPopover, $timeout, $ionicSideMenuDelegate, $ionicHistory) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };

    $scope.signOut = function() {
        console.log("User Logged out");
        $state.go('login');
    };

    $scope.studToggle = true;

    $scope.toggleStudent = function() {
        console.log("Changing Student");
        $scope.studToggle = $scope.studToggle === false ? true: false;            
        };

    $scope.toggleLeftSideMenu = function() {
         $ionicSideMenuDelegate.toggleLeft();
         };

        $scope.myGoBack = function() {
            $ionicHistory.goBack();
        };

        $scope.dashBoard = function() {
            $state.go('app.dashboard');
        };

        $scope.composeHw = function() {
            $state.go('app.hwcompose');
        };

        $scope.composeMsg = function() {
            $state.go('app.msgcompose');
        };

        $scope.createAnnouncement = function() {
            $state.go('app.createannouncement');
        };

        $scope.createAchievement = function() {
            $state.go('app.createachievement');
        };

        $scope.announceDetails = function() {
            $state.go('app.announcedetails');
        };

        $scope.achievementDetail = function() {
            $state.go('app.achievementdetails');
        };

        $scope.notifyDetail = function() {
            $state.go('app.notificationdetails');
        };

        $scope.homeworkDetails = function() {
            $state.go('app.homeworkdetails');
        };

        $scope.leaveDetails = function() {
            $state.go('app.leavedetails');
        };
        $scope.approveLeaveDetails = function() {
            $state.go('app.approvedleavedetails');
        };

        $scope.homeworkEdit = function() {
            $state.go('app.homeworkedit');
        };

        $scope.detailEvent = function() {
            $state.go('app.eventsLanding');
        };

        $scope.eventDetails = function() {
            $state.go('app.eventdetails');
        };

        $scope.eventEdit = function() {
            $state.go('app.eventedit');
        };

        $scope.resultView = function() {
            $state.go('app.resultview');
        };
})

.controller('LoginCtrl', function($scope, $state, $timeout, ionicMaterialMotion, ionicMaterialInk) {

    $scope.signIn = function() {
            $state.go('app.dashboard');
        };

        // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    ionicMaterialInk.displayEffect();
})

.controller('DashboardCtrl', function($scope, $state, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicSideMenuDelegate) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);

        $scope.noticeBoard = function() {
            $state.go('app.sharedNotification');
        };
})

.controller('NotificationCtrl', function($scope, $state, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicSideMenuDelegate) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);

        $scope.nMessages = [{
            Status: "unRead",
            Subject: "Rohit Shetty",
            Message: " has created homework for 5th Std Div B.",
            Timestamp: "4 mins ago",
            Type: "notification_attendance"
        }, {
            Status: "unRead",
            Subject: "Rohit Shetty",
            Message: " has created homework for 5th Std Div B.",
            Timestamp: "40 mins ago",
            Type: "notification_event"
        }, {
            Status: "Read",
            Subject: "Rohit Shetty",
            Message: " has created homework for 5th Std Div B.",
            Timestamp: "40 mins ago",
            Type: "notification_fees"
        },{
            Status: "Read",
            Subject: "Rohit Shetty",
            Message: " has created homework for 5th Std Div B.",
            Timestamp: "40 mins ago",
            Type: "notification_homework"
        },{
            Status: "Read",
            Subject: "Rohit Shetty",
            Message: " has created homework for 5th Std Div B.",
            Timestamp: "40 mins ago",
            Type: "notification_result"
        },{
            Status: "Read",
            Subject: "Rohit Shetty",
            Message: " has created homework for 5th Std Div B.",
            Timestamp: "40 mins ago",
            Type: "notification_event"
        },{
            Status: "Read",
            Subject: "Rohit Shetty",
            Message: " has created homework for 5th Std Div B.",
            Timestamp: "40 mins ago",
            Type: "notification_attendance"
        }];

        $scope.checkAll = function () {
            if ($scope.selectedAll) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }
            angular.forEach($scope.nMessages, function (nmsg) {
                nmsg.Selected = $scope.selectedAll;
            });

        };
})
.controller('SharedNotificationCtrl', function($scope, $state, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicSideMenuDelegate) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);

        $scope.nMessages = [{
            Status: "unRead",
            Subject: "Class Test for Std 5 on this thursday",
            Message: "The Attendance is Compulsary",
            Timestamp: "4 mins ago",
            Priority: "high"
        }, {
            Status: "unRead",
            Subject: "Notification 2",
            Message: "The Attendance is Compulsary",
            Timestamp: "40 mins ago",
            Priority: "medium"
        }, {
            Status: "Read",
            Subject: "Notification 3",
            Message: "The Attendance is Compulsary",
            Timestamp: "4 hours ago",
            Priority: "high"
        },{
            Status: "Read",
            Subject: "Notification 4",
            Message: "The Attendance is Compulsary",
            Timestamp: "4 days ago",
            Priority: "low"
        },{
            Status: "Read",
            Subject: "Notification 5",
            Message: "The Attendance is Compulsary",
            Timestamp: "4 weeks ago",
            Priority: "medium"
        },{
            Status: "Read",
            Subject: "Notification 6",
            Message: "The Attendance is Compulsary",
            Timestamp: "4 months ago",
            Priority: "low"
        },{
            Status: "Read",
            Subject: "Notification 7",
            Message: "The Attendance is Compulsary",
            Timestamp: "5 months ago",
            Priority: "high"
        }];

        $scope.checkAll = function () {
            if ($scope.selectedAll) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }
            angular.forEach($scope.nMessages, function (nmsg) {
                nmsg.Selected = $scope.selectedAll;
            });

        };
 })
    .controller('CreateAnnouncementCtrl', function($scope, $state, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicSideMenuDelegate) {
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);

    })
    .controller('SharedAchievementCtrl', function($scope, $state, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicSideMenuDelegate) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);

        $scope.nMessages = [{
            Picture: "graduate.jpg",
            Status: "unRead",
            Subject: "Notification 1",
            Message: "D.A.V wins Inter School Basketball Tournament 2015",
            Timestamp: "Date: 04 Dec 2015",
            Priority: "high"
        }, {
            Status: "Read",
            Subject: "Notification 2",
            Message: "School has participated Math Olympaid Exam",
            Timestamp: "Date: 04 Dec 2015",
            Priority: "medium"
        }, {
            Picture: "education-bg.jpg",
            Status: "Read",
            Subject: "Notification 3",
            Message: "The Attendance is Compulsary",
            Timestamp: "Date: 04 Dec 2015",
            Priority: "high"
        }];

        $scope.checkAll = function () {
            if ($scope.selectedAll) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }
            angular.forEach($scope.nMessages, function (nmsg) {
                nmsg.Selected = $scope.selectedAll;
            });

        };
    })
    .controller('CreateAchievementCtrl', function($scope, $state, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicSideMenuDelegate) {
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);

    })
    .controller('HomeworkCtrl', function($scope, $state, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicSideMenuDelegate) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);

        $scope.nMessages = [{
            Status: "unRead",
            Title: "Questions & Answers",
            Message: "Answer Questions from Textbook",
            Timestamp: "18 Oct",
            Class: "5th B div",
            Subject: "Science",
            Attach: "yes"

        }, {
            Status: "Read",
            Title: "Remaining Answers",
            Message: "Still some answers are remaining",
            Timestamp: "17 Oct",
            Class: "8th A div",
            Subject: "Geography",
            Attach: "no"
        }, {
            Status: "Read",
            Title: "Project Details",
            Message: "Sending project details",
            Timestamp: "15 Oct",
            Class: "9th C div",
            Subject: "Maths",
            Attach: "yes"
        }];

        $scope.checkAll = function () {
            if ($scope.selectedAll) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }
            angular.forEach($scope.nMessages, function (nmsg) {
                nmsg.Selected = $scope.selectedAll;
            });
        };

    })
    .controller('HwComposeCtrl', function($scope, $state, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicSideMenuDelegate, $ionicModal) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);

        $ionicModal.fromTemplateUrl('studentHwCntctlist.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        })

        $scope.openModal = function() {
            $scope.modal.show();
        }

        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });

        $scope.contactList = [{
            Name: "Student 1"
        }, {
            Name: "Student 2"
        }, {
            Name: "Student 3"
        },{
            Name: "Student 4"
        },{
            Name: "Student 5"
        }, {
            Name: "Student 6"
        }, {
            Name: "Student 7"
        },{
            Name: "Student 8"
        },{
            Name: "Student 9"
        }, {
            Name: "Student 10"
        }, {
            Name: "Student 11"
        },{
            Name: "Student 12"
        },{
            Name: "Student 13"
        }, {
            Name: "Student 14"
        }];

        $scope.contactsAll = false;
            $scope.checkAllcontacts = function () {

            console.log("into check all");
            if ($scope.contactsAll) {
                $scope.contactsAll = true;
            } else {
                $scope.contactsAll = false;
            }
            angular.forEach($scope.contactList, function (contct) {
                //console.log("contct : "+contct);
                contct.Tick = $scope.contactsAll;
            });
        };
    })

    .controller('MessageCtrl', function($scope, $state, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicSideMenuDelegate) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);

        $scope.nMessages = [{
            Status: "unRead",
            Title: "Student 1",
            Message: "Answer Questions from Textbook",
            Timestamp: "Date: 18 Oct 2015",
            Class: "5th B div",
            Subject: "Science",
            Attach: "yes"

        }, {
            Status: "Read",
            Title: "Student 2",
            Message: "Still some answers are remaining",
            Timestamp: "Date: 17 Oct 2015",
            Class: "8th A div",
            Subject: "Geography",
            Attach: "no"
        }, {
            Status: "unRead",
            Title: "Student 3",
            Message: "Sending project details",
            Timestamp: "Date: 15 Oct 2015",
            Class: "9th C div",
            Subject: "Maths",
            Attach: "yes"
        },
            {
                Status: "Read",
                Title: "Student 4",
                Message: "Sending project details",
                Timestamp: "Date: 15 Oct 2015",
                Class: "9th C div",
                Subject: "Maths",
                Attach: "yes"
            },
            {
                Status: "Read",
                Title: "Student 5",
                Message: "Sending project details",
                Timestamp: "Date: 15 Oct 2015",
                Class: "9th C div",
                Subject: "GK",
                Attach: "yes"
            },
            {
                Status: "Read",
                Title: "Student 6",
                Message: "Sending project details",
                Timestamp: "Date: 15 Oct 2015",
                Class: "9th C div",
                Subject: "Maths",
                Attach: "yes"
            }];

        $scope.checkAll = function () {
            if ($scope.selectedAll) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }
            angular.forEach($scope.nMessages, function (nmsg) {
                nmsg.Selected = $scope.selectedAll;
            });
        };

    })
    .controller('MsgComposeCtrl', function($scope, $state, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicSideMenuDelegate, $ionicModal, $ionicHistory) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);

        $ionicModal.fromTemplateUrl('studentCntctlist.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        })

        $scope.openModal = function() {
            $scope.modal.show();
        }

        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });

        $scope.contactList = [{
            Name: "Student 1"
        }, {
            Name: "Student 2"
        }, {
            Name: "Student 3"
        },{
            Name: "Student 4"
        },{
            Name: "Student 5"
        }, {
            Name: "Student 6"
        }, {
            Name: "Student 7"
        },{
            Name: "Student 8"
        },{
            Name: "Student 9"
        }, {
            Name: "Student 10"
        }, {
            Name: "Student 11"
        },{
            Name: "Student 12"
        },{
            Name: "Student 13"
        }, {
            Name: "Student 14"
        }];

        $scope.contactsAll = false;
        $scope.checkAllcontacts = function () {

            console.log("into check all");
            if ($scope.contactsAll) {
                $scope.contactsAll = true;
            } else {
                $scope.contactsAll = false;
            }
            angular.forEach($scope.contactList, function (contct) {
                contct.Tick = $scope.contactsAll;
            });
        };

    })
    .controller('MsgChatCtrl', function($scope, $state, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicSideMenuDelegate) {
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);

        $scope.noticeBoard = function() {
            $state.go('app.sharedNotification');
        };
    })

    .controller('AttendLandingCtrl', function($scope, $state, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicSideMenuDelegate) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);

        $scope.noticeBoard = function() {
            $state.go('app.sharedNotification');
        };
    })
    .controller('MarkAttendanceCtrl', function($scope, $state, $timeout, ionicMaterialMotion, ionicMaterialInk, $log, $ionicSideMenuDelegate) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);

        $scope.noticeBoard = function() {
            $state.go('app.sharedNotification');
        };

        $scope.contactList = [{
            id: 1,
            Name: "Student 1"
        }, {
            id: 2,
            Name: "Student 2"
        }, {
            id: 3,
            Name: "Student 3"
        },{
            id: 4,
            Name: "Student 4"
        },{
            id: 5,
            Name: "Student 5"
        }, {
            id: 6,
            Name: "Student 6 (Leave Applied)"
        }, {
            id: 7,
            Name: "Student 7"
        },{
            id: 8,
            Name: "Student 8"
        },{
            id: 9,
            Name: "Student 9 (Leave Applied)"
        }, {
            id: 10,
            Name: "Student 10"
        }, {
            id: 11,
            Name: "Student 11"
        },{
            id: 12,
            Name: "Student 12"
        },{
            id: 13,
            Name: "Student 13"
        }, {
            id: 14,
            Name: "Student 14"
        }];

        $scope.toggleCheck = function(elementData) {

            var changeClass = angular.element(document.querySelector('#'+ elementData.target.id));


            console.log(elementData);

               if(elementData.target.classList[2] == "mark-check" || elementData.target.classList[1] == "mark-check" ){
                   changeClass.removeClass('mark-check');
                   changeClass.addClass('mark-uncheck');
            }
            else{
                   changeClass.removeClass('mark-uncheck');
                   changeClass.addClass('mark-check');
            }
        };
           $scope.selectedDate = new Date();
    })

    .controller('ViewAttendanceCtrl', function($scope, $state, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicSideMenuDelegate) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);

        $scope.noticeBoard = function() {
            $state.go('app.sharedNotification');
        };
            $scope.options = {
                defaultDate: new Date(),
                minDate: "2015-01-01",
                maxDate: "",
                disabledDates: [
                    "2015-11-22",
                    "2015-11-27"
                ],
                dayNamesLength: 3, // 1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names. Default is 1.
                mondayIsFirstDay: true,//set monday as first day of week. Default is false
                eventClick: function(date) {
                    console.log(date['event']);
                    if (date['event'][0]) {
                        // items have value
                        $scope.selectedEvents = date['event'];
                        console.log("Click "+ $scope.selectedEvents);
                    } else {
                        // items is still null
                        $scope.selectedEvents = {0:{ Title: 'Nothing on selected date'}};
                        console.log($scope.selectedEvents);
                    }
                },
                dateClick: function(date) {
                    console.log(date['event']);
                    if (date['event'][0]) {
                        // items have value
                        $scope.selectedEvents = date['event'];
                        console.log("DateClick "+ $scope.selectedEvents);
                    } else {
                        // items is still null
                        $scope.selectedEvents = {0:{ Title: 'Nothing on selected date'}};
                        console.log($scope.selectedEvents);
                    }
                },
                changeMonth: function(month, year) {
                    console.log(month, year);
                },
                filteredEventsChange: function(filteredEvents) {
                    console.log(filteredEvents);
                }
            };

            $scope.events = [
                {Title: '13-', Subject: ' Priyanshi Prajapati', date: "2015-12-03"},
                {Title: '44-', Subject: ' Nimish Jagtap', date: "2015-12-03"},
                {Title: '51-', Subject: ' Komal Jagtap', date: "2015-12-03"},
                {Title: '02-', Subject: ' Pranav Athale', date: "2015-12-03"},
                {Title: '11-', Subject: ' Rekha Mathani', date: "2015-11-10"},
                {Title: '44-', Subject: ' Abhi Kadam', date: "2015-11-20"},
                {Title: '65-', Subject: ' Ram Shukla', date: "2015-11-20"}
            ];

    })
    .controller('LandingEventCtrl', function($scope, $state, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicSideMenuDelegate) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);

        $scope.noticeBoard = function() {
            $state.go('app.sharedNotification');
        };
    })
    .controller('EditEventCtrl', function($scope, $state, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicSideMenuDelegate) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);

        $scope.noticeBoard = function() {
            $state.go('app.sharedNotification');
        };

        $scope.nMessages = [{
            Picture: "graduate.jpg",
            Status: "unRead",
            Subject: "Notification 1",
            Message: "School has won Math Olympaid Exam",
            Timestamp: "Date: 18 Oct 2015",
            Priority: "high"
        }, {
            Status: "Read",
            Subject: "Notification 2",
            Message: "School has participated Math Olympaid Exam",
            Timestamp: "Date: 17 Oct 2015",
            Priority: "medium"
        }, {
            Picture: "education-bg.jpg",
            Status: "Read",
            Subject: "Notification 3",
            Message: "The Attendance is Compulsary",
            Timestamp: "Date: 15 Oct 2015",
            Priority: "high"
        },{
            Picture: "graduate.jpg",
            Status: "unRead",
            Subject: "Notification 1",
            Message: "School has won Math Olympaid Exam",
            Timestamp: "Date: 18 Oct 2015",
            Priority: "high"
        }, {
            Status: "Read",
            Subject: "Notification 2",
            Message: "School has participated Math Olympaid Exam",
            Timestamp: "Date: 17 Oct 2015",
            Priority: "medium"
        }, {
            Picture: "education-bg.jpg",
            Status: "Read",
            Subject: "Notification 3",
            Message: "The Attendance is Compulsary",
            Timestamp: "Date: 15 Oct 2015",
            Priority: "high"
        },{
            Picture: "graduate.jpg",
            Status: "unRead",
            Subject: "Notification 1",
            Message: "School has won Math Olympaid Exam",
            Timestamp: "Date: 18 Oct 2015",
            Priority: "high"
        }, {
            Status: "Read",
            Subject: "Notification 2",
            Message: "School has participated Math Olympaid Exam",
            Timestamp: "Date: 17 Oct 2015",
            Priority: "medium"
        }, {
            Picture: "education-bg.jpg",
            Status: "Read",
            Subject: "Notification 3",
            Message: "The Attendance is Compulsary",
            Timestamp: "Date: 15 Oct 2015",
            Priority: "high"
        }];
    })
    .controller('CreateEventCtrl', function($scope, $state, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicSideMenuDelegate) {
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);

        $scope.noticeBoard = function() {
            $state.go('app.sharedNotification');
        };
        $scope.selectedDate = new Date();

    })
    .controller('ViewEventsCtrl', function($scope, $state, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicSideMenuDelegate) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);


        $scope.options = {
            defaultDate: new Date(),
            minDate: "2015-01-01",
            maxDate: "",
            disabledDates: [
                "2015-11-22",
                "2015-11-27"
            ],
            dayNamesLength: 3, // 1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names. Default is 1.
            mondayIsFirstDay: true,//set monday as first day of week. Default is false
            eventClick: function(date) {
                console.log(date['event']);
                if (date['event'][0]) {
                    // items have value
                    $scope.selectedEvents = date['event'];
                    console.log("Click "+ $scope.selectedEvents);
                } else {
                    // items is still null
                    $scope.selectedEvents = {0:{ Title: 'Nothing on selected date'}};
                    console.log($scope.selectedEvents);
                }
            },
            dateClick: function(date) {
                console.log(date['event']);
                if (date['event'][0]) {
                    // items have value
                    $scope.selectedEvents = date['event'];
                    console.log("DateClick "+ $scope.selectedEvents);
                    $scope.detailEvent();
                } else {
                    // items is still null
                    $scope.selectedEvents = {0:{ Title: 'Nothing on selected date'}};
                    console.log($scope.selectedEvents);
                    $scope.detailEvent();
                }
            },
            changeMonth: function(month, year) {
                console.log(month, year);
            },
            filteredEventsChange: function(filteredEvents) {
                console.log(filteredEvents);
            }
        };

        $scope.events = [
            {Title: '13-', Subject: ' Priyanshi Prajapati', date: "2015-11-18"},
            {Title: '44-', Subject: ' Nimish Jagtap', date: "2015-11-26"},
            {Title: '51-', Subject: ' Komal Jagtap', date: "2015-11-26"},
            {Title: '02-', Subject: ' Pranav Athale', date: "2015-11-18"},
            {Title: '11-', Subject: ' Rekha Mathani', date: "2015-11-10"},
            {Title: '44-', Subject: ' Abhi Kadam', date: "2015-11-20"},
            {Title: '65-', Subject: ' Ram Shukla', date: "2015-11-20"}
        ];

    })
    .controller('ViewLeaveApprovalCtrl', function($scope, $state, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicSideMenuDelegate) {
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);

        $scope.noticeBoard = function() {
            $state.go('app.sharedNotification');
        };
        $scope.selectedDate = new Date();

        $scope.nMessages = [{
            Button: "display-true",
            Label: "display-false",
            Title: "Ashish Sawant",
            Message: "Fever, Cough and Cold",
            Timestamp: "Applied On: 18 Oct 2015",
            Class: "5th B div"
        }, {
            Button: "display-true",
            Label: "display-false",
            Title: "Tushar Kadam",
            Message: "Typhoid",
            Timestamp: "Applied On: 17 Oct 2015",
            Class: "8th A div"
        }, {
            Button: "display-false",
            Label: "display-true",
            Title: "Rahul Bhosale",
            Message: "Brothers Marriage",
            Timestamp: "Applied On: 15 Oct 2015",
            Class: "9th C div"
        }, {
            Button: "display-false",
            Label: "display-true",
            Title: "Ashish Sawant",
            Message: "Cough n Cold",
            Timestamp: "Applied On: 13 Oct 2015",
            Class: "5th B div"
        }, {
            Button: "display-false",
            Label: "display-true",
            Title: "Rahul Bhosale",
            Message: "Brothers Marriage",
            Timestamp: "Applied On: 15 Oct 2015",
            Class: "9th C div"
        }, {
            Button: "display-false",
            Label: "display-true",
            Title: "Ashish Sawant",
            Message: "Cough n Cold",
            Timestamp: "Applied On: 13 Oct 2015",
            Class: "5th B div"
        },{
            Button: "display-false",
            Label: "display-true",
            Title: "Tushar Kadam",
            Message: "Cough n Cold",
            Timestamp: "Applied On: 11 Oct 2015",
            Class: "8th A div"
        }];

    })
    .controller('DetailPageCtrl', function($scope, $state, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicSideMenuDelegate, $ionicModal) {
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu
        $ionicSideMenuDelegate.canDragContent(true);

        $ionicModal.fromTemplateUrl('studentlist.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        })

        $scope.openModal = function() {
            $scope.modal.show();
        }

        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        $scope.$on('$destroy', function() {
           // $scope.modal.remove();
        });

        $scope.contactList = [{
            Name: "Student 1"
        }, {
            Name: "Student 2"
        }, {
            Name: "Student 3"
        },{
            Name: "Student 4"
        },{
            Name: "Student 5"
        }, {
            Name: "Student 6"
        }, {
            Name: "Student 7"
        },{
            Name: "Student 8"
        },{
            Name: "Student 9"
        }, {
            Name: "Student 10"
        }, {
            Name: "Student 11"
        },{
            Name: "Student 12"
        },{
            Name: "Student 13"
        }, {
            Name: "Student 14"
        }];

        $scope.noticeBoard = function() {
            $state.go('app.sharedNotification');
        };
        $scope.selectedDate = new Date();

    })
    .controller('TimeTableCtrl', function($scope, $state, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicSideMenuDelegate, $ionicPopup) {
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();//
        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu
        $ionicSideMenuDelegate.canDragContent(true);

        // Triggered on a button click, or some other target
        $scope.showPopup = function() {
            $scope.data = {}

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<div class="list">'+
                    '<div class="row">'+
                    '<div class="col-33 border-bottom">'+
                    '<select class="item item-input item-select">'+
                    '<option selected class="padding-top-5">Batch</option>'+
                    '<option class="padding-top-5">Morning</option>'+
                    '<option class="padding-top-5">Afternoon</option>'+
                    '<option class="padding-top-5">Evening</option>'+
                    '</select>'+
                    '</div>'+
                    '<div class="col-33 border-bottom">'+
                    '<select class="item item-input item-select">'+
                    '<option selected class="padding-top-5">Class</option>'+
                    '<option class="padding-top-5">Class I</option>'+
                    '<option class="padding-top-5">Class II</option>'+
                    '<option class="padding-top-5">Class III</option>'+
                    '</select>'+
                    '</div>'+
                    '<div class="col-33 border-bottom">'+
                    '<select class="item item-input item-select">'+
                    '<option selected class="padding-top-5">Div</option>'+
                    '<option class="padding-top-5">Div A</option>'+
                    '<option class="padding-top-5">Div B</option>'+
                    '<option class="padding-top-5">Div C</option>'+
                    '</select>'+
                    '</div>'+
                    '</div>'+
                    '</div>',
                title: 'Select Details',
                subTitle: '',
                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>Save</b>',
                        type: 'button-timetable',
                        onTap: function(e) {
                            if (!$scope.data.studName) {
                                myPopup.close();
                            } else {
                                //return $scope.data.studName;
                                myPopup.close();
                            }
                        }
                    }
                ]
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
            $timeout(function() {
                myPopup.close(); //close the popup after 8 seconds for some reason
            }, 40000);
        };

        $scope.timeTableList = [
            {
                Subject: 'Science',
                Teacher: 'Mr. S.Sonawane.',
                Time: '11:00 am - 11:40 am'
            },
            {
                Subject: 'Maths',
                Teacher: 'Mr. A.Adkar.',
                Time: '11:45 am - 12:25 pm'
            },
            {
                Subject: 'English',
                Teacher: 'Mrs. P.Dsouza.',
                Time: '12:30 pm - 01:10 pm'
            },
            {
                Subject: 'Marathi',
                Teacher: 'Mr. C.Agarkar',
                Time: '01:15 pm - 01:55 pm'
            },
            {
                Subject: 'Geography',
                Teacher: 'Mr. V.M.Das',
                Time: '02:00 pm - 02:40 pm'
            },
            {
                Subject: 'History',
                Teacher: 'Mrs. A.Rao.',
                Time: '02:45 pm - 03:25 pm'
            },
            {
                Subject: 'Recess',
                Teacher: '',
                Time: '03:30 pm - 4:10 pm'

            },
            {
                Subject: 'Hindi',
                Teacher: 'Mrs. D.Saxena.',
                Time: '04:15 pm - 04:55 pm'
            },
            {
                Subject: 'Drawing',
                Teacher: 'Mr. Vijay.Kulkarni',
                Time: '05:00 pm - 05:55 pm'
            }
        ];

    })
    .controller('ResultViewCntrl', function($scope, $state, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicSideMenuDelegate, $ionicModal, $ionicPopup) {
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu
        $ionicSideMenuDelegate.canDragContent(true);

        // Triggered on a button click, or some other target
        $scope.showPopup = function() {
            $scope.data = {}

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<div class="list">'+
                    '<div class="row">'+
                    '<div class="col-33 border-bottom">'+
                    '<select class="item item-input item-select">'+
                    '<option selected class="padding-top-5">Batch</option>'+
                    '<option class="padding-top-5">Morning</option>'+
                    '<option class="padding-top-5">Afternoon</option>'+
                    '<option class="padding-top-5">Evening</option>'+
                    '</select>'+
                    '</div>'+
                    '<div class="col-33 border-bottom">'+
                    '<select class="item item-input item-select">'+
                    '<option selected class="padding-top-5">Class</option>'+
                    '<option class="padding-top-5">Class I</option>'+
                    '<option class="padding-top-5">Class II</option>'+
                    '<option class="padding-top-5">Class III</option>'+
                    '</select>'+
                    '</div>'+
                    '<div class="col-33 border-bottom">'+
                    '<select class="item item-input item-select">'+
                    '<option selected class="padding-top-5">Div</option>'+
                    '<option class="padding-top-5">Div A</option>'+
                    '<option class="padding-top-5">Div B</option>'+
                    '<option class="padding-top-5">Div C</option>'+
                    '</select>'+
                    '</div>'+
                    '</div>'+
                    '<div class="row">'+
                    '<label class="item item-input border-bottom">'+
                    '<input type="text" placeholder="+ Select Student" ng-click="openModal()" ng-model="data.studName">'+
                    '</label>'+
                    '</div>'+
                    '</div>',
                title: 'Select Details',
                subTitle: '',
                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>Save</b>',
                        type: 'button-yellow',
                        onTap: function(e) {
                            if (!$scope.data.studName) {
                                myPopup.close();
                            } else {
                                //return $scope.data.studName;
                                myPopup.close();
                            }
                        }
                    }
                ]
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
            $timeout(function() {
                myPopup.close(); //close the popup after 8 seconds for some reason
            }, 40000);
        };

        $scope.subGraphPopup = function() { //
            $scope.data = {}

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<div class="card">'+
                    '<highchart id="chart1" config="chartSubConfig"></highchart>'+
                    '</div>',
                title: 'Subject Graph',
                subTitle: '',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Close</b>',
                        type: 'button-assertive',
                        onTap: function(e) {
                            if (!$scope.data.studName) {
                                myPopup.close();
                            } else {
                                //return $scope.data.studName;
                                myPopup.close();
                            }
                        }
                    }
                ]
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
//            $timeout(function() {
//                myPopup.close(); //close the popup after 8 seconds for some reason
//            }, 40000);
        };

        $scope.testGraphPopup = function() {
            $scope.data = {}

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<div class="card">'+
                    '<highchart id="chart1" config="chartTestConfig"></highchart>'+
                    '</div>',
                title: 'Test Graph',
                subTitle: '',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Close</b>',
                        type: 'button-assertive',
                        onTap: function(e) {
                            if (!$scope.data.studName) {
                                myPopup.close();
                            } else {
                                //return $scope.data.studName;
                                myPopup.close();
                            }
                        }
                    }
                ]
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
            $timeout(function() {
                myPopup.close(); //close the popup after 8 seconds for some reason
            }, 40000);
        };

        $ionicModal.fromTemplateUrl('studentCntctlist.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        })

        $scope.openModal = function() {
            $scope.modal.show();
        }

        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        $scope.$on('$destroy', function() {
            // $scope.modal.remove();
        });

        $scope.contactList = [{
            Name: "Student 1"
        }, {
            Name: "Student 2"
        }, {
            Name: "Student 3"
        },{
            Name: "Student 4"
        },{
            Name: "Student 5"
        }, {
            Name: "Student 6"
        }, {
            Name: "Student 7"
        },{
            Name: "Student 8"
        },{
            Name: "Student 9"
        }, {
            Name: "Student 10"
        }, {
            Name: "Student 11"
        },{
            Name: "Student 12"
        },{
            Name: "Student 13"
        }, {
            Name: "Student 14"
        }];

        $scope.chartSubConfig = {
            options: {
                chart: {
                    type: 'bar'
                }
            },
            series: [{
                data: [45, 78, 69, 82, 71]
            }],
            title: {
                text: 'English'
            },

            loading: false,
            size: {
                height: 400
            },
            yAxis: {

                title: {text: 'Marks'}
            }

        };
        $scope.chartTestConfig = {
            options: {
                chart: {
                    type: 'bar'
                }
            },
            series: [{
                data: [45, 78, 69, 82, 71]
            }],
            title: {
                text: 'Test Graph'
            },

            loading: false,
            size: {
                height: 400
            },
            yAxis: {

                title: {text: 'Marks'}
            }

        };

    }); // end of Ctrl