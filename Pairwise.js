
function pairwise(arr, arg) {
 var sum = 0;
  var indexes = [];
  for (var i = 0; i < arr.length; i += 1 ){
    for (var j = i + 1; j < arr.length; j += 1){
      if ((arr[i] + arr[j] === arg)&&
         (indexes.indexOf(j) === -1 && (indexes.indexOf(i) === -1))){
        console.log(i, j);
        indexes.push(i, j);
        sum += (i + j);
      }
    }
  }
  console.log('sum = ', sum);
  return sum;
}

pairwise([1, 1, 1], 2);