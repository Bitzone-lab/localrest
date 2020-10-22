"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Field {
    constructor(value) {
        this._value = value;
        this.backup = JSON.stringify(value);
    }
    hasChange() {
        if (this.backup === JSON.stringify(this._value)) {
            return false;
        }
        else {
            return true;
        }
    }
    update(value) {
        this._value = value;
    }
    get value() {
        return this._value;
    }
}
exports.default = Field;
//# sourceMappingURL=Field.js.map