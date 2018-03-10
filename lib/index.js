'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.shallowEqual = undefined;
exports.repureOneCacheCreator = repureOneCacheCreator;
exports.repureCreator = repureCreator;

var _util = require('./util');

var _shallowEqual2 = require('./shallowEqual');

var _shallowEqual3 = _interopRequireDefault(_shallowEqual2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.shallowEqual = _shallowEqual3.default;
function repureOneCacheCreator(equalityCheck) {
    return function repure(func) {
        var oldargs = [];
        var oldresult = null;

        return function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            if ((0, _util.argsEqual)(oldargs, args, equalityCheck)) {
                return oldresult;
            } else {
                oldargs = args;
                oldresult = func.apply(undefined, args);
                return oldresult;
            }
        };
    };
}

function repureCreator(cacheSize, equalityCheck) {
    return function repure(func) {
        var oldargsArray = [];
        var oldresult = [];

        return function () {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            var argsIndex = (0, _util.getArgsIndex)(oldargsArray, args, equalityCheck);
            if (argsIndex !== undefined) {
                return oldresult[argsIndex];
            } else {
                var result = func.apply(undefined, args);
                oldargsArray.push(args);
                oldresult.push(result);
                if (oldargsArray.length > cacheSize) {
                    oldargsArray.shift();
                    oldresult.shift();
                }
                return result;
            }
        };
    };
}

exports.default = repureOneCacheCreator(_util.defaultEqualityCheck);