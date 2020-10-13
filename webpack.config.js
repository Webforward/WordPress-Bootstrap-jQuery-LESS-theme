// const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');

module.exports = [
    {
        'name': 'js',
        entry: './src/app.js',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'scripts.min.js'
        },
        optimization: cssOptimisation()
    },
    {
        name: 'bootstrap',
        entry: './src/bootstrap.scss',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'bootstrap.min.js'
        },
        module: cssModules(),
        plugins: [
            new MiniCssExtractPlugin({
                path: path.resolve(__dirname, 'build'),
                filename: 'bootstrap.min.css'
            }),
            new RemovePlugin({
                after: {
                    include: [
                        './build/bootstrap.min.js'
                    ]
                }
            })
        ],
        optimization: cssOptimisation()
    },
    {
        name: 'css',
        entry: './src/app.scss',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'styles.min.js'
        },
        module: cssModules(),
        plugins: [
            new MiniCssExtractPlugin({
                path: path.resolve(__dirname, 'build'),
                filename: 'styles.min.css'
            }),
            new RemovePlugin({
                after: {
                    include: [
                        './build/styles.min.js'
                    ]
                }
            })
        ],
        optimization: cssOptimisation()
    }
];


function cssModules() {
    return {
        rules: [
            {
                test: /\.(s?css|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
        ]
    };
}

function cssOptimisation() {
    return {
        minimize: true,
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false
                    }
                },
                extractComments: false
            })
        ]
    };
}