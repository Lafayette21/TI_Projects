/*jshint multistr: true */
function createAxisCanvas(canvas,ctx){
    ctx.fillStyle='white';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    //axis drawing
    ctx.fillStyle="black";
    ctx.beginPath();
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
    ctx.fillText("y(m)",30,30);
    //x axis
    ctx.moveTo(0,310);
    ctx.lineTo(550,310);
    ctx.lineTo(540,300);
    ctx.moveTo(550,310);
    ctx.lineTo(540,320);
    for(i=0;i<19;i++){
        ctx.moveTo(65+i*25,320);
        ctx.lineTo(65+i*25,300);
        ctx.font="bold 15px sans-serif";
        ctx.fillText(i+1,60+i*25,340);
    }
    ctx.font="bold 20px sans-serif";
    ctx.fillText("x(m)",555,315);
    ctx.stroke();
}

function arrow(ctx,canvas){
    let begin=50;
    let end=150;
    window.requestAnimationFrame(function loop(){
        ctx.beginPath();
        begin+=0.5;
        end+=0.5;
        ctx.clearRect(0,0,canvas.width,canvas.begin);
        ctx.fillStyle="white";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        
        ctx.moveTo(500,begin);
        ctx.lineTo(500,end);
        ctx.lineTo(490,end-10);
        ctx.moveTo(500,end);
        ctx.lineTo(510,end-10);

        ctx.moveTo(400,begin);
        ctx.lineTo(400,end);
        ctx.lineTo(390,end-10);
        ctx.moveTo(400,end);
        ctx.lineTo(410,end-10);

        ctx.moveTo(300,begin);
        ctx.lineTo(300,end);
        ctx.lineTo(290,end-10);
        ctx.moveTo(300,end);
        ctx.lineTo(310,end-10);

        ctx.moveTo(200,begin);
        ctx.lineTo(200,end);
        ctx.lineTo(190,end-10);
        ctx.moveTo(200,end);
        ctx.lineTo(210,end-10);
        
        ctx.moveTo(100,begin);
        ctx.lineTo(100,end);
        ctx.lineTo(90,end-10);
        ctx.moveTo(100,end);
        ctx.lineTo(110,end-10);
        ctx.stroke();
        if(end>=300){
            begin=50;
            end=150;
        }
        window.requestAnimationFrame(loop)
    })
}

function mainAnimation(cont){
    let canvas=document.createElement('canvas');
    canvas.setAttribute("id","animation");
    canvas.width=600;
    canvas.height=350;
    cont.appendChild(canvas);
    let ctx=canvas.getContext('2d');
    ctx.fillStyle='white';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    //Stworzenie zanimowanych strzalek
    //canvas.addEventListener("mouseover",arrow(ctx,canvas));
    arrow(ctx,canvas);
}
function adjustRightSide(){
    var contHeight = $('#content').height();
    $("#rightSide").height(contHeight);
}

