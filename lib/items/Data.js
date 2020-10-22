"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Data {
    constructor(id, data, helper) {
        this.id = null;
        this.id = id;
        this.data = data;
        this.helper = helper;
    }
    hasId() {
        return !!this.id;
    }
    get() {
        return {
            data: this.data,
            helper: this.helper,
            id: this.id
        };
    }
}
exports.default = Data;
//# sourceMappingURL=Data.js.map