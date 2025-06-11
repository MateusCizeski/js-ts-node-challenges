const fs = require('fs');
const path = require('path');

//gerar arquivo de teste
const pasta = path.join(__dirname, 'arquivos');
const caminho = path.join(pasta, 'original.txt');

if (!fs.existsSync(pasta)) {
  fs.mkdirSync(pasta, { recursive: true });
}

const stream = fs.createWriteStream(caminho);

for (let i = 0; i < 1e6; i++) {
  stream.write(`Linha ${i} - Isso é um teste\n`);
}

stream.end(() => {
  console.log('Arquivo de teste criado!');
});
//

const caminhoOrigem = path.join(__dirname, 'arquivos', 'original.txt');
const caminhoDestino = path.join(__dirname, 'arquivos', 'copia.txt');

const streamLeitura = fs.createReadStream(caminhoOrigem);
const streamEscrita = fs.createWriteStream(caminhoDestino);

console.log('Iniciando a cópia do arquivo...');

streamLeitura.pipe(streamEscrita);

streamLeitura.on('error', (erro) => {
  console.error("Erro ao ler o arquivo:", erro.message);
});

streamEscrita.on('error', (erro) => {
  console.error('Erro ao escrever o arquivo:', erro.message);
});

streamEscrita.on('finish', () => {
  console.log('Arquivo copiado com sucesso!');
});