angular.module('notelendar', [])

.controller('notelendarCtrl', ['$scope', 'storage', function ($scope, storage) {

    $scope.editingDay = null;
    $scope.displayedYear = new Date().getFullYear();
    $scope.displayedMonth = new Date().getMonth();

    $scope.monthWeeks = [];

    function calculateWeeks(year, month) {
        var weeks = [],

            notes = storage.retrieve(year, month),

            theFirstDayOfWeek = new Date(year, month, 1).getDay(),
            day = 1 - theFirstDayOfWeek,
            daysInMonth = new Date(year, month + 1, 0).getDate();

        while (day <= daysInMonth) {
            var week = [];
            for (var i = 0; i < 7; i++) {
                week.push(day > 0 && day <= daysInMonth ? { year: year, month: month, date: day, note: notes[day] || '' } : {});
                day++;
            }
            weeks.push(week);
            week = [];
        }

        $scope.monthWeeks = weeks;
    }

    $scope.$watchGroup(['displayedYear', 'displayedMonth'], function (newValues) {
        calculateWeeks(newValues[0], newValues[1]);
    });
    calculateWeeks($scope.displayedYear, $scope.displayedMonth);

    $scope.isCurrent = function (day) {
        var now = new Date;
        return day.year === now.getFullYear() && day.month === now.getMonth() && day.date === now.getDate();
    };

    $scope.editNote = function (day) {
        if (!day.date) return;
        $scope.editingDay = day;
    };

    $scope.saveNote = function (day) {
        storage.save($scope.displayedYear, $scope.displayedMonth, day.date, day.note);
        $scope.editingDay = null;
    };

    $scope.nextMonth = function () {
        $scope.displayedMonth++;
        if ($scope.displayedMonth > 11) {
            $scope.displayedMonth = 0;
            $scope.nextYear();
        }
    };
    $scope.prevMonth = function () {
        $scope.displayedMonth--;
        if ($scope.displayedMonth < 0) {
            $scope.displayedMonth = 11;
            $scope.prevYear();
        }
    };

    $scope.nextYear = function () { $scope.displayedYear++; };
    $scope.prevYear = function () { $scope.displayedYear--; };
}]);