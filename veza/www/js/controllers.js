/* global angular, document, window */
'use strict';
var db = null;
angular.module('starter.controllers', []).constant('GLOBALS',{
   baseUrl:'http://school_mit.woxiapps.com/api/v1/'
})
.service('userSessions', function Usersession(){

        var userSessions = this;

        userSessions.userSession = [];

        userSessions.setSession = function(id, token, role, student, acl){
            userSessions.userSession.push({ userId: id, userToken: token, userRole: role, studentId: student, userAclModules: acl });
        };
})
.service('filterBatches', function FilterBatch($http, GLOBALS){

        var filterBatches = this;

        filterBatches.batches = [];

        filterBatches.setBatches = function(token){
            var url= GLOBALS.baseUrl+"user/getbatches";
            $http.get(url, { params: { "token": token } })
                .success(function(response) {
                    var batchlist = response['batchList'];
                    filterBatches.batches.push = angular.toJson(batchlist);
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                });
        };
})
.service('filterUserRoles', function FilterRole($http, GLOBALS){

        var filterUserRoles = this;

        filterUserRoles.roles = [];

        filterUserRoles.setRoles = function(token){
            var url= GLOBALS.baseUrl+"user/userroles";
            $http.get(url, { params: { "token": token } })
                .success(function(response) {
                    var userRoles = response['userRoles'];
                    filterUserRoles.roles.push = angular.toJson(userRoles);
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                });
        };
})
.service('filterClasses', function filterClass($http, GLOBALS){

        var filterClasses = this;

            filterClasses.classes = [];

        filterClasses.getClasses = function(token, batch){
            var url= GLOBALS.baseUrl+"user/getclasses";
            $http.get(url, { params: { "token": token, "batch": batch } })
                .success(function(response) {
                    var classList = response['classList'];
                    filterClasses.classes = angular.toJson(classList);
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                });
        };
})
.service('filterDivisions', function FilterDivision($http, GLOBALS){

        var filterDivisions = this;
        filterDivisions.divisions = [];

        filterDivisions.getDivisions = function(token, std){
            var url= GLOBALS.baseUrl+"user/getdivisions";
            $http.get(url, { params: { "token": token, "class": std } })
                .success(function(response) {
                   var divisionList = response['divisionList'];
                    filterDivisions.divisions = angular.toJson(divisionList);
                })
                .error(function(response) {
                    console.log("Error in Response: " +response);
                });
        };
})
.controller('AppCtrl', function($scope,$state, $ionicModal, $ionicPopover, $timeout, $ionicSideMenuDelegate, $ionicHistory, userSessions) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

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
        $state.go('login');
    };
        $scope.currentUserSession = this;
        $scope.currentUserSession = userSessions.userSession;

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
            var checkAcl = $scope.currentUserSession.userAclModules.indexOf("Create_message");
            if(checkAcl !== -1){
                if($scope.currentUserSession.userRole = "parent"){
                    $state.go('app.msgcompose');
                }
                else{
                    $state.go('app.msgcompose');
                }
            }
            else{
                $scope.myGoBack();
                alert("Access Denied !");
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

        $scope.signIn = function() {
            $state.go('app.dashboard');
        };
})

