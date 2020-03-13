// должны экспортировать объект, он в последствии и будеьт объектом конфигурации вабпака
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// задаем переменную с указанием режима сборки
const isDev = process.env.NODE_ENV === 'development';

// экспортирует объект для поля optimization
const optimization = () => {
	const config = {
		splitChunks: {
			chunks: "all"
		}
	}
	if(!isDev) {
		config.minimizer = [
			new OptimizeCssAssetsPlugin(),
			new TerserPlugin()
		]
	}
	return config;
}

// возвращает строку для динамического формирования имени файла с хешем или без него, в зависимости от режима. Юзается в оутпуте и плагинах
const filename = ext => isDev ? `[name].${ext}` : `[name].[hash:5].${ext}`;

// это чтоб код обработчиков был компактнее
// будет возвращать массив с набором лоадеров для стилей в зависимости от типа входящего файла
const cssLoaders = (extra) => {
	const loaders =  [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				// true или false в зависимости от режима, нам надо только в разработке
				hmr: isDev,
				reloadAll: true
			}
		},
		'css-loader'
	];
	// если extra указан, то добавить его в массив обработчиков
	extra && loaders.push(extra);
	return loaders;
}

// возвращает объект с опциями для бейбла
const babelOptions = (optionalPreset) => {
	const options = {
		presets: [
			'@babel/preset-env',

		],
		plugins: [
			'@babel/plugin-proposal-class-properties'
		]
	};
	optionalPreset && options.presets.push(optionalPreset);
	return options;
};

const jsLoaders = () => {
	const loaders = [
		{
			loader: 'babel-loader',
			options: babelOptions(),
		}
	];
	isDev && loaders.push('eslint-loader');
	return loaders;
};

// собсно объект конфигурации
module.exports = {
	// определяет рабочую директорию (в нашем случае src)
	context: path.resolve(__dirname, "src"),
	mode: "development",
	entry: {
		main: ['@babel/polyfill', './index.jsx'],
		analytics: './analytics.ts'
	},
	output: {
		filename: filename('js'),
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
			template: "./index.html",
			minify: {
				collapseWhitespace: !isDev
			}
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
		),
		new MiniCssExtractPlugin({
			filename: filename('css')
		})
	],
	module: {
		// в правилах указываем объекты для описания типа лоадера
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: jsLoaders(),
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: {
					loader: 'babel-loader',
					options: babelOptions("@babel/preset-typescript"),
				}
			},
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				loader: {
					loader: 'babel-loader',
					options: babelOptions("@babel/preset-react"),
				}
			},
			{
				test: /\.css$/,
				use: cssLoaders() // придет массив с обработчиками, тут без дополнительных
			},
			{
				test: /\.s[ac]ss$/,
				use: cssLoaders('sass-loader') // придет массив с обработчиками, тут дополнительно sass-loader
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
	optimization: optimization(),
	devServer: {
		port: 3033,
		hot: isDev,
	},
	devtool: isDev ? 'source-map' : ''
};