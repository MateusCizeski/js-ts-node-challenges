function isPalindrome(x) {
  if(x < 0 || (x % 10 === 0 && x !== 0)) return false;

  let revertd = 0;

  while (x > revertd) {
    revertd = revertd * 10 + (x % 10);
    x = Math.floor(x / 10);
  }

  return x === revertd || x === Math.floor(revertd / 10);
}

console.log(isPalindrome(121));
console.log(isPalindrome(-121));
console.log(isPalindrome(10));
console.log(isPalindrome(12321));