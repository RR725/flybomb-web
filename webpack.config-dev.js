'use strict';
let babelpolyfill = require("babel-polyfill");
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let webpack = require('webpack');
let CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

let HtmlWebpackPlugin = require('html-webpack-plugin');


let config = {
	entry: {
		main: './resources/flybomb/lib/main.js',
		flybomb: [
			'./resources/flybomb/lib/url-model.js',
			'./resources/flybomb/lib/utils.js',
		],
		vender: ['match-media', 'react', 'react-dom'] //这几个抽离出来打包成vender.js
	},
	output: {
		publicPath: '/',
		chunkFilename: 'resources/flybomb/dist/[id].chunk.js',
		filename: 'resources/flybomb/dist/[name].js?ver=2017'
	},
	debug: true,
	devtool: 'source-map',
	module: {
		// noParse: [/\breact\b/],
		loaders: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loaders: ['babel?presets[]=react&presets[]=es2015']
		}, {
			test: /\.less$/,
			loader: 'style!css!less'
		}, // use ! to chain loaders
		// {
		// 	loader: "babel-loader",
		// 	query: {
		// 		presets: ["es2015"],
		// 		plugins: [["import", { libraryName: "antd", style: "css" }]]
		// 	}
		// },
		{
			test: /\.css$/,
			loader: ExtractTextPlugin.extract("style-loader", "css-loader")
		}, {
			test: /\.(png|jpg|gif)$/,
			// loader: 'url?limit=8192&name=img/[hash:8].[name].[ext]'
			loader: 'url' // 用到的图片全部转base64塞到js
		}]
	},
	devServer: {
		proxy: {//访问时可以避免接口跨域
			'/restapi/*': {
				target: 'http://127.0.0.1:3456/',
				changeOrigin: true

			}
		}
	},
	plugins: [
		// new webpack.optimize.UglifyJsPlugin({ minimize: true }),
		new ExtractTextPlugin('resources/flybomb/dist/common.css?ver=2017'), //合并css文件
		new HtmlWebpackPlugin({ //生成Html，自动把打包后的文件加到html中
			title: 'flybomb',
			inject: 'body',
			chunks: ['vender', 'main', 'flybomb'],
			filename: 'views/flybomb/index.html', //打包后的文件
			template: 'resources/flybomb/html/index.html' //模板文件
		}),
		new CommonsChunkPlugin({ //把公共的文件打包
			names: ['vender', 'flybomb']
		})
	]
}

module.exports = config