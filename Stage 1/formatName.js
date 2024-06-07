function formatName(name) {
  const formattedName = name
    .trim() // trim white spaces off the edges
    .split(" ") // separate words
    .map((name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()) // map over words, capitalize first Character and make other letters small then reassemble
    .join(" "); // join names back together

  return formattedName;
}
