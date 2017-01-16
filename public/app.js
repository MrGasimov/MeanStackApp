var app = angular.module('app',['ngRoute']);

app.controller('HomeController', function ($http) {
    var vm = this;
    vm.users=[];
    vm.title = "A Mean Stack App Demo";
    vm.detailedUser;
    vm.showDetails = function(user){
      vm.detailedUser = user;
      vm.detailed = true;
    }

    vm.getUsers = function () {
      $http.get('/users').then(function (res) {
        vm.users = res.data;
      });
    }
    vm.getUsers();

    vm.updateUser = function(user) {
        if(user){
          $http.put('/users', user).then(function(res){
            vm.getUsers();
          });
        }
    }


    vm.removeUser = function(user){
      if(user){
        $http.delete('/users/'+user._id).then(function(res){
            vm.getUsers();
        });
      }
    }
    vm.addUser = function(user){
      if(user && user.name && user.age){
        $http.post('/users', user).then(function(res){
          vm.getUsers();
          vm.user={};
          vm.adduser = false;
        });
      } else{

      }

    }


    return true;
});

app.config(function($routeProvider){
  $routeProvider.when('/',{
    controller:'HomeController',
    controllerAs:'vm',
    templateUrl:'./home.html'
  });
  $routeProvider.otherwise('/');
});
