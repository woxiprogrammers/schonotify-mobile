/* global angular, document, window */
'use strict';
var db = null;
angular.module('starter.controllers', [])
.constant('GLOBALS',{
   baseUrl:'http://test.woxiapps.com/api/v1/',
//    baseUrl:'http://192.168.2.10/api/v1/'
})
.service('userSessions', function Usersession(){

        var userSessions = this;

        userSessions.userSession = [];
        userSessions.userSession.userToken = 0;
        userSessions.setSession = function(token, role, msgcount){
            userSessions.userSession.userToken = token;
            userSessions.userSession.userRole = role;
            userSessions.userSession.msgcount = msgcount;
            return true;
        };

        userSessions.setUserId = function(id){
            userSessions.userSession.userId = id;
            return true;
        };

        userSessions.setMsgCount = function(count){
            userSessions.userSession.msgcount = count;
            return true;
        };

        userSessions.setToken = function(id){
            userSessions.userSession.userToken = id;
            return true;
        };

        userSessions.setMsgCount_0 = function(){
            userSessions.userSession.msgcount = '';
            return true;
        };
})
.service('userData', function uData(){

        var userData = this;

        userData.data = [];

        userData.setUserData = function(dataArray){
            userData.data = dataArray;
            return true;
        };
        userData.getUserData = function(){
            return userData.data;
        };
})
.service('chatHist', function chatDetail(){

        var chatHist = this;

        chatHist.data = [];
        chatHist.setChatHist = function(userId,from, to, title, title_id){
            chatHist.data.user_id = userId;
            chatHist.data.from_id = from;
            chatHist.data.to_id = to;
            chatHist.data.title = title;
            chatHist.data.title_id = title_id;
            return true;
        };
        chatHist.getChatHist = function(){
            return chatHist.data;
        };
})
.service('hwDetails', function hmwDetail(){

        var hwDetails = this;

        hwDetails.data = [];
        hwDetails.setHwView = function(data){
            hwDetails.data = data;
            return true;
        };
        hwDetails.getHwView = function(){
            return hwDetails.data;
        };
})
.service('studentToggle', function studentToggle(){

        var studentToggle = this;

        studentToggle.data = [];

        studentToggle.setUserData = function(dataArray){
            studentToggle.data = dataArray;
            return true;
        };
        studentToggle.getUserData = function(){
            return studentToggle.data;
        };
})
.controller('AppCtrl', function($scope, $state, $ionicPopup, $http, $ionicModal, $ionicPopover, $timeout, $ionicSideMenuDelegate, $ionicHistory, userSessions) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;
    $scope.aclMessage = "Access Denied";
    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            current.classList.toggle('active');
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
        userSessions.setToken (0);
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

         $scope.createLeave = function() {
            $state.go('app.leavecreate');
        };

        $scope.composeMsg = function() {
                if(userSessions.userSession.userRole == "parent"){
                        $state.go('app.parentMsgcompose');
                }
                else{
                        $state.go('app.msgcompose');
                }
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

        $scope.homeworkView = function (){
            if(userSessions.userSession.userRole == "parent"){
                 $state.go('app.parenthomework');
            }
            else{
                 $state.go('app.homeworklanding');
            }
        };

        $scope.attendanceLanding = function (){
            if(userSessions.userSession.userRole == "parent"){
                 $state.go('app.parentattendancelanding');
            }
            else{
                 $state.go('app.attendancelanding');
            }
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

        $scope.unPublishList = function() {
            $state.go('app.edithomeworklisting');
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

        $scope.signIn = function() {
            $state.go('app.dashboard');
        };

        $scope.msgDetail = function() {
            $state.go('app.chatmsg');
        };

        $scope.viewMessagesList = function(){
               $state.go('app.message');
        };

})
.controller('LoginCtrl', function($scope, $state, $http, $timeout, ionicMaterialInk, $cordovaSQLite, GLOBALS, $ionicPopup, userSessions, userData) {

    $scope.data = [];
    ionicMaterialInk.displayEffect();
        $scope.submit = function(email,password){
            $scope.sessionId = '';
            $scope.sessionToken = '';
            $scope.sessionUserRole = '';
                    var url= GLOBALS.baseUrl+"user/auth";
                    console.log(url);
                    $http.post(url, { email: email, password: password }).success(function(res) {
                        $scope.data.message = res['message'];
                        console.log("Status: "+res['status']);
                        if(res['status'] == 200){
                            $scope.userDataArray = userData.setUserData(res['data']['users']);
                            $scope.sessionToken = res['data']['users']['token'];
                            $scope.sessionUserRole = res['data']['users']['role_type'];
                            $scope.sessionId = res['data']['Badge_count']['user_id'];
                            $scope.messageCount = res['data']['Badge_count']['message_count'];
                            var  userSet = false;
                            var idSet = false;
                            userSet = userSessions.setSession($scope.sessionToken, $scope.sessionUserRole, $scope.messageCount);
                            idSet = userSessions.setUserId($scope.sessionId);
                                if(userSet == true && idSet == true){
                                   $state.go('app.dashboard');
                                }
                        }
            })
            .error(function(err) {
                console.log("Error: "+err);
                if(err.hasOwnProperty('status')){
                    $scope.data.message = err.message;
                }
                else{
                    $scope.data.message = "Sorry!! Incorrect email or password";
                }
                $scope.showPopup();
            });
        }

        $scope.showPopup = function() {
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<div class = "row"><span class = "align-center red-font text-center-align">'+$scope.data.message+'</span></div>',
                title: '',
                subTitle: '',
                scope: $scope
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
            $timeout(function() {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);
        };
})

.controller('DashboardCtrl', function($scope, $state, $timeout, GLOBALS, $http, ionicMaterialInk, $ionicSideMenuDelegate, $cordovaSQLite, userSessions, userData) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu
        $ionicSideMenuDelegate.canDragContent(true);
        $scope.msgCount = '';
        if(userSessions.userSession.userToken == 0){
            $state.go('login');
        }
        
        var url= GLOBALS.baseUrl+"user/get-message-count/"+userSessions.userSession.userId+"?token="+userSessions.userSession.userToken;
            $http.get(url).success(function(response) {
                if(response['data']['Badge_count']['message_count'] > 0){
                    userSessions.setMsgCount(response['data']['Badge_count']['message_count']);
                    $scope.msgCount = response['data']['Badge_count']['message_count'];
                }else{
                    $scope.msgCount = '';
                }
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                });
        if(userSessions.userSession.msgcount > 0){
            $scope.msgCount = userSessions.userSession.msgcount;
        }
})
.controller('NotificationCtrl', function($scope, $state, $timeout, ionicMaterialInk, $ionicSideMenuDelegate) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);

        $scope.nmessages = [{
            Status: "unRead",
            Subject: "Rohit Shetty",
            message: " has created homework for 5th Std Div B.",
            Timestamp: "4 mins ago",
            Type: "notification_attendance"
        }, {
            Status: "unRead",
            Subject: "Rohit Shetty",
            message: " has created homework for 5th Std Div B.",
            Timestamp: "40 mins ago",
            Type: "notification_event"
        }, {
            Status: "Read",
            Subject: "Rohit Shetty",
            message: " has created homework for 5th Std Div B.",
            Timestamp: "40 mins ago",
            Type: "notification_fees"
        },{
            Status: "Read",
            Subject: "Rohit Shetty",
            message: " has created homework for 5th Std Div B.",
            Timestamp: "40 mins ago",
            Type: "notification_homework"
        },{
            Status: "Read",
            Subject: "Rohit Shetty",
            message: " has created homework for 5th Std Div B.",
            Timestamp: "40 mins ago",
            Type: "notification_result"
        },{
            Status: "Read",
            Subject: "Rohit Shetty",
            message: " has created homework for 5th Std Div B.",
            Timestamp: "40 mins ago",
            Type: "notification_event"
        },{
            Status: "Read",
            Subject: "Rohit Shetty",
            message: " has created homework for 5th Std Div B.",
            Timestamp: "40 mins ago",
            Type: "notification_attendance"
        }];

        $scope.checkAll = function () {
            if ($scope.selectedAll) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }
            angular.forEach($scope.nmessages, function (nmsg) {
                nmsg.Selected = $scope.selectedAll;
            });

        };
})
.controller('SharedNotificationCtrl', function($scope, $state, $timeout, ionicMaterialInk, $ionicSideMenuDelegate) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu
        $ionicSideMenuDelegate.canDragContent(true);

        $scope.nmessages = [{
            Status: "unRead",
            Subject: "Class Test for Std 5 on this thursday",
            message: "The Attendance is Compulsary",
            Timestamp: "4 mins ago",
            Priority: "high"
        }, {
            Status: "unRead",
            Subject: "Notification 2",
            message: "The Attendance is Compulsary",
            Timestamp: "40 mins ago",
            Priority: "medium"
        }, {
            Status: "Read",
            Subject: "Notification 3",
            message: "The Attendance is Compulsary",
            Timestamp: "4 hours ago",
            Priority: "high"
        },{
            Status: "Read",
            Subject: "Notification 4",
            message: "The Attendance is Compulsary",
            Timestamp: "4 days ago",
            Priority: "low"
        },{
            Status: "Read",
            Subject: "Notification 5",
            message: "The Attendance is Compulsary",
            Timestamp: "4 weeks ago",
            Priority: "medium"
        },{
            Status: "Read",
            Subject: "Notification 6",
            message: "The Attendance is Compulsary",
            Timestamp: "4 months ago",
            Priority: "low"
        },{
            Status: "Read",
            Subject: "Notification 7",
            message: "The Attendance is Compulsary",
            Timestamp: "5 months ago",
            Priority: "high"
        }];

        $scope.checkAll = function () {
            if ($scope.selectedAll) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }
            angular.forEach($scope.nmessages, function (nmsg) {
                nmsg.Selected = $scope.selectedAll;
            });

        };
 })
    .controller('CreateAnnouncementCtrl', function($scope, $state, $timeout, ionicMaterialInk, $ionicSideMenuDelegate) {
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);

    })
    .controller('SharedAchievementCtrl', function($scope, $state, $timeout, ionicMaterialInk, $ionicSideMenuDelegate) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);

        $scope.nmessages = [{
            Picture: "graduate.jpg",
            Status: "unRead",
            Subject: "Notification 1",
            message: "D.A.V wins Inter School Basketball Tournament 2015",
            Timestamp: "Date: 04 Dec 2015",
            Priority: "high"
        }, {
            Status: "Read",
            Subject: "Notification 2",
            message: "School has participated Math Olympaid Exam",
            Timestamp: "Date: 04 Dec 2015",
            Priority: "medium"
        }, {
            Picture: "education-bg.jpg",
            Status: "Read",
            Subject: "Notification 3",
            message: "The Attendance is Compulsary",
            Timestamp: "Date: 04 Dec 2015",
            Priority: "high"
        }];

        $scope.checkAll = function () {
            if ($scope.selectedAll) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }
            angular.forEach($scope.nmessages, function (nmsg) {
                nmsg.Selected = $scope.selectedAll;
            });

        };
    })
    .controller('CreateAchievementCtrl', function($scope, $state, $timeout, ionicMaterialInk, $ionicSideMenuDelegate) {
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu
        $ionicSideMenuDelegate.canDragContent(true);

    })
    .controller('HomeworkCtrl', function($scope, $state, $ionicPopup, hwDetails, userSessions, $http, GLOBALS, $timeout, ionicMaterialInk, $ionicSideMenuDelegate) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu
        $ionicSideMenuDelegate.canDragContent(true);
        if(userSessions.userSession.userToken == 0){
            $state.go('login');
        }
        $scope.clickStatus = false;
        var url= GLOBALS.baseUrl+"user/view-homework?token="+userSessions.userSession.userToken;
            $http.get(url)
                .success(function(response) {
                    if(response['status'] == 200){
                       $scope.homeworksListing = response['data'];
                       if($scope.homeworksListing == ''){
                            $scope.errorMessage = response['message'];
                            $scope.showPopup();
                       }
                    }
                    else{
                        $scope.errorMessage = response['message'];
                        $scope.showPopup();
                    }
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                    $scope.errorMessage = "Access Denied";
                    $scope.showPopup();
                });

        $scope.hwDetail= function(hwd){
            $scope.checkHid = hwDetails.setHwView(hwd);
            if($scope.checkHid == true){
                $state.go('app.teacherhwdetail');
            };
        };

        $scope.showPopup = function() {
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<div class = "row"><span class = "align-center red-font text-center-align">'+$scope.errorMessage+'</span></div>',
                title: '',
                subTitle: '',
                scope: $scope
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
            $timeout(function() {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);
        };
    })
    .controller('UnpubHwListCtrl', function($scope, $state, $ionicPopup, hwDetails, userSessions, $http, GLOBALS, $timeout, ionicMaterialInk, $ionicSideMenuDelegate) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu
        $ionicSideMenuDelegate.canDragContent(true);
        if(userSessions.userSession.userToken == 0){
            $state.go('login');
        }
        $scope.clickStatus = false;

        $scope.publishHw = function(hwId){
            var url = GLOBALS.baseUrl+"user/publish-homework?token="+userSessions.userSession.userToken;
            $http.post(url, {_method: 'PUT', homework_id: hwId}).success(function(response){
                $scope.errorMessage = response['message'];
                $scope.showPopup();
                $scope.loadUnpHw();
            }).error(function(err) {
                console.log(err);
                $scope.aclMessage = "Access Denied";
                $scope.showPopup();
                $state.go('app.homework');
            });
        };

       $scope.loadUnpHw = function(){
            var url= GLOBALS.baseUrl+"user/view-unpublished-homework?token="+userSessions.userSession.userToken;
            $http.get(url).success(function(response) {
                    if(response['status'] == 200){
                       $scope.homeworksListing = response['data'];
                       if($scope.homeworksListing == ''){
                            $scope.errorMessage = response['message'];
                            $scope.showPopup();
                       }
                    }
                    else{
                        $scope.errorMessage = response['message'];
                        $scope.showPopup();
                    }
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                    $scope.errorMessage = "Access Denied";
                    $scope.showPopup();
                });
         };

        $scope.loadUnpHw();
        $scope.hwDetail = function(hwd){
            $scope.checkHid = hwDetails.setHwView(hwd);
            if($scope.checkHid == true){
                $state.go('app.homeworkedit');
            }
        };

        $scope.confirmDelete = function(hwId){
                $scope.hwId = hwId;
                $scope.showConfirmBox();
            };

        $scope.deleteHomework = function(){
            var url = GLOBALS.baseUrl+"user/deleteHomework?token="+userSessions.userSession.userToken;
            $http.post(url, {_method: 'PUT', homework_id: $scope.hwId}).success(function(response){
                $scope.loadUnpHw();
            }).error(function(err) {
                console.log(err);
                $scope.aclMessage = "Access Denied";
                $scope.showPopup();
            });
        };

        $scope.showConfirmBox = function() {
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<div class = "row"><span class = "align-center red-font text-center-align">This will delete the Homework</span></div>',
                title: 'Press Confirm to Delete',
                subTitle: '',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Close</b>',
                        type: 'button-calm',
                        onTap: function(e) {
                                myPopup.close();
                        }
                    },
                    {
                        text: '<b>Delete</b>',
                        type: 'button-assertive',
                        onTap: function(e) {
                                $scope.deleteHomework();
                        }
                    }
                ]

            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
        };

        $scope.showPopup = function() {
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<div class = "row"><span class = "align-center red-font text-center-align">'+$scope.errorMessage+'</span></div>',
                title: '',
                subTitle: '',
                scope: $scope
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
            $timeout(function() {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);
        };
    })
    .controller('ParentHomeworkCtrl', function($scope, $state, $timeout, $http, $ionicPopup, hwDetails, GLOBALS, userSessions, ionicMaterialInk, $ionicSideMenuDelegate) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu
        $ionicSideMenuDelegate.canDragContent(true);
        if(userSessions.userSession.userToken == 0){
            $state.go('login');
        }
        $scope.clickStatus = false;
        var url= GLOBALS.baseUrl+"user/view-homework-parent/"+userSessions.userSession.userId+"?token="+userSessions.userSession.userToken;
            $http.get(url)
                .success(function(response) {
                    if(response['status'] == 200){
                       $scope.homeworksListing = response['data'];
                       if($scope.homeworksListing == ''){
                            $scope.errorMessage = response['message'];
                            $scope.showPopup();
                       }
                    }
                    else if(response['status'] == 202){
                            $scope.errorMessage = response['message'];
                            $scope.showPopup();
                    }
                    else{
                        $scope.errorMessage = response['message'];
                        $scope.showPopup();
                    }
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                    $scope.errorMessage = "Access Denied";
                    $scope.showPopup();
                });

        $scope.hwDetail= function(hwd){
            $scope.checkHid = hwDetails.setHwView(hwd);
            if($scope.checkHid == true){
                $state.go('app.homeworkdetails');
            };
        };

        $scope.showPopup = function() {
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<div class = "row"><span class = "align-center red-font text-center-align">'+$scope.errorMessage+'</span></div>',
                title: '',
                subTitle: '',
                scope: $scope
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
            $timeout(function() {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);
        };
    })
    .controller('THWdetailCtrl', function($scope, $state, hwDetails, userSessions,  $timeout, GLOBALS, $http, ionicMaterialInk, $ionicSideMenuDelegate, $ionicModal) {
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu
        $ionicSideMenuDelegate.canDragContent(true);
        $scope.hwrkDetail = hwDetails.getHwView();
        $scope.hwId = $scope.hwrkDetail.homework_id;

        var url= GLOBALS.baseUrl+"user/view-detail-homework/"+$scope.hwId+"?token="+userSessions.userSession.userToken;
            $http.get(url).success(function(response) {
                 $scope.contactList = response['data']['studentList'];
            })
            .error(function(response) {
                    console.log("Error in Response: " +response);
            });

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
    })
    .controller('HWdetailCtrl', function($scope, $state, hwDetails, $timeout, ionicMaterialInk, $ionicSideMenuDelegate, $ionicModal) {
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu
        $ionicSideMenuDelegate.canDragContent(true);
        $scope.hwrkDetail = hwDetails.getHwView();
    })
    .controller('EditHomeworkCtrl', function($scope, $state, $ionicPopup, $timeout, $filter, hwDetails, GLOBALS, userSessions, $http, ionicMaterialInk, $ionicSideMenuDelegate, $ionicModal) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu
        $ionicSideMenuDelegate.canDragContent(true);
        $scope.editHwData = hwDetails.getHwView();
        $scope.hwId = $scope.editHwData.homework_id;
        $scope.contactList = $scope.editHwData.studentList;
        $scope.SubjectId = $scope.editHwData.subject_id;
        $scope.SubjectName = $scope.editHwData.subjectName;
        $scope.BatchId = $scope.editHwData.batch_id;
        $scope.BatchName = $scope.editHwData.batch_name;
        $scope.hwTitle = $scope.editHwData.homeworkTitle;
        $scope.classId = $scope.editHwData.class_id;
        $scope.divId = $scope.editHwData.division_id;
        $scope.className = $scope.editHwData.class_name;
        $scope.divName = $scope.editHwData.division_name;
        $scope.defaultList = [];
        $scope.selectedList=[];
        $scope.classList = [];
        $scope.divisionsList = [];
        angular.forEach($scope.contactList, function (item) {
            $scope.selectedList.push(item.id);
            $scope.defaultList.push(item.id);
            $scope.$watch(function(scope) { return scope.selectedList },
              function(newValue, oldValue) {
                  if(newValue.length == $scope.contactList.length){
                      $scope.recipient = $scope.selectedList.length+" Student Selected";
                      $scope.getStudentList($scope.divId, 1);
                  }
              }
             );
        });
        $scope.minDate = new Date();
        $scope.minDate = $filter('date')($scope.minDate, "yyyy-MM-dd");
        $scope.dueDate = new Date();
        $scope.description = $scope.editHwData.description;
        $scope.hwTypeId = $scope.editHwData.homeworkTypeId;
        $scope.hwrkType = $scope.editHwData.homeworkType;
        $scope.setTitle = function(title){
          $scope.hwTitle = title;
        };        
        $scope.setDescription = function(message){
          $scope.description = message;
        };
        // toggle selection for a given student by name
        $scope.toggleSelection = function(studentId) {
            var idx = $scope.selectedList.indexOf(studentId);
            if (idx > -1) {
            $scope.selectedList.splice(idx, 1);
            }
            // is newly selected
            else {
              $scope.selectedList.push(studentId);
            }
            $scope.$apply();
            $scope.$digest();
        };
        var url = GLOBALS.baseUrl+"user/get-teachers-subjects?token="+userSessions.userSession.userToken;
            $http.get(url)
                .success(function(response) {
                    $scope.subjectsList = response['data'];
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                });

        var hwTypeurl = GLOBALS.baseUrl+"user/get-homework-types?token="+userSessions.userSession.userToken;
            $http.get(hwTypeurl)
                .success(function(response) {
                    $scope.hwTypeList = response['data'];
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                });

        $scope.getSelectedHwType = function(hwtype){
            $scope.hwTypeId = hwtype['id'];
        };
        
        $scope.updateDueDate = function(newDate){
            $scope.dueDate = newDate;
        }

        $scope.getSelectedSub = function(subject){            
            var url= GLOBALS.baseUrl+"user/get-subjects-batches/"+subject['id']+"?token="+userSessions.userSession.userToken;
            $http.get(url).success(function(response) {
                    $scope.batchList = response['data'];
                    $scope.SubjectId = subject['id'];
                    $scope.classList.length = 0;
                    $scope.BatchName = "-Batch-";
                    $scope.className = "-Class-";
                    $scope.divName = "-Div-";
                    $scope.divisionsList.length = 0;
                    $scope.contactList.length = 0;
                    $scope.selectedList.length = 0;
                    $scope.defaultList.length = 0;
                    $scope.recipient = $scope.selectedList.length+" Student Selected";
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                });
        };

        $scope.getClass= function(batch){
                var url= GLOBALS.baseUrl+"user/get-batches-classes/"+$scope.SubjectId+"/"+batch['id']+"?token="+userSessions.userSession.userToken;
                $http.get(url).success(function(response) {
                    $scope.classList = response['data'];
                    $scope.BatchId = batch['id'];
                    $scope.divName = "-Div-";
                    $scope.divisionsList.length = 0;
                    $scope.contactList.length = 0;
                    $scope.selectedList.length = 0;
                    $scope.defaultList.length = 0;
                    $scope.recipient = $scope.selectedList.length+" Student Selected";
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                });
        };

        $scope.getDivision = function(classType){
            var url= GLOBALS.baseUrl+"user/get-classes-division/"+$scope.SubjectId+"/"+$scope.BatchId+"/"+classType['id']+"?token="+userSessions.userSession.userToken;
            $http.get(url).success(function(response) {
                   $scope.divisionsList = response['data'];
                   $scope.classId = classType['id'];
                   $scope.selectedList.length = 0;
                   $scope.defaultList.length = 0;
                   $scope.contactList.length = 0;
                   $scope.recipient = $scope.selectedList.length+" Student Selected";
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                });
        };

        $scope.getStudentList = function(divType, setClear){
            if(setClear == 0){
                $scope.selectedList.length = 0;
            }
                var url= GLOBALS.baseUrl+"user/get-students-list/"+divType+"?token="+userSessions.userSession.userToken;
                $http.get(url)
                    .success(function(response) {
                        $scope.contactList.length = 0;
                        $scope.recipient = $scope.selectedList.length+" Student Selected";
                        $scope.contactList = response['data']['studentList'];
                        $scope.checkRecipient = false;
                        $scope.divId = divType;
                    })
                    .error(function(response) {
                        console.log("Error in Response: " +response);
                    });
        };
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
        $scope.selectedAll = false;
        
        $scope.checkAll = function () {
            $scope.selectedList.length = 0;      
            $scope.selectedAll = !$scope.selectedAll; 
            if($scope.selectedAll == true){
                angular.forEach($scope.contactList, function (item) {
                    $scope.toggleSelection(item.id);                                    
                });
            }          
        };

        $scope.sendTo = function(){            
            $scope.recipient = $scope.selectedList.length+" Student selected";
            $scope.defaultList.length = 0;            
            angular.forEach($scope.selectedList, function (item) {
                $scope.defaultList.push(item);
            });
            $scope.closeModal();
        };
        
        $scope.cancelList = function(){
            $scope.selectedList.length = 0;            
            angular.forEach($scope.defaultList, function (item) {
                $scope.selectedList.push(item);
            });
            
            $scope.recipient = $scope.selectedList.length+" Student selected";
            $scope.closeModal();
        };

        $scope.saveDraft = function(){
            
            $scope.dueDate = $filter('date')($scope.dueDate, "yyyy-MM-dd");
            $scope.minDate = $filter('date')($scope.minDate, "yyyy-MM-dd");
            if($scope.dueDate >= $scope.minDate){
                if($scope.selectedList.length <= 0){
                $scope.msg = "Please Add Recipient";
                $scope.showPopup();
            }else{
                if($scope.hwTitle == '' || $scope.dueDate == '' || $scope.description == ''  || $scope.selectedList.length <= 0 || $scope.hwTypeId == ''){
                    $scope.msg = "Check if all fields are filled";
                    $scope.showPopup();
                }
                else{
                    var url = GLOBALS.baseUrl+"user/update-homework?token="+userSessions.userSession.userToken;               
                    $http.post(url, {_method:'PUT', homework_id: $scope.hwId, subject_id: $scope.SubjectId, title: $scope.hwTitle, batch_id: $scope.BatchId, class_id: $scope.classId, division_id: $scope.divId, due_date: $scope.dueDate, student: $scope.selectedList, description: $scope.description, homework_type: $scope.hwTypeId, attachment_file: ''}).success(function(response){
                        if(response['status'] == 200){
                            $scope.msg = response['message'];
                            $scope.showPopup();
                            $state.go('app.edithomeworklisting');
                        }
                        else{
                            $scope.msg = response['message'];
                            $scope.showPopup();
                        }
                    }).error(function(response) {
                                console.log("Error in Response: " +response);
                                if(response.hasOwnProperty('status')){
                                    $scope.msg = response.message;
                                }
                                else{
                                    $scope.msg = "Access Denied";
                                }
                                $scope.showPopup();
                       });
                    }
                }                  
            }else{
                $scope.msg = "Due Date should be greater than Current Date";
                $scope.showPopup();
            }                      
        };

        $scope.showPopup = function() {
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<div>'+$scope.msg+'</div>',
                title: '',
                subTitle: '',
                scope: $scope
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
            $timeout(function() {
                myPopup.close(); //close the popup after 8 seconds for some reason
            }, 3000);
        };

    })
    .controller('HwComposeCtrl', function($scope, $state, $ionicPopup, $filter, $timeout, GLOBALS, userSessions, $http, ionicMaterialInk, $ionicSideMenuDelegate, $ionicModal) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Ink
        ionicMaterialInk.displayEffect();
        var url = GLOBALS.baseUrl+"user/get-acl-details?token="+userSessions.userSession.userToken;
            $http.get(url).success(function(response){
                $scope.data = response['Data']['Acl_Modules'];
                if($scope.data.indexOf('Create_homework') == -1){
                    $scope.msg = "Access Denied";
                    $scope.showPopup();
                    $state.go('app.homeworklanding');
                } 
            }).error(function(err) {
                console.log(err);
            });
        

        //Side-Menu
        $ionicSideMenuDelegate.canDragContent(true);
        $scope.recipient = "Select Student";
        $scope.checkRecipient = true;
        $scope.SubjectId = '';
        $scope.BatchId = '';
        $scope.selectedList=[];
        $scope.hwTitle = '';
        $scope.classId = '';
        $scope.divId = '';
        $scope.dueDate = new Date();
        $scope.description = '';
        $scope.hwTypeId = '';
        $scope.contactList = [];
        $scope.minDate = new Date();
        $scope.minDate = $filter('date')($scope.minDate, "yyyy-MM-dd");
        $scope.setTitle = function(title){
          $scope.hwTitle = title;
        };

        $scope.setDescription = function(message){
          $scope.description = message;
        };
        
        $scope.updateDueDate = function(newDate){
            $scope.dueDate = newDate;
        };
        
        $scope.toggleSelection = function(studentId) {
            var idx = $scope.selectedList.indexOf(studentId);
            if (idx > -1) {
            $scope.selectedList.splice(idx, 1);
            }
            // is newly selected
            else {
              $scope.selectedList.push(studentId);
            }
            $scope.$apply();
            $scope.$digest();
        };

        var url1 = GLOBALS.baseUrl+"user/get-teachers-subjects?token="+userSessions.userSession.userToken;
            $http.get(url1)
                .success(function(response) {
                    $scope.subjectsList = response['data'];
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                });

        var hwTypeurl = GLOBALS.baseUrl+"user/get-homework-types?token="+userSessions.userSession.userToken;
            $http.get(hwTypeurl)
                .success(function(response) {
                    $scope.hwTypeList = response['data'];
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                });

        $scope.getSelectedHwType = function(hwtype){
            $scope.hwTypeId = hwtype['id'];
        };

        $scope.getSelectedSub = function(subject){
            $scope.recipient = "Select Student";
            $scope.checkRecipient = true;
            $scope.contactList.length = 0;
            var url= GLOBALS.baseUrl+"user/get-subjects-batches/"+subject['id']+"?token="+userSessions.userSession.userToken;
            $http.get(url).success(function(response) {
                    $scope.batchList = response['data'];
                    $scope.SubjectId = subject['id'];
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                });
        };


        $scope.getClass= function(batch){
            $scope.recipient = "Select Student";
                var url= GLOBALS.baseUrl+"user/get-batches-classes/"+$scope.SubjectId+"/"+batch['id']+"?token="+userSessions.userSession.userToken;
                $http.get(url).success(function(response) {
                    $scope.classList = response['data'];
                    $scope.BatchId = batch['id'];
                    $scope.contactList.length = 0;
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                });
        };

        $scope.getDivision = function(classType){
            $scope.recipient = "Select Student";
            var url= GLOBALS.baseUrl+"user/get-classes-division/"+$scope.SubjectId+"/"+$scope.BatchId+"/"+classType['id']+"?token="+userSessions.userSession.userToken;
            $http.get(url).success(function(response) {
                   $scope.divisionsList = response['data'];
                   $scope.classId = classType['id'];
                   $scope.contactList.length = 0;
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                });
        };

        $scope.getStudentList = function(divType){
                var url= GLOBALS.baseUrl+"user/get-students-list/"+divType['id']+"?token="+userSessions.userSession.userToken;
                $http.get(url)
                    .success(function(response) {
                        $scope.contactList = response['data']['studentList'];
                        $scope.checkRecipient = false;
                        $scope.divId = divType['id'];
                    })
                    .error(function(response) {
                        console.log("Error in Response: " +response);
                    });
        };

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


        $scope.sendTo = function(){
            $scope.recipient = $scope.selectedList.length+" Student selected";
            $scope.closeModal();
        };

        $scope.saveDraft = function(){
            $scope.dueDate = $filter('date')($scope.dueDate, "yyyy-MM-dd");
            $scope.minDate = $filter('date')($scope.minDate, "yyyy-MM-dd");
            if($scope.dueDate >= $scope.minDate){
                if($scope.selectedList.length == 0 || $scope.hwTitle == '' || $scope.dueDate == '' || $scope.description == '' || $scope.hwTypeId == ''){
                    if($scope.selectedList.length <= 0){
                        $scope.msg = "Please Add Recipient";
                        $scope.showPopup();
                    }else{
                        $scope.msg = "Check if all fields are filled";
                        $scope.showPopup();
                    }                
                }else{
                    var url = GLOBALS.baseUrl+"user/homework-create?token="+userSessions.userSession.userToken;
                        $http.post(url, {subject_id: $scope.SubjectId, title: $scope.hwTitle, batch_id: $scope.BatchId, class_id: $scope.classId, division_id: $scope.divId, due_date: $scope.dueDate, description: $scope.description, homework_type: $scope.hwTypeId, student_id: $scope.selectedList} ).success(function(response){
                        if(response['status'] == 200){
                            $scope.msg = response['message'];
                            $scope.showPopup();
                            $state.go('app.edithomeworklisting');
                        }
                        else{
                            $scope.msg = response['message'];
                            $scope.showPopup();
                        }
                    }).error(function(response) {
                            console.log("Error in Response: " +response);
                            if(response.hasOwnProperty('status')){
                                $scope.msg = response.message;
                            }
                            else{
                                $scope.msg = "Access Denied";
                            }
                            $scope.showPopup();
                    });
                } 
            }else{
                $scope.msg = "Due Date should be greater than Current Date";
                $scope.showPopup();
            }          
        };
        $scope.selectedAll = false;
        $scope.checkAll = function () {
            $scope.selectedList.length = 0;      
            $scope.selectedAll = !$scope.selectedAll; 
            if($scope.selectedAll == true){
                angular.forEach($scope.contactList, function (item) {
                    $scope.toggleSelection(item.id);                                    
                });
            }          
        };

        $scope.showPopup = function() {
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<div>'+$scope.msg+'</div>',
                title: '',
                subTitle: '',
                scope: $scope
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
            $timeout(function() {
                myPopup.close(); //close the popup after 8 seconds for some reason
            }, 3000);
        };

    })
    .controller('MessageCtrl', function($scope, $state, $timeout, $ionicPopup, ionicMaterialInk, $ionicSideMenuDelegate, GLOBALS, userSessions, $http, chatHist) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu
        if(userSessions.userSession.userToken == 0){
            $state.go('login');
        }
        $ionicSideMenuDelegate.canDragContent(true);
        userSessions.setMsgCount_0();
        $scope.msgCount = '';
        $scope.fromId = '';
        $scope.tooId = '';
        $scope.nMessages = [];
        $scope.aclMessage = "Access Denied";
        $scope.clickStatus = false;
        $scope.loadMessages = function(){
          if (userSessions.userSession.userRole == "parent"){
            var url1 = GLOBALS.baseUrl+"user/get-messages-parent/"+userSessions.userSession.userId+"?token="+userSessions.userSession.userToken;
            $http.get(url1).success(function(response){
                if(response['status'] == 200){
                       $scope.nMessages = response['MessageList'];
                       if($scope.nMessages == ''){
                           $scope.aclMessage = response['message'];
                           $scope.showPopup();
                       }
                    }
                    else{
                        $scope.aclMessage = response['message'];
                        $scope.showPopup();
                    }
            }).error(function(err) {
                console.log(err);
                $scope.aclMessage = "Access Denied";
                $scope.showPopup();
            });
        }
        else{
            var url2 = GLOBALS.baseUrl+"user/get-messages?token="+userSessions.userSession.userToken;
            $http.get(url2).success(function(response){
                if(response['status'] == 200){
                       $scope.nMessages = response['MessageList'];
                       if($scope.nMessages == ''){
                           $scope.aclMessage = response['message'];
                           $scope.showPopup();
                       }
                    }
                    else{
                        $scope.aclMessage = response['message'];
                        $scope.showPopup();
                    }
            }).error(function(err) {
                console.log(err);
                $scope.aclMessage = "Access Denied";
                $scope.showPopup();
            });
        }
        };
        $scope.loadMessages();
        $scope.confirmDelete = function(from, to){
            $scope.fromId = from;
            $scope.tooId = to;
            $scope.showConfirmBox();
        };

        $scope.deleteMessage = function(){
            var url = GLOBALS.baseUrl+"user/delete-messages?token="+userSessions.userSession.userToken;
            $http.post(url, {_method: 'PUT', from_id: $scope.fromId, to_id: $scope.tooId}).success(function(response){
                $scope.loadMessages();
            }).error(function(err) {
                console.log(err);
                $scope.aclMessage = "Access Denied";
                $scope.showPopup();
            });
        };
        $scope.msgDetails = function(from, to, title, title_id){
            var flag = chatHist.setChatHist(userSessions.userSession.userId, from, to, title, title_id);
            if(flag == true){
                $state.go('app.chatmsg');
            }
        };
        $scope.showConfirmBox = function() {
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<div class = "row"><span class = "align-center red-font text-center-align">This will delete entire conversation</span></div>',
                title: 'Confirm to Delete',
                subTitle: '',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Close</b>',
                        type: 'button-calm',
                        onTap: function(e) {
                                myPopup.close();
                        }
                    },
                    {
                        text: '<b>Delete</b>',
                        type: 'button-assertive',
                        onTap: function(e) {
                               $scope.deleteMessage();
                        }
                    }
                ]

            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
        };

        $scope.showPopup = function() {
            // An elaborate, custom popup
            var msgPopup = $ionicPopup.show({
                template: '<div>'+$scope.aclMessage+'</div>',
                title: '',
                subTitle: '',
                scope: $scope
            });
            msgPopup.then(function(res) {
                console.log('Tapped!', res);
            });
            $timeout(function() {
                msgPopup.close(); //close the popup after 8 seconds for some reason
            }, 3000);
        };
    })
    .controller('MsgComposeCtrl', function($scope, $state, $timeout, $ionicPopup, ionicMaterialInk, $ionicSideMenuDelegate, $ionicModal, GLOBALS, userSessions, $http) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);        
        // Set Header
        $scope.$parent.hideHeader();

        // Set Ink
        ionicMaterialInk.displayEffect();
        //Side-Menu
        if(userSessions.userSession.userToken == 0){
            $state.go('login');
        }
        
        var url = GLOBALS.baseUrl+"user/get-acl-details?token="+userSessions.userSession.userToken;
            $http.get(url).success(function(response){
                $scope.data = response['Data']['Acl_Modules'];
                if($scope.data.indexOf('Create_message') == -1){
                    $scope.msg = "Access Denied";
                    $scope.showPopup();
                    $state.go('app.message');
                } 
            }).error(function(err) {
                console.log(err);
            });      
        
        $ionicSideMenuDelegate.canDragContent(true);
        $scope.checkRole = "display-no";
        $scope.checkRecipient = true;
        $scope.recipient = "Add Recipient+ ";
        $scope.contactList = [];
        $scope.message = "";
        var url1 = GLOBALS.baseUrl+"user/userroles?token="+userSessions.userSession.userToken;
            $http.get(url1)
                .success(function(response) {
                    $scope.userRoles = response['data']['userRoles'];
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                });
        $scope.getSelectedRole = function(roleType){
            if(roleType['name'] == "Student"){
                $scope.checkRole = "";
                $scope.recipient = "Add Recipient+ ";
                $scope.checkRecipient = true;
                $scope.contactList.length = 0;
                var url= GLOBALS.baseUrl+"user/get-batches-teacher?token="+userSessions.userSession.userToken;
                $http.get(url).success(function(response) {
                    $scope.batches = response['data'];
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                });
            }
            else{
                $scope.checkRecipient = false;
                $scope.checkRole = "display-no";
                $scope.recipient = "Add Recipient+ ";
                $scope.contactList.length = 0;
                $scope.getTeacherList();
            }
        }
        $scope.getClass = function(batchType){
               var url= GLOBALS.baseUrl+"user/getclasses/"+batchType['id']+"?token="+userSessions.userSession.userToken;
               $http.get(url).success(function(response) {
                    $scope.classes = response['data']['classList'];
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                });
        };

        $scope.getDivision = function(classType){
            var url= GLOBALS.baseUrl+"user/getdivisions/"+classType['id']+"?token="+userSessions.userSession.userToken;
            $http.get(url).success(function(response) {
                   $scope.divisions = response['data']['divisionList'];
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                });
        };

        $scope.getStudentList = function(divType){
            $scope.contactList.length = 0;
                var url= GLOBALS.baseUrl+"user/get-students-list/"+divType['id']+"?token="+userSessions.userSession.userToken;
                $http.get(url)
                    .success(function(response) {
                        $scope.contactList = response['data']['studentList'];
                    })
                    .error(function(response) {
                        console.log("Error in Response: " +response);
                    });
                    $scope.checkRecipient = false;
        };
        $scope.getTeacherList = function(){
                var url= GLOBALS.baseUrl+"user/getteachers/?token="+userSessions.userSession.userToken;
                $http.get(url)
                    .success(function(response) {
                        $scope.contactList = response['data']['teachers'];
                    })
                    .error(function(response) {
                        console.log("Error in Response: " +response);
                    });
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
            $scope.modal.remove();
        });

        $scope.selectRecipient = function(rname, id){
            $scope.recipient = rname;
            $scope.recipientId = id;
            $scope.closeModal();
        };

        $scope.setMessage = function(message){
          $scope.message = message;
        };

        $scope.sendMessage= function(){
          if($scope.recipient == "Add Recipient+ " || $scope.message == "" || $scope.recipient == "" && $scope.message == ""){
              if($scope.recipient == "Add Recipient+ "){
                  $scope.msg = "Please Add Recipient";
              }
              if($scope.message == ""){
                  $scope.msg = "Cannot send blank message";
              }
              if($scope.recipient == "Add Recipient+ " && $scope.message == ""){
                  $scope.msg = "Please Add Recipient & Cannot send blank message";
              }
              $scope.showPopup();
          }
          else{
              var url= GLOBALS.baseUrl+"user/send-message?token="+userSessions.userSession.userToken;
              $http.post(url, { from_id: userSessions.userSession.userId, to_id: $scope.recipientId, description: $scope.message})
                  .success(function(response) {
                      if(response['status'] == 200){
                          $scope.msg = response['message'];
                          $scope.showPopup();
                          $state.go('app.message');
                      }
                      else{
                          $scope.msg = response['message'];
                          $scope.showPopup();
                      }
                  })
                  .error(function(response) {
                      console.log("Error in Response: " +response);
                      $scope.msg = "Access Denied";
                      $scope.showPopup();
                  });
          }
        };

        $scope.showPopup = function() {
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<div>'+$scope.msg+'</div>',
                title: '',
                subTitle: '',
                scope: $scope
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
            $timeout(function() {
                myPopup.close(); //close the popup after 8 seconds for some reason
            }, 3000);
        };
    })
    .controller('ParentMsgComposeCtrl', function($scope, $state, $timeout, ionicMaterialInk, $ionicSideMenuDelegate, $ionicModal, $ionicHistory, $http, GLOBALS, userSessions, $ionicPopup) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);
        
        var url = GLOBALS.baseUrl+"user/get-acl-details?token="+userSessions.userSession.userToken;
            $http.get(url).success(function(response){
                $scope.data = response['Data']['Acl_Modules'];
                if($scope.data.indexOf('Create_message') == -1){
                    $scope.msg = "Access Denied";
                    $scope.showPopup();
                    $state.go('app.message');
                } 
            }).error(function(err) {
                console.log(err);
            });

        $scope.recipient = "";
        $scope.message = "";
        $scope.contactList = [];
        if(userSessions.userSession.userToken == 0){
            $state.go('login');
        }
        var url= GLOBALS.baseUrl+"user/get-teachers-list/"+userSessions.userSession.userId+"/?token="+userSessions.userSession.userToken;
        $http.get(url)
            .success(function(response) {
                $scope.contactList = response['data']['teachersList'];
            })
            .error(function(response) {
                console.log("Error in Response: " +response);
            });

        $ionicModal.fromTemplateUrl('teacherCntctlist.html', {
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

        $scope.selectRecipient = function(rname, id){
            $scope.recipient = rname;
            $scope.recipientId = id;
            $scope.closeModal();
        };

        $scope.setMessage = function(message){
          $scope.message = message;
        };

        $scope.sendMessage= function(){
                        if($scope.recipient == "" || $scope.message == "" || $scope.recipient == "" && $scope.message == ""){
                                if($scope.recipient == ""){
                                    $scope.msg = "Please Add Recipient";
                                }
                                if($scope.message == ""){
                                    $scope.msg = "Cannot send blank message";
                                }
                                if($scope.recipient == "" && $scope.message == ""){
                                    $scope.msg = "Please Add Recipient & Cannot send blank message";
                                }
                        $scope.showPopup();
                        }
                        else{
                            var url= GLOBALS.baseUrl+"user/send-message?token="+userSessions.userSession.userToken;
                            $http.post(url, { from_id: userSessions.userSession.userId, to_id: $scope.recipientId, description: $scope.message})
                            .success(function(response) {
                            if(response['status'] == 200){
                                    $scope.msg = response['message'];
                                    $scope.showPopup();
                                    $state.go('app.message');
                            }
                            else{
                                    $scope.msg = response['message'];
                                    $scope.showPopup();
                            }
                        })
                            .error(function(response) {
                                console.log("Error in Response: " +response);
                                $scope.msg = "Access Denied";
                                $scope.showPopup();
                        });
                    }
        };

        $scope.showPopup = function() {
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<div>'+$scope.msg+'</div>',
                title: '',
                subTitle: '',
                scope: $scope
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
            $timeout(function() {
                myPopup.close(); //close the popup after 8 seconds for some reason
            }, 3000);
        };
    })
    .controller('MsgChatCtrl', function($scope, $state, $timeout, ionicMaterialInk, $ionicScrollDelegate, $ionicPopup, $ionicSideMenuDelegate, GLOBALS, chatHist, $http, userSessions) {
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Ink
        ionicMaterialInk.displayEffect();
        if(userSessions.userSession.userToken == 0){
            $state.go('login');
        }
        //Side-Menu
        $ionicSideMenuDelegate.canDragContent(true);
        $scope.message = "";
        $scope.envelop = chatHist.getChatHist();
        $scope.messageList = [];
        $scope.loadChat = function(){
            var url= GLOBALS.baseUrl+"user/get-detail-message?token="+userSessions.userSession.userToken;
        $http.post(url, {user_id: $scope.envelop.user_id, from_id: $scope.envelop.from_id, to_id: $scope.envelop.to_id}).success(function(response) {
            $scope.messageList = response['data'];
            $ionicScrollDelegate.scrollBottom();
        }).error(function(err) {
            console.log(err);
        });
        };
        $scope.loadChat();
        $scope.title = $scope.envelop.title;

        $scope.sendMessage= function(){
                        if($scope.message == ""){
                        $scope.msg = "Cannot send blank message";
                        $scope.showPopup();
                        }
                        else{
                            var url= GLOBALS.baseUrl+"user/send-message?token="+userSessions.userSession.userToken;
                            $http.post(url, {from_id: $scope.envelop.user_id, to_id: $scope.envelop.title_id, description: $scope.message })
                            .success(function(response) {
                                if(response['status'] == 200){
                                        $scope.msg = response['message'];
                                        $scope.loadChat();
                                        $scope.message = "";
                                }
                                else{
                                        $scope.msg = response['message'];
                                        $scope.showPopup();
                                }
                            })
                            .error(function(response) {
                                console.log("Error in Response: " +response);
                                $scope.msg = "Access Denied";
                                $scope.showPopup();
                            });
                        }
        };
        $scope.showPopup = function() {
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<div>'+$scope.msg+'</div>',
                title: '',
                subTitle: '',
                scope: $scope
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
            $timeout(function() {
                myPopup.close(); //close the popup after 8 seconds for some reason
            }, 3000);
        };
    })
    .controller('AttendLandingCtrl', function($scope, $state, $timeout, ionicMaterialInk, $ionicSideMenuDelegate) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);
    })
    .controller('MarkAttendanceCtrl', function($scope, $state, $timeout, $http, $ionicPopup, userSessions, GLOBALS, $filter, ionicMaterialInk, $log, $ionicSideMenuDelegate) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);
        $scope.gotIt = 0;
        $scope.absentList = [];
        $scope.currentDate = new Date();
        $scope.currentBatch = '';
        $scope.currentClass = '';
        $scope.currentDiv = '';

        $scope.getStudentList = function(){
            $scope.setDate = $filter('date')($scope.currentDate, "yyyy-MM-dd");
            var url = GLOBALS.baseUrl+"user/students-list?token="+userSessions.userSession.userToken;
            $http.post(url, {date: $scope.setDate, teacher_id: userSessions.userSession.userId}).success(function(response) {
                if(response['status'] == 200){
                    $scope.studentList = response['data']['studentList'];
                    $scope.absentList = response['data']['absentList'];
                    $scope.currentBatch = response['data']['batchName'];
                    $scope.currentClass = response['data']['className'];
                    $scope.currentDiv = response['data']['divisionName'];
                }
                else{
                    $scope.msg = response['message'];
                    $scope.showPopup();
                }
            })
            .error(function(response) {
                console.log("Error in Response: " +response);
                if(response.hasOwnProperty('status')){
                    $scope.msg = response.message;
                    $scope.showPopup();
                }
                else{
                    $scope.msg = "Access Denied";
                    $scope.showPopup();
                    $state.go('app.attendancelanding');
                }
            });
        }

        $scope.getStudentList();

        $scope.toggleCheck = function(elementData, studentId) {
            var idx = $scope.absentList.indexOf(studentId);
            if (idx > -1) {
              $scope.absentList.splice(idx, 1);
            }
            // is newly selected
            else {
              $scope.absentList.push(studentId);
            }
            var changeClass = angular.element(document.querySelector('#'+ elementData.target.id));
               if(elementData.target.classList[2] == "mark-0" || elementData.target.classList[1] == "mark-0" || elementData.target.classList[3] == "mark-0" || elementData.target.classList[0] == "mark-0" ){
                   changeClass.removeClass('mark-0');
                   changeClass.addClass('mark-1');
                }
                else{
                   changeClass.removeClass('mark-1');
                   changeClass.addClass('mark-0');
                }
        };

        $scope.markAttendance = function(){
            $scope.setDate = $filter('date')($scope.currentDate, "yyyy-MM-dd");
            var url= GLOBALS.baseUrl+"user/mark-attendance?token="+userSessions.userSession.userToken;
            $http.post(url, {date: $scope.setDate, student_id: $scope.absentList})
            .success(function(response) {
                if(response['status'] == 200){
                        $scope.msg = response['message'];
                        $scope.showPopup();
                }
                else{
                        $scope.msg = response['message'];
                        $scope.showPopup();
                }
            })
            .error(function(response) {
                console.log("Error in Response: " +response);
                if(response.hasOwnProperty('status')){
                    $scope.msg = response.message;
                }
                else{
                    $scope.msg = "Access Denied";
                }
                $scope.showPopup();
            });
        }

        $scope.showPopup = function() {
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<div>'+$scope.msg+'</div>',
                title: '',
                subTitle: '',
                scope: $scope
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
            $timeout(function() {
                myPopup.close(); //close the popup after 8 seconds for some reason
            }, 3000);
        };
    })

    .controller('ViewAttendanceCtrl', function($scope, $state, GLOBALS, $ionicPopup, $filter, $timeout, userSessions, $http, ionicMaterialInk, $ionicSideMenuDelegate) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu
        $ionicSideMenuDelegate.canDragContent(true);
        $scope.events = [];
        $scope.batchName = 'Batch';
        $scope.className = 'Class';
        $scope.divisionName = 'Div';
        $scope.divisionId = '';
        $scope.selectedDateData = [];
        $scope.selectedDateMessage = '';
        $scope.userRole = userSessions.userSession.userRole;
        $scope.userId = userSessions.userSession.userId;

        $scope.getSelectedDateData = function(selectedDate){
            $scope.selectedDate= $filter('date')(selectedDate, "yyyy-MM-dd");
            var url = null;
            if(userSessions.userSession.userRole == 'parent'){
              url = GLOBALS.baseUrl+"user/view-attendance-parent?token="+userSessions.userSession.userToken;
                            $http.post(url, {student_id: $scope.userId, date: $scope.selectedDate})
                            .success(function(response) {
                                if(response['status'] == 200){
                                    $scope.selectedDateData = response['data'];
                                    $scope.selectedDateMessage = response['message'];
                                }
                                else{
                                    $scope.msg = response['message'];
                                    $scope.showPopup();
                                }
                            })
                            .error(function(response) {
                                console.log("Error in Response: " +response);
                                if(response.hasOwnProperty('status')){
                                   $scope.msg = response.message;
                                   $scope.selectedDateData.length =0;
                                }
                                else{
                                    $scope.msg = "Access Denied";
                                    $scope.selectedDateData.length =0;
                                }
                                $scope.showPopup();
                            });
            }
            else{
                $scope.selectedDate= $filter('date')(selectedDate, "yyyy-MM-dd");
              url = GLOBALS.baseUrl+"user/view-attendance-teacher?token="+userSessions.userSession.userToken;
                            $http.post(url, {division_id: $scope.divisionId, date: $scope.selectedDate})
                            .success(function(response) {
                                if(response['status'] == 200){
                                    $scope.selectedDateData = response['data'];
                                }
                                else{
                                        $scope.msg = response['message'];
                                        $scope.showPopup();
                                }
                            })
                            .error(function(response) {
                                console.log("Error in Response: " +response);
                                if(response.hasOwnProperty('status')){
                                   $scope.msg = response.message;
                                   $scope.selectedDateData.length = 0;
                                }
                                else{
                                    $scope.msg = "Access Denied";
                                    $scope.selectedDateData.length = 0;
                                }
                                $scope.showPopup();
                            });
            }

        };
        if(userSessions.userSession.userRole == 'teacher'){
            var url= GLOBALS.baseUrl+"user/attendance-batches?token="+userSessions.userSession.userToken;
            $http.get(url).success(function(response) {
                $scope.batches = response['data'];
            })
            .error(function(response) {
                console.log("Error in Response: " +response);
            });
        }else{
            $scope.currentDate = new Date();
            $scope.getSelectedDateData($scope.currentDate);
        }

        $scope.getClass = function(batch){
            var url= GLOBALS.baseUrl+"user/attendance-classes/"+batch+"?token="+userSessions.userSession.userToken;
            $http.get(url).success(function(response) {
                $scope.classes = response['data'];
            })
            .error(function(response) {
                console.log("Error in Response: " +response);
            });
        };

        $scope.getDivision = function(classType){
            var url= GLOBALS.baseUrl+"user/get-attendance-divisions/"+classType+"?token="+userSessions.userSession.userToken;
            $http.get(url).success(function(response) {
                $scope.divisions = response['data'];
            })
            .error(function(response) {
                console.log("Error in Response: " +response);
            });
        };

        $scope.getAttendanceList = function(id){
            var url = null;
            if(userSessions.userSession.userRole == 'parent'){
              url = GLOBALS.baseUrl+"user/default-attendance-parent/"+id+"?token="+userSessions.userSession.userToken;
            }
            else{
              $scope.divisionId = id;
              url = GLOBALS.baseUrl+"user/attendance-teacher/"+id+"?token="+userSessions.userSession.userToken;
            }
            $http.get(url).success(function(response) {
                $scope.events = response['data'];
            })
            .error(function(response) {
                console.log("Error in Response: " +response);
            });
        };

        if(userSessions.userSession.userRole == 'teacher'){
            url = GLOBALS.baseUrl+"user/default-attendance-teacher/?token="+userSessions.userSession.userToken;
            $http.get(url).success(function(response) {
                $scope.events = response['data']['absentDates'];
                $scope.batchId = response['data']['batchId'];
                $scope.batchName = response['data']['batchName'];
                $scope.classId = response['data']['classId'];
                $scope.className = response['data']['className'];
                $scope.divisionId = response['data']['divId'];
                $scope.divName = response['data']['divName'];
                $scope.getClass($scope.batchId);
                $scope.getDivision($scope.classId);
            })
            .error(function(response) {
                console.log("Error in Response: " +response);
                $scope.msg ="Access Denied";
                $scope.showPopup();
                $state.go('app.attendancelanding');
            });
        }

        $scope.options = {
            defaultDate: new Date(),
            minDate: "",
            maxDate: "",
            disabledDates: [],
            dayNamesLength: 3, // 1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names. Default is 1.
            mondayIsFirstDay: true,//set monday as first day of week. Default is false
            eventClick: function(date) {
                $scope.selectedDate = $filter('date')(date['date'], "yyyy-MM-dd");
                $scope.getSelectedDateData($scope.selectedDate);
                console.log(date['event']);
            },
            dateClick: function(date) {
                console.log(date['event']);
                $scope.selectedDate = $filter('date')(date['date'], "yyyy-MM-dd");
                $scope.getSelectedDateData($scope.selectedDate);
            },
            changeMonth: function(month, year) {
                console.log(month, year);
            },
            filteredEventsChange: function(filteredEvents) {
                console.log(filteredEvents);
            }
        };
        if($scope.userRole == 'parent'){
            $scope.getAttendanceList($scope.userId);
        }
        $scope.showPopup = function() {
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<div>'+$scope.msg+'</div>',
                title: '',
                subTitle: '',
                scope: $scope
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
            $timeout(function() {
                myPopup.close(); //close the popup after 8 seconds for some reason
            }, 3000);
        };
    })
    .controller('LandingEventCtrl', function($scope, $state, $timeout, ionicMaterialInk, $ionicSideMenuDelegate) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);

        $scope.noticeBoard = function() {
            $state.go('app.sharedNotification');
        };
    })
    .controller('EditEventCtrl', function($scope, $state, $timeout, ionicMaterialInk, $ionicSideMenuDelegate) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);

        $scope.noticeBoard = function() {
            $state.go('app.sharedNotification');
        };

        $scope.nmessages = [{
            Picture: "graduate.jpg",
            Status: "unRead",
            Subject: "Notification 1",
            message: "School has won Math Olympaid Exam",
            Timestamp: "Date: 18 Oct 2015",
            Priority: "high"
        }, {
            Status: "Read",
            Subject: "Notification 2",
            message: "School has participated Math Olympaid Exam",
            Timestamp: "Date: 17 Oct 2015",
            Priority: "medium"
        }, {
            Picture: "education-bg.jpg",
            Status: "Read",
            Subject: "Notification 3",
            message: "The Attendance is Compulsary",
            Timestamp: "Date: 15 Oct 2015",
            Priority: "high"
        },{
            Picture: "graduate.jpg",
            Status: "unRead",
            Subject: "Notification 1",
            message: "School has won Math Olympaid Exam",
            Timestamp: "Date: 18 Oct 2015",
            Priority: "high"
        }, {
            Status: "Read",
            Subject: "Notification 2",
            message: "School has participated Math Olympaid Exam",
            Timestamp: "Date: 17 Oct 2015",
            Priority: "medium"
        }, {
            Picture: "education-bg.jpg",
            Status: "Read",
            Subject: "Notification 3",
            message: "The Attendance is Compulsary",
            Timestamp: "Date: 15 Oct 2015",
            Priority: "high"
        },{
            Picture: "graduate.jpg",
            Status: "unRead",
            Subject: "Notification 1",
            message: "School has won Math Olympaid Exam",
            Timestamp: "Date: 18 Oct 2015",
            Priority: "high"
        }, {
            Status: "Read",
            Subject: "Notification 2",
            message: "School has participated Math Olympaid Exam",
            Timestamp: "Date: 17 Oct 2015",
            Priority: "medium"
        }, {
            Picture: "education-bg.jpg",
            Status: "Read",
            Subject: "Notification 3",
            message: "The Attendance is Compulsary",
            Timestamp: "Date: 15 Oct 2015",
            Priority: "high"
        }];
    })
    .controller('CreateEventCtrl', function($scope, $state, $timeout, ionicMaterialInk, $ionicSideMenuDelegate) {
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);

        $scope.noticeBoard = function() {
            $state.go('app.sharedNotification');
        };
        $scope.selectedDate = new Date();

    })
    .controller('ViewEventsCtrl', function($scope, $state, $timeout, ionicMaterialInk, $ionicSideMenuDelegate) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

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
    .controller('CreateLeaveCtrl', function($scope, $state, $timeout, $filter, ionicMaterialInk, $ionicPopup, $ionicSideMenuDelegate, GLOBALS, $http, userSessions) {

        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Ink
        ionicMaterialInk.displayEffect();
        var url = GLOBALS.baseUrl+"user/get-acl-details?token="+userSessions.userSession.userToken;
            $http.get(url).success(function(response){
                $scope.data = response['Data']['Acl_Modules'];
                if($scope.data.indexOf('Create_leave') == -1){
                    $scope.msg = "Access Denied";
                    $scope.showPopup();
                    $state.go('app.parentattendancelanding');
                } 
            }).error(function(err) {
                console.log(err);
            });
        //Side-Menu
        $ionicSideMenuDelegate.canDragContent(true);
        $scope.leaveTitle = '';
        $scope.LeaveId = '';
        $scope.checkClass = true;
        $scope.fromDate = new Date();
        $scope.toDate = new Date();
        $scope.description = '';
        $scope.setTitle = function(title){
          $scope.leaveTitle = title;
        };

        $scope.setDescription = function(reason){
          $scope.description = reason;
        };

        var url= GLOBALS.baseUrl+"user/leave-types/?token="+userSessions.userSession.userToken;
        $http.get(url).success(function(response) {
             $scope.leaveType = response['data'];
             $scope.checkClass = false;
        })
        .error(function(response) {
             console.log("Error in Response: " +response);
        });

        $scope.getSelectedLeave = function(leave){
            $scope.LeaveId = leave['id'];
        }
        $scope.updateFromDate = function(newDate){
            $scope.fromDate = newDate;
        }
        $scope.updateToDate = function(newDate){
            $scope.toDate = newDate;
        }
        $scope.send = function(){
                        if($scope.leaveTitle == "" || $scope.LeaveId == "" || $scope.description == "" || $scope.LeaveId == "" && $scope.leaveTitle == "" && $scope.message == "" || $scope.fromDate == '' ||
        $scope.toDate == ''|| $scope.fromDate == '' && $scope.toDate == ''){
                                if($scope.leaveTitle == ""){
                                    $scope.msg = "Please Add Title";
                                }
                                if($scope.LeaveId == ""){
                                    $scope.msg = "Select Leave Type";
                                }
                                if($scope.description == ""){
                                    $scope.msg = "Please Add Description";
                                }
                                if($scope.fromDate == '' || $scope.toDate == '' || $scope.fromDate == '' && $scope.toDate == ''){
                                    $scope.msg = "Please Check the Dates";
                                }
                                if($scope.LeaveId == "" && $scope.leaveTitle == "" && $scope.message == ""){
                                    $scope.msg = "Cannot create blank Leave";
                                }
                        $scope.showPopup();
                        }
                        else{
                            $scope.fromDate = $filter('date')($scope.fromDate, "yyyy-MM-dd");
                            $scope.toDate = $filter('date')($scope.toDate, "yyyy-MM-dd");
                            var url= GLOBALS.baseUrl+"user/create-leave?token="+userSessions.userSession.userToken;
                            $http.post(url, {student_id: userSessions.userSession.userId, title: $scope.leaveTitle, leave_type_id: $scope.LeaveId, reason: $scope.description, from_date: $scope.fromDate, end_date: $scope.toDate})
                            .success(function(response) {
                            if(response['status'] == 200){
                                    $scope.msg = response['message'];
                                    $scope.showPopup();
                                    $state.go('app.parentattendancelanding');
                            }
                            else{
                                    $scope.msg = response['message'];
                                    $scope.showPopup();
                            }
                        })
                            .error(function(response) {
                                console.log("Error in Response: " +response);
                                if(response.hasOwnProperty('status')){
                                    $scope.msg = response.message;
                                }
                                else{
                                    $scope.msg = "Access Denied";
                                }
                                $scope.showPopup();
                             });
                      }
            };
        $scope.showPopup = function() {
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<div>'+$scope.msg+'</div>',
                title: '',
                subTitle: '',
                scope: $scope
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
            $timeout(function() {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);
        };

    })
    .controller('ViewLeaveApprovalCtrl', function($scope, $state, $timeout, ionicMaterialInk, $ionicPopup, $ionicSideMenuDelegate, hwDetails, GLOBALS, $http, userSessions) {
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

         // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);
        $scope.userRole = userSessions.userSession.userRole;
        $scope.getLeaveList = function(){
            var url = null;
        if(userSessions.userSession.userRole == 'parent'){
            url = GLOBALS.baseUrl+"user/leaves-parent/1/"+userSessions.userSession.userId+"?token="+userSessions.userSession.userToken;
        }else{
             url = GLOBALS.baseUrl+"user/leaves-teacher/1/?token="+userSessions.userSession.userToken;
        }
            $http.get(url).success(function(response) {
                if(response['status'] == 200){
                    $scope.leaveListing = response['data'];
                }
                else{
                    $scope.msg = response['message'];
                    $scope.showPopup();
                }
            })
            .error(function(response) {
                console.log("Error in Response: " +response);
                if(response.hasOwnProperty('status')){
                    $scope.msg = response.message;                    
                    $scope.showPopup();
                }
                else{
                    $scope.msg = "Access Denied";
                    $scope.showPopup();
                     if($scope.userRole == 'teacher'){
                         $state.go('app.attendancelanding');
                     }else{
                         $state.go('app.parentattendancelanding');
                     }
                }
            });
        };
        $scope.getLeaveList();
        $scope.approveLeave = function(leaveId){
            var url = GLOBALS.baseUrl+"user/approve-leaves?token="+userSessions.userSession.userToken;
            $http.post(url, {_method:'PUT',leave_id: leaveId}).success(function(response) {
                if(response['status'] == 200){
                    $scope.msg = response['message'];
                    $scope.showPopup();
                    $scope.getLeaveList();
                }
                else{
                    $scope.msg = response['message'];
                    $scope.showPopup();
                }
            })
            .error(function(response) {
                    console.log("Error in Response: "+response);
                    $scope.msg = "Access Denied";
                    $scope.showPopup();
            });
        }
        $scope.leaveDetails = function(leave){
            $scope.checkLid = hwDetails.setHwView(leave);
            if($scope.checkLid == true){
                $state.go('app.leavedetails');
            };
        }

        $scope.showPopup = function() {
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<div>'+$scope.msg+'</div>',
                title: '',
                subTitle: '',
                scope: $scope
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
            $timeout(function() {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);
        };
     })
     .controller('ViewLeaveApprovedCtrl', function($scope, $state, $timeout, ionicMaterialInk, $ionicPopup, $ionicSideMenuDelegate, hwDetails, GLOBALS, $http, userSessions) {
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

         // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu

        $ionicSideMenuDelegate.canDragContent(true);
        $scope.userRole = userSessions.userSession.userRole;
        var url = null;
        if(userSessions.userSession.userRole == 'parent'){
            url = GLOBALS.baseUrl+"user/leaves-parent/2/"+userSessions.userSession.userId+"?token="+userSessions.userSession.userToken;
        }else{
             url = GLOBALS.baseUrl+"user/leaves-teacher/2/?token="+userSessions.userSession.userToken;
        }
        $scope.getLeaveList = function(){
            $http.get(url).success(function(response) {
                if(response['status'] == 200){
                    $scope.leaveListing = response['data'];
                }
                else{
                    $scope.msg = response['message'];
                    $scope.showPopup();
                }
            })
            .error(function(response) {
                console.log("Error in Response: " +response);
                if(response.hasOwnProperty('status')){
                    $scope.msg = response.message;
                    $scope.showPopup();
                }
                else{
                    $scope.msg = "Access Denied";
                    $scope.showPopup();
                     if($scope.userRole == 'teacher'){
                         $state.go('app.attendancelanding');
                     }else{
                         $state.go('app.parentattendancelanding');
                     }
                }
                
            });
        };
        $scope.getLeaveList();
        $scope.leaveDetails = function(leave){
            $scope.checkLid = hwDetails.setHwView(leave);
            if($scope.checkLid == true){
                $state.go('app.approvedleavedetails');
            };
        }

        $scope.showPopup = function() {
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<div>'+$scope.msg+'</div>',
                title: '',
                subTitle: '',
                scope: $scope
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
            $timeout(function() {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);
        };
     })
     .controller('LeaveDetailCtrl', function($scope, $state, $timeout, $ionicPopup, ionicMaterialInk, userSessions, GLOBALS, $http, hwDetails, $ionicSideMenuDelegate, $ionicModal) {
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu
        $ionicSideMenuDelegate.canDragContent(true);
        $scope.userRole = userSessions.userSession.userRole;
        $scope.leaveDetail = hwDetails.getHwView();
        $scope.approveLeave = function(leaveId){
            var url = GLOBALS.baseUrl+"user/approve-leaves?token="+userSessions.userSession.userToken;
            $http.post(url, {_method: 'PUT', leave_id: leaveId}).success(function(response) {
                if(response['status'] == 200){
                    $scope.msg = response['message'];
                    $scope.getLeaveList();
                    $scope.showPopup();
                }
                else{
                    $scope.msg = response['message'];
                    $scope.showPopup();
                }
            })
            .error(function(response) {
                    console.log("Error in Response: " +response);
                    $scope.msg = "Access Denied";
                    $scope.showPopup();
            });
        }

        $scope.showPopup = function() {
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<div>'+$scope.msg+'</div>',
                title: '',
                subTitle: '',
                scope: $scope
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
            $timeout(function() {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);
        };
    })
    .controller('DetailPageCtrl', function($scope, $state, $timeout, ionicMaterialInk, $ionicSideMenuDelegate, $ionicModal) {
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

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
    .controller('TimeTableCtrl', function($scope, $state, $timeout, ionicMaterialInk, $ionicSideMenuDelegate, $ionicPopup, $filter, userSessions, GLOBALS, $http) {
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);
        $scope.checkBatch = true;
        $scope.checkClass = true;
        $scope.timeTableList = [];
        $scope.setDay = '';
        $scope.divId = '';
        $scope.batchName = 'Batch';
        $scope.className = 'Class';
        $scope.divisionName = 'Div';
        $scope.userRole = userSessions.userSession.userRole;
        $scope.date = new Date();
        switch ($scope.currentDay = $filter('date')(new Date(), 'EEEE')) {

            case 'Monday':
                $scope.currentDay = 1;
                break;
            case 'Tuesday':
                $scope.currentDay = 2;
                break;
            case 'Wednesday':
                $scope.currentDay = 3;
                break;
            case 'Thursday':
                $scope.currentDay = 4;
                break;
            case 'Friday':
                $scope.currentDay = 5;
                break;
            case 'Saturday':
                $scope.currentDay = 6;
                break;
            case 'Sunday':
                $scope.currentDay = 7;
                break;
            default:
                $scope.currentDay = 0;
                break;
         }

        // Set Header
        $scope.$parent.hideHeader();//

        // Set Ink
        ionicMaterialInk.displayEffect();

        //Side-Menu
        $ionicSideMenuDelegate.canDragContent(true);
        $scope.getClass = function(batch){
                var url= GLOBALS.baseUrl+"user/get-classes/"+batch+"?token="+userSessions.userSession.userToken;
                $http.get(url).success(function(response) {
                    $scope.classList = response['data'];
                    $scope.className = 'Class';
                    $scope.divisionName = 'Div';
                    $scope.checkBatch = false;
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                });
        };

        $scope.getDivision = function(classType){
            var url= GLOBALS.baseUrl+"user/get-divisions/"+classType+"?token="+userSessions.userSession.userToken;
            $http.get(url).success(function(response) {
                   $scope.divisionsList = response['data'];
                    $scope.checkClass = false;
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                });
        };

        $scope.defaultTimetable = function(){
            var url = null;
            if(userSessions.userSession.userRole == "parent"){
              url = GLOBALS.baseUrl+"user/view-timetable-parent/"+userSessions.userSession.userId+"/"+$scope.currentDay+"?token="+userSessions.userSession.userToken;
            }else{
              url = GLOBALS.baseUrl+"user/default-timetable-teacher?token="+userSessions.userSession.userToken;
            }
            $http.get(url).success(function(response) {
                if(response['status'] == 200){
                    $scope.timeTableList = response['data']['timetable'];
                    $scope.divId = response['data']['div_id'];
                    $scope.setDay = response['data']['day'];
                    if(userSessions.userSession.userRole == "teacher"){
                         $scope.batchName = response['data']['batchName'];
                         $scope.className = response['data']['className'];
                         $scope.divisionName = response['data']['divisionName'];
                         $scope.classId = response['data']['classId'];
                         $scope.batchId = response['data']['batchId'];
                         $scope.getClass($scope.batchId);
                         $scope.getDivision($scope.classId);
                    }
                }else{
                    $scope.timeTableList = response['data']['timetable'];
                    $scope.divId = response['data']['div_id'];
                    $scope.setDay = response['data']['day'];
                    if(userSessions.userSession.userRole == "teacher"){
                        $scope.batchName = response['data']['batchName'];
                        $scope.className = response['data']['className'];
                        $scope.divisionName = response['data']['divisionName'];
                    }
                    $scope.message = response['message'];
                    $scope.showPopupError();
                }
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                    if(response.hasOwnProperty('status')){
                        $scope.message = response['message'];
                        $scope.timeTableList = response['data']['timetable'];
                        $scope.divId = response['data']['div_id'];
                        $scope.setDay = response['data']['day'];
                        if(userSessions.userSession.userRole == "teacher"){
                            $scope.batchName = response['data']['batchName'];
                            $scope.className = response['data']['className'];
                            $scope.divisionName = response['data']['divisionName'];
                            $scope.classId = response['data']['classId'];
                            $scope.batchId = response['data']['batchId'];
                            $scope.getClass($scope.batchId);
                            $scope.getDivision($scope.classId);
                            $scope.showPopupError();                            
                        }
                    }
                    else{
                        $scope.message = "Access Denied";
                        $scope.showPopupError();
                        $state.go('app.dashboard');
                    }
                    
                });
        };

        $scope.defaultTimetable();

        $scope.getTimetable = function(day){
            var url = null;
            if(userSessions.userSession.userRole == "parent"){
              url = GLOBALS.baseUrl+"user/view-timetable-parent/"+userSessions.userSession.userId+"/"+day+"?token="+userSessions.userSession.userToken;
            }else{
              url = GLOBALS.baseUrl+"user/view-timetable-teacher/"+$scope.divId+"/"+day+"?token="+userSessions.userSession.userToken;
            }
            $http.get(url).success(function(response) {
                if(response['status'] == 200){
                    $scope.timeTableList = response['data']['timetable'];
                    $scope.divId = response['data']['div_id'];
                    $scope.setDay = response['data']['day'];
                    if(userSessions.userSession.userRole == "teacher"){
                        $scope.batchName = response['data']['batchName'];
                        $scope.className = response['data']['className'];
                        $scope.divisionName = response['data']['divisionName'];
                    }
                }else{
                    $scope.timeTableList = response['data']['timetable'];
                    $scope.divId = response['data']['div_id'];
                    $scope.setDay = response['data']['day'];
                    if(userSessions.userSession.userRole == "teacher"){
                        $scope.batchName = response['data']['batchName'];
                        $scope.className = response['data']['className'];
                        $scope.divisionName = response['data']['divisionName'];
                    }
                    $scope.message = response['message'];
                    $scope.showPopupError();
                }
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                    if(response.hasOwnProperty('status')){
                        $scope.message = response['message'];
                        $scope.timeTableList = response['data']['timetable'];
                        $scope.divId = response['data']['div_id'];
                        $scope.setDay = response['data']['day'];
                        if(userSessions.userSession.userRole == "teacher"){
                            $scope.batchName = response['data']['batchName'];
                            $scope.className = response['data']['className'];
                            $scope.divisionName = response['data']['divisionName'];
                        }
                    }
                    else{
                        $scope.message = "Access Denied";
                    }
                    $scope.showPopupError();
                });
        };
           if($scope.userRole != 'parent'){
               var url= GLOBALS.baseUrl+"user/get-batches?token="+userSessions.userSession.userToken;
                    $http.get(url).success(function(response) {
                    $scope.batchList = response['data'];
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                });
           }
        $scope.getDivId = function(division){
            $scope.divId = division['id'];
        }

        // Triggered on a button click, or some other target
        $scope.showPopupError = function() {
            // An elaborate, custom popup
            var myPopupError = $ionicPopup.show({
                template: '<div class = "row"><span class = "align-center red-font text-center-align">'+$scope.message+'</span></div>',
                title: '',
                subTitle: '',
                scope: $scope
            });
            myPopupError.then(function(res) {
                console.log('Tapped!', res);
            });
            $timeout(function() {
                myPopupError.close(); //close the popup after 3 seconds for some reason
            }, 3000);
        };

        $scope.showPopup = function() {
            $scope.data = {}

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<div class="list">'+
                    '<div class="row">'+
                    '<div class="col-33 border-bottom">'+
                        '<select class="item item-input item-select" ng-model="selectedBatch.batch" ng-options="batch.name for batch in batchList track by batch.id" ng-change="getClass(selectedBatch.batch.id)">'+
                            '<option value="" ng-disabled="true" ng-model="batchName">-{{batchName}}-</option>'+
                        '</select>'+
                    '</div>'+
                    '<div class="col-33 border-right border-bottom">'+
                        '<select class="item item-input item-select" ng-model="selectedClass.class" ng-options="class.name for class in classList track by class.id" ng-change="getDivision(selectedClass.class.id)">'+
                            '<option value="" ng-disabled="true" ng-model="className">-{{className}}-</option>'+
                        '</select>'+
                    '</div>'+
                    '<div class="col-33 border-bottom">'+
                        '<select class="item item-input item-select" ng-model="selectedDivision.division" ng-options="division.name for division in divisionsList track by division.id" ng-change="getDivId(selectedDivision.division)">'+
                            '<option value="" ng-disabled="true" ng-model="divisionName">-{{divisionName}}-</option>'+
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
                        text: '<b>Ok</b>',
                        type: 'button-timetable',
                        onTap: function(e) {
                            $scope.getTimetable($scope.currentDay);
                            myPopup.close();
                        }
                    }
                ]
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
        };
    })
    .controller('ResultViewCntrl', function($scope, $state, $timeout, ionicMaterialInk, $ionicSideMenuDelegate, $ionicModal, $ionicPopup) {
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();

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
