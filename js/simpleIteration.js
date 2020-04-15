'use strict'

let leftPoint;
let rightPoint;
let E;
let f;  // f(x)
let fE;
let fE1;
let table;
let needSignColumn =false;
let sign="+";
let ETemp;

function Perfom(){
  
  table = document.getElementById("table");
  table.innerHTML ="";
  document.getElementById("answer").innerHTML = "";
  

  leftPoint =nerdamer(document.getElementById("leftPointText").value);
  rightPoint = nerdamer(document.getElementById("rightPointText").value);
  E = nerdamer(document.getElementById("EText").value);
  console.log("leftPoint "+ leftPoint.text());
  console.log("rightPoint "+ rightPoint.text());
  console.log("E "+ E.text());

  f = nerdamer(document.getElementById("formulaText").value);
  fE = nerdamer(document.getElementById("formulaTextE").value);
  fE1=nerdamer('diff('+fE+', x,1)');

  WriteDefualtValue();

  let f_leftPoint = nerdamer(f,{x:leftPoint}).evaluate();
  let f_rightPoint = nerdamer(f,{x:rightPoint}).evaluate();

  if( (f_leftPoint.gt(0) && f_rightPoint.gt(0)) || (f_leftPoint.lt(0) && f_rightPoint.lt(0)) ){
    alert("внутри данного интервала нет корней");
    return;
  }

  let x; //- срединная точка
  let f_x; // f(x)

  x =nerdamer("(x+y)/2",{x:leftPoint,y:rightPoint}).evaluate();
  f_x = nerdamer(f,{x:x}).evaluate();
  if(f_leftPoint.gt(f_rightPoint)){// +   -
    console.log(" +    - ");
    if(f_x.gt(0)){
      leftPoint = x;
    }else{
      rightPoint = x;
    }
  }else{ // -    +
    console.log(" -    + ");
    if(f_x.gt(0)){
      rightPoint = x;
    }else{
      leftPoint = x;
    }
  }
  

  x =nerdamer("(x+y)/2",{x:leftPoint,y:rightPoint}).evaluate();
  f_x = nerdamer(f,{x:x}).evaluate();
  if(f_leftPoint.gt(f_rightPoint)){// +   -
    console.log(" +    - ");
    if(f_x.gt(0)){
      leftPoint = x;
    }else{
      rightPoint = x;
    }
  }else{ // -    +
    console.log(" -    + ");
    if(f_x.gt(0)){
      rightPoint = x;
    }else{
      leftPoint = x;
    }
  }

  console.log("leftpoint  "+leftPoint.text()+"; rightPoint  "+rightPoint.text());

  let fE1_rightPoint = nerdamer("abs("+fE1+")",{x:rightPoint}).evaluate();
  console.log("fE1_rightPoint  "+fE1_rightPoint.text());
  if(fE1_rightPoint.gte(1)){
    alert("итерационный процесс не сходится, выразите x по другому");
    return;
  }

  E = nerdamer('e(1-q)/q',{e:E, q:fE1_rightPoint}).evaluate();
  console.log("e  "+E.text());

  for(let i=0;true;i++){
    
    if(i==20){
        alert("программа высчитала уже 20 шагов, возможно введенные значения приведут к бесконечному циклу, поэтому программа остановлена.");
        break;
    }

    leftPoint = rightPoint;
    rightPoint = nerdamer(fE,{x:leftPoint}).evaluate();

    ETemp = nerdamer('abs(a - b)',{a:leftPoint, b:rightPoint}).evaluate();
    WriteValue(i);
    if(ETemp.lt(E)){ //если точность меньше заданной(по значению)
      break;
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

  if(needSignColumn){
    td = document.createElement("td");
    text = document.createTextNode(sign);
    tr.appendChild(td);
    td.appendChild(text);
  }

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
  text = document.createTextNode("x n");
  
  tr.appendChild(td);
  td.appendChild(text);

  td = document.createElement("th");
  text = document.createTextNode(fE.text());
  tr.appendChild(td);
  td.appendChild(text);

  if(needSignColumn){
    td = document.createElement("th");
    text = document.createTextNode("знак");
    tr.appendChild(td);
    td.appendChild(text);
  }

  td = document.createElement("th");
  text = document.createTextNode("e");
  tr.appendChild(td);
  td.appendChild(text);
}
