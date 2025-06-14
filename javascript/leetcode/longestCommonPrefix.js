function longestCommonPrefix(strs) {
  if (!strs.length) return "";

  let prefixo = strs[0];

  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefixo) !== 0) {
      prefixo = prefixo.slice(0, -1);

      if (!prefixo) return "";
    }
  }

  return prefixo;
}

console.log(longestCommonPrefix(["flor", "fluxo", "voo"]));
console.log(longestCommonPrefix(["cachorro", "carro de corrida", "carro"]));
console.log(longestCommonPrefix(["flores", "flor", "floricultura"]));
console.log(longestCommonPrefix(["a"]));
console.log(longestCommonPrefix([""]));
