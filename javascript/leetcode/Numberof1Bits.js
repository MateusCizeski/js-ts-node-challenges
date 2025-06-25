//Complexidade Espacial O(1) idependente do toamanho do inteiro só é criado uma variável.
//A alocação da memória é constante idependente do input.
//Complexidade Temporal O(n). Como n é um inteiro de 32 bits, ele sempre terá no máximo 32 iterações, uma para cada bit.
// Portanto, o tempo de execução não cresce com o valor de n de forma geral (não importa se é 3, 1000 ou 2^30).
// Por isso, a complexidade é O(1) (tempo constante) nesse contexto.

var hammingWeight = function (n) {
  let count = 0;
  while (n !== 0) {
    count += n & 1;
    n >>>= 1;
  }
  return count;
};

console.log(hammingWeight(7));
