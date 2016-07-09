angular.module('angularCalculator', []);
angular.module('angularCalculator').controller('MainController', function($scope){
  console.log('Hello World!');
  $scope.screenDisplay = '0';
  $scope.storedCalc = [];
  var calcToggle = 0;
  var calcArray = [];
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
    console.log('in calculate', calcArray);
    if (calcArray.length > 1) {
    storedValue = $scope.screenDisplay;
    calcArray.push(parseFloat(storedValue));

      switch(calcArray[1]) {
        case '/':
          $scope.screenDisplay = calcArray[0]/calcArray[2];
          break;
        case 'x':
          $scope.screenDisplay = calcArray[0]*calcArray[2];
          break;
        case '-':
          $scope.screenDisplay = calcArray[0]-calcArray[2];
          break;
        case '+':
          $scope.screenDisplay = parseFloat(calcArray[0])+parseFloat(calcArray[2]);
          break;
      }
      var result = $scope.screenDisplay;
      $scope.storedCalc.push({params: calcArray, result: result});
      calcArray = [];
      decActive = false;
    }
  }

  $scope.clear = function() {
    $scope.screenDisplay = '0';
    calcToggle = 0;
    calcArray = [];
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
    if (calcArray.length < 2) {
      $scope.screenDisplay = 0;
    }
  }

  function operatorToArray(key) {
    storedValue = $scope.screenDisplay;
    calcArray.push(storedValue);
    calcArray.push(key);
    decActive = false;
    console.log('op to array', calcArray);
  }

  function addDec() {
    if (!decActive) {
      $scope.screenDisplay += '.';
      decActive = true;
    }

  }

  $scope.logTest = function() {
    console.log('array', calcArray);
    console.log('toggle', calcToggle);
  }
})
