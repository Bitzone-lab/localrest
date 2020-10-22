"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataBase_1 = require("./DataBase");
class SystemData extends DataBase_1.default {
    constructor(body, helper) {
        super(body, helper);
        this.deleted = false;
        this.updated = false;
    }
    willBeDeleted() {
        this.deleted = true;
    }
    willBeUpdated(body) {
        this.value = Object.assign(Object.assign({}, this.get()), body);
        for (const key in body) {
            this.fields[key].update(body[key]);
        }
        this.updated = true;
    }
    isDeleted() {
        return this.deleted;
    }
    isUpdated() {
        return this.updated;
    }
}
exports.default = SystemData;
//# sourceMappingURL=SystemData.js.map