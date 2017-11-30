angular.module('store',[])
.controller('MainCtrl',[
  '$scope','$http',
  function($scope,$http) {
    $scope.products = [];
    $scope.catalog = [];
    $scope.getAll = function() {
			return $http.get('/products').success(function(data){
				angular.copy(data, $scope.products);
			});
    };
    $scope.getAll();
    $scope.create = function(product) {
			return $http.post('/products', product).success(function(data){
				$scope.products.push(data);
			});
    };
    $scope.doOrder = function() {
      console.log("In Do Order");
      angular.forEach($scope.products, function(value,key) {
        if(value.selected) {
          $scope.order(value);
          $scope.catalog.push(value);
        }
      });
    }

    $scope.order = function(product) {
      console.log("In order");
      return $http.put('/products/' + product._id + '/purchase')
        .success(function(data){
          console.log("order worked");
          product.orders += 1;
        });
    };

    $scope.addProduct = function() {
      var newObj = {name:$scope.productName,price:$scope.productPrice,orders:0,image:$scope.productUrl};
      $scope.create(newObj);
      $scope.productName = '';
      $scope.productPrice = '';
      $scope.productUrl = '';
    }

    $scope.incrementOrders = function(product) {
      $scope.order(product);
    };

    $scope.delete = function(product) {
      console.log("Deleting Name "+product.name+" ID "+product._id);
      $http.delete('/products/'+product._id)
        .success(function(data){
          console.log("delete worked");
      });
      $scope.getAll();
    };
  }
]);
