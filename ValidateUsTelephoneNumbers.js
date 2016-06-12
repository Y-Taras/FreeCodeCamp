function telephoneCheck(str) {
    // Good luck!
    var regexp = /1?\s?(\(\d{3}\)|\d{3})-?\s?\d{3}[-\s]?\d{4}/;
    var myArray = str.match(regexp);
    if (!(myArray)) {
        return false;
    } else if (myArray[0] === myArray['input']) {
        console.log('myArray ', myArray);
        return true;
    } else {
        return false;
    }
}

telephoneCheck("555-555-5555");
