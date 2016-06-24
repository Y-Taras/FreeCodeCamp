function steamrollArray(arr) {
    // I'm a steamroller, baby
    var emptyArray = [];

    function checkArr(arr) {
        for (var i = 0; i < arr.length; i++) {

            if (Array.isArray(arr[i])) {
                checkArr(arr[i]);
            } else {
                emptyArray.push(arr[i]);
                console.log('emptyArray ', emptyArray);
            }
        }
    }
    checkArr(arr);
    return emptyArray;
}


steamrollArray([1, [2], [3, [[4]]]]);
