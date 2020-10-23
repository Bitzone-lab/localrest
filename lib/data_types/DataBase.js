"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Field_1 = require("./Field");
var DataBase = /** @class */ (function () {
    function DataBase(values, helper) {
        this.validations = {};
        this.fields = {};
        this.value = values;
        this.helper_value = helper;
        for (var key in values) {
            this.validations[key] = '';
            var field = new Field_1.default(values[key]);
            this.fields[key] = field;
        }
    }
    DataBase.prototype.get = function () {
        return this.value;
    };
    /**
     * Update and return helper, update is optional
     * @param helper Helper
     */
    DataBase.prototype.helper = function (helper) {
        if (helper !== undefined) {
            this.helper_value = helper;
        }
        return this.helper_value;
    };
    DataBase.prototype.valid = function (field, message) {
        this.validations[field] = message;
    };
    DataBase.prototype.restartValidation = function () {
        for (var key in this.validations) {
            this.validations[key] = '';
        }
    };
    DataBase.prototype.hasChange = function (fieldname) {
        var changes = false;
        if (fieldname === undefined) {
            for (var key in this.fields) {
                if (changes)
                    break;
                changes = this.fields[key].hasChange();
            }
        }
        else {
            changes = this.fields[fieldname].hasChange();
        }
        return changes;
    };
    DataBase.prototype.reset = function () {
        for (var key in this.fields) {
            this.fields[key].reset();
        }
    };
    return DataBase;
}());
exports.default = DataBase;
