"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getArgsIndex = getArgsIndex;
exports.argsEqual = argsEqual;
exports.defaultEqualityCheck = defaultEqualityCheck;
function getArgsIndex(oldargsArray, args, equalityCheck) {
    for (var i = 0; i < oldargsArray.length; i++) {
        var oi = oldargsArray[i];
        if (argsEqual(oi, args, equalityCheck)) {
            return i;
        }
    }
}

function argsEqual(arr1, arr2) {
    var equalityCheck = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultEqualityCheck;

    if (arr1.length !== arr2.length) return false;

    for (var i = 0; i < arr1.length; i++) {
        if (!equalityCheck(arr1[i], arr2[i])) return false;
    }

    return true;
}

function defaultEqualityCheck(a, b) {
    return a === b;
}