.controller('LoginCtrl', function($scope, $state, $timeout,  ionicMaterialInk, $cordovaSQLite, $http, GLOBALS, $ionicPopup, userSessions, $ionicPlatform) {

    ionicMaterialInk.displayEffect();
        $scope.email = '';
        $scope.password = '';
        $scope.sessionId = '';
        $scope.sessionToken = '';
        $scope.sessionStudentId = '';
        $scope.sessionUserRole = '';
        $scope.data = [];
        var currentContext = this;
        var url= GLOBALS.baseUrl+"user/auth";
        console.log(url);
        $scope.submit = function(email, password){
            alert("Submit Clicked");
            var query = "SELECT user_id, token FROM users WHERE email = ?";
            $ionicPlatform.ready(function () {
                alert("device ready "+db);
                
            $cordovaSQLite.execute(db, query, [email]).then(function(res) {
                if(res.rows.length > 0 && res.rows.item(0).token != null) {
                    currentContext.userSessions.setSession(res.rows.item(0).user_id, res.rows.item(0).token);
                    $scope.signIn();
                } else {
                    alert("Working...");
                    console.log("No results found");
                    var url= GLOBALS.baseUrl+"user/auth";
                    console.log(url);
                    $http.post(url, { email: email, password: password })
                        .success(function(response) {
                            console.log("Response: "+response);
                            $scope.data.message = response['message'];
                            $scope.data.status = response['status'];
                            if(response['status'] != 200){
                                $scope.showPopup();
                            }
                            else{
                                $scope.data.users = response['data']['users'];
                                $scope.sessionId = response['data']['users']['user_id'];
                                $scope.sessionToken = response['data']['users']['token'];
                                $scope.sessionUserRole = response['data']['users']['role_type'];
                                $scope.data.aclModule = response['data']['Acl_Modules'];
                                $scope.data.badgeCount = response['data']['Badge_count'];
                                $scope.roleType = response['data']['users']['role_type'];
                                if($scope.roleType == "parent"){
                                    $scope.data.ParentStudentRelation = response['data']['Parent_student_relation'];
                                    angular.forEach($scope.data.ParentStudentRelation['Students'], function(student){
                                                var insertStudent = "INSERT OR IGNORE INTO parent_students (parent_id, student_id, student_name, div_id) VALUES (?,?,?,?)";
                                                $cordovaSQLite.execute(db, insertStudent, [ $scope.data.ParentStudentRelation['parent_id'], student.student_id, student.student_name, student.student_div]).then(function(res) {
                                                    console.log("insertId: " + res.insertId);
                                                }, function (err) {
                                                    console.error(err);
                                                });
                                    });
                                    var selectDefaultStudent = "SELECT student_id FROM parent_students WHERE parent_id = ? ORDER BY ROWID ASC LIMIT 1";
                                    $cordovaSQLite.execute(db, selectDefaultStudent, [$scope.data.ParentStudentRelation['parent_id']]).then(function(result) {
                                        if(result.rows.length > 0) {
                                            $scope.sessionStudentId = result.rows.item(0).student_id;
                                        }
                                    }, function (err) {
                                        console.error(err);
                                    });
                                }
                                var updateUser = "UPDATE users SET username = ?, email = ?, password=?, avatar = ?, token = ? WHERE user_id = ?";
                                $cordovaSQLite.execute(db, updateUser, [$scope.data.users['username'], $scope.data.users['email'], $scope.data.users['password'], $scope.data.users['avatar'], $scope.data.users['token'], $scope.data.users['user_id']]).then(function(result) {
                                    if(result.rows.length <= 0) {
                                        var insertUser = "INSERT OR IGNORE INTO users (user_id, role_type, username, password, email, avatar, token) VALUES (?,?,?,?,?,?)";
                                        $cordovaSQLite.execute(db, insertUser, [$scope.data.users['user_id'], $scope.data.users['role_type'], $scope.data.users['username'], $scope.data.users['password'], $scope.data.users['email'], $scope.data.users['avatar'], $scope.data.users['token']]).then(function(res) {
                                            console.log("insertId: " + res.insertId);
                                            angular.forEach($scope.data.aclModule['acl_module'], function(acl){
                                    var insertAcl = "INSERT OR IGNORE INTO acl_modules (user_id, acl_module) VALUES (?,?)";
                                    $cordovaSQLite.execute(db, insertAcl, [ $scope.data.aclModule['user_id'], acl]).then(function(res) {
                                        console.log("insertId: " + res.insertId);
                                    }, function (err) {
                                        console.error(err);
                                    });
                                });
                                        }, function (err) {
                                            console.error(err);
                                        });
                                    }else{
                                        angular.forEach($scope.data.aclModule['acl_module'], function(acl){
                                            var insertAcl = "INSERT OR IGNORE INTO acl_modules (user_id, acl_module) VALUES (?,?)";
                                            $cordovaSQLite.execute(db, insertAcl, [ $scope.data.aclModule['user_id'], acl]).then(function(res) {
                                            console.log("insertId: " + res.insertId);
                                    }, function (err) {
                                        console.error(err);
                                    });
                                });
                                    }
                                }, function (err) {
                                    console.error(err);
                                });

                                $scope.aclModules = $scope.data.aclModule['acl_module'];
                                angular.forEach($scope.data.badgeCount, function(badgeCount){
                                    var updateBadgeCount = "UPDATE badge_counts SET message_count = ?, auto_notification_count = ? WHERE user_id = ?";
                                    $cordovaSQLite.execute(db, updateBadgeCount, [badgeCount.message_count, badgeCount.auto_notification_count, badgeCount.user_id]).then(function(result) {
                                        if(result.rows.length <= 0) {
                                            var insertBadgeCount = "INSERT INTO badge_counts (user_id, message_count, auto_notification_count) VALUES (?,?,?)";
                                            $cordovaSQLite.execute(db, insertBadgeCount, [badgeCount.user_id, badgeCount.message_count, badgeCount.auto_notification_count]).then(function(res) {
                                                console.log("insertId: " + res.insertId);
                                            }, function (err) {
                                                console.error(err);
                                            });
                                        }
                                    }, function (err) {
                                        console.error(err);
                                    });
                                });
                                userSessions.setSession($scope.sessionId, $scope.sessionToken, $scope.sessionUserRole, $scope.sessionStudentId, $scope.aclModules);
                                $scope.signIn();
                            }
                        })
                        .error(function(error) {
                            $scope.data = "Unsuccessfull";
                            console.log("error: "+error);
                        });
                }
            }, function (err) {
                console.error(err);
                $scope.data.message = err;
                alert(""+err[0]);
                $scope.showPopup();
            });
       });       
      }  
        $scope.showPopup = function() {
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<div>'+$scope.data.message+'</div>',
                title: '',
                subTitle: '',
                scope: $scope
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
            $timeout(function() {
                myPopup.close(); //close the popup after 8 seconds for some reason
            }, 20000);
        };
      
})

