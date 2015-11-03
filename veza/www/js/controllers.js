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

        $scope.composeHw = function() {
            $state.go('app.hwcompose');
        };

        $scope.composeMsg = function() {
            $state.go('app.msgcompose');
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
            Subject: "Notification 1",
            Message: "The Attendance is Compulsary",
            Timestamp: "Date: 18 Oct 2015",
            Type: "notification_attendance"
        }, {
            Status: "unRead",
            Subject: "Notification 2",
            Message: "The Attendance is Compulsary",
            Timestamp: "Date: 17 Oct 2015",
            Type: "notification_event"
        }, {
            Status: "Read",
            Subject: "Notification 3",
            Message: "The Attendance is Compulsary",
            Timestamp: "Date: 15 Oct 2015",
            Type: "notification_fees"
        },{
            Status: "Read",
            Subject: "Notification 4",
            Message: "The Attendance is Compulsary",
            Timestamp: "Date: 14 Oct 2015",
            Type: "notification_homework"
        },{
            Status: "Read",
            Subject: "Notification 5",
            Message: "The Attendance is Compulsary",
            Timestamp: "Date: 14 Oct 2015",
            Type: "notification_result"
        },{
            Status: "Read",
            Subject: "Notification 6",
            Message: "The Attendance is Compulsary",
            Timestamp: "Date: 11 Oct 2015",
            Type: "notification_event"
        },{
            Status: "Read",
            Subject: "Notification 7",
            Message: "The Attendance is Compulsary",
            Timestamp: "Date: 08 Oct 2015",
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
            Timestamp: "Date: 18 Oct 2015",
            Class: "5th B div",
            Subject: "Science",
            Attach: "yes"

        }, {
            Status: "Read",
            Title: "Remaining Answers",
            Message: "Still some answers are remaining",
            Timestamp: "Date: 17 Oct 2015",
            Class: "8th A div",
            Subject: "Geography",
            Attach: "no"
        }, {
            Status: "Read",
            Title: "Project Details",
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
    .controller('HwComposeCtrl', function($scope, $state, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicSideMenuDelegate, $ionicModal, $ionicHistory) {

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
                Subject: "Maths",
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

    });