function main(){
    var cont=document.getElementById("content");
    cont.innerHTML="";
    cont.innerHTML+="<h2>Czym jest pole grawitacyjne?</h2>"
    cont.innerHTML+="<p>Pole Grawitacyjne jest to takie pole, które wytwarza każdy obiekt\
    posiadający masę. Mamy z nim do czynienia na co dzień, gdyż będąc ludźmi, posiadamy\
    pewną masę, więc wiedząc lub nie, wytwarzamy pewne pole grawitacyjne. Jest ono jednak słabe\
    w porówaniu, chociażby do ziemi, której pole grawitacyjne powoduje, że chodzimy po jej powierzchni, a nie np. latamy.</p>"
    cont.innerHTML+="<p>Jako że pragnę tutaj omówić przede wszystkim rzuty, więc nie będę wchodził mocno w szczegóły\
    skupię się tylko na tym co niezbędne do omówienia zagadnienia strony. Obiektem, który wytwarza nasze pole grawitacyjne, jest oczywiście\
    Ziemia i zakładając, że znajdujemy się na jej powierzchni, możemy przyjąć, że siła z jaką ziemia nas (lub cokolwiek innego) przyciąga jest równa:</p>";
    cont.innerHTML+="<center><math id=\"mth\" xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow>\
                <mi>F</mi><mo>=</mo><mi>m</mi><mi>g</mi>\
        </mrow></math></center>";
    cont.innerHTML+="<p>Jest to siła, która będzie ściągać to czym rzucamy w dół niezależnie od rodzaju rzutu.</p>"
    cont.innerHTML+="<p> Jak działa siła w polu grawitacyjnym obrazuje poniższa animacja:</p><br/>"
    mainAnimation(cont);
    //dalszy teks
    let akapit=document.createElement("p");
    akapit.innerText="W tym miejscu warto wyjaśnić kilka innych pojęć, którymi bedę się posługiwać przy omawianiu zagadnienia:";
    let lista=document.createElement("ul");
    //element1
    let br1=document.createElement("br");
    let li1=document.createElement("li");
    li1.innerText="Poziom odniesienia - miejsce, które przyjmujemy jako poziom 0, czyli w praktyce od którego liczymy wysokość (zazwyczaj powierzchnia ziemi).";
    lista.appendChild(li1);
    lista.appendChild(br1);
    //element2
    let br2=document.createElement("br");
    let li2=document.createElement("li");
    li2.innerText="Tor - prosta lub krzywa, po której porusza się ciało";
    lista.appendChild(li2);
    lista.appendChild(br2);
    //element3
    let br3=document.createElement("br");
    let li3=document.createElement("li");
    li3.innerText="Droga - Fragment toru";
    lista.appendChild(li3);
    lista.appendChild(br3);

    akapit.appendChild(lista);

    cont.appendChild(akapit);

    adjustRightSide();
}

function spadekAnimacja(){
    let h=70;
    let i=0;
    let canvas=document.getElementById("spadekAnimation");
    let ctx=canvas.getContext("2d");
    
    window.requestAnimationFrame(function loop(){
        
        h+=i*0.2;
        i+=0.3;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        createAxisCanvas(canvas,ctx);
        ctx.beginPath();
        ctx.fillStyle="red";
        ctx.arc(280,h,30,0,2*Math.PI);
        ctx.fill();
        ctx.stroke();
        if(h<=275){
            window.requestAnimationFrame(loop)
        }
    })
    
}
function dolAnimancja(){
    let h=70;
    let i=0;
    let canvas=document.getElementById("dolAnimation");
    let ctx=canvas.getContext("2d");
    
    window.requestAnimationFrame(function loop(){
        
        h+=i*0.2;
        i+=0.4;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        createAxisCanvas(canvas,ctx);
        ctx.beginPath();
        ctx.fillStyle="red";
        ctx.arc(280,h,30,0,2*Math.PI);
        ctx.fill();
        ctx.stroke();
        if(h<=275){
            window.requestAnimationFrame(loop)
        }
    })
    
}
function goraAnimancja(){
    let h=260;
    let flag=0;
    let canvas=document.getElementById("goraAnimation");
    let ctx=canvas.getContext("2d");
    
    window.requestAnimationFrame(function loop(){
        if(flag==0){
            h-=1;
            window.requestAnimationFrame(loop)
        }
        else if(flag==1 && h<=278){
            h+=1;
            window.requestAnimationFrame(loop)
        }
        ctx.clearRect(0,0,canvas.width,canvas.height);
        createAxisCanvas(canvas,ctx);
        ctx.beginPath();
        ctx.fillStyle="red";
        ctx.arc(280,h,30,0,2*Math.PI);
        ctx.fill();
        ctx.stroke();
        if(h<=50){
            flag=1;
        }
    })
}

