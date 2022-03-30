var request;
var objJSON;
var id_mongo;

function getRequestObject()      {
   if ( window.ActiveXObject)  {
      return ( new ActiveXObject("Microsoft.XMLHTTP")) ;
   } else if (window.XMLHttpRequest)  {
      return (new XMLHttpRequest())  ;
   } else {
      return (null) ;
   }
}

//Interfejs logowania
function _login() {
   var form1 = "<form name='log'><table id='loginTable'>" ;
   form1    += "<tr><td>Identyfikator: </td><td><input type='text' name='ident'></input></td></tr>";
   form1    +="<tr><td>Haslo: </td><td><input type='password' name='pass'></input></td></tr>";
   form1    +="<tr><td colspan='2'><input type='button' value='Zaloguj sie' onclick='login(this.form)' ></input></td></tr>";
   form1    += "</table></form>";
   document.getElementById('data').innerHTML = form1;
   document.getElementById('result').innerHTML = '';
}
function handleCheckMongo(){
    let table=document.getElementById('checkList');
    
    for(i=0;i<table.rows.length-1;i++){
        let val=table.rows[i+1].cells[0].innerHTML;
        let obecnosc=document.getElementsByName("obecnosc"+i);
        let obecnoscVal;
        if(obecnosc[0].checked){
            obecnoscVal=obecnosc[0].value;
        }
        else{
            obecnoscVal=obecnosc[1].value;
        }
        let presence={
          numer: val,
          obecny: obecnoscVal
        };
        
        txt = JSON.stringify(presence);
        request = getRequestObject() ;
        request.onreadystatechange = function() {
           if (request.readyState == 4 && request.status == 200 )    {
           }
        }
        request.open("POST", "http://pascal.fis.agh.edu.pl/~9urbanowicz/Help/Obecnosc/api.php?rquest=save", true);
        request.send(txt); 
    }
    alert("Dodano do bazy Mongo") 
}


function CheckMongo(){
    _quickCheck();
    alert("Dodawanie do bazy Mongo");
    document.getElementById('sender').setAttribute("onclick","handleCheckMongo()");
    addReturn();
    
}

//Walidacja danych logowania
function login(form){
     document.getElementById('result').innerHTML="";
    let flag=0;
    let ident = form.ident.value;
    let pass = form.pass.value;
    request = getRequestObject() ;
    request.onreadystatechange = function() {
       if (request.readyState == 4) {
          objJSON = JSON.parse(request.response);
          for ( var id in objJSON ) {
              if(objJSON[id]['identyfikator']==ident && objJSON[id]['haslo']==pass){
                  document.getElementById('checker').setAttribute("onclick","CheckMongo()");
                  document.getElementById('loger').setAttribute("onclick","logout()");
                  document.getElementById('loger').setAttribute("value","Wyloguj sie");
    
                  loginInterface();
                  flag=1;
                  break;
              }    
          }
          if(flag==0){
              document.getElementById('result').innerHTML+="<br><br>Niepoprawny login lub haslo";
          }
          
       }
    }
    request.open("GET", "http://pascal.fis.agh.edu.pl/~9urbanowicz/Help/Wykladowca/api.php?rquest=list", true);
    request.send(null);  
}


function loginInterface(){

    let txt="<h4>Witaj w serwisie</h4>";
    txt+="<table id='loginInterface'>";
    txt+="<tr><td colspan='2'>Dostepne sa nowe opcje:</td></tr>";
    txt+="<tr><td><input type='button' value='Pobierz zawartosc offline' onclick='download()'></td><td><input type='button' value='Statystyki obecnosci' onclick='statistics()'></td></tr>";
    txt+="</table>";
    document.getElementById('data').innerHTML = txt;
}

function logout(){
    document.getElementById('result').innerHTML="";
    document.getElementById('checker').setAttribute("onclick","_quickCheck()");
    document.getElementById('loger').setAttribute("onclick","_login()");
    document.getElementById('loger').setAttribute("value","Zaloguj sie");
    let data=document.getElementById('data');
    let txt="<h4>Wylogowano</h4>";
    txt+="Dziekujemy za skorzystanie z serwisu";
    data.innerHTML=txt;
}

function download(){
    let request = indexedDB.open("Obecnosc",1);
    let db;
    
    request.onerror = function(e){
        console.log("Nie dziala: "+e.target.error);
    };
    
    //sukces przy odczytaniu - wyciaganie do bazy danych
    request.onsuccess = function(e){
        db=request.result;
        let tx=db.transaction("Laboratorium","readonly");
        let store=tx.objectStore("Laboratorium");
        let requestCursor=store.openCursor();
        requestCursor.onsuccess=function(e){
          let cursor=e.target.result;
          let txt="";
          let status={};
          
          if(cursor){
            status.numer=cursor.value.numer;
            status.obecny=cursor.value.obecny;
            
            txt = JSON.stringify(status);
            
            request = getRequestObject() ;
            request.onreadystatechange = function() {
              if (request.readyState == 4 && request.status == 200 ){
                console.log(request.response);
              }
            };
            request.open("POST", "http://pascal.fis.agh.edu.pl/~9urbanowicz/Help/Obecnosc/api.php?rquest=save", true);
            request.send(txt);
            cursor.continue();
          }
          alert("Pobrano dane z IndexedDB")
        };
         
      //Sprawdzanie czy nie ma dodatkowego bledu
      db.onerror = function(e){
           console.log("ERROR: "+e.target.error);
      };
  };
  deleteIdexedDB();  
}

