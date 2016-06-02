function smallestCommons(arr) {
    var multiple = arr[0];
    if (arr[0] > arr[1]) {
        arr.reverse();
    }
    var p1 = arr[0];
    var scm;

    function gcd(a, b) {
        if (b === 0) {
            return a;
        }
        return gcd(b, a % b);
    }

    if (p1 !== arr[1]) {
        var gcd_1;
        for (var i = arr[0] + 1; i <= arr[1]; i++) {
            gcd_1 = gcd(i, p1);
            scm = i * (p1 / gcd_1);
            console.log('gcd(', i, ' , ', p1,') = ', gcd_1, ' scm = ', scm);
            p1 = scm;
        }

        return scm;
    } else {
        return p1;
    }
}


smallestCommons([1, 5]);
