'use strict';

const validateDate = {
	changeStartTime(value, et,data) {
		let type=data.router;
		let required=data.required;
		const st = +new Date(value);
		let display = 'none';
		let errorTips = '';

		let startTimeStatus = 'success';
		let endTimeStatus = 'success';
		if (st && et && type!=='analyze') {
			if (st > et) {
				errorTips = '结束时间不能早于开始时间';
				startTimeStatus = 'error';
				endTimeStatus = 'error';
				display = '';
			}
		}

		if (!st && required!==1) {
			errorTips = '请选择开始时间';
			if(type==='analyze'){
				errorTips='请选择日期';
			}
			display = '';
			startTimeStatus = 'error';
		}
		if (!et && type!=='analyze'  && required!==1) {
			errorTips = '请选择结束时间';
			display = '';
			endTimeStatus = 'error';
		}

		return {
			startTimeStatus: startTimeStatus,
			endTimeStatus: endTimeStatus,
			display: display,
			errorTips: errorTips
		};

	},
	changeEndTime(value, st,data) {
		let required=data.required;
		const et = +new Date(value);
		let display = 'none';
		let errorTips = '';

		let startTimeStatus = 'success';
		let endTimeStatus = 'success';
		if (st && et) {
			if (et < st) {

				errorTips = '结束时间不能早于开始时间';
				startTimeStatus = 'error';
				endTimeStatus = 'error';
				display = '';
			}
		}

		if (!st && required!==1) {
			errorTips = '请选择开始时间';
			display = '';
			startTimeStatus = 'error';
		}
		if (!et && required!==1) {
			errorTips = '请选择结束时间';
			display = '';
			endTimeStatus = 'error';
		}
		return {
			startTimeStatus: startTimeStatus,
			endTimeStatus: endTimeStatus,
			display: display,
			errorTips: errorTips
		};
	},
};

module.exports = validateDate;