//O(n2)
//dessa maneira é feito com força burta e pode não ser perfomático em array com muitos elementos
function twoSum1(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
}

console.log(twoSum1([2, 7, 11, 15], 9));

//tempo O(n2)
//espaço O(1)
//dessa maneira esse algoritmo escala melhor com array maiores
function twoSum2(nums, target) {
  const map = {};

  for (let i = 0; i < nums.length; i++) {
    const complemento = target - nums[i];

    if (map.hasOwnProperty(complemento)) {
      return [map[complemento], i];
    }

    map[nums[i]] = i;
  }
}

console.log(twoSum2([2, 7, 11, 15], 9));
