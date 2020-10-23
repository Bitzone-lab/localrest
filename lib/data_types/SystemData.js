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
var DataBase_1 = require("./DataBase");
var SystemData = /** @class */ (function (_super) {
    __extends(SystemData, _super);
    function SystemData(body, helper) {
        var _this = _super.call(this, body, helper) || this;
        _this.deleted = false;
        _this.updated = false;
        return _this;
    }
    SystemData.prototype.willBeDeleted = function () {
        this.deleted = true;
    };
    SystemData.prototype.willBeUpdated = function (body) {
        this.value = __assign(__assign({}, this.get()), body);
        for (var key in body) {
            this.fields[key].update(body[key]);
        }
        this.updated = true;
    };
    SystemData.prototype.isDeleted = function () {
        return this.deleted;
    };
    SystemData.prototype.isUpdated = function () {
        return this.updated;
    };
    return SystemData;
}(DataBase_1.default));
exports.default = SystemData;