.controller('DashboardCtrl', function($scope, $state, $timeout, ionicMaterialInk, $ionicSideMenuDelegate, userSessions, filterUserRoles, filterBatches) {

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
        $scope.userSession = userSessions.getSession();
        var selectCount = "SELECT message_count FROM badge_counts WHERE user_id = ?";
        $cordovaSQLite.execute(db, selectCount, [$scope.userSession.userId]).then(function(res) {
            if(res.rows.length > 0) {
                $scope.msgCount = res.rows.item(0).message_count;
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });

        $scope.getRoles = filterUserRoles.setRoles(userSessions.userSession.userToken);
        $scope.getBatches = filterBatches.setBatches(userSessions.userSession.userToken);

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
    .controller('HomeworkCtrl', function($scope, $state, $timeout, ionicMaterialInk, $ionicSideMenuDelegate) {

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
    .controller('HwComposeCtrl', function($scope, $state, $timeout, ionicMaterialInk, $ionicSideMenuDelegate, $ionicModal) {

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

    .controller('MessageCtrl', function($scope, $state, $timeout, ionicMaterialInk, $ionicSideMenuDelegate, GLOBALS, userSessions, $http) {

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

        $scope.getMessages();
        $scope.getMessages = function() {
            var url= GLOBALS.baseUrl+"user/getdetailmessage";
            if(userSessions.userSession.userRole == "parent"){
                $scope.params = { "token": userSessions.userToken, "student_id": userSessions.userSession.studentId};
            }
            else{
                $scope.params = { "token": userSessions.userSession.userToken};
            }
            $http.get(url, $scope.params)
                .success(function(response) {

                })
                .error(function(response) {
                    alert("ERROR");
                });
        }

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
    .controller('MsgComposeCtrl', function($scope, $state, $timeout, ionicMaterialInk, $ionicSideMenuDelegate, $ionicModal, GLOBALS, filterUserRoles, filterBatches, filterDivisions, filterClasses, userSessions, $http) {

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
        $scope.userRoles = filterUserRoles.getRoles;
        $scope.batches = filterBatches.getBatches;
        $scope.getClass = function(batch){
               $scope.classes = filterClasses.getClasses(userSessions.userSession.userToken, batch);
        };

        $scope.getDivision = function(std){
            $scope.divisions = filterDivisions.getDivisions(userSessions.userSession.userToken, std);
        };

        $scope.getStudentList = function(id){
                var url= GLOBALS.baseUrl+"user/get-students-list";
                $http.get(url, { params: { "token": userSessions.userSession.userToken, "division": id } })
                    .success(function(response) {
                        $scope.contactList = response['studentsList'];
                        $scope.contactList = angular.toJson($scope.contactList);
                    })
                    .error(function(response) {
                        console.log("Error in Response: " +response);
                    });
        };

        $scope.getTeacherList = function(name){
            if(name == userSessions.userSession.userRole){
                var url= GLOBALS.baseUrl+"user/getteachers";
                $http.get(url, { params: { "token": userSessions.userSession.userToken } })
                    .success(function(response) {
                        $scope.contactList = response['teachers'];
                        $scope.contactList = angular.toJson($scope.contactList);
                    })
                    .error(function(response) {
                        console.log("Error in Response: " +response);
                    });
            }
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

        $scope.sendMessage= function(){
          if($scope.recipient == ""){
              $scope.msg = "Please Add Recipient";
              $scope.showPopup();
          }
          else{
              var url= GLOBALS.baseUrl+"user/sendmessage";
              $http.post(url, { params: { "token": userSessions.userSession.userToken, "to_id": $scope.recipientId, "description": $scope.message } })
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
                $scope.myGoBack();
            }, 10000);
        };

    })
    .controller('ParentMsgComposeCtrl', function($scope, $state, $timeout, ionicMaterialInk, $ionicSideMenuDelegate, $ionicModal, $ionicHistory, $http, GLOBALS, userSessions) {

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

        var url= GLOBALS.baseUrl+"user/get-teachers-list";
        $http.get(url, { params: { "token": userSessions.userSession.userToken, "student_id": userSessions.userSession.studentId } })
            .success(function(response) {
                $scope.contactList = response['teachersList'];
                $scope.contactList = angular.toJson($scope.contactList);
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

        $scope.sendMessage= function(){
            if($scope.recipient == ""){
                $scope.msg = "Please Add Recipient";
                $scope.showPopup();
            }
            else{
                var url= GLOBALS.baseUrl+"user/sendmessage";
                $http.post(url, { params: { "token": userSessions.userSession.userToken, "to_id": $scope.recipientId, "description": $scope.message } })
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
                $scope.myGoBack();
            }, 10000);
        };
    })
    .controller('MsgChatCtrl', function($scope, $state, $timeout, ionicMaterialInk, $ionicSideMenuDelegate) {
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