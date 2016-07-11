angular.module('angularCalculator', []);
angular.module('angularCalculator').controller('MainController', function($scope){
  $scope.buttonArray = [];
  $scope.screenDisplay = '0';
  $scope.storedCalc = [];
  var calcToggle = 0;
  $scope.calcArray = [];
  var decActive = false;
  var storedValue;

  $scope.buttonPress = function(index) {
    var tempType = $scope.buttonArray[index].type;
    var tempButton = $scope.buttonArray[index].button;
    switch (tempType) {
      case 'num':
        number(tempButton);
        break;
      case 'op':
        operator(tempButton);
        break;
      case 'dec':
        addDec();
        break;
      case 'equ':
        $scope.calculate();
        break;
    }
  }

  $scope.calculate = function() {
    calcToggle = 0;
    if ($scope.calcArray.length > 0) {
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
      if (key === '.') {
        $scope.screenDisplay = '0'+key;
        calcToggle = 1;
      }
      else {
        $scope.screenDisplay = key;
        calcToggle = 1;
      }
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

      number('.');
      // $scope.screenDisplay += '.';
      decActive = true;
    }

  }
  function Button(button, type) {
    this.button = button;
    this.type = type;
  }

  $scope.logTest = function() {
    console.log('array', $scope.calcArray);
    console.log('toggle', calcToggle);
  }

  //row 1
  $scope.buttonArray.push(new Button('7','num'));
  $scope.buttonArray.push(new Button('8','num'));
  $scope.buttonArray.push(new Button('9','num'));
  $scope.buttonArray.push(new Button('/','op'));
  //row 2
  $scope.buttonArray.push(new Button('4','num'));
  $scope.buttonArray.push(new Button('5','num'));
  $scope.buttonArray.push(new Button('6','num'));
  $scope.buttonArray.push(new Button('x','op'));
  //row 3
  $scope.buttonArray.push(new Button('1','num'));
  $scope.buttonArray.push(new Button('2','num'));
  $scope.buttonArray.push(new Button('3','num'));
  $scope.buttonArray.push(new Button('-','op'));
  //row 4
  $scope.buttonArray.push(new Button('0','num'));
  $scope.buttonArray.push(new Button('.','dec'));
  $scope.buttonArray.push(new Button('+','op'));
  $scope.buttonArray.push(new Button('=','equ'));
})
