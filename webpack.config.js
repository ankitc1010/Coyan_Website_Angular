var webpack=require('webpack');
var path=require('path');
module.exports={
	devtool: "inline-source-map",
	entry:[
	'webpack-dev-server/client?http://127.0.0.1:8080/',
	'webpack/hot/only-dev-server',
	// "./node_modules/angular-animate/angular-animate.min.js",
	// './node_modules/angular-aria/angular-aria.min.js',
	// './node_modules/angular-material/angular-material.min.js',
	// './node_modules/angular-route/angular-route.min.js',
	'./src'
	],
	output:{
		path: path.join(__dirname, "public"),
		filename:'bundle.js'
	},
	resolve:{
		moduleDirectories:['node_modules','src'],
		extention:["",'.js']
	},
	module:[{
		test:/\.js$/,
		exclude:/node_modules/,
		loader:"babel",
		query:{
			presets:['es2015']
		}
	}],
	plugins:[
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
	

	],
	devServer:{
		hot:true,
		proxy:{
			'*':'http://localhost:3000'
		}
	}
}