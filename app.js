var app = angular.module('myApp',['ui.router']);
var apimedic='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNvbXlhLnNvZGFuaUBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjY1MyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAxNi0wOC0yNyIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNTA3NDI5MzUyLCJuYmYiOjE1MDc0MjIxNTJ9.38Fd4vYtSGm1-XBiHB4J4yMQt49942srtAzy0DyvMt0';
app.config(function($stateProvider, $urlRouterProvider) {



    $stateProvider


        .state('home', {
            url: '/home',
            templateUrl: 'home.html'
        })
        .state('health', {
            url: '/health',
            templateUrl: 'health.html'
        })

        .state('blog', {
            url: '/blog',
            templateUrl: 'blog/blog.html'

        })

        .state('login', {
            url: '/login',
            templateUrl: 'form/login.html'

        })

        .state('signup', {
            url: '/signup',
            templateUrl: 'form/signup.html'

        })
        .state('health2', {
            url: '/health2',
            templateUrl: 'health2.html'

        })
        .state('google_map', {
            url: '/google_map',
            templateUrl: 'google/index.html'

        })

        .state('notes_app', {
            url: '/notes',
            templateUrl: 'notes/index.html'

        })







});



app.controller('healthpage', function($scope, $http,$state) {


    $http({
        method : "GET",
        url : 'https://sandbox-healthservice.priaid.ch/body/locations?token='+apimedic+'&language=en-gb'
    }).then(function mySucces(response) {
        $scope.allbodyparts = response.data;
    }, function myError(response) {
        $scope.allbodyparts = response.statusText;
    });


    $scope.bdyid="15";


$scope.diag_pass=function (var5) {
$scope.all_symp=var5;


}

$scope.dis_com=function (var6) {
    $scope.dis_id=var6;
    $scope.det_dis();

}

    $scope.nextpage=function () {
        $state.go('health2');

    }
    $scope.prepage=function () {

        $state.go('health');

    }

    $scope.callurl=function (var1) {

$scope.bdyid=var1;

        $http({
            method : "GET",
            url : 'https://sandbox-healthservice.priaid.ch/body/locations/'+var1+'?token='+apimedic+'&language=en-gb',
        }).then(function mySucces(response) {
            $scope.subbdyparts = response.data;
        }, function myError(response) {
            $scope.subbdyparts = response.statusText;
        });

    }

    $scope.subbdy="15";
    $scope.selector="man";
    $scope.refreshurl=function () {
        $scope.urlcheck='https://sandbox-healthservice.priaid.ch/symptoms/'+$scope.subbdy+'/'+$scope.selector+'?token='+apimedic+'&language=en-gb' ;
    }


    $scope.symptomshow=function () {


        $http({
            method : "GET",
            url : 'https://sandbox-healthservice.priaid.ch/symptoms/'+$scope.subbdy+'/'+$scope.selector+'?token='+apimedic+'&language=en-gb',
        }).then(function mySucces(response) {
            $scope.symptomcom = response.data;
        }, function myError(response) {
            $scope.symptomcom= response.statusText;
        });

    }

    $scope.set_subbdy=function (var2) {
     $scope.subbdy=var2;
    }
    $scope.manclick=function () {


        $scope.selector="man";
        $scope.symptomshow();

    }
    $scope.womanclick=function () {


        $scope.selector="woman";
        $scope.symptomshow();

    }
    $scope.boyclick=function () {


        $scope.selector="boy";
        $scope.symptomshow();

    }
    $scope.girlclick=function () {


        $scope.selector="girl";
        $scope.symptomshow();

    }
    $scope.all_symp=15;
    $scope.dis_selector="male";

    $scope.dob=1995;




    $scope.show_all_disease=function () {


        $http({
            method: "GET",
            url: 'https://sandbox-healthservice.priaid.ch/diagnosis'+'?token='+apimedic+'&language=en-gb'+'&symptoms=['+$scope.all_symp+']'+'&gender='+$scope.dis_selector+'&year_of_birth='+$scope.dob,
        }).then(function mySucces(response) {
            $scope.all_diseases = response.data;

            //console.log($scope.all_diseases);
        }, function myError(response) {
            $scope.all_diseases = response.statusText;

        });
    }
    $scope.man_dis=function () {

        console.log('In man');
        $scope.dis_selector="male";
        $scope.show_all_disease();

    }
    $scope.woman_dis=function () {


        $scope.dis_selector="female";
        $scope.show_all_disease();

    }
    $scope.more_symp=15;
    $scope.more_selector="male";

    $scope.more_dob=1995;




    $scope.show_more_symp=function () {


        $http({
            method: "GET",
            url: 'https://sandbox-healthservice.priaid.ch/symptoms/proposed'+'?token='+apimedic+'&language=en-gb'+'&symptoms=['+$scope.more_symp+']'+'&gender='+$scope.more_selector+'&year_of_birth='+$scope.more_dob,
        }).then(function mySucces(response) {
            $scope.extra_symptoms = response.data;

            //console.log($scope.all_diseases);
        }, function myError(response) {
            $scope.extra_symptoms = response.statusText;

        });
    }
    $scope.man_more=function () {

        console.log('In man');
        $scope.more_selector="male";
        $scope.show_more_symp();

    }
    $scope.woman_more=function () {


        $scope.more_selector="female";
        $scope.show_more_symp();

    }
    $scope.dis_id="15";

    $scope.det_dis=function () {

        console.log('here');
        $http({
            method : "GET",
            url : 'https://sandbox-healthservice.priaid.ch/issues/'+$scope.dis_id+'/info?token='+apimedic+'&language=en-gb',
        }).then(function mySucces(response) {

            $scope.temp_dis= response.data;
            //console.log($scope.temp_dis);

        }, function myError(response) {
            $scope.temp_dis = response.statusText;
        });

    }


});










