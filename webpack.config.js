const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');


module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: 'index.bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env', 'babel-preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|svg)$/,
                exclude: /node_modules/,
                use:{
                    loader: 'file-loader',
                    options:{
                        outputPath: 'assets/img/'
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '*']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({template: './src/index.html'}),
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'jquery',
                    entry: 'dist/jquery.min.js',
                    global: 'jQuery'
                },
                {
                    module: 'popper.js',
                    entry: 'dist/umd/popper.min.js',
                    global: 'Popper'
                },
                {
                    module: 'bootstrap',
                    entry: ['dist/css/bootstrap.min.css','dist/js/bootstrap.min.js',]
                },
                
                {
                    module: 'CoverflowJS',
                    entry: [
                        'dist/coverflow.min.js',
                        'dist/coverflow.css'
                    ]
                },
            ]
        }),
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery' : 'jquery'
        }),
    ]
};