function pion(){
    var cont=document.getElementById("content");
    cont.innerHTML="";
    cont.innerHTML="<h2>Rzut pionowy</h2>";
    cont.innerHTML+="<p>Rzut pionowy jest to po prostu ruch w linii prostej w kierunku pionowym. Wyróżniamy dwa rodzaje \
    rzutów pionowych ze wzgledu na zwrot: </p>\
    <ol><li>Rzut pionowy do dołu</li><br/><li>Rzut pionowy do góry</li></ol></p>";
    cont.innerHTML+="<h3>Ad 1): Rzut pionowy do dołu</h3>";
    cont.innerHTML+="<p>Bierzemy nasze ciało, którym rzucamy i umieszczamy je na pewnej wysokości względem poziomu odniesienia. \
    Teraz ponownie możemy wykonać rzut na dwa sposoby:</p>";
    cont.innerHTML+="<ul style=\"list-style-type: upper-roman;\"><li>Spadek Swobodny</li><br/><li>Rzut z pewną silą</li></ul>";
    cont.innerHTML+="<h4>Ad I): Spadek Swobodny</h4>";
    cont.innerHTML+="<p>Spadek swobodny opisuje sytuację, w której \"puszczamy\" nasze ciało z pewnej wysokości (H), czyli jedyną siłą, \
    która ściąga ciało w dół jest siła grawitacji.</p><br/>";
    //Spadek swobodny grafika
    cont.innerHTML+="<canvas width=600 height=350 id='spadekAnimation' onmouseover='spadekAnimacja()'></canvas>";
    
    cont.innerHTML+="<p>Zwyczajowo ruch rozpatrujemy w funkcji czasu i nie inaczej jest tutaj. \
    Jako że jest to ruch jednostajnie przyspieszony, gdzie przyspieszenie jest równe przyspieszeniu grawitacyjnemu. Wzór\
    na prędkość wyraża się następująco i jest on analogiczny do tego znanego z ruchu jednostajnie przyspieszonego: </p>";
    // wzor na predkosc   
    cont.innerHTML+="<br><center><math id=\"mth\" xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow>\
                    <mi>V(t)</mi><mo>=</mo><mi>g</mi><mi>t</mi>\
                    </mrow></math></center><br>";
    cont.innerHTML+="<p>Kolejną wielkoscią jest przebyta droga od czasu, którą wyraża się następująco: </p>";
    cont.innerHTML+="<br><center><math id=\"mth\" xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow>\
                    <mi>s(t)</mi><mo>=</mo>\
                    <mfrac>  \
                        <mn>g</mn>  \
                        <mi>2</mi>  \
                    </mfrac>  \
                    <msup><mi>t</mi><mn>2</mn></msup>\
                    </mrow></math></center><br>";
    cont.innerHTML+="<p>Ostatnia wielkoscią jest wysokość w danej chwili czasu, do której policzenia wykorzystuje się prostą modyfikację \
    wzoru powyższego:</p>";
    cont.innerHTML+="<br><center><math id=\"mth\" xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow>\
                    <mi>h(t)</mi><mo>=</mo>\
                    <mi>H</mi>\
                    <mo>-</mo>\
                    <mfrac>  \
                        <mn>g</mn>  \
                        <mi>2</mi>  \
                    </mfrac>  \
                    <msup><mi>t</mi><mn>2</mn></msup>\
                    </mrow></math></center><br>";
    cont.innerHTML+="<h4>Ad II): Rzut z pewną siłą</h4>";
    cont.innerHTML+="<p>Jest to sytuacja bardzo podobna do spadku swobodnego z jedną tylko różnicą, że na początku\
    Została nadana ciału jakaś prędkość początkowa V<sub>0</sub>, którą teraz musimy uwzględniać w obliczeniach. </p>";
    //Animacja Rzut w dół
    cont.innerHTML+="<canvas width=600 height=350 id='dolAnimation' onmouseover='dolAnimancja()'></canvas>";

    cont.innerHTML+="<p>Ponownie jest to ruch jednostajnie przyspieszony, jednak tym razem ciało spada szybciej, ponieważ ma ono prędkość początkową od której zaczyna ruch.\
    Ten fakt jest odpowiednio uwzględniony we wszystich wzorach.</p>";
    cont.innerHTML+="<p>Prędkość:</p>";
    cont.innerHTML+="<br><center><math id=\"mth\" xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow>\
                    <mi>V(t)</mi><mo>=</mo><mi>V<sub>0</sub></mi><mo>+</mo><mi>g</mi><mi>t</mi>\
                    </mrow></math></center><br>";
    cont.innerHTML+="<p>Przebyta droga: </p>";
    cont.innerHTML+="<br><center><math id=\"mth\" xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow>\
                    <mi>s(t)</mi><mo>=</mo>\
                    <mi>V<sub>0</sub></mi><mi>t</mi><mo>+</mo>\
                    <mfrac>  \
                        <mn>g</mn>  \
                        <mi>2</mi>  \
                    </mfrac>  \
                    <msup><mi>t</mi><mn>2</mn></msup>\
                    </mrow></math></center><br>";
    cont.innerHTML+="<p>Wysokość w danej chwili: </p>";
    cont.innerHTML+="<br><center><math id=\"mth\" xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow>\
                    <mi>h(t)</mi><mo>=</mo>\
                    <mi>H</mi>\
                    <mo>-</mo>\
                    <mi>V<sub>0</sub></mi><mi>t</mi><mo>+</mo>\
                    <mfrac>  \
                        <mn>g</mn>  \
                        <mi>2</mi>  \
                    </mfrac>  \
                    <msup><mi>t</mi><mn>2</mn></msup>\
                    </mrow></math></center><br>";
    //Rzut pionowy do góry
    cont.innerHTML+="<h3>Ad 2): Rzut pionowy do góry</h3>";
    cont.innerHTML+="<p>Tym razem nasz ruch zaczyna się na poziomie odniesienia. Nadajemy ciału jakąś prędkość początkową tak aby mogło wznieść się do góry.\
    Cały czas jednak ciało pozostaje pod wpływem działania siły grawitacji, która działając w dół, przeciwdziała ruchowi ciała.\
    Siła ta stopniowo hamuje ciało, które w pewnym momencie zatrzyma się, a następnie padnie swobodnie (tak jak jest to omówione wyżej).\</p>"
    //rzut pionowy w góre animacja
    cont.innerHTML+="<canvas width=600 height=350 id='goraAnimation' onmouseover='goraAnimancja()'></canvas>";
    
    cont.innerHTML+="<p>Ponieważ siła grawitacji przeciwdziała ruchowi, mamy do czynienia z ruchem jednostajnie opóźnionym.\
    Opóźnienie jest oczywiścnie równe <i>g</i>, większość wzorów, podobnie jak przy pozostałych rzutach pionowych to wzory z ruchu postępowego.</p>";
    cont.innerHTML+="<p>Prędkość tym razem się stopniowo sie zmniejsza aż do zera, więc: </p>";
    
    cont.innerHTML+="<br><center><math id=\"mth\" xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow>\
    <mi>V(t)</mi><mo>=</mo><mi>V<sub>0</sub></mi><mo>-</mo><mi>g</mi><mi>t</mi>\
    </mrow></math></center><br>";
    cont.innerHTML+="<p>Droga od czasu również jest dana wzorem z ruchu opoźnionego, przy czym w tym wypadku jest ona równa\
    wysokości na której znajduje sie ciało:  </p>";
    cont.innerHTML+="<br><center><math id=\"mth\" xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow>\
                    <mi>h(t)</mi><mo>=</mo>\
                    <mi>V<sub>0</sub></mi><mi>t</mi><mo>+</mo>\
                    <mfrac>  \
                        <mn>g</mn>  \
                        <mi>2</mi>  \
                    </mfrac>  \
                    <msup><mi>t</mi><mn>2</mn></msup>\
                    </mrow></math></center><br>";
    cont.innerHTML+="<p>W momencie w którym ciało dociera do swojej maksymalnej wysokości zaczyna się spadek swobodny, który jest opisany w wyżej na stronie w rozdziale 2.I).</p>";
    adjustRightSide();
}

