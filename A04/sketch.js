class Vec3 {
  constructor (x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }
  
  //Função para exibir um vetor no console:
  printVec () {
    console.log(`x: ${this.x},  y: ${this.y}, z: ${this.z}`);
  }
  
  //Comprimento do vetor:
  length () {
    return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
  }
  
  //Multiplicação por escalar:
  mult(s) {
    return new Vec3(this.x*s, this.y*s, this.z*s)
  }
  
  //Soma entre dois vetores:
  add(v) {
    return new Vec3(this.x+v.x, this.y+v.y, this.z+v.z)
  }
  
  //Produto escalar:
  dot (v) {
    console.log()
    return (this.x*v.x + this.y+v.y + this.z*v.z)
  }
  
  //Produto vetorial:
  pv (v) {
    let nx = this.y*v.z - this.z*v.y //Cálculo das coordenadas do produto vetorial 
    let ny = this.z*v.x - this.x*v.z
    let nz = this.x*v.y - this.y*v.x
    return new Vec3(nx, ny, nz);
  }
  
  //Calcula o angulo entre dois vetores utilizando o produto escalar:
  angleEscalar(v) {
    let coss =  this.dot(v)/(this.length()*v.length()) //cosseno do ângulo entre os dois vetores
    return(Math.acos(coss)*180/Math.PI) //retorna o angulo entre os vetores(em graus)
  }
  
  //Calcula o angulo entre dois vetores utilizando o produto vetorial:
  angleVetorial(v) {
    let seno = this.pv(v) / (this.length() * v.length())
    return (Math.asin(seno)*180/Math.PI) //retorna o ângulo entre os vetores(em graus)
  }
  
  //Calcula o Pseudoângulo do cosseno:
  pseudoAngleCos(v) {
    return 1 - (this.dot(v) / (this.length()*v.length()));
  }
  

  //PARTE 2 - PSEUDOANGULOS:
  //Identifica o octante em que o vetor se encontra:
  octante() {
    let x = this.x;
    let y = this.y;
    
    //Testes de casos de octantes - retorna o octante pra ser utilizado :
    if (x>0 && y>0 && x>=y) {
      return 1
    } else if (x>0 && y>0 && y>=x) {
      return 2
    } else if (x<0 && y>0 && y>=-x) {
      return 3
    } else if (x<0 && y>0 && y<=-x) {
      return 4
    } else if (x<0 && y<0 && x<=y) {
      return 5
    } else if (x<0 && y<0 && x>=y) {
      return 6
    } else if (x>0 && y>0 && x<=-y) {
      return 7
    } else if (x>0 && y>0 && x>=-y) {
      return 8
    }
    
  }
  
  //Calcular o pseudoângulo de um vetor:
  pseudoAngle() {
    let oct = this.octante(); //Identificar o octante do vetor utilizando o método definido acima
    if (oct == 1) {
      return this.y / this.x //x e y positivos
    } else if (oct == 2) {
      return 2 - (this.x / this.y) //x e y positivos
    } else if (oct == 3) {
      return 2 + this.x*(-1)/this.y //apenas x negativo
    } else if (oct == 4) {
      return 4 - (this.y/(this.x*(-1))) // apenas x negativo
    } else if (oct == 5) {
      return 4 + this.y/this.x // x e y negativos
    } else if (oct == 6) {
      return 6 - (this.x/this.y) // x e y negativos
    } else if (oct == 7) {
      return 6 + (this.x/this.y*(-1)) // apenas y negativo
    } else if (oct == 8) {
      return 8 - this.y*(-1)/this.x //apenas y negativo
    }
  
  }
  
  //Calcular pseudoangulo entre dois vetores:
  //A estratégia é calcular o pseudoângulo de cada vetor e realizar uma subtração:
  pseudoAngle2Vec (v) {
    let pseudo1 = this.pseudoAngle()
    let pseudo2 = v.pseudoAngle()
    
    //Subtrair pseudo2 - pseudo1:
    let pseudoFinal = pseudo2 - pseudo1;
    
    //Entretanto, devemos realizar uma correção caso o pseudoangulo do vetor 2 seja menor que o pseudoangulo do vetor 1: caso o pseudo 1 seja maior que o pseudo2, o resultado final, será negativo, o que não está de acordo com o nosso intervalo. Logo, devemos multiplicar esse valor por -1:
    
    if (pseudoFinal < 0) {
      pseudoFinal = pseudoFinal*(-1);
    }
    
    return pseudoFinal;
  }
  
}


//AREA DE TESTES:

//Definição dos vetores - para vetores 2D, bastar colocar (x, y) ou (x, y, 0) no construtor:

let a = new Vec3(); //Inserir vetor aqui
let b = new Vec3(); //inserir vetor aqui

//PARTE 1:
console.log("---------- PARTE 1 ----------")
//a) Cálculo do ângulo utilizando produto escalar:
console.log('Ângulo entre a e b (Produto Escalar):',a.angleEscalar(b))

//b) Cálculo do ângulo utilizando produto vetorial
console.log('Ângulo entre a e b (Produto Vetorial):',a.angleVetorial(b))

//PARTE 2:
console.log("---------- PARTE 2 ----------")
//a) Pseudoângulo do Cosseno entre dois vetores:
console.log('Pseudoângulo entre A e B (do cosseno):',a.pseudoAngleCos(b))

//b) Pseudoângulo de um vetor usando a técnica do quadrado:
console.log('Pseudoângulo de A (quadrado):',a.pseudoAngle())

//c) Pseudoângulo entre dois vetores usando a técnica do quadrado:
console.log('Pseudoângulo entre A e B (quadrado):',a.pseudoAngle2Vec(b))
