angular.module('notelendar', [])

.controller('notelendarCtrl', ['$scope', 'storage', function ($scope, storage) {

    $scope.editingDay = null;
    $scope.currentYear = new Date().getFullYear();
    $scope.currentMonth = new Date().getMonth();

    $scope.monthWeeks = [];

    function calculateWeeks(year, month) {
        var weeks = [],

            notes = storage.retrieve(year, month),

            theFirstDayOfWeek = new Date(year, month, 1).getDay(),
            currentDay = 1 - theFirstDayOfWeek,
            daysInMonth = new Date(year, month + 1, 0).getDate();

        while (currentDay <= daysInMonth) {
            var week = [];
            for (var i = 0; i < 7; i++) {
                week.push(currentDay > 0 && currentDay <= daysInMonth ? { date: currentDay, note: notes[currentDay] || '' } : {});
                currentDay++;
            }
            weeks.push(week);
            week = [];
        }

        $scope.monthWeeks = weeks;
    }

    $scope.$watchGroup(['currentYear', 'currentMonth'], function (newValues) {
        calculateWeeks(newValues[0], newValues[1]);
    });
    calculateWeeks($scope.currentYear, $scope.currentMonth);

    $scope.editNote = function (day) {
        if (!day.date) return;
        $scope.editingDay = day;
    };

    $scope.saveNote = function (day) {
        storage.save($scope.currentYear, $scope.currentMonth, day.date, day.note);
        $scope.editingDay = null;
    };

    $scope.nextMonth = function () {
        $scope.currentMonth++;
        if ($scope.currentMonth > 11) {
            $scope.currentMonth = 0;
            $scope.nextYear();
        }
    };
    $scope.prevMonth = function () {
        $scope.currentMonth--;
        if ($scope.currentMonth < 0) {
            $scope.currentMonth = 11;
            $scope.prevYear();
        }
    };

    $scope.nextYear = function () { $scope.currentYear++; };
    $scope.prevYear = function () { $scope.currentYear--; };
}]);