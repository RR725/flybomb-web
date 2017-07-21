<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Flyme推送平台</title>
	<link rel="stylesheet" href="http://push-res.in.mzres.com/resources/push/css/base.css">
	<link rel="stylesheet" href="http://push-res.in.mzres.com/resources/push/css/userGroup.css">
<link href="http://push-res.in.mzres.com/resources/push/dist/common.css?ver=<%= jsVersion%>" rel="stylesheet"></head>
<body>
<div id="j_wraper" class="hide">
	
	<div class="main">
		<div class="layABC">
			<div class="u-head clearfix">
				<div class="mark">
					<span class="item">选择条件</span>
					<!-- <input type="hidden" id="j_userCondit" value="" name="userCondit"> -->
				</div>
			</div>
			<div class="box-userList clearfix" id="j_userList">
				<form id="myForm">
					<div class="box-userList-side">
						<ul>						
						</ul>
					</div>
					<div class="box-userList-main bfc">
					</div>
				</form>
			</div>
			<form id="vaForm">
				<div id="j_condition" class="box-condition mt20">
					<div class="box-condition-hd u-head  clearfix">
						<div class="mark">
							<span class="item">已选条件</span>
						</div>					
					</div>
					<div class="box-condition-bd">
						<div class="box-condition-list clearfix"></div>
						<div class="box-condition-dele tar">
							<span id="j_conditDele" style="display:none;" class="blue  curp">清空条件</span>
						</div>
					</div>
					<div class="box-condition-ft">
						<div class="error-tips ml30">
							<input type="hidden" id="j_userCondit" value="" name="userCondit">
						</div>
						<div class="showPeople-box">
							<span class="u-inb">满足以上条件的用户人数：</span><i id="j_people" class="gray u-inb showPeople-num">未知</i>
							<span id="j_getPeopleBtn" class="u-inb blue curp">立即查询</span>
						</div>
					</div>
				</div>
				<div class="box-addGroup mt30">
					<div class="u-head u-head-b">
						<span class="item">添加用户群名称</span>
					</div>
					<div class="box-addGroup-bd">
						
						<table width="100%">
							<tr>
								<td width="100" class="tar">群名称：</td>
								<td>
									<input id="j_userGroupName" type="text" name="name" placeholder="请输入标题" maxlength="20" class="inp">
									<span class="cutTips gray titleTips"></span>
									<label for="j_userGroupName" class="error"></label>
								</td>
							</tr>
						</table>
						
					</div>
				</div>
				<div class="box-submit">
					<!-- <input id="submit" type="submit" value="提交" class="u-btn u-btn-w135"> -->
					<span id="submit" class="u-btn u-btn-w135">提交</span>
					<a id="back" href="javascript:;" class="u-btn u-inb ml15">返回</a>
				</div>
			</form>
		</div>
	</div>
</div>
	<script src="http://push-res.in.mzres.com/resources/push/js/user-group/jquery.min.js"></script>
	<script src="http://push-res.in.mzres.com/resources/push/js/user-group/jquery.tmpl.min.js"></script>
	<script src="http://push-res.in.mzres.com/resources/push/js/user-group/json2.js"></script>
	<script src="http://push-res.in.mzres.com/resources/push/js/user-group/tools.js"></script>
	<script src="http://push-res.in.mzres.com/resources/push/js/user-group/common.js"></script>
	<script src="http://push-res.in.mzres.com/resources/push/js/user-group/jquery.validate.js"></script>
	<script src="http://push-res.in.mzres.com/resources/push/js/user-group/userGroup.js"></script>
	<!-- dev start
	<script type="text/javascript">
		infGetAccount = '/pushBackstage/public/json/getAccount.json';
	    infUserGroup = '/pushBackstage/public/json/userGroupList.json';
	    infGetUserGroup = '/pushBackstage/public/json/idUserGroup.json';
	    infGetPeople = '/pushBackstage/public/json/userGroupList.json';
	    infGetAccount = '/pushBackstage/public/json/getAccount.json';
	</script>
	dev end -->
	<script type="text/javascript">
		new DoUserGroup();
	</script>
<script type="text/javascript" src="http://push-res.in.mzres.com/resources/push/dist/vender.js?ver=<%= jsVersion%>"></script><script type="text/javascript" src="http://push-res.in.mzres.com/resources/push/dist/push.js?ver=<%= jsVersion%>"></script><script type="text/javascript" src="http://push-res.in.mzres.com/resources/push/dist/main.js?ver=<%= jsVersion%>"></script></body>
</html>