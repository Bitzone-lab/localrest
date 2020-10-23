"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LocalData_1 = require("../data_types/LocalData");
var SystemData_1 = require("../data_types/SystemData");
var Result = /** @class */ (function () {
    function Result(data) {
        this.dataMap = new Map();
        this.dataMap = data;
    }
    Result.prototype.toDelete = function () {
        var dataList = [];
        this.dataMap.forEach(function (data) {
            if (data instanceof SystemData_1.default && data.isDeleted()) {
                dataList.push(data.get());
            }
        });
        return dataList;
    };
    Result.prototype.toUpdate = function () {
        var dataList = [];
        this.dataMap.forEach(function (data) {
            if (data instanceof SystemData_1.default && data.isUpdated()) {
                dataList.push(data.get());
            }
        });
        return dataList;
    };
    Result.prototype.toAdd = function () {
        var dataList = [];
        this.dataMap.forEach(function (data) {
            if (data instanceof LocalData_1.default) {
                dataList.push(data.get());
            }
        });
        return dataList;
    };
    Result.prototype.all = function () {
        var dataList = [];
        this.dataMap.forEach(function (data) {
            dataList.push(data.get());
        });
        return dataList;
    };
    Object.defineProperty(Result.prototype, "hasToUpdate", {
        get: function () {
            var has = false;
            this.dataMap.forEach(function (data) {
                if (data instanceof SystemData_1.default && data.isUpdated()) {
                    has = true;
                }
            });
            return has;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "hasToDelete", {
        get: function () {
            var has = false;
            this.dataMap.forEach(function (data) {
                if (data instanceof SystemData_1.default && data.isDeleted()) {
                    has = true;
                }
            });
            return has;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Result.prototype, "hasToAdd", {
        get: function () {
            var has = false;
            this.dataMap.forEach(function (data) {
                if (data instanceof LocalData_1.default) {
                    has = true;
                }
            });
            return has;
        },
        enumerable: false,
        configurable: true
    });
    return Result;
}());
exports.default = Result;
