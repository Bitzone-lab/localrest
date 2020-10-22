"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Methods_1 = require("./core/Methods");
const Result_1 = require("./core/Result");
const LocalData_1 = require("./data_types/LocalData");
const SystemData_1 = require("./data_types/SystemData");
class LocalRest extends Methods_1.default {
    constructor(initial_list = [], helper) {
        super();
        this.init(initial_list, helper);
    }
    init(initial_list = [], helper) {
        this.defaultHelper = helper;
        this.collections.clear();
        initial_list.map((data) => {
            if (data.id) {
                const systemData = new SystemData_1.default(data, this.defaultHelper);
                this.collections.set(data.id, systemData);
            }
            else {
                const localData = new LocalData_1.default(data, this.defaultHelper);
                this.collections.set(this.generator.getID(), localData);
            }
        });
    }
    reset(to = 'all') {
        switch (to) {
            case 'validations':
                this.collections.forEach(function (data) {
                    data.restartValidation();
                });
                return true;
            case 'helper':
                this.collections.forEach((data) => {
                    data.helper_value = this.defaultHelper;
                });
                return true;
            case 'list':
                this.collections.clear();
                return true;
            case 'all':
                this.collections.forEach(function (data) {
                    data.restartValidation();
                });
                this.collections.clear();
                this.collections.forEach((data) => {
                    data.helper_value = this.defaultHelper;
                });
                return true;
            default:
                return false;
        }
    }
    valid(id, fieldname, message) {
        const data = this.collections.get(id);
        if (data === undefined)
            return false;
        data.valid(fieldname, message);
        return true;
    }
    validation(id, valids) {
        const data = this.collections.get(id);
        if (data !== undefined) {
            for (const key in valids) {
                const message = valids[key] || '';
                data.valid(key, message);
            }
            return true;
        }
        return false;
    }
    hasChange(id, fieldname) {
        let changes = false;
        if (id) {
            const data = this.collections.get(id);
            if (data !== undefined) {
                changes = data.hasChange(fieldname);
            }
        }
        else {
            this.collections.forEach(function (data) {
                if (!changes) {
                    changes = data.hasChange();
                }
            });
        }
        return changes;
    }
    whoChange(id) {
        const data = this.collections.get(id);
        const fields = {};
        if (data === undefined)
            return fields;
        for (const fieldname in data.get()) {
            if (data.hasChange(fieldname)) {
                fields[fieldname] = data.get()[fieldname];
            }
        }
        return fields;
    }
    helper(id, helper) {
        const data = this.collections.get(id);
        if (data === undefined)
            return null;
        if (helper !== undefined) {
            return data.helper(helper) || null;
        }
        const helper_value = data.helper();
        return helper_value === undefined ? null : helper_value;
    }
    result() {
        return new Result_1.default(this.collections);
    }
}
exports.default = LocalRest;
//# sourceMappingURL=index.js.map