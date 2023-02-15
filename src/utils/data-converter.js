"use strict";
exports.__esModule = true;
exports.formatDate = void 0;
function formatDate() {
    var date = new Date();
    return ((date.getFullYear() + "-" + pad2((date.getMonth() + 1)) + "-" + pad2(date.getDate())));
}
exports.formatDate = formatDate;
// export const DateFormat = (date) => {
//     return ((date.getFullYear() + "-" + pad2(date.getMonth() + 1) + "-" + pad2(date.getDate())))
// }
//colocando 0 antes do dia e ano caso eles sejam apenas de um digito 0-9
var pad2 = function (n) {
    return (n < 10 ? '0' : '') + n;
};
