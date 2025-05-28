const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function perguntar(pergunta) {
    return new Promise((resolve) => {
        rl.question(pergunta, (resposta) => {
            resolve(resposta);
        });
    });
}

async function main() {
    console.log("Bem-vindo ao CLI interativo!");

    const nome = await perguntar("Qual seu nome?");
    const idade = await perguntar("Qual sua idade?");

    const cores = ["Vermelho", "Verde", "Azul", "Amarelo"];

    console.log("\nEscolha sua cor favorita:");

    cores.forEach((cor, i) => {
        console.log(`${i + 1}. ${cor}`);
    });

    let corEscolhidaIndex = await perguntar("Digite o número da sua escolha: ");
    corEscolhidaIndex = parseInt(corEscolhidaIndex);

    if(isNaN(corEscolhidaIndex || corEscolhidaIndex < 1 || corEscolhidaIndex > cores.length)) {
        console.log("Escolha inválida, usando 'Vermelho' como padrão.");
        corEscolhidaIndex = 1;
    }

    const corFavorita = cores[corEscolhidaIndex - 1];

    console.log("\nResumo");
    console.log(`Nome: ${nome}`);
    console.log(`Idade: ${idade}`);
    console.log(`cor favorita: ${corFavorita}`);

    rl.close();
}

main();