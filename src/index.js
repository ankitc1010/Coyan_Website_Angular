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
		.when("/events", {
      templateUrl:"assets/partials/events.html"
    })
		.when("/login",{
			templateUrl:"assets/partials/home2.html"
		})
    .when("/form",{
      templateUrl:"assets/partials/form.html"
    })
		.when("/techArthaTest",{
      templateUrl:"assets/partials/test.html"
    })
    .when("/allarticles",{
      templateUrl:"assets/partials/allarticles.html"
    })
    .when("/allusers",{
      templateUrl:"assets/partials/allusers.html"
    })
		.when("/techartha", {
			templateUrl: "assets/partials/techartha.html"
		})
		.when("/contactus", {
			templateUrl: "assets/partials/contactus.html"
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

	.controller('testController',['$http','$scope','$mdToast', '$interval', function($http, $scope, $mdToast, $interval) {
		function changestate() {
		 $scope.verified = true;
		 $scope.hasSubmitted = false;
		 console.log($scope);
	 }
	 $scope.timer = 10;
	 $scope.timerForTest = 10;
		$scope.check = function() {
			console.log($scope.user);

			$http.post('/api/techIdCheck', $scope.user).success(function(response) {
				if(response === true)
			changestate();
			}).catch(function(error) {
				console.log("error");
			})
		}

		$scope.enter = function() {
			$scope.enterStatus = true;
			var countDownToBegin = $interval(function() {
				$scope.timer--;
				console.log($scope.timer);
				if($scope.timer === 0){
					$scope.nowEnterTest();
					$interval.cancel(countDownToBegin);
				}
			}, 1000);
		}

		$scope.nowEnterTest = function() {
			$scope.enterTestStatus = true;
			var countDownToBegin = $interval(function() {
				$scope.timerForTest--;
				console.log($scope.timerForTest);
				if($scope.timerForTest === 0 && !$scope.hasSubmitted){
					$scope.submit();
						$interval.cancel(countDownToBegin);
				} else if($scope.hasSubmitted) {
					$interval.cancel(countDownToBegin);
				}
			}, 1000);
		}

		$scope.submit = function() {
			$scope.hasSubmitted= true;
			console.log($scope.user);
			
			$http.post('/techArthaTestStorage', $scope.user).success(function(response) {
				console.log(response);
			}).catch(function(error) {
				console.log(error);
			})


		}

	}])


	.controller('techArtha', ['$http', '$scope', '$mdToast', function($http, $scope, $mdToast) {
		$scope.display = function() {
			console.log($scope.useri);
			$http.post('/techArthaRegister', $scope.useri).success(function(response) {
				  $mdToast.show($mdToast.simple().textContent('Registered').hideDelay(10000).theme('success-toast')
);
					$scope.useri= null;
			}).catch(function(error){
				console.log(error);
			})
		}
		$scope.check = function() {
			$http.post('/checkemailtechartha', $scope.useri).success(function(response) {
				if(response) {

				} else {
					$scope.useri.email = null;
					  $mdToast.show($mdToast.simple().textContent('Already Registered with this email').hideDelay(5000));
				}
			}).catch(function(error) {
				console.log(error);
			})
		}
	}])

	.controller('eventblack', function() {
		members();
	})


	.controller('contactUs', ['$http', '$scope', '$mdToast', function($http, $scope, $mdToast) {



		$scope.sendMail = function() {
			console.log($scope.userioz);
			$http.post('/contactUs', $scope.userioz).success(function(response) {
				  $mdToast.show($mdToast.simple().textContent('Sent'));
					$scope.userioz= null;
			}).catch(function(error){
				console.log(error);
			})
		}
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
		fellow.display = function(){
			fellow.showIt = true;
		}
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
					console.log(error);
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
      console.log(data[0]);
    }).error(function(data){
      console.log(data);
    })
  }])


  .controller('ArticleDisplayController',['$http','$scope','$routeParams', function($http, $scope, $routeParams){
        console.log($routeParams.id);
        $scope.article={};
        $http.post("api/articleget",$routeParams).success(function(data){
          $scope.article=data;
					console.log(data);
					$scope.articleTime=(new Date($scope.article[0].created)).toDateString();

        }).error(function(data){
          console.log(data);
        })
  }])
// 	.directive('myDirective', function () {
//   return {
//     require: 'ngModel',
//     link: function(scope, elem, attrs, ngModel) {
//       scope.$watch(function (){
//           return ngModel.$modelValue;
//       }, function (v,o) {
//           if(v!=o)
//           {
//           	elem.addClass("black");
//           	setTimeout(function(){ elem.removeClass("black") }, 500);
//           }
//       })
//     }
//   };
// })
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
                    console.log(response.data);

                });
            }, function (response) {
                if (response.status > 0)
                    console.log(response.status + ': ' + response.data);
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
                console.log(response.data);
            });
        }, function (response) {
            console.log(response.status
                + ': ' + response.data);
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    }



  $scope.submit= function(){



		$scope.article.created = Date.now();
		console.log($scope.article);
  	$http.post("/api/articles",$scope.article).then(function(data){
  		console.log("awesome");
      $scope.article={};

  	}, function(){
  		console.log("error shit");
  	});
  }

	}]);
