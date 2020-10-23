"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Field = /** @class */ (function () {
    function Field(value) {
        this._value = value;
        this.backup = JSON.stringify(value);
    }
    Field.prototype.hasChange = function () {
        if (this.backup === JSON.stringify(this._value)) {
            return false;
        }
        else {
            return true;
        }
    };
    Field.prototype.update = function (value) {
        this._value = value;
    };
    Object.defineProperty(Field.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    Field.prototype.reset = function () {
        this._value = JSON.parse(this.backup);
    };
    return Field;
}());
exports.default = Field;
