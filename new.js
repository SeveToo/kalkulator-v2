const StringToNominatorDemenominator = 
  (x) => [Number(x.split("/")[0]), Number(x.split("/")[1])];

console.log(StringToNominatorDemenominator("2/3"));