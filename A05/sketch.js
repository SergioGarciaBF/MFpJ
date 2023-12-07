//Funções básicas de manipulação vetorial - Estão melhoradas em relação ao trabalho anterior

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
  
  //Comprimento do vetor:
  function length (v) {
    return Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z);
  }
  
  //Multiplicação por escalar:
  function mult(v, s) {
    return new Vec3(v.x*s, v.y*s, v.z*s)
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
      
  }
  
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
  }
  
  //Definição de uma barreira:
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
    
    
  }
  
  
  //===============================================================================================
  //=============================== Principal =====================================================
  //===============================================================================================
  
  let listaBarreiras = []
  let listaParticulas = []
  
  function setup() {
    createCanvas(800, 800);
    particula = new Particula (5,5)
  }
  
  function draw() {
    background(220);
    
    // Atualizar e exibir a partícula
    particula.mostrar();
    particula.movimentar();
  }