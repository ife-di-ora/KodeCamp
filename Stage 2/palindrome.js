function palindrome(word) {
  word = word.toLowerCase();
  let isPalindrome = "is a Palindrome";
  for (let i = 0; i < word.length / 2; i++) {
    if (word[i] != word[word.length - i - 1]) {
      isPalindrome = "is NOT a Palindrome";
      break;
    }
  }
  return `${word} ${isPalindrome}`;
}

console.log(palindrome("levdel"));
