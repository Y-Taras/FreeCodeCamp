function updateInventory(arr1, arr2) {
    // All inventory must be accounted for or you're fired!
    for (var i = 0; i < arr2.length; i++) {
        for (var j = 0; j < arr1.length; j++) {
            if (arr2[i][1] === arr1[j][1]) {
                arr1[j][0] += arr2[i][0];
                arr2.splice(i, 1);
            }
        }
    }
    arr1 = arr1.concat(arr2);

    arr1.sort(function(arrA, arrB) {
        if (arrA[1] < arrB[1]) {
            return -1;
        }
        if (arrA[1] > arrB[1]) {
            return 1;
        }
        return 0;
    });

    console.log('arr1 ', arr1);
    return arr1;
}

// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

updateInventory(curInv, newInv);
