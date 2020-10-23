"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Methods_1 = require("./core/Methods");
var Result_1 = require("./core/Result");
var LocalData_1 = require("./data_types/LocalData");
var SystemData_1 = require("./data_types/SystemData");
var LocalRest = /** @class */ (function (_super) {
    __extends(LocalRest, _super);
    function LocalRest(initial_list, helper) {
        if (initial_list === void 0) { initial_list = []; }
        var _this = _super.call(this) || this;
        _this.init(initial_list, helper);
        return _this;
    }
    LocalRest.prototype.init = function (initial_list, helper) {
        var _this = this;
        if (initial_list === void 0) { initial_list = []; }
        this.defaultHelper = helper;
        this.collections.clear();
        initial_list.map(function (data) {
            if (data.id) {
                var systemData = new SystemData_1.default(data, _this.defaultHelper);
                _this.collections.set(data.id, systemData);
            }
            else {
                var localData = new LocalData_1.default(data, _this.defaultHelper);
                _this.collections.set(_this.generator.getID(), localData);
            }
        });
    };
    LocalRest.prototype.reset = function (to) {
        var _this = this;
        if (to === void 0) { to = 'all'; }
        switch (to) {
            case 'validations':
                this.collections.forEach(function (data) {
                    data.restartValidation();
                });
                return true;
            case 'helper':
                this.collections.forEach(function (data) {
                    data.helper_value = _this.defaultHelper;
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
                this.collections.forEach(function (data) {
                    data.helper_value = _this.defaultHelper;
                });
                return true;
            default:
                if (Number.isInteger(to)) {
                    var data = this.collections.get(to);
                    if (data === undefined)
                        return false;
                    data.reset();
                    return true;
                }
                return false;
        }
    };
    LocalRest.prototype.valid = function (id, fieldname, message) {
        var data = this.collections.get(id);
        if (data === undefined)
            return false;
        data.valid(fieldname, message);
        return true;
    };
    LocalRest.prototype.validation = function (id, valids) {
        var data = this.collections.get(id);
        if (data !== undefined) {
            for (var key in valids) {
                var message = valids[key] || '';
                data.valid(key, message);
            }
            return true;
        }
        return false;
    };
    LocalRest.prototype.hasChange = function (id, fieldname) {
        var changes = false;
        if (id) {
            var data = this.collections.get(id);
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
    };
    LocalRest.prototype.whoChange = function (id) {
        var data = this.collections.get(id);
        var fields = {};
        if (data === undefined)
            return fields;
        for (var fieldname in data.get()) {
            if (data.hasChange(fieldname)) {
                fields[fieldname] = data.get()[fieldname];
            }
        }
        return fields;
    };
    LocalRest.prototype.helper = function (id, helper) {
        var data = this.collections.get(id);
        if (data === undefined)
            return null;
        if (helper !== undefined) {
            return data.helper(helper) || null;
        }
        var helper_value = data.helper();
        return helper_value === undefined ? null : helper_value;
    };
    LocalRest.prototype.result = function () {
        return new Result_1.default(this.collections);
    };
    return LocalRest;
}(Methods_1.default));
exports.default = LocalRest;
