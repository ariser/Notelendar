angular.module('notelendar')

.filter('monthName', function () {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return function (monthIndex) {
        return months[monthIndex];
    }
});