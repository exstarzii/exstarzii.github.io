'use strict'

let leftPoint;
let rightPoint;
let E;
let formula;
let table;

let leftTemp;
let rightTemp;
let ETemp;

function Perfom(){

  leftPoint =parseFloat(document.getElementById("leftPointText").value);
  rightPoint = parseFloat(document.getElementById("rightPointText").value);
  E = parseFloat(document.getElementById("EText").value);
  formula = document.getElementById("formulaText").value;
  table = document.getElementById("table");

  leftTemp = leftPoint;
  rightTemp = rightPoint;
  let x; //- C
  let f;

  for(let i=0;true;i++){
    ETemp =Math.abs(leftTemp-rightTemp)/2 ;
    WriteValue(i);
    
    if(ETemp <= E){
      break;
    }
    if(i==40){
      alert("программа высчитала уже 40 шагов, возможно введенные значения приведут к бесконечному циклу, поэтому программа остановлена.");
      break;
    }
    x=(leftTemp+rightTemp)/2;
    //alert(x);
    f = eval(formula);
    //alert(f);
    if(f > 0){
      leftTemp = x;
    }else{
      rightTemp = x;
    }
  }
}
function sin(x){
  return Math.sin(x);
}
function cos(x){
  return Math.cos(x);
}
function ln(x){
  return Math.log(x);
}
function WriteValue(i){
  table = document.getElementById("table");
  let tr = document.createElement("tr");
  table.appendChild(tr);

  let td = document.createElement("td");
  let text = document.createTextNode(i);
  tr.appendChild(td);
  td.appendChild(text);

  td = document.createElement("td");
  text = document.createTextNode(leftTemp);
  
  tr.appendChild(td);
  td.appendChild(text);

  td = document.createElement("td");
  text = document.createTextNode(rightTemp);
  tr.appendChild(td);
  td.appendChild(text);

  td = document.createElement("td");
  text = document.createTextNode(ETemp);
  tr.appendChild(td);
  td.appendChild(text);
}
