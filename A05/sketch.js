//==========================================================================================
//Funções básicas de manipulação vetorial - Estão melhoradas em relação ao trabalho anterior
//==========================================================================================

class Vec3 {
    constructor (x, y, z) {
      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;
    }
  }
  
  //Função para exibir um vetor no console:
  function printVec (v) {
    console.log(`x: ${v.x},  y: ${v.y}, z: ${v.z}`);
  }
  
  //Comprimento do vetor - Magnitude de um vetor:
  function length (v) {
    return Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z);
  }
  
  //Multiplicação por escalar:
  function mult(v, s) {
    return new Vec3(v.x*s, v.y*s, v.z*s)
  }
  
  function div(v, s) {
    return new Vec3(v.x/s, v.y/s, v.z/s)
  }
  
  //Soma entre dois vetores:
  function add(v, u) {
    return new Vec3(v.x+u.x, v.y+u.y, v.z+u.z)
  }
  
  //Subtração
  function sub(v, u) {
    return new Vec3(v.x-u.x, v.y-u.y, v.z-u.z)
  }
  
  //Produto escalar:
  function dot (v, u) {
    return (v.x*u.x + v.y*u.y + v.z*u.z)
  }
  
  //Produto vetorial:
  
  function pv (v, u) {
    let nx = v.y*u.z - v.z*u.y //Cálculo das coordenadas do produto vetorial 
    let ny = v.z*u.x - v.x*u.z
    let nz = v.x*u.y - v.y*u.x
    return new Vec3(nx, ny, nz);
  }
  /*
  function cross(v, u){
    return pv(v, u).z;
  }*/
  
  //Normalizar um vetor:
  function normalize (v) {
      return div(v, length(v))
  }
  
  
  //==========================================================================================
  //Física: Partículas e Barreiras
  //==========================================================================================
  
  //Definição de uma partícula:
  class Particula {
    
    constructor (posX, posY, velX, velY) {
      this.position = new Vec3 (posX, posY) //Posição: iniciamente estará no centro do canvas
      this.velocity = new Vec3 (velX, velY) //Velocidade da partícula
      this.color = color(random(256), random(256), random(256)) //Cor apenas para diferenciar as partículas
      //this.velocity = div(this.velocity, length(this.velocity)) //Velocidade normalizada
    }
    
    movimentar() {
      this.position = add(this.position, this.velocity)
    }
    
    mostrar () {
      fill(this.color)
      noStroke()
      ellipse(this.position.x, this.position.y, 10, 10)
    }
  }
  
  //Definição de uma barreira - linha:
  class Barreira {
    
    constructor (xInicial, yInicial, xFinal, yFinal){
      if(arguments.length == 2){
        this.inicio = xInicial
        this.fim = yInicial
      } else {
        this.inicio = new Vec3 (xInicial, yInicial)
        this.fim = new Vec3 (xFinal, yFinal)
      }
    }
    
    mostrarBarreira () {
      stroke(color(0))
      strokeWeight(5)
      line(this.inicio.x, this.inicio.y, this.fim.x, this.fim.y)
    }
    
    cruzamento (linha) {
      let A = this.inicio
      let B = this.fim
      let C = linha.inicio
      let D = linha.fim
    
      let AB = sub(B,A);
      let AC = sub(C,A);
      let AD = sub(D,A);
    
      let AB_x_AC = pv(AB, AC);
      let AB_x_AD = pv(AB, AD);
    
      let CD = sub(D,C);
      let CA = sub(A,C);
      let CB = sub(B,C);
    
      let CD_x_CA = pv(CD, CA);
      let CD_x_CB = pv(CD, CB);
    
      //Verifica se não houve colisão
      if ((AB_x_AC.z * AB_x_AD.z > 0) || (CD_x_CA.z * CD_x_CB.z > 0)) {
        return false;
      //Em caso de colisão, é necessário verificar se as retas são colineares
      } else if(length(pv(AB, CD)) == 0) { //Magnitude do produto vetorial
        return false
      }
      return true
    }
    
    //Método para indicar a direção de um vetor
    dir(){
      return sub(this.fim,this.inicio)
    }
    
    //Método para gerar a normal de uma linha
    normal () {
      let n = this.dir()
      let v = new Vec3(-n.y, n.x)
      return normalize(v) //Retorna o vetor normalizado
    }
    
    
  }
  
  function setValidPosiition(v){
  
  
    v.x = min(v.x,width/2)
    v.y = min(v.y,height/2)
  
  
    v.x = max(v.x,-width/2)
    v.y = max(v.y,-height/2)
  
    return v
  }
  
  function goCartesian()
  {
  
    mouseXC = mouseX - width/2
    mouseYC = height/2 - mouseY
      
    translate(width/2,height/2)
    scale(1,-1,1)  
  }
  
  //===============================================================================================
  //=============================== interatividade
  //===============================================================================================
  
  function mousePressed() {
    goCartesian()
    let vel = random(10)
    listaParticulas.push(new Particula (random(-width/2, width/2),random(-height/2, height/2),vel,vel))
    
    //Para gerar partículas com VelX e VelY diferentes.
    //listaParticulas.push(new Particula (random(-width/2, width/2),random(-height/2, height/2),random(10),random(10)))
  }
  
  function keyPressed() {
    if (keyCode == 66){
      let aX = random(-width/2, width/2)
      let aY = random(-height/2, height/2)
      let bX = random(-width/2, width/2)
      let bY = random(-height/2, height/2)
      listaBarreiras.push(new Barreira(aX, aY, bX, bY)) //Desenha uma linha aleatória
    }
  }
  
  //===============================================================================================
  //=============================== Principal =====================================================
  //===============================================================================================
  
  let listaBarreiras = []
  let listaParticulas = []
  
  function setup() {
    createCanvas(600, 600);
    
    //Linhas base
    listaBarreiras.push(new Barreira(-width/2, height/2, width/2, height/2)) //Cima
    listaBarreiras.push(new Barreira(-width/2, height/2, -width/2, -height/2)) //Esqueda
    listaBarreiras.push(new Barreira(width/2, height/2, width/2, -height/2)) //Direita
    listaBarreiras.push(new Barreira(-width/2,-height/2,width/2,-height/2)) //Baixo
    
    //Partícula de teste
    listaParticulas.push(new Particula (0,0,5,5))
  
    
  }
  
  function draw() {
    background(220);
    
    goCartesian();
    
    listaParticulas.forEach(particula => {
      let p2,n,vp;
      let colisao = false;
  
      
      p2 = add(particula.position,mult(particula.velocity,1))
      
      listaBarreiras.forEach(barreira =>{
          if(barreira.cruzamento(new Barreira(particula.position,p2))){
            colisao=true
            n = barreira.normal()
          }
        }
      )
    
      if (colisao){
  
        let alpha = 1.0
        let beta = 1.0
        vn = mult(n,dot(n,particula.velocity))
        vp = sub(particula.velocity,vn)
        
        let l = length(particula.velocity)
  
        particula.velocity = sub(mult(vp,alpha),mult(vn,beta))
  
        particula.velocity = normalize(particula.velocity)
        particula.velocity = mult(particula.velocity,l)
  
      }else{
        particula.position = p2
      }
      
      particula.position =setValidPosiition(particula.position)
      
    });
    
    // Atualizar e exibir a partícula
    for (let particula of listaParticulas) {
        particula.mostrar();
    }
    
    for (let barreira of listaBarreiras ) {
      barreira.mostrarBarreira()
    }
  }
  
  