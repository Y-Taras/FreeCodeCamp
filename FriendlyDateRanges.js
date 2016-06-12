function makeFriendlyDates(arr) {
    var monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var diffDate = (Date.parse(arr[1]) - Date.parse(arr[0])) / (1000 * 60 * 60 * 24 * 365);
    console.log('diffDate ', diffDate);

    function formatDay(day) {
        switch (day % 20) {
            case 1:
                return day + 'st';
            case 2:
                return day + 'nd';
            case 3:
                return day + 'rd';
            default:
                return day + 'th';
        }
    }

    function dateToInt(arr) {
        return arr.map(function(str) {
            return parseInt(str);
        });
    }

    var date1 = arr[0].split('-');
    var date2 = arr[1].split('-');
    var dateNum1 = dateToInt(date1);
    console.log('dateNum1 ', dateNum1);
    var dateNum2 = dateToInt(date2);
    var arr1 = [];
    var str = "";
    console.log('diffDate ', diffDate);
    // Handles more or equal one year
    if (diffDate >= 1) {

        arr1.push(monthArr[dateNum1[1]-1] + " " + formatDay(dateNum1[2]) + ', ' + dateNum1[0]);
        arr1.push(monthArr[dateNum2[1]-1] + " " + formatDay(dateNum2[2]) + ', ' + dateNum2[0]);   
    // Handles same day    
    } else if ((date1[1] === date2[1]) && (date1[2] === date2[2])) {

        arr1.push(monthArr[dateNum1[1]-1] + " " + formatDay(dateNum1[2]) + ', ' + dateNum1[0]);
    // Handles same month and year    
    } else if (date1[1] === date2[1] && (date1[0] === date2[0])) {

        arr1.push(monthArr[dateNum1[1]-1] + " " + formatDay(dateNum1[2]));
        arr1.push(formatDay(dateNum2[2]));
    // Handles different month and year, but within one year
    } else if (date1[1] !== date2[1] && (date1[0] !== date2[0])) {

        arr1.push(monthArr[dateNum1[1]-1] + " " + formatDay(dateNum1[2]));
        arr1.push(monthArr[dateNum2[1]-1] + " " + formatDay(dateNum2[2]));
    // Handles other cases within same year
    } else {

        arr1.push(monthArr[dateNum1[1]-1] + " " + formatDay(dateNum1[2]) + ', ' + dateNum1[0]);
        arr1.push(monthArr[dateNum2[1]-1] + " " + formatDay(dateNum2[2]));

    }
    return arr1;
}
makeFriendlyDates(['2016-07-01', '2016-07-04']);