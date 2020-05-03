'use strict'

let table;
let xx =[];
let b =[];
let outB = [];

let outValues =[];

function Perfom(){
  
  table = document.getElementById("table");
  table.innerHTML ="";
  let answer = document.getElementById("answer").innerHTML = "";

  WriteDefualtValue();

  // заполнение изначальными данными
  for(let i=1;i<=4;i++){
    xx[i] = [];
    for(let j=1;j<=5;j++){
      let input = document.getElementById("x"+i.toString()+j.toString());
      xx[i][j] = nerdamer(input.value);
    }
  }

  //рассчет a16 - a46
  for(let i=1;i<=4;i++){
    xx[i][6] = nerdamer("an1 + an2 + an3 + an4 +an5",{an1:xx[i][1], an2:xx[i][2], an3:xx[i][3], an4:xx[i][4], an5:xx[i][5]}).evaluate();
  }
  
  //вывод а11-а46
  for(let i=1;i<=6;i++){
      outValues[i] = "";
  }
  for(let i=1;i<=4;i++){
    for(let j=1;j<=6;j++){
      outValues[j] += "<p>a<sub>"+i.toString()+j.toString()+"</sub> = "+xx[i][j].text()+"</p>";
    }
  }
  WriteValue(outValues[1],outValues[2],outValues[3],outValues[4],outValues[5],outValues[6]);

  //cirlce--------
  for(let m=1;m<=4;m++){

    //рассчет b
    b[m] =[];
    for(let i=2;i<=6;i++){
      b[m][i]= nerdamer("an/a11",{an:xx[m][i], a11:xx[m][m]}).evaluate();
    }

    //вывод b
    for(let i=1;i<=6;i++){
      outB[i]="";
    }
    for(let j=m+1;j<=6;j++){
      outB[j] = "<p>b<sub>"+m.toString()+j.toString()+"</sub> = "+b[m][j].text()+"</p>";
    }
    WriteValue(outB[1],outB[2],outB[3],outB[4],outB[5],outB[6]);

    //рассчет a
    for(let i=m+1;i<=4;i++){
      for(let j=m+1;j<=6;j++){
        xx[i][j]= nerdamer("aij - ai1*b1j",{aij:xx[i][j], ai1:xx[i][m], b1j:b[m][j]}).evaluate();
      }
    }

    //вывод a
    for(let i=1;i<=6;i++){
      outValues[i] = "";
    }
    for(let i=m+1;i<=4;i++){
      for(let j=m+1;j<=6;j++){
        outValues[j] += "<p>a<sub>"+i.toString()+j.toString()+"</sub> = "+xx[i][j].text()+"</p>";
      }
    }
    if(m>3)break;
    WriteValue(outValues[1],outValues[2],outValues[3],outValues[4],outValues[5],outValues[6]);
  }
  let x4 = b[4][5];
  let x3 = nerdamer("aij - ai1*b1j",{aij:b[3][5], ai1:b[3][4], b1j:x4}).evaluate();
  let x2 = nerdamer("aij - ai1*b1j -b23*x3",{aij:b[2][5], ai1:b[2][4], b1j:x4, b23:b[2][3], x3:x3}).evaluate();
  let x1 = nerdamer("aij - ai1*b1j -b23*x3 -b12*x2",{aij:b[1][5], ai1:b[1][4], b1j:x4, b23:b[1][3], x3:x3, b12:b[1][2], x2:x2}).evaluate();

  WriteValue("X<sub>1</sub>="+x1.text(), "X<sub>2</sub>="+x2.text(), "X<sub>3</sub>="+x3.text(), "X<sub>4</sub>="+x4.text(),"","");
}

function WriteValue(x1text, x2text, x3text, x4text, freeText, sigmaText){
  table = document.getElementById("table");
  let tr = document.createElement("tr");
  table.appendChild(tr);

  let td = document.createElement("td");
  tr.appendChild(td);
  td.innerHTML = x1text;

  td = document.createElement("td");
  tr.appendChild(td);
  td.innerHTML = x2text;

  td = document.createElement("td");
  tr.appendChild(td);
  td.innerHTML =x3text;

  td = document.createElement("td");
  tr.appendChild(td);
  td.innerHTML = x4text;

  td = document.createElement("td");
  tr.appendChild(td);
  td.innerHTML = freeText;

  td = document.createElement("td");
  tr.appendChild(td);
  td.innerHTML =sigmaText;
}

function WriteDefualtValue(){
  table = document.getElementById("table");
  let tr = document.createElement("tr");
  table.appendChild(tr);

  let td = document.createElement("th");
  tr.appendChild(td);
  td.innerHTML = "X<sub>1</sub>";;

  td = document.createElement("th");
  tr.appendChild(td);
  td.innerHTML = "X<sub>2</sub>";

  td = document.createElement("th");
  tr.appendChild(td);
  td.innerHTML = "X<sub>3</sub>";

  td = document.createElement("th");
  tr.appendChild(td);
  td.innerHTML = "X<sub>4</sub>";

  td = document.createElement("th");
  tr.appendChild(td);
  td.innerHTML = "Свободные члены";

  td = document.createElement("th");
  tr.appendChild(td);
  td.innerHTML = "Σ";
}
