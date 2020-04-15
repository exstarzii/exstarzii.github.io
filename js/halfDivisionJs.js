'use strict'

let leftPoint;
let rightPoint;
let E;
let formula;
let table;
let ETemp;

function Perfom(){
  table = document.getElementById("table");
  table.innerHTML ="";
  document.getElementById("answer").innerHTML = "";
  WriteDefualtValue();

  leftPoint =nerdamer(document.getElementById("leftPointText").value);
  rightPoint = nerdamer(document.getElementById("rightPointText").value);
  E = nerdamer(document.getElementById("EText").value);
  formula = nerdamer(document.getElementById("formulaText").value);
  
  let x; //- C
  let f_x;

  for(let i=0;true;i++){
    ETemp =nerdamer('abs(a - b)',{a:leftPoint, b:rightPoint}).evaluate();
    WriteValue(i);
    
    if(ETemp.lt(E)){ //если точность меньше заданной(по значению)
      break;
    }
    if(i==40){
      alert("программа высчитала уже 40 шагов, возможно введенные значения приведут к бесконечному циклу, поэтому программа остановлена.");
      break;
    }
    x =nerdamer('(a + b)/2',{a:leftPoint, b:rightPoint}).evaluate();
    //alert(x);
    f_x = nerdamer(formula,{x:x}).evaluate();
    //alert(f);
    if(f_x.eq(0)){
      document.getElementById("answer").innerHTML = "ответ: "+x.text();
      break;
    }
    if(f_x.lt(0)){
      leftPoint = x;
    }else{
      rightPoint = x;
    }
  }
}
function WriteValue(i){
  table = document.getElementById("table");
  let tr = document.createElement("tr");
  table.appendChild(tr);

  let td = document.createElement("td");
  let text = document.createTextNode(i+1);
  tr.appendChild(td);
  td.appendChild(text);

  td = document.createElement("td");
  text = document.createTextNode(leftPoint.text());
  
  tr.appendChild(td);
  td.appendChild(text);

  td = document.createElement("td");
  text = document.createTextNode(rightPoint.text());
  tr.appendChild(td);
  td.appendChild(text);

  td = document.createElement("td");
  text = document.createTextNode(ETemp.text());
  tr.appendChild(td);
  td.appendChild(text);
}

function WriteDefualtValue(){
  table = document.getElementById("table");
  let tr = document.createElement("tr");
  table.appendChild(tr);

  let td = document.createElement("th");
  let text = document.createTextNode("n");
  tr.appendChild(td);
  td.appendChild(text);

  td = document.createElement("th");
  text = document.createTextNode("a");
  
  tr.appendChild(td);
  td.appendChild(text);

  td = document.createElement("th");
  text = document.createTextNode("b");
  tr.appendChild(td);
  td.appendChild(text);

  td = document.createElement("th");
  text = document.createTextNode("e");
  tr.appendChild(td);
  td.appendChild(text);
}
