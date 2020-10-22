"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataBase_1 = require("./DataBase");
class LocalData extends DataBase_1.default {
    constructor(body, helper) {
        super(body, helper);
    }
    update(body) {
        this.value = Object.assign(Object.assign({}, this.get()), body);
        for (const key in body) {
            this.fields[key].update(body[key]);
        }
    }
}
exports.default = LocalData;
//# sourceMappingURL=LocalData.js.map