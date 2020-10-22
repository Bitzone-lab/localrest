"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Field_1 = require("./Field");
class DataBase {
    constructor(values, helper) {
        this.validations = {};
        this.fields = {};
        this.value = values;
        this.helper_value = helper;
        for (const key in values) {
            this.validations[key] = '';
            const field = new Field_1.default(values[key]);
            this.fields[key] = field;
        }
    }
    get() {
        return this.value;
    }
    /**
     * Update and return helper, update is optional
     * @param helper Helper
     */
    helper(helper) {
        if (helper !== undefined) {
            this.helper_value = helper;
        }
        return this.helper_value;
    }
    valid(field, message) {
        this.validations[field] = message;
    }
    restartValidation() {
        for (const key in this.validations) {
            this.validations[key] = '';
        }
    }
    hasChange(fieldname) {
        let changes = false;
        if (fieldname === undefined) {
            for (const key in this.fields) {
                if (changes)
                    break;
                changes = this.fields[key].hasChange();
            }
        }
        else {
            changes = this.fields[fieldname].hasChange();
        }
        return changes;
    }
}
exports.default = DataBase;
//# sourceMappingURL=DataBase.js.map