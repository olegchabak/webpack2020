// должны экспортировать объект, он в последствии и будеьт объектом конфигурации вабпака
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	// определяет рабочую директорию (в нашем случае src)
	context: path.resolve(__dirname, "src"),
	mode: "development",
	entry: {
		main: './index.js',
		analytics: './analytics.js'
	},
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, "dist"),
	},
	// объект расширений
	resolve: {
		// чтоб работало без расширений файлов
		extensions: ['.js', '.csv', '.svg', '.xml', '.css', '.json'],
		alias: {
			"@models": path.resolve(__dirname, 'src/models'),
			"@": path.resolve(__dirname, 'src'),
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./index.html"
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin(
			// для каждого элемента (папки или файлы) копирования указать объект
			[
				// копируем картинку(-и)
				{
					from: path.resolve(__dirname, 'src/assets/logo.png'),
					to: path.resolve(__dirname, 'dist')
				}
			]
		)
	],
	module: {
		// в правилах указываем объекты для описания типа лоадера
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader','css-loader']
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				use: ['file-loader']
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				use: ['file-loader']
			},
			{
				test: /\.xml$/,
				use: ['xml-loader']
			},
			{
				test: /\.csv$/,
				use: ['csv-loader']
			}
		]
	},
	optimization: {
		splitChunks: {
			chunks: "all"
		}
	},
	devServer: {
		port: 3033,
	}
};
