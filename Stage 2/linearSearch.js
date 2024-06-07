function linearSearch(str, arrOfStrs) {
  for (let i = 0; i < arrOfStrs.length; i++) {
    if (arrOfStrs[i] == str) {
      return "Yes, the string exists in the array";
    }
  }
  return "No, the string does not exist in the array";
}

console.log(
  linearSearch("james is asleep", [
    "john is here",
    "naomi sings a lot",
    "james is asleep",
  ])
);
