const webpack = require('webpack');
const path = require('path');

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

/*
 * We've enabled ExtractTextPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/extract-text-webpack-plugin
 *
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './src/index',

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'docs')
	},
	devServer: {
		contentBase: path.join(__dirname, 'docs')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',

				options: {
					presets: ['env']
				}
			},
			{
				test: /\.(scss|css)$/,

				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						}
					],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=public/fonts/[name].[ext]'
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'file-loader?name=public/img/[name].[ext]'
			}
		]
	},

	plugins: [
		new UglifyJSPlugin(),
		new ExtractTextPlugin('bundle.css')
	]
};
