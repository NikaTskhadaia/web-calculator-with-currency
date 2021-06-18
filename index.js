let firstNumber = 0;
let secondNumber = 0;
let operationType = "";
let completedOperation = false;

$('.number').on('click', function(e){
    let screenText = document.getElementById('lbl');    
    if(e.target.value == "." && screenText.innerText.indexOf(".") != -1) return;
    if(screenText.innerText.length > 15) return;
    if(screenText.innerText === "0" && e.target.value != ".") 
    {
        screenText.innerText = "";
    }
    screenText.innerText += e.target.value;
});

$('#clear').on('click', function(){
    document.getElementById('smallScreen').innerText = "";
    document.getElementById('lbl').innerText = "0";
});

$('#backspace').on('click', function(){    
    let screenText = document.getElementById('lbl');
    if(screenText.innerText === "0") return;
    if(screenText.innerText.length == 1) {
        screenText.innerText = "0";
        return;
    }    
    screenText.innerText = screenText.innerText.slice(0, -1);
});

function addNumbers(){
    let screenText = document.getElementById('lbl');
    document.getElementById('smallScreen').innerText = screenText.innerText + "+";
    firstNumber = parseFloat(screenText.innerText);
    screenText.innerText = "0";
    operationType = "+";
}

function subtractNumbers(){
    let screenText = document.getElementById('lbl');
    document.getElementById('smallScreen').innerText = screenText.innerText + "-";
    firstNumber = parseFloat(screenText.innerText);
    screenText.innerText = "0";
    operationType = "-";
}

function multiplyNumbers(){    
    let screenText = document.getElementById('lbl');
    document.getElementById('smallScreen').innerText = screenText.innerText + "×";
    firstNumber = parseFloat(screenText.innerText);
    screenText.innerText = "0";
    operationType = "*";
}

function divideNumbers(){    
    let screenText = document.getElementById('lbl');
    document.getElementById('smallScreen').innerText = screenText.innerText + "÷";
    firstNumber = parseFloat(screenText.innerText);
    screenText.innerText = "0";
    operationType = "/";
}

function equals(){
    let screenText = document.getElementById('lbl');
    secondNumber = parseFloat(screenText.innerText);
    let secondlbl = document.getElementById('smallScreen');
    secondlbl.innerText += screenText.innerText;

    switch(operationType) {
        case "+":
            screenText.innerText =  firstNumber + secondNumber;
            break;
        case "-":
            screenText.innerText =  firstNumber - secondNumber;
            break;
        case "*":
            screenText.innerText =  firstNumber * secondNumber;
            break;
        case "/":
            screenText.innerText =  firstNumber / secondNumber;
            break;
      }
      if(screenText.innerText.length > 15){
          let decimalIndex = screenText.innerText.indexOf(".");
          screenText.innerText = parseFloat(screenText.innerText).toFixed(screenText.innerText.length - decimalIndex - 15);
      }

      completedOperation = true;
      secondNumber = firstNumber;
}