angular.module('notelendar')

.directive('nrFocus', ['$timeout', function ($timeout) {
    return function (scope, elem, attrs) {
        scope.$watch(attrs.nrFocus, function (val) {
            if (val) $timeout(function () { elem[0].focus(); }, 0, false);
        });
    }
}])

.directive('nrCtrlEnter', function () {

    var ENTER_KEY_CODE = 13;

    return function (scope, elem, attrs) {
        elem.bind('keydown', function (e) {
            if (e.ctrlKey && e.keyCode === ENTER_KEY_CODE) {
                scope.$apply(attrs.nrCtrlEnter);
            }
        });
    }
})

.directive('nrOverflowTitle', function () {
    return function (scope, elem, attrs) {
        scope.$watch(
            function () {
                return elem.html();
            },
            function () {
                var _elem = elem[0];
                if (_elem.scrollWidth - _elem.clientWidth > 1
                    || _elem.scrollHeight - _elem.clientHeight > 1) {
                    _elem.title = elem.html();
                } else {
                    _elem.title = '';
                }
            }
        );
    };
});