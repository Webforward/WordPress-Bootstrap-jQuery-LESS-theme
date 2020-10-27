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
        plugins: [
            new webpack.ProvidePlugin({
                // $: "jquery",
                jQuery: "jquery",
                // "window.jQuery": "jquery"
            })
        ],
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
        name: 'login',
        entry: './src/style-login.scss',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'style-login.min.js'
        },
        module: cssModules(),
        plugins: [
            new MiniCssExtractPlugin({
                path: path.resolve(__dirname, 'build'),
                filename: 'style-login.min.css'
            }),
            new RemovePlugin({
                after: {
                    include: [
                        './build/style-login.min.js'
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
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/',
                            publicPath: 'images/'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                            publicPath: 'fonts/'
                        }
                    }
                ]
            }

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
