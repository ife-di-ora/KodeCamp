// a function to remove duplicate numbers and return an array of unique elements
function removeDuplicate(array) {
  let unique = [];
  array.map((item) => {
    if (!unique.includes(item)) {
      unique.push(item);
    }
  });
  return unique;
}
