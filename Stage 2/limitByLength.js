function limitByLength(sampleString) {
  if (sampleString.length > 100) {
    return sampleString.slice(0, 100).concat("...");
  } else {
    return sampleString;
  }
}
