'use strict';
const utils = {
	cdn: "",
	queryString: function (key, url) {
		url = url || location.search;
		url = url.split(/&|\?/);
		var result = null;
		key = String(key).toLowerCase();
		for (var i = 0; i < url.length; i++) {
			var keyValue = url[i];
			var part = keyValue.split("=");
			if (part[0].toLowerCase() == key) {
				result = part[1];
				break;
			}
		}
		return result;
	},
	dateParse: function (str) {
		if (/^\d{10}$/.test(str)) {
			return new Date(str * 1000);
		} else if (/^\d{13}$/.test(str)) {
			return new Date(str * 1);
		}

		str = str.trim();
		var reg = /^(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
		var m = str.match(reg);
		if (m) {
			var year = m[1];
			var month = parseInt(m[2] - 1, 10);
			var day = parseInt(m[3], 10);
			var hour = parseInt(m[4], 10);
			var minutes = parseInt(m[5], 10);
			var seconds = parseInt(m[6], 10);
			return new Date(year, month, day, hour, minutes, seconds);
		} else {
			return null;
		}
	},
	makeUrl: function (url, queryObj) {
		if (url.indexOf("?") == -1) {
			url += "?";
		}
		if (!/\?$/.test(url)) {
			url += "&";
		}
		if (typeof queryObj == "string") {
			url += queryObj;
		} else {
			url += this.urlEncodeObj(queryObj);
		}
		return url;
	},
	dateFormat: function (text, date) {
		var o = {
			"M+": date.getMonth() + 1, //month
			"d+": date.getDate(), //day
			"h+": date.getHours(), //hour
			"m+": date.getMinutes(), //minute
			"s+": date.getSeconds(), //second
			"q+": Math.floor((date.getMonth() + 3) / 3), //quarter
			"S": date.getMilliseconds(), //millisecond
			"w": "日一二三四五六".charAt(date.getDay())
		};
		text = text.replace(/y{4}/, date.getFullYear())
			.replace(/y{2}/, date.getFullYear().toString().substring(2))
		for (var k in o) {
			var reg = new RegExp(k);
			text = text.replace(reg, match);
		}

		function match(m) {
			return m.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length);
		}
		return text;
	},
	getFileSizeText: function (fileSize, options) {
		var unit = "B";
		if (!options) {
			options = {};
		}
		if (options.byteChar) {
			unit = options.byteChar; //用"字节"或者"Bytes"替代z最小单位"B"
			if (options.maxUnit == "B") options.maxUnit = unit;
		}
		var maxUnit = options.maxUnit || "G";
		if (unit != maxUnit && fileSize >= 1024) {
			unit = "K";
			fileSize = fileSize / 1024;
			if (unit != maxUnit && fileSize >= 1024) {
				unit = "M";
				fileSize = fileSize / 1024;
				//debugger
				if (unit != maxUnit && fileSize >= 1024) {
					unit = "G";
					fileSize = fileSize / 1024;
				}
			}
			fileSize = Math.ceil(fileSize * 100) / 100;
		}
		if (options.comma) {
			var reg = /(\d)(\d{3})($|\.)/;
			fileSize = fileSize.toString();
			while (reg.test(fileSize)) {
				fileSize = fileSize.replace(reg, "$1,$2$3");
			}
		}
		return fileSize + unit;
	},
	getQueryObj: function (url) {
        var result = {};
        url = url || location.href;
        if (typeof url != "string") {
            throw "参数url必须是字符串类型";
        }
        if (url.indexOf("?") != -1) {
            var search = url.split("?")[1];
            var list = search.split("&");

            for (var i = 0; i < list.length; i++) {
                var pair = list[i].split("=");
                var key = pair[0];
                var value = pair[1];
                result[key] = value;
            }
        }
        return result;
    },
	getBytes: function (str) {
		var cArr = str.match(/[^\x00-\xff]/ig);
		return str.length + (cArr == null ? 0 : cArr.length);
	},
    getTextOverFlow: function (text, maxLength, showReplacer) {
        var charArr = text.split("");
        var byteLen = 0;
        var reg = new RegExp("[^\x00-\xff]", "g")
        for (var i = 0; i < charArr.length; i++) {
            var cArr = charArr[i].match(reg);
            byteLen += (cArr == null ? 1 : 2)

            if (byteLen > maxLength) {
                return text.substring(0, i) + (showReplacer ? "..." : "");
            }
        }
        return text;

    },
	urlEncodeObj: function (queryObj) {
		var arr = [];
		for (var p in queryObj) {
			if (queryObj.hasOwnProperty(p)) {
				arr.push(p + "=" + encodeURIComponent(queryObj[p]));
			}
		}
		return arr.join("&");
	}
};

module.exports = utils;