import { r as react } from './common/index-8f144fe1.js';
import './common/_commonjsHelpers-f5d70792.js';

var useInterval = function (callback, delay) {
    var savedCallback = react.useRef(function () { });
    react.useEffect(function () {
        savedCallback.current = callback;
    });
    react.useEffect(function () {
        if (delay !== null) {
            var interval_1 = setInterval(function () { return savedCallback.current(); }, delay || 0);
            return function () { return clearInterval(interval_1); };
        }
        return undefined;
    }, [delay]);
};

export { useInterval };
