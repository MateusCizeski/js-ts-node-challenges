// Complexidade Temporal: O(3^n * 4^m)
// Onde:
//   n = nº de dígitos que mapeiam para 3 letras (como 2, 3, 4, 5, 6, 8)
//   m = nº de dígitos que mapeiam para 4 letras (como 7, 9)
// Exemplo: "234" → O(3 * 3 * 4) = O(36)
// Complexidade Espacial: O(3^n * 4^m)
// Para armazenar as combinações no array final (não conta a pilha de recursão)

const letterCombinations = function (digits) {
  if (!digits.length) return [];

  const digitToChar = {
    "2": "abc",
    "3": "def",
    "4": "ghi",
    "5": "jkl",
    "6": "mno",
    "7": "pqrs",
    "8": "tuv",
    "9": "wxyz"
  };

  const result = [];

  function backtrack(index, current) {
    if (index === digits.length) {
      result.push(current);
      return;
    }

    const letters = digitToChar[digits[index]];

    for (let ch of letters) {
      backtrack(index + 1, current + ch);
    }
  }

  backtrack(0, "");
  return result;
};

console.log(letterCombinations("23"));