function poziomAnimacja(){
    let yP=50;
    let xP=70;
    let i=0;
    let canvas=document.getElementById("poziomAnimation");
    let ctx=canvas.getContext("2d");
    window.requestAnimationFrame(function loop(){
        xP+=2.5;
        yP+=i*0.5;
        i+=0.1;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        createAxisCanvas(canvas,ctx);
        ctx.beginPath();
        ctx.fillStyle="red";
        ctx.arc(xP,yP,30,0,2*Math.PI);
        ctx.fill();
        ctx.stroke();
        if(yP<=275){
            window.requestAnimationFrame(loop)
        }
    })
}
function poziomWektor(){
    let canvas=document.getElementById("poziomPredkosc");
    let ctx=canvas.getContext("2d");
    ctx.fillStyle="#191d21";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    //Wektory predkosci
    ctx.beginPath();
    ctx.lineWidth=5
    ctx.strokeStyle="white";
    ctx.moveTo(40,40);
    //Vy
    ctx.lineTo(40,140);
    ctx.lineWidth=3;
    ctx.lineTo(25,130);
    ctx.moveTo(40,140);
    ctx.lineTo(55,130);
    ctx.fillStyle="white";
    ctx.font="20px Verdana";
    ctx.fillText("Vy",25,165);

    //Vx
    ctx.lineWidth=5;
    ctx.moveTo(40,40);
    ctx.lineTo(220,40);
    ctx.lineTo(210,25);
    ctx.moveTo(220,40);
    ctx.lineTo(210,55);
    ctx.font="20px Verdana";
    ctx.fillText("Vx",230,50);

    //V
    ctx.moveTo(40,40);
    ctx.lineTo(220,140);
    ctx.lineTo(220,120);
    ctx.moveTo(220,142);
    ctx.lineTo(200,142);
    ctx.font="20px Verdana";
    ctx.fillText("V",230,165);

    //Angle
    ctx.moveTo(40,40);
    ctx.arc(40,40,30,0,Math.PI/2);
    ctx.font="20px Verdana";
    ctx.fillText("α",55,85);
    ctx.stroke();
}