app.controller('notesController', function($scope){

    
    $scope.notes = [{
        createdOn:14282374500771,
        edit:false,
        text:"Here you can set your reminders"
    }];

    
    $scope.addNote = function(){
        $scope.newNote = {};
        $scope.newNote.createdOn = Date.now();
        $scope.newNote.text = ' ';
        $scope.newNote.edit = true;
        $scope.notes.push($scope.newNote);
        $scope.newNote = {};
    };

    
    $scope.delete = function (i) {
        var r = confirm("Are you sure you want to delete this note?");
        if (r == true)
            $scope.notes.splice(i, 1);
    };

    
    $scope.update = function(i, note) {
        $scope.notes[i].text = note;
        $scope.notes[i].edit = false;
    };

    
});
















app.controller('BlogController', ['$http', function($http){

    var blog = this;
    blog.title = "MediLive Blog ";

    blog.posts = {};

    blog.posts = [
        {
            "title": "Blog Post One",
            "body": [
                "This is first blog of this page",
                    ],
            "author": "Somya Sodani",
            "comments": [
                {
                    "body":"This is first comment!",
                    "author": "testing_guy"
                }
            ],
            "likes":0,
            "image":"http://www.mdgadvertising.com/blog/wp-content/uploads/2013/11/blog_online-health-research-eclipsing-doctor-patient-relationship.jpg",
            "createdOn":1408547127216
        },
        {
            "title": "Blog Post Two",
            "body": [
                "This is first blog of this page",
                    ],
            "author": "Somya Sodani",
            "comments": [
                {
                    "body":"This is first comment!",
                    "author": "testing_guy"
                }
            ],
            "likes":0,
            "image":"http://www.mdgadvertising.com/blog/wp-content/uploads/2013/11/blog_online-health-research-eclipsing-doctor-patient-relationship.jpg",
            "createdOn":1408547127216
        },
        {
            "title": "Blog Post Three",
            "body": [
                "This is first blog of this page",
                    ],
            "author": "Somya Sodani",
            "comments": [
                {
                    "body":"This is first comment!",
                    "author": "testing_guy"
                }
            ],
            "likes":0,
            "image":"http://www.mdgadvertising.com/blog/wp-content/uploads/2013/11/blog_online-health-research-eclipsing-doctor-patient-relationship.jpg",
            "createdOn":1408547127216
        },
        {
            "title": "Blog Post Four",
            "body": [
                "This is first blog of this page",
                    ],
            "author": "Somya Sodani",
            "comments": [
                {
                    "body":"This is first comment!",
                    "author": "testing_guy"
                }
            ],
            "likes":0,
            "image":"http://www.mdgadvertising.com/blog/wp-content/uploads/2013/11/blog_online-health-research-eclipsing-doctor-patient-relationship.jpg",
            "createdOn":1408547127216
        },
        {
            "title": "Blog Post Five",
            "body": [
                "This is first blog of this page",
                    ],
            "author": "Somya Sodani",
            "comments": [
                {
                    "body":"This is first comment!",
                    "author": "testing_guy"
                }
            ],
            "likes":0,
            "image":"http://www.mdgadvertising.com/blog/wp-content/uploads/2013/11/blog_online-health-research-eclipsing-doctor-patient-relationship.jpg",
            "createdOn":1408547127216
        },

    ];
    blog.tab = 'blog';

    blog.selectTab = function(setTab){
        blog.tab = setTab;
        console.log(blog.tab)
    };

    blog.isSelected = function(checkTab){
        return blog.tab === checkTab;
    };

    blog.post = {};
    blog.addPost = function(){
        blog.post.createdOn = Date.now();
        blog.post.comments = [];
        blog.post.likes = 0;
        blog.posts.unshift(this.post);
        blog.tab = 0;
        blog.post ={};
    };

}]);

app.controller('CommentController', function(){
    this.comment = {};
    this.addComment = function(post){
        this.comment.createdOn = Date.now();
        post.comments.push(this.comment);
        this.comment ={};
    };
});





