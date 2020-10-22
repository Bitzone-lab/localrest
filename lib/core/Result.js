"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LocalData_1 = require("../data_types/LocalData");
const SystemData_1 = require("../data_types/SystemData");
class Result {
    constructor(data) {
        this.dataMap = new Map();
        this.dataMap = data;
    }
    toDelete() {
        const dataList = [];
        this.dataMap.forEach((data) => {
            if (data instanceof SystemData_1.default && data.isDeleted()) {
                dataList.push(data.get());
            }
        });
        return dataList;
    }
    toUpdate() {
        const dataList = [];
        this.dataMap.forEach((data) => {
            if (data instanceof SystemData_1.default && data.isUpdated()) {
                dataList.push(data.get());
            }
        });
        return dataList;
    }
    toAdd() {
        const dataList = [];
        this.dataMap.forEach((data) => {
            if (data instanceof LocalData_1.default) {
                dataList.push(data.get());
            }
        });
        return dataList;
    }
    all() {
        const dataList = [];
        this.dataMap.forEach((data) => {
            dataList.push(data.get());
        });
        return dataList;
    }
    get hasToUpdate() {
        let has = false;
        this.dataMap.forEach((data) => {
            if (data instanceof SystemData_1.default && data.isUpdated()) {
                has = true;
            }
        });
        return has;
    }
    get hasToDelete() {
        let has = false;
        this.dataMap.forEach((data) => {
            if (data instanceof SystemData_1.default && data.isDeleted()) {
                has = true;
            }
        });
        return has;
    }
    get hasToAdd() {
        let has = false;
        this.dataMap.forEach((data) => {
            if (data instanceof LocalData_1.default) {
                has = true;
            }
        });
        return has;
    }
}
exports.default = Result;
//# sourceMappingURL=Result.js.map