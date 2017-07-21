<!DOCTYPE html>
<html class="mz-theme" lang="zh-cn">

	<head>
		<meta charset="utf-8">
		<title>Flyme推送平台</title>
		<meta http-equiv="x-ua-compatible" content="ie=edge"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="">
		<meta name="author" content="">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<style>
			.browser_tips{background:#FEFEE2; text-align: center; height: 24px; line-height: 24px; margin: 0; padding: 0;}
			@font-face {
				font-family: 'push';
				src: url('http://push-res.in.mzres.com/resources/push/fonts/iconfont_push.eot');
				/* IE9*/
				src: url('http://push-res.in.mzres.com/resources/push/fonts/iconfont_push.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */ url('http://push-res.in.mzres.com/resources/push/fonts/iconfont_push.woff') format('woff'), /* chrome、firefox */ url('http://push-res.in.mzres.com/resources/push/fonts/iconfont_push.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/ url('http://push-res.in.mzres.com/resources/push/fonts/iconfont_push.svg#iconfont') format('svg');
				/* iOS 4.1- */
			}
		</style>
		<script>
			window.__mztj = {
				unload: true
			};
			window.onerror=function(e){
				var ua=window.navigator.userAgent;
				var borwserTips=document.getElementById('browserTips');
				if(ua.indexOf('MSIE 8.0')>-1 || ua.indexOf('MSIE 7.0')>-1 || ua.indexOf('MSIE 6.0')>-1){
					borwserTips.style.display='';
				}
				
				// if(e.indexOf('Function.prototype.toString')>-1){
				// 	borwserTips.style.display='';
				// }
				// if(e.indexOf('matchMedia not present')>-1){
				// 	borwserTips.style.display='';
				// }
				
			}
		</script>
	</head>

	<body class="schedule">
		<p class="browser_tips" style="display:none;" id="browserTips" >本浏览器版本太老，不支持网页正常打开，请使用IE系列9及以上版本或者使用Chrome、Firefox浏览器打开</p>
        <div id="wrap"></div>


	</body>

</html>

