let minhaSeed, mundoAtual, imgGrama, imgGramaFlor, imgGramaFlorAmarela, imgGramaFlorVioleta, imgGramaFlorMagenta, imgArvore, imgGalhos, imgAgua, imgPedra;

function preload() {
  imgGrama = loadImage("assets/grama.png");
  imgGramaFlor = loadImage("assets/grama_flor_vermelha.png");
  imgGramaFlorAmarela = loadImage("assets/grama_flor_amarela.png");
  imgGramaFlorVioleta = loadImage("assets/grama_flor_violeta.png");
  imgGramaFlorMagenta = loadImage("assets/grama_flor_magenta.png");
  imgArvore = loadImage("assets/arvore.png");
  imgGalhos = loadImage("assets/grama_galhos.png");
  imgAgua = loadImage("assets/agua.png");
  imgPedra = loadImage("assets/pedra.png");
}

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  minhaSeed = prompt("Escreva a sua seed (apenas numeros)");
  mundoAtual = criarMundoComSeed(minhaSeed);
  console.log(mundoAtual);
}

function draw() {
  background(255);
  desenharMundo(mundoAtual);
}

function gerarNumeroSeno(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function criarMundoComSeed(seed) {
  const tamanhoMundo = 4;
  const mundo = [];
  for (let i = 0; i < tamanhoMundo; i++) {
    mundo[i] = [];
    for (let j = 0; j < tamanhoMundo; j++) {
      const id = Math.floor(gerarNumeroSeno(seed + i * 10 + j * 20) * 10);
      mundo[i][j] = [(i * width) / tamanhoMundo,(j * width) / tamanhoMundo, width / tamanhoMundo, id];
    }
  }
  return mundo;
}

function desenharMundo(mundoInicial) {
  const tamanhoBloco = width / mundoInicial.length;
  for (let x = 0; x < mundoInicial.length; x++) {
    for (let z = 0; z < mundoInicial[x].length; z++) {
      let id = mundoInicial[x][z][3];
      switch (id) {
        case 0:
        case 9:
          image(imgGrama, mundoInicial[x][z][0], mundoInicial[x][z][1]);
          break;
        case 1:
          image(imgGramaFlor, mundoInicial[x][z][0], mundoInicial[x][z][1]);
          break;
        case 2:
          image(
            imgGramaFlorAmarela, mundoInicial[x][z][0],mundoInicial[x][z][1]);
          break;
        case 3:
          image(imgArvore, mundoInicial[x][z][0], mundoInicial[x][z][1]);
          break;
        case 4:
          image(imgGalhos, mundoInicial[x][z][0], mundoInicial[x][z][1]);
          break;
        case 5:
          image(imgAgua, mundoInicial[x][z][0], mundoInicial[x][z][1]);
          break;
        case 6:
          image(imgPedra, mundoInicial[x][z][0], mundoInicial[x][z][1]);
          break;
        case 7:
          image(imgGramaFlorMagenta, mundoInicial[x][z][0], mundoInicial[x][z][1]);
          break;
        case 8:
          image(imgGramaFlorVioleta, mundoInicial[x][z][0],mundoInicial[x][z][1]
          );
          break;
      }
    }
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    for (let x = 0; x < mundoAtual.length; x++) {
      for (let z = 0; z < mundoAtual[x].length; z++) {
        mundoAtual[x][z][0] += 20;
      }
    }
    let tile = mundoAtual[0][0];
    if (tile[0] > 0) {
      geraColunaEsquerda();
      console.log(mundoAtual);
    }
  }

  if (keyCode === RIGHT_ARROW) {
    let tamanhoAtual = mundoAtual.length - 1;
    for (let x = 0; x < mundoAtual.length; x++) {
      for (let z = 0; z < mundoAtual[x].length; z++) {
        mundoAtual[x][z][0] -= 20;
      }
    }
    let tile = mundoAtual[mundoAtual.length - 1][0];
    if (tile[0] < 300) {
      geraColunaDireita();
      console.log(mundoAtual);
    }
  }
  if (keyCode === DOWN_ARROW) {
    let tamanhoAtual = mundoAtual[0].length - 1;
    for (let x = 0; x < mundoAtual.length; x++) {
      for (let y = 0; y < mundoAtual[x].length; y++) {
        mundoAtual[x][y][1] -= 20;
      }
    }
    let tile = mundoAtual[0][tamanhoAtual];
    if (tile[1] < 300) {
      geraLinhaBaixo();
      console.log(mundoAtual);
    }
  }
  if (keyCode === UP_ARROW) {
    for (let x = 0; x < mundoAtual.length; x++) {
      for (let z = 0; z < mundoAtual[x].length; z++) {
        mundoAtual[x][z][1] += 20;
      }
    }
    let tile = mundoAtual[0][0];
    if (tile[1] > 0) {
      geraLinhaCima();
      console.log(mundoAtual);
    }
  }
}

function geraColunaEsquerda() {
  let coluna = [];
  for (let y = 0; y < mundoAtual[0].length; y++) {
    let tile = [
      -80,
      mundoAtual[0][y][1],
      100,
      Math.floor(
        gerarNumeroSeno(minhaSeed + y * 10 + mundoAtual.length * 20) * 10
      ),
    ];
    coluna.push(tile);
  }
  mundoAtual.unshift(coluna);
}

function geraColunaDireita() {
  let coluna = [];
  for (let y = 0; y < mundoAtual[0].length; y++) {
    let tile = [
      380,
      mundoAtual[0][y][1],
      100,
      Math.floor(
        gerarNumeroSeno(minhaSeed + y * 10 + mundoAtual.length * 20) * 10
      ),
    ];
    coluna.push(tile);
  }
  mundoAtual.push(coluna);
}

function geraLinhaBaixo() {
  for (let x = 0; x < mundoAtual.length; x++) {
    let tile = [
      mundoAtual[0][0][0] + x * 100,
      4 * 100 - 20,
      100,
      Math.floor(
        gerarNumeroSeno(minhaSeed + x * 10 + mundoAtual[0].length * 20) * 10
      ),
    ];
    mundoAtual[x].push(tile);
  }
}

function geraLinhaCima() {
  for (let x = 0; x < mundoAtual.length; x++) {
    let tile = [
      mundoAtual[0][0][0] + x * 100,
      -80,
      100,
      Math.floor(
        gerarNumeroSeno(minhaSeed + x * 10 + mundoAtual[0].length * 20) * 10
      ),
    ];
    mundoAtual[x].unshift(tile);
  }
}
