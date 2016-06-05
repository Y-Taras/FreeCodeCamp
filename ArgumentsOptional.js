function addTogether() {
    var x = arguments[0];
    if ((typeof(arguments[0]) !== 'number') ||
        ((typeof(arguments[1]) !== 'number') && (arguments[1] !== undefined))) {
        console.log('first if');
        return undefined;
    } else {
        if (arguments[1] === undefined) {
            console.log('second if');
            return function(y) {
                if (typeof y === 'number') {
                    return x + y;
                } else {
                    return undefined;
                }
            };
        }
    }
    return arguments[0] + arguments[1];
}

addTogether(2, 3);
