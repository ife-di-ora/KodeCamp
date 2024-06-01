function formatThousand(number) {
  const formattedNumber = new Intl.NumberFormat().format(number);
  return formattedNumber;
}

console.log(formatThousand(10400000));
