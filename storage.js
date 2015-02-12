angular.module('notelendar')

.factory('storage', function () {

    function getId(year, month) {
        return 'ntlndr' + year + month;
    }

    return {
        save: function (year, month, day, note) {
            var id = getId(year, month);
            var allNotes = localStorage.getItem(id);
            allNotes = allNotes ? JSON.parse(allNotes) : {};
            allNotes[day] = note;
            localStorage.setItem(id, JSON.stringify(allNotes));
        },
        retrieve: function (year, month) {
            var allNotes = localStorage.getItem(getId(year, month));
            return allNotes ? JSON.parse(allNotes) : {};
        }
    };
});