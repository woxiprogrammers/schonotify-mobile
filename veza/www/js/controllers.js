/* global angular, document, window */
'use strict';
var db = null;
angular.module('starter.controllers', [])
.constant('GLOBALS',{
//    baseUrl:'http://school_mit.woxiapps.com/api/v1/',
   baseUrl:'http://192.168.2.6/api/v1/'  
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
        chatHist.setChatHist = function(from, to, title){
            chatHist.data.from_id = from;
            chatHist.data.to_id = to;
            chatHist.data.title = title;
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
.service('filterBatches', function FilterBatch($http, GLOBALS){

        var filterBatches = this;

        filterBatches.batches = [];

        filterBatches.getBatches = function(token){
            var url= GLOBALS.baseUrl+"user/get-batches-teacher?token="+token;
            $http.get(url).success(function(response) {
                    filterBatches.batches = response['data'];                    
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                });
            return filterBatches.batches;
        };
})
.service('filterUserRoles', function FilterRole($http, GLOBALS){

        var filterUserRoles = this;

        filterUserRoles.roles = [];

        filterUserRoles.getRoles = function(token){
            var url= GLOBALS.baseUrl+"user/userroles?token="+token;
            $http.get(url)
                .success(function(response) {
                    filterUserRoles.roles = response['data']['userRoles'];
                    
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                });                
            return filterUserRoles.roles;
        };
})
.service('filterClasses', function filterClass($http, GLOBALS){

        var filterClasses = this;

            filterClasses.classes = [];
        filterClasses.getClasses = function(token, batch){
            var url= GLOBALS.baseUrl+"user/getclasses/"+batch+"?token="+token;
            $http.get(url)
                .success(function(response) {
                    filterClasses.classes = response['data']['classList'];
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                });
            return filterClasses.classes;
        };
})
.service('filterDivisions', function FilterDivision($http, GLOBALS){

        var filterDivisions = this;
        filterDivisions.divisions = [];

        filterDivisions.getDivisions = function(token, std){
            var url= GLOBALS.baseUrl+"user/getdivisions/"+std+"?token="+token;
            $http.get(url)
                .success(function(response) {
                   filterDivisions.divisions = response['data']['divisionList'];
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                });
            return filterDivisions.divisions;
        };
})
.controller('AppCtrl', function($scope, $state, $ionicPopup, $http, $ionicModal, $ionicPopover, $timeout, $ionicSideMenuDelegate, $ionicHistory, userSessions) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;
    $scope.aclMessage = "Access Denied";
   // userSessions.setToken(0);
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
                            $scope.data.badgeCount = res['data']['Badge_count'];
                            if($scope.sessionUserRole == 'parent'){
                                $scope.sessionId = res['data']['Badge_count']['user_id'];
                            }
                            else{
                                $scope.sessionId = res['data']['users']['user_id'];
                                $scope.messageCount = res['data']['Badge_count']['message_count'];
                            }
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

.controller('DashboardCtrl', function($scope, $state, $timeout, GLOBALS, $http, ionicMaterialInk, $ionicSideMenuDelegate, $cordovaSQLite, userSessions, userData, filterUserRoles, filterBatches) {

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
                    userSessions.setMsgCount(response['data']['Badge_count']['message_count']);
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
        var url= GLOBALS.baseUrl+"user/view-homework?token="+userSessions.userSession.userToken;
            $http.get(url)
                .success(function(response) {
                    if(response['status'] == 200){
                       $scope.homeworksListing = response['data'];
                       if($scope.homeworksListing == ''){
                            $scope.homeworksListing = [{
                                "description" : "No homeworks found"
                            }];
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
        
        $scope.publishHw = function(hwId){
            var url = GLOBALS.baseUrl+"user/publish-homework?token="+userSessions.userSession.userToken;
            $http.post(url, {_method: 'PUT', homework_id: hwId}).success(function(response){
                $scope.loadUnpHw();
            }).error(function(err) {
                console.log(err);
                $scope.aclMessage = "Access Denied";
                $scope.showPopup();
            });
        };
        
       $scope.loadUnpHw = function(){
            var url= GLOBALS.baseUrl+"user/view-unpublished-homework?token="+userSessions.userSession.userToken;
            $http.get(url).success(function(response) {                    
                    if(response['status'] == 200){
                       $scope.homeworksListing = response['data'];
                       if($scope.homeworksListing == ''){
                            $scope.homeworksListing = [{
                                "description" : "No homeworks found"
                            }];
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
        var url= GLOBALS.baseUrl+"user/view-homework-parent/"+userSessions.userSession.userId+"?token="+userSessions.userSession.userToken;
            $http.get(url)
                .success(function(response) {
                    if(response['status'] == 200){
                       $scope.homeworksListing = response['data'];
                       if($scope.homeworksListing == ''){
                            $scope.homeworksListing = [{
                                "description" : "No homeworks found"
                            }];
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
    .controller('EditHomeworkCtrl', function($scope, $state, $ionicPopup, $timeout, hwDetails, GLOBALS, userSessions, $http, ionicMaterialInk, $ionicSideMenuDelegate, $ionicModal) {

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
        $scope.hwId = $scope.editHwData['homework_id'];
        $scope.recipient = $scope.editHwData['studentList'].length+" Student Selected";
        $scope.contactList = $scope.editHwData['studentList'];
        $scope.checkRecipient = true;
        $scope.SubjectId = $scope.editHwData['subject_id'];
        $scope.SubjectName = $scope.editHwData['subjectName'];
        $scope.BatchId = $scope.editHwData['batch_id'];
        $scope.BatchName = $scope.editHwData['batch_name'];
        $scope.selectedList=[];
        for(var i=0; i < $scope.recipient; i++){
           $scope.selectedList[i] = $scope.editHwData['studentList'][i]['id'];
        }       
        $scope.hwTitle = $scope.editHwData['homeworkTitle'];
        $scope.classId = $scope.editHwData['class_id'];
        $scope.divId = $scope.editHwData['division_id'];
        $scope.className = $scope.editHwData['class_name'];
        $scope.divName = $scope.editHwData['division_name'];
        $scope.dueDate = $scope.editHwData['due_date'];
        $scope.description = $scope.editHwData['description'];
        $scope.hwTypeId = $scope.editHwData['homeworkTypeId'];
        $scope.hwrkType = $scope.editHwData['homeworkType'];
        $scope.setTitle = function(title){
          $scope.hwTitle = title;  
        };
        
        $scope.setDescription = function(message){
          $scope.description = message;  
        };
        // toggle selection for a given student by name
        $scope.toggleSelection = function toggleSelection(studentId) {
        var idx = $scope.selectedList.indexOf(studentId);
        if (idx > -1) {
        $scope.selectedList.splice(idx, 1);
        }
        // is newly selected
        else {
        $scope.selectedList.push(studentId);
        }
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
         
        $scope.getSelectedSub = function(subject){
            $scope.recipient = "";
            $scope.checkRecipient = true;
            $scope.contactList.length = 0;         
            var url= GLOBALS.baseUrl+"user/get-subjects-batches/"+subject['subject_id']+"?token="+userSessions.userSession.userToken;
            $http.get(url).success(function(response) {
                    $scope.batchList = response['data'];
                    $scope.SubjectId = subject['subject_id'];                
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
                    $scope.contactList.length = 0;                  
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                });
        };
        
        $scope.getDivision = function(classType){
            var url= GLOBALS.baseUrl+"user/get-classes-division/"+$scope.SubjectId+"/"+$scope.BatchId+"/"+classType['id']+"?token="+userSessions.userSession.userToken;
            $http.get(url).success(function(response) {
                   $scope.divisions = response['data'];
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
        
        $scope.contactsAll = false;
            $scope.checkAllcontacts = function () {
            console.log("into check all");
            if ($scope.contactsAll) {
                $scope.contactsAll = true;
            } else {
                $scope.contactsAll = false;
            }
            $scope.selectedList.length = 0;
            $scope.selectedList = [];
            angular.forEach($scope.contactList, function (student) {
                student.Selected = $scope.contactsAll;
                $scope.selectedList.push(student.id);
            });
        };
        
        $scope.sendTo = function(){
            $scope.recipient = $scope.selectedList.length+" Student selected";
            $scope.closeModal();
        };
        
        $scope.saveDraft = function(){
            if($scope.selectedList.length == 0){
                $scope.msg = "Please Add Recipient";
                $scope.showPopup();
            }
            else{
                var url = GLOBALS.baseUrl+"user/createHomework?token="+userSessions.userSession.userToken;
                $http.post(url, {_method:'PUT', homework_id: $scope.hwId, subject_id: $scope.SubjectId, title: $scope.hwTitle, batch_id: $scope.BatchId, class_id: $scope.classId, division_id: $scope.divId, due_date: $scope.dueDate, student_id: $scope.selectedList, description: $scope.description, homework_type: $scope.hwTypeId, attachment_file: ''}).success(function(response){ 
                    if(response['status'] == 200){
                        $scope.msg = response['message'];
                          $scope.showPopup();
                          $state.go('app.edithomeworklisting');
                    }
                    else{
                        $scope.msg = response['message'];
                         $scope.showPopup();
                    }
                }).error(function(err) {
                    console.log(err);
                    if(err['status'] == 500){
                     $scope.msg = err['message'];
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
                myPopup.close(); //close the popup after 8 seconds for some reason                
            }, 3000);
        };
        
    })
    .controller('HwComposeCtrl', function($scope, $state, $ionicPopup, $timeout, GLOBALS, userSessions, $http, ionicMaterialInk, $ionicSideMenuDelegate, $ionicModal) {

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
        
        $scope.setTitle = function(title){
          $scope.hwTitle = title;  
        };
        
        $scope.setDescription = function(message){
          $scope.description = message;  
        };
        
        // toggle selection for a given employee by name
     $scope.toggleSelection = function toggleSelection(studentId) {
     var idx = $scope.selectedList.indexOf(studentId);
     if (idx > -1) {
       $scope.selectedList.splice(idx, 1);
     }
     // is newly selected
     else {
       $scope.selectedList.push(studentId);
     }
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
         
        $scope.getSelectedSub = function(subject){
            $scope.recipient = "";
            $scope.checkRecipient = true;
            $scope.contactList.length = 0;         
            var url= GLOBALS.baseUrl+"user/get-subjects-batches/"+subject['subject_id']+"?token="+userSessions.userSession.userToken;
            $http.get(url).success(function(response) {
                    $scope.batchList = response['data'];
                    $scope.SubjectId = subject['subject_id'];                
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
                    $scope.contactList.length = 0;                  
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
            if($scope.selectedList.length == 0){
                $scope.msg = "Please Add Recipient";
                $scope.showPopup();
            }
            else{
                var url = GLOBALS.baseUrl+"user/Homeworkcreate?token="+userSessions.userSession.userToken;
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
                }).error(function(err) {
                    console.log(err);
                    if(err['status'] == 500){
                     $scope.msg = err['message'];
                    }
                    else{
                        $scope.msg = "Access Denied";
                    }                    
                    $scope.showPopup();
                });
            } 
        };
        
        $scope.selectedAll = false;        
        $scope.checkAllcontacts = function () {
            console.log("into check all");
            if ($scope.selectedAll) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }
            $scope.selectedList.length = 0;
            if($scope.selectedAll == true){
                angular.forEach($scope.contactList, function (student) {                
                    student.selectedBox = $scope.selectedAll;
                    $scope.selectedList.push(student.id);
                });
            }
            else{
                 angular.forEach($scope.contactList, function (student) {                
                    $scope.selectedBox = $scope.selectedAll;
                });
                $scope.selectedList.length = 0;
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
        $scope.loadMessages = function(){
            if (userSessions.userSession.userRole == "parent"){
            var url1 = GLOBALS.baseUrl+"user/get-messages-parent/"+userSessions.userSession.userId+"?token="+userSessions.userSession.userToken;
            $http.get(url1).success(function(response){                
                if(response['status'] == 200){
                       $scope.nMessages = response['MessageList'];
                       if($scope.nMessages == ''){
                            $scope.nMessages = [{
                                "description" : "No messages found"
                            }];
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
                            $scope.nMessages = [{
                                "description" : "No messages found"
                            }];
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
        $scope.msgDetails = function(to, title){
            var flag = chatHist.setChatHist(userSessions.userSession.userId, to, title);
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
    .controller('MsgComposeCtrl', function($scope, $state, $timeout, $ionicPopup, ionicMaterialInk, $ionicSideMenuDelegate, $ionicModal, GLOBALS, filterUserRoles, filterBatches, filterDivisions, filterClasses, userSessions, $http) {

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
        $scope.checkRole = "display-no";
        $scope.checkRecipient = true;
        $scope.recipient = "";        
        $scope.contactList = [];
        $scope.message = "";
        var url= GLOBALS.baseUrl+"user/userroles?token="+userSessions.userSession.userToken;
            $http.get(url)
                .success(function(response) {
                    $scope.userRoles = response['data']['userRoles'];                    
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                }); 
        $scope.getSelectedRole = function(roleType){          
            if(roleType['name'] == "Student"){                
                $scope.checkRole = "";
                $scope.recipient = "";
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
                $scope.recipient = "";
                $scope.contactList.length = 0;
                $scope.getTeacherList();
            }
        }
        $scope.getClass = function(batchType){
               //$scope.classes = filterClasses.getClasses(userSessions.userSession.userToken, batchType['id']);
               var url= GLOBALS.baseUrl+"user/getclasses/"+batchType['id']+"?token="+userSessions.userSession.userToken;
            $http.get(url).success(function(response) {
                    $scope.classes = response['data']['classList'];
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                });
        };

        $scope.getDivision = function(classType){
            //$scope.divisions = filterDivisions.getDivisions(userSessions.userSession.userToken, classType['id']);
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

        $scope.recipient = "";
        $scope.message = "";
        $scope.contactList = [];
        $scope.message = '';
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
        $http.post(url, {user_id: userSessions.userSession.userId, from_id: $scope.envelop.from_id, to_id: $scope.envelop.to_id}).success(function(response) {
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
                            $http.post(url, {from_id: $scope.envelop.from_id, to_id: $scope.envelop.to_id, description: $scope.message })
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

        $scope.noticeBoard = function() {
            $state.go('app.sharedNotification');
        };
    })
    .controller('MarkAttendanceCtrl', function($scope, $state, $timeout, ionicMaterialInk, $log, $ionicSideMenuDelegate) {

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

    .controller('ViewAttendanceCtrl', function($scope, $state, $timeout, ionicMaterialInk, $ionicSideMenuDelegate) {

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
    .controller('ViewLeaveApprovalCtrl', function($scope, $state, $timeout, ionicMaterialInk, $ionicSideMenuDelegate) {
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
    .controller('TimeTableCtrl', function($scope, $state, $timeout, ionicMaterialInk, $ionicSideMenuDelegate, $ionicPopup) {
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Header
        $scope.$parent.hideHeader();//

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