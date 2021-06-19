let firstNumber = 0;
let secondNumber = 0;
let operationType = "";
let completedOperation = false;
let array = [];

$('.number').on('click', function(e){
    let screenText = document.getElementById('lbl');    
    if(e.target.value == "." && screenText.innerText.indexOf(".") != -1) return;
    if(screenText.innerText.length > 15) return;
    if(screenText.innerText === "0" && e.target.value != ".") 
    {
        screenText.innerText = "";
    }
    if(completedOperation){
        screenText.innerText = e.target.value;
        completedOperation = false;
        return;
    }
    screenText.innerText += e.target.value;
});

$('#clear').on('click', function(){
    document.getElementById('smallScreen').innerText = "";
    document.getElementById('lbl').innerText = "0";
    completedOperation = false;
});

$('#backspace').on('click', function(){    
    let screenText = document.getElementById('lbl');
    if(screenText.innerText === "0") return;
    if(screenText.innerText.length == 1) {
        screenText.innerText = "0";
        return;
    }    
    screenText.innerText = screenText.innerText.slice(0, -1);
    completedOperation = false;
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

$("#currencies").on("click", ".curr", function(){
    document.getElementById("dates").innerHTML = "";
    let innerText = $(this).text();
    $("#dropdownMenuButton1").text(innerText);
    $("#dropdownMenuButton1").val(innerText);
    $("#dropdownMenuButton2").attr("disabled", false);

    $.ajax({
        type: "GET",
        url: "valutebi.json",
        dataType: "json",
        success: function (data) {
            console.log('data:', data);
            array = data[innerText];
            console.log('data[curr]:', data[innerText]);
            for(let i = array.length - 8; i < array.length; i++){
                let date = new Date(Object.keys(array[i])[0]);
                document.getElementById("dates").innerHTML += `<li><a id=date${i} class="dropdown-item date" href="#">${date.toDateString()}</a></li>`;
            }
            $("#dropdownMenuButton2").text("Date");
        }
    });
});

$("#dates").on("click", ".date", function(){
    let innerText = $(this).text();
    $("#dropdownMenuButton2").text(innerText);
    $("#dropdownMenuButton2").val(innerText);

    for(let i = 0; i < array.length; i++)
    {
        let date = new Date(Object.keys(array[i])[0]);
        console.log(date.toDateString(), innerText);
        if(date.toDateString() == innerText){
            $('#currency').val(Object.values(array[i])[0]);
        }
    }
});

window.onload = function(){
    $.ajax({
        type: "GET",
        url: "currencies.json",
        dataType: "json",
        success: function (data) {
            for(let i = 0; i < data.length; i++){
                document.getElementById("currencies").innerHTML += `<li><a id=${data[i]} class="dropdown-item curr" href="#">${data[i]}</a></li>`
            }
        }
    });
}