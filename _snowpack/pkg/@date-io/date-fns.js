import { a as addDays, i as isValid, d as differenceInMilliseconds, b as isAfter, c as isBefore, s as startOfDay, e as endOfDay, g as getHours, f as setHours, h as setMinutes, j as getSeconds, k as setSeconds, l as isSameDay, m as isSameMonth, n as isSameYear, o as isSameHour, p as startOfMonth, q as endOfMonth, r as getYear, t as setYear, u as parse, v as format, w as isEqual, x as startOfYear, y as endOfYear, z as setMonth, A as addMonths, B as eachDayOfInterval, C as startOfWeek, D as endOfWeek, E as addYears } from '../common/index-d74e792c.js';

var DateFnsUtils = /** @class */ (function () {
    function DateFnsUtils(_a) {
        var locale = (_a === void 0 ? {} : _a).locale;
        this.yearFormat = "yyyy";
        this.yearMonthFormat = "MMMM yyyy";
        this.dateTime12hFormat = "MMMM do hh:mm aaaa";
        this.dateTime24hFormat = "MMMM do HH:mm";
        this.time12hFormat = "hh:mm a";
        this.time24hFormat = "HH:mm";
        this.dateFormat = "MMMM do";
        this.locale = locale;
    }
    // Note: date-fns input types are more lenient than this adapter, so we need to expose our more
    // strict signature and delegate to the more lenient signature. Otherwise, we have downstream type errors upon usage.
    DateFnsUtils.prototype.addDays = function (value, count) {
        return addDays(value, count);
    };
    DateFnsUtils.prototype.isValid = function (value) {
        return isValid(this.date(value));
    };
    DateFnsUtils.prototype.getDiff = function (value, comparing) {
        return differenceInMilliseconds(value, this.date(comparing));
    };
    DateFnsUtils.prototype.isAfter = function (value, comparing) {
        return isAfter(value, comparing);
    };
    DateFnsUtils.prototype.isBefore = function (value, comparing) {
        return isBefore(value, comparing);
    };
    DateFnsUtils.prototype.startOfDay = function (value) {
        return startOfDay(value);
    };
    DateFnsUtils.prototype.endOfDay = function (value) {
        return endOfDay(value);
    };
    DateFnsUtils.prototype.getHours = function (value) {
        return getHours(value);
    };
    DateFnsUtils.prototype.setHours = function (value, count) {
        return setHours(value, count);
    };
    DateFnsUtils.prototype.setMinutes = function (value, count) {
        return setMinutes(value, count);
    };
    DateFnsUtils.prototype.getSeconds = function (value) {
        return getSeconds(value);
    };
    DateFnsUtils.prototype.setSeconds = function (value, count) {
        return setSeconds(value, count);
    };
    DateFnsUtils.prototype.isSameDay = function (value, comparing) {
        return isSameDay(value, comparing);
    };
    DateFnsUtils.prototype.isSameMonth = function (value, comparing) {
        return isSameMonth(value, comparing);
    };
    DateFnsUtils.prototype.isSameYear = function (value, comparing) {
        return isSameYear(value, comparing);
    };
    DateFnsUtils.prototype.isSameHour = function (value, comparing) {
        return isSameHour(value, comparing);
    };
    DateFnsUtils.prototype.startOfMonth = function (value) {
        return startOfMonth(value);
    };
    DateFnsUtils.prototype.endOfMonth = function (value) {
        return endOfMonth(value);
    };
    DateFnsUtils.prototype.getYear = function (value) {
        return getYear(value);
    };
    DateFnsUtils.prototype.setYear = function (value, count) {
        return setYear(value, count);
    };
    DateFnsUtils.prototype.date = function (value) {
        if (typeof value === "undefined") {
            return new Date();
        }
        if (value === null) {
            return null;
        }
        return new Date(value);
    };
    DateFnsUtils.prototype.parse = function (value, formatString) {
        if (value === "") {
            return null;
        }
        return parse(value, formatString, new Date(), { locale: this.locale });
    };
    DateFnsUtils.prototype.format = function (date, formatString) {
        return format(date, formatString, { locale: this.locale });
    };
    DateFnsUtils.prototype.isEqual = function (date, comparing) {
        if (date === null && comparing === null) {
            return true;
        }
        return isEqual(date, comparing);
    };
    DateFnsUtils.prototype.isNull = function (date) {
        return date === null;
    };
    DateFnsUtils.prototype.isAfterDay = function (date, value) {
        return isAfter(date, endOfDay(value));
    };
    DateFnsUtils.prototype.isBeforeDay = function (date, value) {
        return isBefore(date, startOfDay(value));
    };
    DateFnsUtils.prototype.isBeforeYear = function (date, value) {
        return isBefore(date, startOfYear(value));
    };
    DateFnsUtils.prototype.isAfterYear = function (date, value) {
        return isAfter(date, endOfYear(value));
    };
    DateFnsUtils.prototype.formatNumber = function (numberToFormat) {
        return numberToFormat;
    };
    DateFnsUtils.prototype.getMinutes = function (date) {
        return date.getMinutes();
    };
    DateFnsUtils.prototype.getMonth = function (date) {
        return date.getMonth();
    };
    DateFnsUtils.prototype.setMonth = function (date, count) {
        return setMonth(date, count);
    };
    DateFnsUtils.prototype.getMeridiemText = function (ampm) {
        return ampm === "am" ? "AM" : "PM";
    };
    DateFnsUtils.prototype.getNextMonth = function (date) {
        return addMonths(date, 1);
    };
    DateFnsUtils.prototype.getPreviousMonth = function (date) {
        return addMonths(date, -1);
    };
    DateFnsUtils.prototype.getMonthArray = function (date) {
        var firstMonth = startOfYear(date);
        var monthArray = [firstMonth];
        while (monthArray.length < 12) {
            var prevMonth = monthArray[monthArray.length - 1];
            monthArray.push(this.getNextMonth(prevMonth));
        }
        return monthArray;
    };
    DateFnsUtils.prototype.mergeDateAndTime = function (date, time) {
        return this.setMinutes(this.setHours(date, this.getHours(time)), this.getMinutes(time));
    };
    DateFnsUtils.prototype.getWeekdays = function () {
        var _this = this;
        var now = new Date();
        return eachDayOfInterval({
            start: startOfWeek(now, { locale: this.locale }),
            end: endOfWeek(now, { locale: this.locale })
        }).map(function (day) { return _this.format(day, "EEEEEE"); });
    };
    DateFnsUtils.prototype.getWeekArray = function (date) {
        var start = startOfWeek(startOfMonth(date), { locale: this.locale });
        var end = endOfWeek(endOfMonth(date), { locale: this.locale });
        var count = 0;
        var current = start;
        var nestedWeeks = [];
        while (isBefore(current, end)) {
            var weekNumber = Math.floor(count / 7);
            nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
            nestedWeeks[weekNumber].push(current);
            current = addDays(current, 1);
            count += 1;
        }
        return nestedWeeks;
    };
    DateFnsUtils.prototype.getYearRange = function (start, end) {
        var startDate = startOfYear(start);
        var endDate = endOfYear(end);
        var years = [];
        var current = startDate;
        while (isBefore(current, endDate)) {
            years.push(current);
            current = addYears(current, 1);
        }
        return years;
    };
    // displaying methpds
    DateFnsUtils.prototype.getCalendarHeaderText = function (date) {
        return this.format(date, this.yearMonthFormat);
    };
    DateFnsUtils.prototype.getYearText = function (date) {
        return this.format(date, "yyyy");
    };
    DateFnsUtils.prototype.getDatePickerHeaderText = function (date) {
        return this.format(date, "EEE, MMM d");
    };
    DateFnsUtils.prototype.getDateTimePickerHeaderText = function (date) {
        return this.format(date, "MMM d");
    };
    DateFnsUtils.prototype.getMonthText = function (date) {
        return this.format(date, "MMMM");
    };
    DateFnsUtils.prototype.getDayText = function (date) {
        return this.format(date, "d");
    };
    DateFnsUtils.prototype.getHourText = function (date, ampm) {
        return this.format(date, ampm ? "hh" : "HH");
    };
    DateFnsUtils.prototype.getMinuteText = function (date) {
        return this.format(date, "mm");
    };
    DateFnsUtils.prototype.getSecondText = function (date) {
        return this.format(date, "ss");
    };
    return DateFnsUtils;
}());

export default DateFnsUtils;
