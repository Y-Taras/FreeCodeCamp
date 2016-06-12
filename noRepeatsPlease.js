function permAlone(str) {
    var arr = str.split("");
    var n = arr.length;
    var regex = /(.)\1/;
    var tempArr = [];


    function swap(index, index1) {
        var temp = arr[index];
        arr[index] = arr[index1];
        arr[index1] = temp;
    }

    function generate(n, arr) {

        if (n === 1) {
            tempArr.push(arr.join(''));
        } else {
            for (var i = 0; i < n; i += 1) {
                generate(n - 1, arr);
                n % 2 === 0 ? swap(i, n - 1) : swap(0, n - 1);
            }
        }
    }

    generate(n, arr);
    console.log('tempArr ', tempArr);

    tempArr = tempArr.filter(function(elem) {
        return !elem.match(regex);
    });
    console.log('tempArr ', tempArr);

    return tempArr.length;
}

permAlone('acb');
