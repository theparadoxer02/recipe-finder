const path = require('path');

module.exports = {
	entry: ['./app/index.js'],
	output: {
		path: path.resolve(__dirname,'./build'),
		filename: 'bundle.js',
	},
	mode: 'development',
	module: {
		rules: [
			{
				loader: 'babel-loader',
				test: /\.js$/,
				exclude: /node_modules/,
			},
			{
		        test: /\.css$/,
		        use: [ 'style-loader', 'css-loader' ]
		    },
		    {
		        test: /\.(png|jp(e*)g|svg)$/,
		        use: [{
		        	loader: 'url-loader',
		        }]
		      }
		]
	},
	devServer: {
		port: 3000,
		contentBase: './build',
		inline: true
	}
}