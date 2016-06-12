function orbitalPeriod(arr) {
    var GM = 398600.4418;
    var earthRadius = 6367.4447;


    var t = function(avgAlt) {
    	return Math.round(2 * Math.PI * Math.sqrt(Math.pow((earthRadius + avgAlt), 3) / GM));
    };

    var arr1 = [];

    for (var i = 0; i < arr.length; i++) {
    	arr1.push({name : arr[i].name, orbitalPeriod: t(arr[i].avgAlt)});
    }

    for (var prop in arr[0]) {
        console.log("obj." + prop + " = " + arr[0][prop]);
    }

    
    console.log('arr1 ' , arr1);
    return arr1;
}

orbitalPeriod([{ name: "sputnik", avgAlt: 35873.5553 }]);
