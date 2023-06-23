const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
    devServer: {
        inline: true,
        port: 9050,
        host: 'localhost',
        disableHostCheck: true,
        // historyApiFallback: true,
        // after: function (app, server) {
        //     app.get('*', (req, res) => {
        //         debugger;
        //     //   res.json({ custom: 'response' });
        //     if (endsWith(req.url, '.html')) {
        //         req.url = req.url.replace('.html','');
        //         }
        //     });
        //   },
        historyApiFallback: {
            // disableDotRule: true,
            rewrites: [
                { from: /^\/$/, to: '/index.html' },
                { from: /\.html$/, to: '/index.html' },
                { from: /./, to: '/index.html' }
                // {
                //     from: /./,
                //     to: function(context) {
                //         console.log('context.parsedUrl.pathname:', context.parsedUrl.pathname.replace(/\.html$/, ''));
                //       return context.parsedUrl.pathname;
                //     }
                //   }
                // { from: /([a-zA-Z0-9\s_\\.\-\(\):])+(.html|.HTML)$/, to: 'index.html' },
            // { from: /^\/$/, to: function(context) {
            //     debugger;
            //     console.log(context);
            //     return '/bower_components' + context.parsedUrl.pathname;
            //   } },
              ],
        },
    },
    watchOptions: {
        poll: true,
    },
    stats: {
        assets: true,
        colors: true,
        errors: true,
        errorDetails: true,
        hash: true,
    },
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [{
            test: /.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader',
            }),
        },
        {
            test: /\.(less)$/,
            use: [{
                loader: 'style-loader', // creates style nodes from JS strings
            }, {
                loader: 'css-loader', // translates CSS into CommonJS
            }, {
                loader: 'less-loader', // compiles Less to CSS
            }],
        },
        {
            test: /\.(png|gif|jpg|jpeg|)$/,
            loader: 'file-loader',
            options: {
                limit: 100000,
                name: '[name].[ext]',
                outputPath: 'dist/images',
            },
        },
        {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader',
            options: {
                limit: 10000,
                mimetype: 'application/font-woff',
                name: '[name].[ext]',
                outputPath: 'dist/fonts',
            },
        },
        {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader',
            options: {
                limit: 10000,
                mimetype: 'application/octet-stream',
                name: '[name].[ext]',
                outputPath: 'dist/fonts',
            },
        },
        {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'dist/fonts',
            },
        },
        {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader',
            options: {
                limit: 10000,
                mimetype: 'image/svg+xml',
                name: '[name].[ext]',
                outputPath: 'dist/svg',
            },
        },
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('local'),
                APPLICATION_BFF_URL: JSON.stringify('https://m2.walsoulconsulting.com'),
            },
        }),
        new ExtractTextPlugin({
            filename: 'bundle.css',
            disable: false,
            allChunks: true,
        }),

    ],
});
