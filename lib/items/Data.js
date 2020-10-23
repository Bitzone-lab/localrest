"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Data = /** @class */ (function () {
    function Data(id, data, helper) {
        this.id = null;
        this.id = id;
        this.data = data;
        this.helper = helper;
    }
    Data.prototype.hasId = function () {
        return !!this.id;
    };
    Data.prototype.get = function () {
        return {
            data: this.data,
            helper: this.helper,
            id: this.id
        };
    };
    return Data;
}());
exports.default = Data;
