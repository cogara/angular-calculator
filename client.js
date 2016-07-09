angular.module('angularCalculator', []);
angular.module('angularCalculator').controller('MainController', function($scope){
  console.log('Hello World!');
  $scope.screenDisplay = '0';
  $scope.storedCalc = [];
  var calcToggle = 0;
  $scope.calcArray = [];
  var decActive = false;
  var storedValue;

  $scope.buttonPress = function(key, type) {
    switch (type) {
      case 'num':
        number(key);
        break;
      case 'op':
        operator(key);
        break;
      case 'dec':
        addDec();
        break;
    }
  }

  $scope.calculate = function() {
    calcToggle = 0;
    if ($scope.calcArray.length > 1) {
    storedValue = $scope.screenDisplay;
    $scope.calcArray.push(parseFloat(storedValue));

      switch($scope.calcArray[1]) {
        case '/':
          $scope.screenDisplay = $scope.calcArray[0]/$scope.calcArray[2];
          break;
        case 'x':
          $scope.screenDisplay = $scope.calcArray[0]*$scope.calcArray[2];
          break;
        case '-':
          $scope.screenDisplay = $scope.calcArray[0]-$scope.calcArray[2];
          break;
        case '+':
          $scope.screenDisplay = parseFloat($scope.calcArray[0])+parseFloat($scope.calcArray[2]);
          break;
      }
      var result = $scope.screenDisplay;
      $scope.storedCalc.push({params: $scope.calcArray, result: result});
      $scope.calcArray = [];
      decActive = false;
    }
  }

  $scope.clear = function() {
    $scope.screenDisplay = '0';
    calcToggle = 0;
    $scope.calcArray = [];
    storedValue = 0;
  }

  function number(key) {
    if (calcToggle === 0) {
      $scope.screenDisplay = key;
      calcToggle = 1;
    }
    else {
      $scope.screenDisplay += key;
    }
  }

  function operator(key) {
    $scope.calculate();
    operatorToArray(key);
  }

  function operatorToArray(key) {
    storedValue = $scope.screenDisplay;
    $scope.calcArray.push(storedValue);
    $scope.calcArray.push(key);
    decActive = false;
    console.log('op to array', $scope.calcArray);
  }

  function addDec() {
    if (!decActive) {
      $scope.screenDisplay += '.';
      decActive = true;
    }

  }

  $scope.logTest = function() {
    console.log('array', $scope.calcArray);
    console.log('toggle', calcToggle);
  }
})
