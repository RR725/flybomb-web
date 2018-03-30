'use strict';

let ExtractTextPlugin = require('extract-text-webpack-plugin');
let webpack = require('webpack');
let pkg = require('./package.json');
let CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

let HtmlWebpackPlugin = require('html-webpack-plugin');

let ver = +new Date();

let config = {
	entry: {
		main: './resources/flybomb/lib/main.js',
		flybomb: [
			'./resources/flybomb/lib/url-model.js',
			'./resources/flybomb/lib/utils.js',
		],
		vender: ['match-media', 'react', 'react-dom', 'antd'] //这几个抽离出来打包成vender.js
	},
	output: {
		publicPath: '/',
		chunkFilename: 'resources/flybomb/dist/manage/[chunkhash:8].chunk.js',
		filename: 'resources/flybomb/dist/manage/[name].js?ver=' + ver
	},
	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loaders: ['babel?presets[]=react&presets[]=es2015']
		}, {
			test: /\.less$/,
			loader: 'style!css!less'
		},
		{ 
			test: /\.svg$/, 
			loader: "url-loader?limit=10000&mimetype=image/svg+xml" 
		},
		{
			test: /\.css$/,
			loader: ExtractTextPlugin.extract("style-loader", "css-loader")
		}, {
			test: /\.(png|jpg|gif)$/,
			// loader: 'url?limit=8192&name=img/[hash:8].[name].[ext]'
			loader: 'url' // 用到的图片全部转base64塞到js
		}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({ minimize: true }),
		new ExtractTextPlugin('resources/flybomb/dist/manage/common.css?ver=' + ver), //合并css文件
		new HtmlWebpackPlugin({ //生成Html，自动把打包后的文件加到html中
			title: 'flybomb',
			inject: 'body',
			chunks: ['vender', 'main', 'flybomb'],
			filename: 'resources/flybomb/html/views/flybomb/index.html', //打包后的文件
			template: 'resources/flybomb/html/index.html' //模板文件
		}),
		new CommonsChunkPlugin({ //把公共的文件打包
			names: ['flybomb', 'vender','main']
		})
	]
}

module.exports = config