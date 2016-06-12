function checkCashRegister(price, cash, cid) {
    var sumCID = null;
    var changeSum = cash - price;
    for (var i = 0; i < cid.length; i++) {
        sumCID += cid[i][1];
    }
    // Here is your change, ma'am.
    sumCID = Math.round(sumCID * 100) / 100;

    if (sumCID < changeSum) {
        return "Insufficient Funds";
    } else if (sumCID === changeSum) {
        return "Closed";
    } else {
        return change();
    }

    function change() {
        var tempArr = [
            ["PENNY", 0],
            ["NICKEL", 0],
            ["DIME", 0],
            ["QUARTER", 0],
            ["ONE", 0],
            ["FIVE", 0],
            ["TEN", 0],
            ["TWENTY", 0],
            ["ONE HUNDRED", 0]
        ];
        var bills = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
        for (var i = cid.length - 1; i >= 0; i--) {
            while ((cid[i][1] >= bills[i]) && (changeSum >= bills[i])) {
            	console.log('--beginning of while -','i', i, 'changeSum', changeSum, 'cid', cid[i][1], 'tempArr', tempArr[i][1], 'bills', bills[i]);
                changeSum -= bills[i];
                changeSum = Math.round(changeSum * 100) / 100;
                cid[i][1] -= bills[i];
                tempArr[i][1] += bills[i];
                console.log('--end of while -','i', i, 'changeSum', changeSum, 'cid', cid[i][1], 'tempArr', tempArr[i][1], 'bills', bills[i]);
            }
            if (i === 0) {
            	if (changeSum) {
            		return "Insufficient Funds";
            	} 
                for (j = tempArr.length - 1; j >= 0; j--) {
                    if (tempArr[j][1] === 0) {
                        tempArr.splice(j, 1);
                    }
                }
            }
        }
        console.log('tempArr ', tempArr);
        return tempArr.reverse();

    }
}

checkCashRegister(3.26, 100.00, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.10],
    ["QUARTER", 4.25],
    ["ONE", 90.00],
    ["FIVE", 55.00],
    ["TEN", 20.00],
    ["TWENTY", 60.00],
    ["ONE HUNDRED", 100.00]
]);
