"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultOrderParams = exports.OrderDirection = void 0;
var OrderDirection;
(function (OrderDirection) {
    OrderDirection["asc"] = "asc";
    OrderDirection["desc"] = "desc";
})(OrderDirection || (exports.OrderDirection = OrderDirection = {}));
const defaultOrderParams = (column, direction) => ({
    column,
    direction: direction,
});
exports.defaultOrderParams = defaultOrderParams;
//# sourceMappingURL=order.js.map