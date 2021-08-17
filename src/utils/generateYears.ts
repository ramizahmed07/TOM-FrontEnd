export function generateArrayOfYears(count: number) {
  var max = new Date().getFullYear();
  var min = max - count;
  var years = [];

  for (var i = max; i >= min; i--) {
    years.push(i);
  }
  return years;
}