function poziom(){
    var cont=document.getElementById("content");
    cont.innerHTML="";
    var text="<h2>Rzut poziomy</h2>";
    text+="<p>Rzut poziomy jest podobnie jak pionowy rzutem po lini prostej, a raczej jego próbą.\
    Próbujemy rzucić w kierunku poziomym, nadając pewną predkość początkową (poziomą) jednak siła grawitacji ściąga nasze ciało w dół w wyniku czego\
    otrzymujemy ruch po pewnej pół paraboli. Przykladem z życia takiego rzutu jest rzucanie rzutkami do tarczy.</p>\
    <p> Sposób w jaki przebiega rzut poziomy przedstawia \
    poniższa animacja:</p>";
    cont.innerHTML=text;
    //rzut poziomy animacja
    cont.innerHTML+="<canvas width=600 height=350 id='poziomAnimation' onmouseover='poziomAnimacja()'></canvas>";
    

    cont.innerHTML+="<p>Najwazniejszą rzeczą do zrozumienia w rzucie poziomym jest fakt, że poruszamy się w dwóch płaszczyznach \
    - przesuwamy się jednoczesnie w pionie i poziomie (tak samo jest w rzucie ukośnym). W pionie działa siła grawitacji, która ściąga nas w dół, więc mamy tu do czynienia z ruchem \
    jednostajnie przyspieszonym. Natomiast w poziomie nie działa żadna siła, więc w tym kierunku ciało porusza się ruchem jednostajnym z prędkością \
    początkową V<sub>0</sub>. Rozpatrując te dwa kierunki należy obowiązkowo pamiętać, że czas ruchu w pionie i w poziomie jest taki sam, co jest kluczowe przy \
    przy rozwiązywaniu zadań, w których mieszamy ze sobą różne wzory.</p>";
    cont.innerHTML+="<p>Rozpatrując prędkość musimy połączyć wiedzę o wektorach z wiedzą o rzutach pionowych, gdyż aby policzyć prędkość w danej chwili musimy policzyć predkość\
    w kierunku pionowym i wziąść prędkość wypadkową z prędkością poziomą (która jest stała)</p>";

    cont.innerHTML+="<canvas id='poziomPredkosc' height=200 width=300 style='background-color: #191d21' onmouseover='poziomWektor()'></canvas>";
    
    cont.innerHTML+="<p>Prędkosc wypadkową V można teraz policzyć na kilka sposobów w zależności od posiadanych informacji:</p>";
    cont.innerHTML+="<ul><li>Znajac wartość kąta &alpha; możemy skorzystać z zależności trygonometrycznych</li>";
    cont.innerHTML+="<br><center><math id=\"mth\" xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow>\
                    <mi>V<sub>y</sub></mi><mo>=</mo><mi>V</mi><mi>cos(&alpha;)</mi>\
                    </mrow></math></center><br>";
    cont.innerHTML+="<br><center><math id=\"mth\" xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow>\
                    <mi>V<sub>x</sub></mi><mo>=</mo><mi>V</mi><mi>sin(&alpha;)</mi>\
                    </mrow></math></center><br>";

    cont.innerHTML+="<li>Znając czas możemy skorzystać z wzorów pochodzących z odpowiednich ruchów:</li>";
    cont.innerHTML+="<br><center><math id=\"mth\" xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow>\
                    <mi>V<sub>y</sub>(t)</mi><mo>=</mo><mi>g</mi><mi>t</mi>\
                    </mrow></math></center><br>";
    cont.innerHTML+="<br><center><math id=\"mth\" xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow>\
                    <mi>V<sub>x</sub>(t)</mi><mo>=</mo><mi>V<sub>0</sub></mi>\
                    </mrow></math></center><br>";
    cont.innerHTML+="</ul>";

    cont.innerHTML+="<p>Przechodząc do położenia tym razem musimy rozpatrywać położenie w kontekście dwóch wymiarów x i y w funkcji czasu. Liczymy je ze wzorów:</p>";
    cont.innerHTML+="<br><center><math id=\"mth\" xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow>\
                    <mi>x(t)</mi><mo>=</mo><mi>V<sub>x</sub></mi><mi>t</mi>\
                    </mrow></math></center><br>";
    cont.innerHTML+="<br><center><math id=\"mth\" xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow>\
                    <mi>y(t)</mi><mo>=</mo>\
                    <mfrac>  \
                        <mn>g</mn>  \
                        <mi>2</mi>  \
                    </mfrac>  \
                    <msup><mi>t</mi><mn>2</mn></msup>\
                    </mrow></math></center><br>";
    cont.innerHTML+="<p>Osatnimi zagadnieniami są wysokość maksymalna i zasięg czyli maksymalne odległości na jakie może polecieć ciało w \
                    dwóch płaszczyznach. Są to w praktyce wzory powyższe tylko od czasu całowitego ruchu</p>";
                    cont.innerHTML+="<br><center><math id=\"mth\" xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow>\
                    <mi>z</mi><mo>=</mo><mi>V<sub>x</sub></mi><mi>t<sub>c</sub></mi>\
                    </mrow></math></center><br>";
    cont.innerHTML+="<br><center><math id=\"mth\" xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow>\
                    <mi>h</mi><mo>=</mo>\
                    <mfrac>  \
                        <mn>g</mn>  \
                        <mi>2</mi>  \
                    </mfrac>  \
                    <msup><mi>t<sub>c</sub></mi><mn>2</mn></msup>\
                    </mrow></math></center><br>";

    adjustRightSide();
}

