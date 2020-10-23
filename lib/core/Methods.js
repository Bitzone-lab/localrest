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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var LocalData_1 = require("../data_types/LocalData");
var SystemData_1 = require("../data_types/SystemData");
var utils_1 = require("../utils");
var Store_1 = require("./Store");
var Methods = /** @class */ (function (_super) {
    __extends(Methods, _super);
    function Methods() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.generator = utils_1.generator();
        return _this;
    }
    Methods.prototype.set = function (id, body, helper) {
        var systemData = new SystemData_1.default(body, helper || this.defaultHelper);
        this.collections.set(id, systemData);
        return __assign(__assign({}, systemData.get()), { id: id });
    };
    Methods.prototype.get = function (id) {
        var data = this.collections.get(id);
        if (data === undefined)
            return null;
        return __assign(__assign({}, data.get()), { id: id });
    };
    Methods.prototype.add = function (body) {
        var id = this.generator.getID();
        var localData = new LocalData_1.default(body, this.defaultHelper);
        this.collections.set(id, localData);
        return __assign(__assign({}, localData.get()), { id: id });
    };
    Methods.prototype.update = function (id, body) {
        var data = this.collections.get(id);
        if (data === undefined)
            return false;
        if (data instanceof SystemData_1.default) {
            data.willBeUpdated(body);
        }
        if (data instanceof LocalData_1.default) {
            data.update(body);
        }
        return true;
    };
    Methods.prototype.delete = function (id) {
        var data = this.collections.get(id);
        if (data === undefined)
            return false;
        if (data instanceof SystemData_1.default) {
            data.willBeDeleted();
        }
        else {
            this.collections.delete(id);
        }
        return true;
    };
    Methods.prototype.list = function () {
        var list = [];
        this.collections.forEach(function (data, id) {
            if (data instanceof SystemData_1.default && !data.isDeleted()) {
                list.push(__assign(__assign({}, data.get()), { id: id }));
            }
            else if (data instanceof LocalData_1.default) {
                list.push(__assign(__assign({}, data.get()), { id: id }));
            }
        });
        return list;
    };
    Object.defineProperty(Methods.prototype, "size", {
        get: function () {
            return this.list().length;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Maping list
     * @param callbackfn iterator
     */
    Methods.prototype.each = function (callbackfn) {
        var list = [];
        this.collections.forEach(function (data, id) {
            if (data instanceof SystemData_1.default && !data.isDeleted()) {
                list.push(callbackfn(__assign(__assign({}, data.get()), { id: id }), __assign({}, data.validations), data.helper_value));
            }
            else if (data instanceof LocalData_1.default) {
                list.push(callbackfn(__assign(__assign({}, data.get()), { id: id }), __assign({}, data.validations), data.helper_value));
            }
        });
        return list;
    };
    return Methods;
}(Store_1.default));
exports.default = Methods;
