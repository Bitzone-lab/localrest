"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LocalData_1 = require("../data_types/LocalData");
const SystemData_1 = require("../data_types/SystemData");
const utils_1 = require("../utils");
const Store_1 = require("./Store");
class Methods extends Store_1.default {
    constructor() {
        super(...arguments);
        this.generator = utils_1.generator();
    }
    set(id, body, helper) {
        const systemData = new SystemData_1.default(body, helper || this.defaultHelper);
        this.collections.set(id, systemData);
        return Object.assign(Object.assign({}, systemData.get()), { id });
    }
    get(id) {
        const data = this.collections.get(id);
        if (data === undefined)
            return null;
        return Object.assign(Object.assign({}, data.get()), { id });
    }
    add(body) {
        const id = this.generator.getID();
        const localData = new LocalData_1.default(body, this.defaultHelper);
        this.collections.set(id, localData);
        return Object.assign(Object.assign({}, localData.get()), { id });
    }
    update(id, body) {
        const data = this.collections.get(id);
        if (data === undefined)
            return false;
        if (data instanceof SystemData_1.default) {
            data.willBeUpdated(body);
        }
        if (data instanceof LocalData_1.default) {
            data.update(body);
        }
        return true;
    }
    delete(id) {
        const data = this.collections.get(id);
        if (data === undefined)
            return false;
        if (data instanceof SystemData_1.default) {
            data.willBeDeleted();
        }
        else {
            this.collections.delete(id);
        }
        return true;
    }
    list() {
        const list = [];
        this.collections.forEach(function (data, id) {
            if (data instanceof SystemData_1.default && !data.isDeleted()) {
                list.push(Object.assign(Object.assign({}, data.get()), { id }));
            }
            else if (data instanceof LocalData_1.default) {
                list.push(Object.assign(Object.assign({}, data.get()), { id }));
            }
        });
        return list;
    }
    get size() {
        return this.list().length;
    }
    /**
     * Maping list
     * @param callbackfn iterator
     */
    each(callbackfn) {
        const list = [];
        this.collections.forEach(function (data, id) {
            if (data instanceof SystemData_1.default && !data.isDeleted()) {
                list.push(callbackfn(Object.assign(Object.assign({}, data.get()), { id }), Object.assign({}, data.validations), data.helper_value));
            }
            else if (data instanceof LocalData_1.default) {
                list.push(callbackfn(Object.assign(Object.assign({}, data.get()), { id }), Object.assign({}, data.validations), data.helper_value));
            }
        });
        return list;
    }
}
exports.default = Methods;
//# sourceMappingURL=Methods.js.map