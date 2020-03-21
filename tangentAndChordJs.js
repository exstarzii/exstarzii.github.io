'use strict'

let leftPoint;
let rightPoint;
let E;
let f;  // f(x)
let f1; // f'(x)
let f2; // f"(x)
let table;
let needSignColumn =false;
let sign="+";
let ETemp;

function Perfom(){
  
  table = document.getElementById("table");
  table.innerHTML ="";
  document.getElementById("answer").innerHTML = "";
  WriteDefualtValue();

  leftPoint =nerdamer(document.getElementById("leftPointText").value);
  rightPoint = nerdamer(document.getElementById("rightPointText").value);
  E = nerdamer(document.getElementById("EText").value);
  console.log("leftPoint "+ leftPoint.text());
  console.log("rightPoint "+ rightPoint.text());
  console.log("E "+ E.text());

  f = nerdamer(document.getElementById("formulaText").value);
  f1=nerdamer('diff('+f+', x,1)');
  f2=nerdamer('diff('+f1+', x,1)');

  let x; //- срединная точка
  let check; //f'(x)*f"(x)

  for(let i=0;true;i++){

    
    if(i==20){
        alert("программа высчитала уже 40 шагов, возможно введенные значения приведут к бесконечному циклу, поэтому программа остановлена.");
        break;
    }

    ETemp = nerdamer('abs(a - b)',{a:leftPoint, b:rightPoint}).evaluate();
    console.log("ETemp "+ETemp.text());
    WriteValue(i);
    
    if(ETemp.lt(E)){ //если точность меньше заданной(по значению)
      break;
    }

    x =(leftPoint+rightPoint)/2;

    let f1_x = nerdamer(f1,{x:x}).evaluate();   //f'(x)
    let f2_x = nerdamer(f2,{x:x}).evaluate();   //f"(x)
    console.log("f1_x "+f1_x.text());
    console.log("f2_x "+f2_x.text());

    check = nerdamer('x * y',{x:f1_x,y:f2_x}).evaluate();

    let f_a = nerdamer(f,{x:leftPoint}).evaluate();
    let f_b = nerdamer(f,{x:rightPoint}).evaluate();
    //если f'(x)*f"(x) > 0 
    if(check.gt(0)){ 
      console.log("больше нуля");
      sign = '+';
      let f_a = nerdamer(f,{x:leftPoint}).evaluate();
      let f_b = nerdamer(f,{x:rightPoint}).evaluate();
      let f1_b = nerdamer(f1,{x:rightPoint}).evaluate();
      leftPoint = nerdamer('a - (f_a * (b-a))/(f_b-f_a)',{a:leftPoint, b:rightPoint, f_b:f_b, f_a:f_a}).evaluate();
      rightPoint = nerdamer('b - f_b/f1_b',{b:rightPoint, f_b:f_b, f1_b:f1_b}).evaluate();
    }else{
      console.log("меньше нуля");
      sign = '-';
      let f_a = nerdamer(f,{x:leftPoint}).evaluate();
      let f_b = nerdamer(f,{x:rightPoint}).evaluate();
      let f1_a = nerdamer(f1,{x:leftPoint}).evaluate();
      leftPoint = nerdamer('a - f_a/f1_a',{a:leftPoint, f_a:f_a, f1_a:f1_a}).evaluate();
      rightPoint = nerdamer('b - (f_b*(b-a))/(f_b-f_a)',{b:rightPoint, a:leftPoint, f_b:f_b, f_a:f_a}).evaluate();
    }
    console.log("leftPoint "+ leftPoint.text());
    console.log("rightPoint "+ rightPoint.text());
    console.log(check.text());
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
  text = document.createTextNode("a");
  
  tr.appendChild(td);
  td.appendChild(text);

  td = document.createElement("th");
  text = document.createTextNode("b");
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