function deleteIdexedDB(){
    var req = indexedDB.deleteDatabase("Obecnosc");
    
    req.onsuccess = function () {
      console.log("Deleted database successfully");
    };
    req.onerror = function () {
      console.log("Couldn't delete database");
    };
    req.onblocked = function () {
      console.log("Couldn't delete database due to the operation being blocked");
    };
}

function laboratoriesPresence(){
    let data=document.getElementById('data');
    data.innerHTML="";
    let tab=[];
    request = getRequestObject() ;
    request.onreadystatechange = function() {
       if (request.readyState == 4) {
          objJSON = JSON.parse(request.response);
          let lab_number=(Object.keys(objJSON).length)/10;
          let val=0;
          for(var id in objJSON){
              if(objJSON[id]['obecny']=='1'){
                  val+=1;
              }
              id++;
              if(parseInt(id)%10==0){
                tab.push(val);
                val=0;
                
              }
              id--;  
          }
       }
    }
    request.open("GET", "http://pascal.fis.agh.edu.pl/~9urbanowicz/Help/Obecnosc/api.php?rquest=list", true);
    request.send(null);
    
    let txt="<canvas id='statisticalCanvas' width='750' height='350' style='border: 1px solid black'></canvas><br><br>";
    data.innerHTML=txt;
    addReturn();
    let canvas=document.getElementById('statisticalCanvas');
    let ctx=canvas.getContext('2d');
    ctx.fillStyle="black";
    ctx.beginPath();
    alert("Statystyki laboratorium");
    //y axis
    ctx.moveTo(40,350);
    ctx.lineTo(40,40);
    ctx.lineTo(50,50);
    ctx.moveTo(40,40);
    ctx.lineTo(30,50);
     for(i=0;i<10;i++){
        ctx.moveTo(30,285-i*25);
        ctx.lineTo(50,285-i*25);
        ctx.font="bold 15px sans-serif";
        ctx.fillText(i+1,10,290-i*25);
    }
    
    ctx.font="bold 20px sans-serif";
    ctx.fillText("Ilosc osob",10,30);
    //x axis
    ctx.moveTo(0,310);
    ctx.lineTo(700,310);
    ctx.lineTo(690,300);
    ctx.moveTo(700,310);
    ctx.lineTo(690,320);
    ctx.font="bold 20px sans-serif";
    ctx.fillText("Laboratoria",340,335);
    ctx.stroke();
    //Slupki zgodne z frekwencja
    ctx.fillStyle='black';
    for(i=0;i<tab.length;i++){
      let x=80+i*60;
      let y=320;
      if(x>=650){
        break;
      }
      for(j=0;j<=10;j++){
          if(tab[i]==j){
            y=310-j*25;
            ctx.fillRect(x,y,25,310-y);
            ctx.fillText(i+1,x+5,y-5);
          }
            
      }
        
    }
}

function statistics(){
    document.getElementById('data').innerHTML = '';  
    request = getRequestObject() ;
    request.onreadystatechange = function() {
       if (request.readyState == 4) {
          objJSON = JSON.parse(request.response);
          let txt="<h2>Obecnosci studentow</h2>";
          txt+="<input type='button' value='Sprawdz frekwencje na poszczegolnych laboratoriach' onclick='laboratoriesPresence()''><br><br>";
          txt+="<form action='#' name='data'>";
          txt+="<table id='statisticList'><tr><td>Numer</td><td>Imie</td><td>Nazwisko</td><td>Numer albumu</td><td>Akcja</td></tr>";
          for ( var id in objJSON ) {
              txt +="<tr>";
              id++;
              txt +="<td>"+id+"</td>";
              id--;
              for ( var prop in objJSON[id] ) {             
                 if ( prop !== '_id'){ 
                   txt += "<td> "+objJSON[id][prop]+"</td>";  
                 }
              }
              id++;
              txt +="<td><input type='button' value='Sprawdz' onclick='checkStatistics("+id+")'></td>";  
              id--;   
              txt +="</tr>";
          }
          txt += "</table></form>";
          txt += "<br><input type='button' value='Powrot' onclick='loginInterface()'>";
          document.getElementById('data').innerHTML = txt;
       }
    }
    request.open("GET", "http://pascal.fis.agh.edu.pl/~9urbanowicz/Help/Dziennik/api.php?rquest=list", true);
    request.send(null);    
}

