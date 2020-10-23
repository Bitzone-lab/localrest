"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generator = void 0;
function generator() {
    var count = 0;
    function getID() {
        count++;
        return new Date().valueOf() + count;
    }
    return {
        getID: getID
    };
}
exports.generator = generator;
