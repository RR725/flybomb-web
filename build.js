'use strict';
var child = require('child_process');
var filedel = require('filedel');




function build(type) {
	filedel('resources/flybomb/dist/' + type + '/*').then(function () {
		console.log('删除旧的文件');
		console.log('构建中...，请等待');

		var query = type === 'manage' ? '' : ' --config webpack.config.mobile.js';
		var proc = child.exec('webpack' + query, function (err) {
			if (err) {
				console.log(err);
			} else {
				if (type === 'manage') {
					build('mobile');
				}
			}


		});
		proc.stdout.on('data', function (s) {
			console.log(s.toString());
		});
		proc.stderr.on('data', function (s) {
			console.log(s.toString());
		});
	});

}
build('manage');