function checkStatistics(id){
    let data = document.getElementById('data');
    
    let table = document.getElementById('statisticList');
    let txt=""; 
    for(i=0;i<table.rows.length-1;i++){
       if(table.rows[i+1].cells[0].innerHTML==id){
         let imie=table.rows[i+1].cells[1].innerHTML;
         let nazwisko=table.rows[i+1].cells[2].innerHTML;
         let nrAlbumu=table.rows[i+1].cells[3].innerHTML;
         txt="Student "+imie+" "+nazwisko+" o numarze albumu: "+nrAlbumu+":";
         break;
       }   
    }
    //Pobranie danych z bazy o obecnosci danego uzytkowika
    request = getRequestObject();
    request.onreadystatechange = function() {
       if (request.readyState == 4) {
          objJSON = JSON.parse(request.response);
          let lab_number=(Object.keys(objJSON).length)/10;
          txt+="<br><br><table id='presenceTable'>";
          txt+="<tr>";
          for(i=1;i<=lab_number;i++){
            txt+="<td>Laboratorium "+i+"</td>";
          }
          txt+="</tr>"
          txt+="<tr>";
          for ( var iden in objJSON ) {
            if(objJSON[iden]['numer']==id){
              if(objJSON[iden]['obecny']=='0'){
                txt += "<td>nieobecny</td>";
              }
              else {
                txt += "<td>obecny</td>";
              }  
            }   
          }
          txt+="</tr>";
       }
       txt += "</table><br>";
       data.innerHTML = txt;
       addReturn();
    };
    request.open("GET", "http://pascal.fis.agh.edu.pl/~9urbanowicz/Help/Obecnosc/api.php?rquest=list", true);
    request.send(null);
    
}

function addReturn(){
    document.getElementById('data').innerHTML+="<input type='button' value='Powrot' onclick='loginInterface()'>"
}


//Sprawdzanie obecnosci
function _quickCheck() {
    
    document.getElementById('data').innerHTML = '';  
    request = getRequestObject() ;
    request.onreadystatechange = function() {
       if (request.readyState == 4) {
          objJSON = JSON.parse(request.response);
          let txt = "";
          txt+="<table id='checkList'><tr><td>Numer</td><td>Imie</td><td>Nazwisko</td><td>Numer albumu</td><td>Obecny</td><td>Nieobecny</td> </tr>";
          for ( var id in objJSON ) {
              txt +="<tr>";
              id++;
              txt +="<td>"+id+"</td>";
              id--;
              for ( var prop in objJSON[id] ) {             
                 if ( prop !== '_id'){ 
                   txt += "<td> "+objJSON[id][prop]+"</td>";  
                 }
              }
              txt+="<td><input name='obecnosc"+id+"' value='1' type='radio'></td><td><input name='obecnosc"+id+"' value='0' type='radio' checked></td>";     
              txt +="</tr>";
          }
          txt += "</table><br/><center><input type='button' value='Wyslij' id='sender' onclick='_handleCheck()'></center><br>";
          document.getElementById('data').innerHTML = txt;
       }
    }
    request.open("GET", "http://pascal.fis.agh.edu.pl/~9urbanowicz/Help/Dziennik/api.php?rquest=list", true);
    request.send(null);
}

function _handleCheck(){
    let request = indexedDB.open("Obecnosc",1);
    let db;
    //Tworzenie bazy danych
    request.onupgradeneeded = function(){
      db = request.result;
      let store = db.createObjectStore("Laboratorium",{keyPath: "id",autoIncrement:true});
      
      console.log("Upgrade is here");
    };
    
    //Blad przy odczytywaniu
    request.onerror = function(e){
        console.log("Nie dziala: "+e.target.error);
    };
    
    //sukces przy odczytaniu - dodawanie do bazy danych
    request.onsuccess = function(e){
      db=request.result;
      
      let table=document.getElementById("checkList");

      for(i = 0;i<table.rows.length-1;i++){
        let tx=db.transaction("Laboratorium","readwrite");
        let store=tx.objectStore("Laboratorium");
      
        let val=table.rows[i+1].cells[0].innerHTML;
        let obecnosc=document.getElementsByName("obecnosc"+i);
        let obecnoscVal;
        if(obecnosc[0].checked){
            obecnoscVal=obecnosc[0].value;
        }
        else{
            obecnoscVal=obecnosc[1].value;
        }
        let presence={
          numer: val,
          obecny: obecnoscVal
        };
        store.add(presence);
      }
      //Sprawdzanie czy nie ma dodatkowego bledu
      db.onerror = function(e){
          console.log("ERROR: "+e.target.error);
      };
      alert("Dodano do bazy danych IndexedDB")
    }; 
}


         
         
      
         
         
       




