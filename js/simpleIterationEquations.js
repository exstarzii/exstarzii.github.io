'use strict'

let table;
let koef =[];
let x=[];
let err =[];
let steps;

function Perfom(){
  
  table = document.getElementById("table");
  table.innerHTML ="";
  let answer = document.getElementById("answer").innerHTML = "";
  steps = document.getElementById("stepsBox").value;

  WriteDefualtValue();

  // заполнение изначальными данными
  for(let i=1;i<=3;i++){
    koef[i] = [];
    for(let j=1;j<=4;j++){
      let input = document.getElementById("x"+i.toString()+j.toString());
      koef[i][j] = nerdamer(input.value);
    }
  }
 //console.log(koef);

  let operant1;
  let operant2;

  operant1 = koef[1][1];
  operant2 = nerdamer("abs(x2)+abs(x3)",{x2:koef[1][2], x3:koef[1][3]}).evaluate();
  if(operant2.gt(operant1)){
    alert("несходимость итерационного процесса");
    return;
  }

  operant1 = koef[2][2];
  operant2 = nerdamer("abs(x2)+abs(x3)",{x2:koef[2][1], x3:koef[2][3]}).evaluate();
  if(operant2.gt(operant1)){
    alert("несходимость итерационного процесса");
    return;
  }

  operant1 = koef[3][3];
  operant2 = nerdamer("abs(x2)+abs(x3)",{x2:koef[3][1], x3:koef[3][2]}).evaluate();
  if(operant2.gt(operant1)){
    alert("несходимость итерационного процесса");
    return;
  }

  //cirlce--------

  x[0] = [0,0,0,0];
  err[0] = [0,0,0,0];
  for(let i=1;i<=steps;i++){
    x[i] =[];
    err[i] =[];
    x[i][1] = nerdamer("(koef4-(koef2*x2+koef3*x3))/koefn",{x2:x[i-1][2], x3:x[i-1][3], koef4:koef[1][4],koef2:koef[1][2], koef3:koef[1][3], koefn:koef[1][1]}).evaluate();
    x[i][2] = nerdamer("(koef4-(koef2*x2+koef3*x3))/koefn",{x2:x[i-1][1], x3:x[i-1][3], koef4:koef[2][4],koef2:koef[2][1], koef3:koef[2][3], koefn:koef[2][2]}).evaluate();
    x[i][3] = nerdamer("(koef4-(koef2*x2+koef3*x3))/koefn",{x2:x[i-1][2], x3:x[i-1][1], koef4:koef[3][4],koef2:koef[3][2], koef3:koef[3][1], koefn:koef[3][3]}).evaluate();
  
    err[i][1] = nerdamer("abs(koef1*x1+koef2*x2+koef3*x3-koef4)",{koef1:koef[1][1],koef2:koef[1][2],koef3:koef[1][3],koef4:koef[1][4],x1:x[i][1],x2:x[i][2],x3:x[i][3]}).evaluate();
    err[i][2] = nerdamer("abs(koef1*x1+koef2*x2+koef3*x3-koef4)",{koef1:koef[2][1],koef2:koef[2][2],koef3:koef[2][3],koef4:koef[2][4],x1:x[i][1],x2:x[i][2],x3:x[i][3]}).evaluate();
    err[i][3] = nerdamer("abs(koef1*x1+koef2*x2+koef3*x3-koef4)",{koef1:koef[3][1],koef2:koef[3][2],koef3:koef[3][3],koef4:koef[3][4],x1:x[i][1],x2:x[i][2],x3:x[i][3]}).evaluate();

    WriteValue(x[i], err[i], i);
  }
}

function WriteValue(xn, err, i){
  table = document.getElementById("table");
  let xnBody="x<sub>"+i+"</sub> = <div class='cellBody'>";
  let errBody="o<sub>"+i+"</sub> = <div class='cellBody'>"
  for(let i=1;i<=3;i++){
    xnBody += xn[i].text()+"<br>";
    errBody+= err[i].text()+"<br>";
  }
  xnBody += "</div>";
  errBody += "</div>";
  let tr = document.createElement("tr");
  table.appendChild(tr);

  let td = document.createElement("td");
  tr.appendChild(td);
  td.innerHTML = xnBody;

  td = document.createElement("td");
  tr.appendChild(td);
  td.innerHTML = errBody;
}

function WriteDefualtValue(){
  table = document.getElementById("table");
  let tr = document.createElement("tr");
  table.appendChild(tr);

  let td = document.createElement("th");
  tr.appendChild(td);
  td.innerHTML = "X";;

  td = document.createElement("th");
  tr.appendChild(td);
  td.innerHTML = "O";
}
