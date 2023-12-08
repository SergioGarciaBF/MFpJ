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
  
  //Normalizar um vetor:
  function normalize (v) {
      return div(v, length(v))
  }
  
  
  //==========================================================================================
  //Física: Partículas e Barreiras
  //==========================================================================================
  
  //Definição de uma partícula:
  class Particula {
    
    constructor (velX, velY) {
      this.position = new Vec3 (width/2, height/2) //Posição: iniciamente estará no centro do canvas
      this.velocity = new Vec3 (velX, velY) //Velocidade da partícula
      color(random(256), random(256), random(256))
    }
    
    movimentar() {
      this.position = add(this.position, this.velocity)
    }
    
    mudarVel (p) {
      this.velocidade = add (this.velocidade, mult(this.velocidade, p))
    }
    
    mostrar () {
      fill(0)
      ellipse(this.position.x, this.position.y, 10, 10)
    }
    
    ricochetear () {
      let alpha = 1
      let beta = 1
      let vn = dot(n,v)
      let vp = v-vn
      v = sub(mult(vp,alpha), mult(vp, beta))
    }
  }
  
  //Definição de uma barreira - linha:
  class Barreira {
    
    constructor (xInicial, yInicial, xFinal, yFinal){
      this.inicio = new Vec3 (xInicial, yFinal)
      this.fim = new Vec3 (xFinal, yFinal)
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
    
      let AB_x_AC = AB.cross(AC);
      let AB_x_AD = AB.cross(AD);
    
      let CD = sub(D,C);
      let CA = sub(A,C);
      let CB = sub(B,C);
    
      let CD_x_CA = CD.cross(CA);
      let CD_x_CB = CD.cross(CB);
    
      //Verifica se não houve colisão
      if ((AB_x_AC.z * AB_x_AD.z) > 0) {
        return false;
        
  
      }else if ((CD_x_CA.z * CD_x_CB.z) > 0) {
        return false;
      //Em caso de colisão, é necessa'rio verificar se as retas são colineares
      } else if(length(pv(AB, CD))==0) { //Magnitude do produto vetorial
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
  
  
  //===============================================================================================
  //=============================== Principal =====================================================
  //===============================================================================================
  
  let listaBarreiras = []
  let listaParticulas = []
  
  function setup() {
    createCanvas(600, 600);
    let cima = barreira()
    particula = new Particula (5,5)
  }
  
  function draw() {
    background(220);
    
    // Atualizar e exibir a partícula
    particula.mostrar();
    particula.movimentar();
  }
  
  