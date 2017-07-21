'use strict';

const defaultPermission = {

	data(appId, newAppId, personalAppId) {
		if (!appId) { appId = 0; }
		if (!newAppId) newAppId = appId;
		return {
			'创建推送': [
				{ 'id': 'createPush', 'code': '1000', 'name': '推送通知', 'to': '/create/push/?pushType=notice&appId=' + newAppId, 'type': '创建推送' },
				{ 'id': 'createPush', 'code': '1001', 'name': '透传消息', 'to': '/create/push/?pushType=message&appId=' + newAppId, 'type': '创建推送' },
				{ 'id': 'createPush', 'code': '1002', 'name': '分组推送', 'to': '/create/push/?pushType=group&appId=' + newAppId, 'type': '分组推送' },
				{ 'id': 'createPush', 'code': '1003', 'name': '定时任务', 'to': '/create/push/?pushType=timing&appId=' + newAppId, 'type': '创建推送' }
			],
			'数据统计': [
				{ 'id': 'dataStat', 'code': '2000', 'to': '/data/push/record?appId=' + appId, 'name': '推送记录', 'type': '数据统计' },
				{ 'id': 'dataStat', 'code': '2001', 'to': '/data/push/stat?appId=' + appId, 'name': '推送统计', 'type': '数据统计' },
				{ 'id': 'dataStat', 'code': '2002', 'to': '/data/push/data?appId=' + appId, 'name': '推送数据', 'type': '数据统计' },
				{ 'id': 'dataStat', 'code': '2003', 'to': '/data/push/group/push?appId=' + appId, 'name': '分组推送', 'type': '数据统计' },
				{ 'id': 'dataStat', 'code': '2004', 'to': '/data/push/user/data?appId=' +  appId, 'name': '用户数据', 'type': '数据统计' },
				{ 'id': 'dataStat', 'code': '2005', 'to': '/data/detail/list?appId=' + appId, 'name': '推送详情', 'type': '数据统计' },
				{ 'id': 'dataStat', 'code': '2006', 'to': '/data/push/timing?appId=' + appId, 'name': '定时任务', 'type': '数据统计' }
			],
			'配置管理': [
				{ 'id': 'configManage', 'code': '3000', 'to': '/config/app?appId=' + newAppId, 'name': '应用配置', 'type': '配置管理' },
				{ 'id': 'configManage', 'code': '3001', 'name': '标签用户', 'to': '/config/tag?appId=' + newAppId, 'type': '配置管理' },
				{ 'id': 'configManage', 'code': '3002', 'name': '问题排查', 'to': '/config/debug?appId=' + newAppId, 'type': '配置管理' },
				{ 'id': 'configManage', 'code': '3003', 'name': '黑名单', 'to': '/config/black?appId=' + newAppId, 'type': '配置管理' }
			],
			'个性化推送': [
				{ 'id': 'personalPush', 'code': '4000', 'to': '/personal/push?pushType=personal&appId=' + (personalAppId ? personalAppId : newAppId), 'name': '个性化推送', 'type': '个性化推送' },
				{ 'id': 'personalPush', 'code': '4001', 'to': '/personal/push/resource/lib?pushType=personal&appId=' + (personalAppId ? personalAppId : newAppId), 'name': '资源库', 'type': '个性化推送' }
			],
			'数据分析': [
				{ 'id': 'dataAnalyze', 'code': '5000', 'to': '/analyze/push/attr?appId=' +  newAppId, 'name': '推送属性分析', 'type': '数据分析' },
				// { 'id': 'dataAnalyze', 'code': '5001', 'to': '/analyze/user/action?appId=' +  appId, 'name': '用户点击行为', 'type': '数据分析' }
			]
		};
	}
};

module.exports = defaultPermission;