function ukosAnimacja(){
    let yP=274;
    let xP=70;
    let flag=0;
    let i=1;
    let canvas=document.getElementById("ukosAnimation");
    let ctx=canvas.getContext("2d");
    window.requestAnimationFrame(function loop(){
        xP+=3.5;
        if(flag==0){  
            yP-=i*3;
            i-=0.02;
        }
        else{
            yP+=i*3;
            i+=0.02;
        }
        ctx.clearRect(0,0,canvas.width,canvas.height);
        createAxisCanvas(canvas,ctx);
        ctx.beginPath();
        ctx.fillStyle="red";
        ctx.arc(xP,yP,30,0,2*Math.PI);
        ctx.fill();
        ctx.stroke();
        if(xP>=250 && flag==0){
            flag=1;
        }
        if(yP<=277){
            window.requestAnimationFrame(loop)
        }
    })
}
function ukosWektor(){
    let canvas=document.getElementById("ukosPredkosc");
    let ctx=canvas.getContext("2d");
    ctx.fillStyle="#191d21";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    //Wektory predkosci
    ctx.beginPath();
    ctx.lineWidth=5
    ctx.strokeStyle="white";
    ctx.moveTo(40,160);
    //Vy
    ctx.lineTo(40,40);
    ctx.lineTo(25,50);
    ctx.moveTo(40,40);
    ctx.lineTo(55,50);
    ctx.fillStyle="white";
    ctx.font="20px Verdana";
    ctx.fillText("Vy",26,28);
    //Vx
    ctx.moveTo(40,160);
    ctx.lineTo(240,160);
    ctx.lineTo(230,145);
    ctx.moveTo(240,160);
    ctx.lineTo(230,175);
    ctx.fillStyle="white";
    ctx.font="20px Verdana";
    ctx.fillText("Vx",250,170);
    //V
    ctx.moveTo(40,160);
    ctx.lineTo(240,40);
    ctx.moveTo(240,39);
    ctx.lineTo(215,39);
    ctx.moveTo(240,39);
    ctx.lineTo(240,65);
    ctx.fillStyle="white";
    ctx.font="20px Verdana";
    ctx.fillText("V0",250,40);
    //Angle
    ctx.moveTo(40,160);
    ctx.arc(40,160,30,-Math.PI/2,0);
    ctx.font="20px Verdana";
    ctx.fillText("α",55,120);
    ctx.stroke();
}


