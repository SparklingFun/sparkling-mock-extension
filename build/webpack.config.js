// Node.js Modules
const path = require('path')
const glob = require('glob')

const isProd = process.env.NODE_ENV === 'production'

// Webpack & Plugins
// const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const getEntry = () => {
    let globPath = 'src/**/*.js' // 匹配src目录下的所有文件夹中的js文件
    // (\/|\\\\) 这种写法是为了兼容 windows和 mac系统目录路径的不同写法
    let pathDir = 'src(\/|\\\\)(.*?)(\/|\\\\)' // 路径为src目录下的所有文件夹
    let files = glob.sync(globPath)
    let dirname, entries = []
    for (let i = 0; i < files.length; i++) {
        dirname = path.dirname(files[i])
        entries.push(dirname.replace(new RegExp('^' + pathDir), '$2').replace('src/', ''))
    }
    return entries
}

const addEntries = () => {
    let entryObj = {}
    getEntry().forEach(item => {
        entryObj[item] = path.resolve(process.cwd(), 'src', item, 'index.js')
    })
    return entryObj
}

const addHtmlWebpackPlugin = (isProd) => {
    let pluginsArr = []
    getEntry().forEach(item => {
        pluginsArr.push(
            new HtmlWebpackPlugin({
                filename: `${item}.html`,
                template: isProd ? path.resolve(process.cwd(), 'src/index.html') : path.resolve(process.cwd(), 'src/index.dev.html'),
                hash: true,
                chunks: ["vendor", item],
                inject: true,
                prefetch: ['*.js'],
                preload: false,
                minify: {
                    removeAttributeQuotes: false,
                    removeComments: true,
                    collapseWhitespace: true,
                    removeScriptTypeAttributes: false,
                    removeStyleLinkTypeAttributes: true
                }
            })
        )
    })
    return pluginsArr
}

module.exports = {
    mode: isProd ? 'production' : 'development',
    devtool: 'cheap-module-source-map',
    entry: addEntries(),
    output: {
        filename: '[name].js',
        path: path.resolve(process.cwd(), 'dist')
    },
    resolve: {
        extensions: ['.sass', '.scss', '.js', '.jsx', '.css'],
        alias: {
            '@': path.resolve(process.cwd(), 'src'),
            '&': path.resolve(process.cwd(), 'common')
        }
    },
    module: {
        rules: [
            // 针对.jsx单文件组件
            {
                test: /\.(jsx)|(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: [
                            ["styled-jsx/babel", { "optimizeForSpeed": true, "plugins": ["styled-jsx-plugin-sass"] }],
                            ["@babel/plugin-proposal-class-properties"],
                            ["babel-plugin-styled-components"]
                        ]
                    }
                }
            },
            // .sass
            {
                test: /\.sass$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                indentedSyntax: true
                            }
                        }
                    }
                ]
            },
            // .scss
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        ...addHtmlWebpackPlugin(isProd),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new CleanWebpackPlugin(),
        new ResourceHintWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{ from: 'public', to: './' }]
        })
    ]
}