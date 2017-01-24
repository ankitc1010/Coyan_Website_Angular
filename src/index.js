var app=angular.module("web",['ngMaterial','ngRoute', 'ngAnimate', 'ngTouch','ngFileUpload', 'ngImgCrop']);

app.config(function($routeProvider, $mdThemingProvider){
		$routeProvider
		.when("/",{
			templateUrl:"assets/partials/home0.html"
		})
		.when("/menu1",{
			templateUrl:"assets/partials/home.html"
		})
		.when("/menu2",{
			templateUrl:"assets/partials/home1.html"

		})
    .when("/about", {
      templateUrl:"assets/partials/about.html"
    })
    .when("/project", {
      templateUrl:"assets/partials/project.html"
    })
    .when("/join", {
      templateUrl:"assets/partials/join.html"
    })
		.when("/menu3",{
			templateUrl:"assets/partials/home2.html"
		})
    .when("/form",{
      templateUrl:"assets/partials/form.html"
    })
    .when("/allarticles",{
      templateUrl:"assets/partials/allarticles.html"
    })
    .when("/allusers",{
      templateUrl:"assets/partials/allusers.html"
    })
    .when("/user/:id",{
      templateUrl:"assets/partials/usertemplate.html",
      controller:"UserIndividualController",
      controllerAs: 'ui'
    })
    .when("/article/:id",{
      templateUrl:"assets/partials/articletemplate.html",
      controller:"ArticleDisplayController"
    });

		 $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

	})
  .controller('ScrollController', ['$scope', '$location', '$anchorScroll',
  function($scope, $location, $anchorScroll) {
    $scope.gotoBottom = function() {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('clients');

      // call $anchorScroll()
      $anchorScroll();
    };
  }])

  .controller('maincontroller',['$http','$scope','$window','$location','$mdToast','Upload','$timeout',function($http,$scope,$window,$location,$mdToast,Upload,$timeout){
    $scope.userauthi={};
    $scope.user  = {username:'',password:''};
    $scope.states=['Founder', 'Developer'];
    $scope.display=function(){
      console.log("rockstar");
    };
    $scope.logout=function(){
      $http.get("/logout").success(function(data){

        $scope.userauthi={};


      }).error(function(data){

      })
    };
    $scope.authenticate=function(user){
        $http.post('/login', user).success(function(data){
          $scope.userauthi=data;
          console.log(data);
          $mdToast.show($mdToast.simple().textContent('Signed In'));
        }).error(function(Data){
          console.log(Data);
        })
    };
    $scope.update=function(user){
      $http.post('/update',user).success(function(data){
        console.log(data);
      }).error(function(data){
        console.log(data);
      })
    };
      $scope.upload = function (dataUrl, name) {
        Upload.upload({
            url: '/api/images',
            data: {
                file: Upload.dataUrltoBlob(dataUrl, name)
            },
        }).then(function (response) {
            $timeout(function () {
                $scope.userauthi.img=response.data;
                console.log(response.data);
            });
        }, function (response) {
            console.log(response.status
                + ': ' + response.data);
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    }

  }])

	.controller('registration', ['$http', '$mdToast','$scope', function($http, $mdToast, $scope){
		var fellow = $scope;
		fellow.unit ={};

		fellow.generate = function() {
			$http.post("/sendmail", fellow.unit).success(function(data){
				fellow.anonymous= data.otp;

			});
		};
		var updateScope = function() {
			fellow.unit = {};
			fellow.success = true;
		}
		fellow.validate = function(otp) {
			if(fellow.anonymous == otp) {
				$http.post("/api/fellows", fellow.unit).success(function(Data) {
				$mdToast.show($mdToast.simple().textContent('Account Created'));

					 updateScope();

				}).error(function(error){

				})
			} else {

			}
		}
	}])


	.controller('controller1',['$http', '$interval','$mdToast', function($http,$interval,$mdToast,$location){
		var store=this;
		store.product=[];
		store.number=0;

		$http.get("api/articles").success(function(data){
			store.product=data;
		});
		$interval(function(){
			store.number1= Math.floor(Math.random() * (store.product.length - 0)) + 0;
      store.number3=Math.floor(Math.random() * (store.product.length - 0)) + 0;
      store.number5=Math.floor(Math.random() * (store.product.length - 0)) + 0;
		},2000);
    $interval(function(){
       store.number2=Math.floor(Math.random() * (store.product.length - 0)) + 0;
        store.number4=Math.floor(Math.random() * (store.product.length - 0)) + 0;
         store.number6=Math.floor(Math.random() * (store.product.length - 0)) + 0;
    },7000);



  }])

  .controller("UserDisplayController",['$http','$scope', function($http,$scope){
    $scope.users={};
    $http.get("/api/allusers").success(function(data){
      $scope.users=data;
    })
  }])

  .controller("UserIndividualController",['$http','$scope','$routeParams', function($http,$scope,$routeParams){
    $scope.user={};
    $http.post("api/user",$routeParams).success(function(data){
      $scope.user=data[0];

    }).error(function(data){

    })
  }])


  .controller('ArticleDisplayController',['$http','$scope','$routeParams', function($http, $scope, $routeParams){

        $scope.article={};
        $http.post("api/articleget",$routeParams).success(function(data){
          $scope.article=data;

        }).error(function(data){
          console.log(data);
        })
  }])

	.controller('controller2',['$scope', '$http','$mdToast', '$mdMedia', '$mdDialog', 'Upload', '$timeout','$location',function($scope, $http, $mdToast, $mdMedia, $mdDialog, Upload, $timeout,$location){
		var store=$scope;
		$scope.progress="";
		$scope.goToPage = function () {
    $location.path("/menu2");
};
		$scope.html="";
		$scope.article={};
		$scope.article.name="";
    $scope.article.name=$scope.$parent.userauthi.name;
    $scope.article.designation=$scope.$parent.userauthi.designation;
    $scope.article.profileimg=$scope.$parent.userauthi.img;
    $scope.allarticles=undefined;





		var last = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };

  //   this.toastPosition = angular.extend({},last);
  // this.getToastPosition = function() {
  //   sanitizePosition();
  //   return Object.keys(this.toastPosition)
  //     .filter(function(pos) { return this.toastPosition[pos]; })
  //     .join(' ');
  // };
  // function sanitizePosition() {
  //   var current = this.toastPosition;
  //   if ( current.bottom && last.top ) current.top = false;
  //   if ( current.top && last.bottom ) current.bottom = false;
  //   if ( current.right && last.left ) current.left = false;
  //   if ( current.left && last.right ) current.right = false;
  //   last = angular.extend({},current);
  // }
  // this.showSimpleToast = function() {
  //   var pinTo = this.getToastPosition();
  //   $mdToast.show(
  //     $mdToast.simple()
  //       .textContent('Created')
  //       .position(pinTo )
  //       .hideDelay(3000)
  //   );
  // };
  this.showAdvanced = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({


      templateUrl: 'assets/partials/selector.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      scope:$scope,
      preserveScope:true,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    }).then(function(){

    })
    };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };



$scope.uploadFiles = function(file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: 'api/html',
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    $scope.article.templateUrl=response.data;


                });
            }, function (response) {
                if (response.status > 0)

            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                                         evt.loaded / evt.total));
            });

} };




       $scope.upload = function (dataUrl, name) {
        Upload.upload({
            url: '/api/images',
            data: {
                file: Upload.dataUrltoBlob(dataUrl, name)
            },
        }).then(function (response) {
            $timeout(function () {
                $scope.article.img=response.data;

            });
        }, function (response) {

        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    }



  $scope.submit= function(){


  	console.log($scope.article);
  	$http.post("/api/articles",$scope.article).then(function(data){
  		console.log("awesome");
      $scope.article={};

  	}, function(){
  		console.log("error shit");
  	});
  }

	}]);
