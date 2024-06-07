function formatThousand(number) {
  const formattedNumber = new Intl.NumberFormat().format(number);
  return formattedNumber;
}