function ukos(){
    let cont=document.getElementById("content");
    cont.innerHTML="";
    cont.innerHTML+="<h2>Rzut ukośny</h2>";
    cont.innerHTML+="<p>Rzut ukośny jest najbardziej skomplikowany w porównaniu do pozostałych. Wykonujemy taki rzut, na przykład rzucając się śnieżkami lub piłką.\
    Rzucamy z poziomu odniesienia pod pewnym kątem. Piłka najpierw się wznosi do pewnego poziomu, a następnie opada, co odbywa się symetrycznie, przez względ na brak oporów ruchu.\
    Przebieg ruchu przedstawia poniższa animacja</p>";
    //Animacja ukos
    cont.innerHTML+="<canvas width=600 height=350 id='ukosAnimation' onmouseover='ukosAnimacja()'></canvas>";

    cont.innerHTML+="<p>Jak możemy zauważyć ruch przebiega po symetrycznej paraboli i sam w sobie jest symetryczny. Oznacza to w praktyce, że\
     czas wznoszenia (t<sub>wz</sub>) jest równy czasowi opadania (t<sub>op</sub>). Analogicznie jak w ruchu poziomym ruch trzeba rozpatrywać w dwóch płaszczyznach\
    x i y. Siła grawitacji ściąga nasze ciało w dół, więc w płaszczyźnie pionowej mamy do czynienia z ruchem jednostajnie przyspieszonym. Natomiast w poziomie nie działa zadna siła, więc \
    stała prędkość początkowa. Nie jest to jednak aż takie proste poniewąż aby wprawić nasze ciało w ruch po paraboli, prędkość musi być pod pewnym kątem względem poziomu odniesienia.</p>"; 
    //Wektory rzut ukosny
    cont.innerHTML+="<canvas id='ukosPredkosc' height=200 width=300 style='background-color: #191d21' onmouseover='ukosWektor()'></canvas>";
    
    cont.innerHTML+="<p>Prędkości te możemy policzyć znając prędkość V<sub>0</sub>:</p>";
    cont.innerHTML+="<br><center><math id=\"mth\" xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow>\
                    <mi>V<sub>y</sub></mi><mo>=</mo><mi>V<sub>0</sub></mi><mi>cos(&alpha;)</mi>\
                    </mrow></math></center><br>";
    cont.innerHTML+="<br><center><math id=\"mth\" xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow>\
                    <mi>V<sub>x</sub></mi><mo>=</mo><mi>V<sub>0</sub></mi><mi>sin(&alpha;)</mi>\
                    </mrow></math></center><br>";

    cont.innerHTML+="<p>Jednocześnie dzialają także wzory w funkcjach czasu, które znamy z ruchu postępowego, a które w pierwszej połowie ruchu wyglądają naspępująco\
    (W drugiej po przekroczeniu linii symetri (czyli gdy ciało zaczyna spadać) są takie same jak dla poziomego).</p>";

    cont.innerHTML+="<br><center><math id=\"mth\" xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow>\
                    <mi>V<sub>y</sub>(t)</mi><mo>=</mo><mi>V<sub>y</sub></mi><mo>-</mo><mi>g</mi><mi>t</mi><mo>=</mo><mi>V<sub>0</sub></mi><mi>cos(&alpha;)</mi><mo>-</mo><mi>g</mi><mi>t</mi>\
                    </mrow></math></center><br>";
    cont.innerHTML+="<br><center><math id=\"mth\" xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow>\
                    <mi>V<sub>x</sub>(t)</mi><mo>=</mo><mi>V<sub>x</sub></mi><mo>=</mo><mi>V<sub>0</sub></mi><mi>sin(&alpha;)</mi>\
                    </mrow></math></center><br>";
    
    cont.innerHTML+="<p>Rozpatrując położenie uzyskujemy następujące wzory: </p>";
    cont.innerHTML+="<br><center><math id=\"mth\" xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow>\
                    <mi>x(t)</mi><mo>=</mo><mi>V<sub>x</sub></mi><mi>t</mi><mo>=</mo><mi>V<sub>0</sub></mi><mi>sin(&alpha;)</mi><mi>t</mi>\
                    </mrow></math></center><br>";
    cont.innerHTML+="<br><center><math id=\"mth\" xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow>\
                    <mi>y(t)</mi><mo>=</mo>\
                    <mfrac>  \
                        <mn>g</mn>  \
                        <mi>2</mi>  \
                    </mfrac>  \
                    <msup><mi>t</mi><mn>2</mn></msup>\
                    </mrow></math></center><br>";
    cont.innerHTML+="<p>Maksymalna wysokość na jaką może wznieść się ciało jest położeniem y od czasu wznoszenia się: </p>";
    cont.innerHTML+="<br><center><math id=\"mth\" xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow>\
                    <mi>h<sub>max</sub></mi><mo>=</mo>\
                    <mfrac>  \
                        <mn>g</mn>  \
                        <mi>2</mi>  \
                    </mfrac>  \
                    <msup><mi>t<sub>wz</sub></mi><mn>2</mn></msup>\
                    </mrow></math></center><br>";
    cont.innerHTML+="<p>Przy liczeniu zasięgu wykorzystujemy to, że tor ruchu jest symetryczny. Liczymy położenie w poziomie od czasu wznowszenia\
    a następnie przemnażamy to przez dwa, gdyż przy spadaniu ciało przebywa taką samą drogę jak przy wznoszeniu:</p>";
    cont.innerHTML+="<br><center><math id=\"mth\" xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow>\
                    <mi>z</mi><mo>=</mo><mi>2V<sub>x</sub></mi><mi>t</mi><mo>=</mo><mi>2V<sub>0</sub></mi><mi>sin(&alpha;)</mi><mi>t</mi>\
                    </mrow></math></center><br>";
    adjustRightSide();

}

function page1(){
    window.open("https://www.youtube.com/watch?v=fMgPX4ktGH8");
}
function page2(){
    window.open("https://home.agh.edu.pl/~kakol/efizyka/");
}
function page3(){
    window.open("https://www.naukowiec.org/wiedza/fizyka.html");
}
function page4(){
    window.open("http://fizyka.dk/teoria/kinematyka/rzut-pionowy-rzut-poziomy-rzut-ukosny/rzut-pionowy-rzut-poziomy-rzut-ukosny-definicje-twierdzenia-wzory");
}