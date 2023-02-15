"use strict";
exports.__esModule = true;
exports.getHour = exports.convertMinutesToHoursString = exports.convertHoursStringToMinutes = void 0;
function convertHoursStringToMinutes(hourString) {
    var _a = hourString.split(':').map(Number), hours = _a[0], minutes = _a[1];
    var minutesAmmount = (hours * 60) + minutes;
    return minutesAmmount;
}
exports.convertHoursStringToMinutes = convertHoursStringToMinutes;
function convertMinutesToHoursString(min) {
    var hours = Math.floor(min / 60);
    var minutes = min % 60;
    return "".concat(String(hours).padStart(2, "0"), ": ").concat(String(minutes).padStart(2, "0"));
}
exports.convertMinutesToHoursString = convertMinutesToHoursString;
function getHour() {
    var date = new Date();
    var format = (date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
    return format;
}
exports.getHour = getHour;
