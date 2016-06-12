function sym(args) {
    var arr = [];
    var temp = [];
    arr.length = arguments.length;

    function filtered(arr1, arr2) {
        var temp = [];
        temp = arr1.filter(function(item) {
            return (arr2.indexOf(item) === -1);
        });
        temp = temp.concat(arr2.filter(function(item) {
            return (arr1.indexOf(item) === -1);
        }));

        return (temp.filter(function(item, pos, self) {
        	return (self.indexOf(item) === pos);
        }));
    }

    for (var i = 0; i < arguments.length; i++) {
        arr[i] = Array.prototype.slice.call(arguments[i]);
    }

    temp = filtered(arr[0], arr[1]);

    for (i = 2; i < arr.length; i++) {
        temp = filtered(temp, arr[i]);

    }

console.log('temp ', temp);
    return temp;
}

sym([1, 2, 3], [5, 2, 1, 4]);
