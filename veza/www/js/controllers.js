/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,$state, $ionicModal, $ionicPopover, $timeout, $ionicSideMenuDelegate) {
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
})

.controller('LoginCtrl', function($scope, $state, $timeout, ionicMaterialMotion, ionicMaterialInk) {

    $scope.signIn = function() {
        console.log("into signin");
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
  	
// Set Header
    $scope.$parent.hideHeader();
    $ionicSideMenuDelegate.canDragContent(true);
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);
	

    // Set Motion  
   $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

        $scope.noticeBoard = function() {
            $state.go('app.sharedNotification');
        };
})

.controller('NotificationCtrl', function($scope, $state, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicSideMenuDelegate) {

// Set Header
    $scope.$parent.hideHeader();
    $ionicSideMenuDelegate.canDragContent(true);
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);


    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

        $scope.nMessages = [{
            Status: "unRead",
            Subject: "Notification 1",
            Message: "The Attendance is Compulsary",
            Timestamp: "Date: 18 Oct 2015"
        }, {
            Status: "unRead",
            Subject: "Notification 2",
            Message: "The Attendance is Compulsary",
            Timestamp: "Date: 17 Oct 2015"
        }, {
            Status: "Read",
            Subject: "Notification 3",
            Message: "The Attendance is Compulsary",
            Timestamp: "Date: 15 Oct 2015"
        },{
            Status: "Read",
            Subject: "Notification 4",
            Message: "The Attendance is Compulsary",
            Timestamp: "Date: 14 Oct 2015"
        },{
            Status: "Read",
            Subject: "Notification 5",
            Message: "The Attendance is Compulsary",
            Timestamp: "Date: 14 Oct 2015"
        },{
            Status: "Read",
            Subject: "Notification 6",
            Message: "The Attendance is Compulsary",
            Timestamp: "Date: 11 Oct 2015"
        },{
            Status: "Read",
            Subject: "Notification 7",
            Message: "The Attendance is Compulsary",
            Timestamp: "Date: 08 Oct 2015"
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

// Set Header
        $scope.$parent.hideHeader();
        $ionicSideMenuDelegate.canDragContent(true);
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);


        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

        $scope.nMessages = [{
            Status: "unRead",
            Subject: "Notification 1",
            Message: "The Attendance is Compulsary",
            Timestamp: "Date: 18 Oct 2015",
            Priority: "high"
        }, {
            Status: "unRead",
            Subject: "Notification 2",
            Message: "The Attendance is Compulsary",
            Timestamp: "Date: 17 Oct 2015",
            Priority: "medium"
        }, {
            Status: "Read",
            Subject: "Notification 3",
            Message: "The Attendance is Compulsary",
            Timestamp: "Date: 15 Oct 2015",
            Priority: "high"
        },{
            Status: "Read",
            Subject: "Notification 4",
            Message: "The Attendance is Compulsary",
            Timestamp: "Date: 14 Oct 2015",
            Priority: "low"
        },{
            Status: "Read",
            Subject: "Notification 5",
            Message: "The Attendance is Compulsary",
            Timestamp: "Date: 14 Oct 2015",
            Priority: "medium"
        },{
            Status: "Read",
            Subject: "Notification 6",
            Message: "The Attendance is Compulsary",
            Timestamp: "Date: 11 Oct 2015",
            Priority: "low"
        },{
            Status: "Read",
            Subject: "Notification 7",
            Message: "The Attendance is Compulsary",
            Timestamp: "Date: 08 Oct 2015",
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
    .controller('SharedAchievementCtrl', function($scope, $state, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicSideMenuDelegate) {

// Set Header
        $scope.$parent.hideHeader();
        $ionicSideMenuDelegate.canDragContent(true);
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);


        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

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
    .controller('HomeworkCtrl', function($scope, $state, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicSideMenuDelegate) {

// Set Header
        $scope.$parent.hideHeader();
        $ionicSideMenuDelegate.canDragContent(true);
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);


        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();

        $scope.nMessages = [{
            Status: "unRead",
            Title: "Questions & Answers",
            Message: "Answer Questions from Textbook",
            Timestamp: "Date: 18 Oct 2015",
            Class: "5th B div",
            Subject: "Science"

        }, {
            Status: "Read",
            Title: "Remaining Answers",
            Message: "Still some answers are remaining",
            Timestamp: "Date: 17 Oct 2015",
            Class: "8th A div",
            Subject: "Geography"
        }, {
            Status: "Read",
            Title: "Project Details",
            Message: "Sending project details",
            Timestamp: "Date: 15 Oct 2015",
            Class: "9th C div",
            Subject: "Maths"
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
    });