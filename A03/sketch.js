function setup() {
    createCanvas(800, 800);
    translate(width / 2, height / 2);
  }
  
  
  function draw() {
    stroke(0,0,0)
    background(220);
    strokeWeight(2)
    line(0, 0, 800, 0)
    line(0, 0, 0, 800)
    circle(0, 0, 10);
    text("(0, 0)", 10, 10)
    
    //Receber pontos de cada segmento:
    //Ponto A - Inicial de AB
    var ax = -700;
    var ay = 500;
    
    //Ponto B - Final de AB
    var bx = -200;
    var by = 100;
    
    //Ponto C - inicial de CD
    var cx = -500;
    var cy = 100;
    
    //Ponto D - Final de CD
    var dx = -200;
    var dy = 400;
    
    //Desenhar retas:
    stroke(255, 204, 0)
    strokeWeight(2);
    line(ax,ay, bx, by);
    circle(ax, ay, 5);
    text(`(${ax.toFixed(4)},${ay.toFixed(4)})`, ax, ay )
    circle(bx, by, 5)
    text(`(${bx.toFixed(4)},${by.toFixed(4)})`, bx, by )
    
    stroke(0,255,0)
    line(cx, cy, dx, dy);
    circle(cx, cy, 5);
    text(`(${cx.toFixed(4)},${cy.toFixed(4)})`, cx, cy )
    circle(dx, dy, 5)
    text(`(${dx.toFixed(4)},${dy.toFixed(4)})`, dx, dy )
    
    //Equação da reta: y = mx + n
    //Calcular coeficientes angulares das equações das retas AB e CD:
    mAB = (by-ay)/(bx-ax)
    mCD = (dy-cy)/(dx-cx)
    
    //Calcular n para cada equação da reta: n = y - mx
    //Utilizamos um ponto um dos pontos dados do segmento como base para o cálculo:
    nAB = ay - mAB*ax //Utilizei (ax,ay)
    nCD = cy - mCD*cx //Utilizei (cx,cy)
    
    //Agora precisamos verificar se os segmentos são possivelmente paralelos ou colineares:
    //Possivelmente porque as equações das retas indicarão essas caracteríesticas mas a visualização "não indicar" isso
    
    //Os segmentos são colineares: mAB = mCD e nAB = nCD
    if (mAB === mCD && nAB === nCD){
      text("Os segmentos são colineares", 200, 600)
    } else if (mAB === mCD) {//Os segmentos são caracteristicamente paralelos: mAB = mCD, apenas
      console.log ("Os segmentos são paralelos")
      text("Os segmentos são paralelos", 200, 600)
    } else { //Os segmentos poderão se cruzar em apenas um ponto
      
      //yAB === yCD => x = (nCD - nAB)/(mAB-mCD)
      var xComum = (nCD-nAB)/(mAB-mCD)
      
      //Agora precisamos verificar seas retas realmente se cruzam, para isso, podemos verificar se o xComum está dentro dos intervalos de X tanto em AB quanto em CD:
      if(xComum >= ax && xComum <= bx && xComum >= cx && xComum<=dx){
        //calcular o y comum e mostrar o ponto - posso usar uma das equações da reta pra isso
        var yComum = mAB*xComum + nAB
        circle(xComum, yComum, 10)
        console.log(`As retas se cruzam no ponto (${xComum},${yComum})`)
        text(`(${xComum.toFixed(4)},${yComum.toFixed(4)})`, xComum, yComum )
        text(`Os segmentos se cruzam no ponto (${xComum},${yComum})`, 200, 600)
        
      } else {
        console.log("Os segmentos não se cruzam")
        text("Os segmentos não se cruzam", 200, 600)
      }
    }
  }