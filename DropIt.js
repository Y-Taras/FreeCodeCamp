function dropElements(arr, func) {
    // Drop them elements.
    for (var i = 0; i < arr.length; i++) {
        console.log('i ', i);

        if (func(arr[i])) {
            console.log('arr[i] ', arr[i]);
            arr.splice(0, i);
            return arr;
        }
        if (!(func(arr[i])) && (i === arr.length - 1)) {
            return [];
        }
    }
}

dropElements([1, 2, 3], function(n) {
    return n < 3;
});
