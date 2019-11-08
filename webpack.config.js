const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//HardSourceWebpack enables module caching to speed performance on larger appliactions. Remove if you dont care about that.
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const sassLoader = {
    loader: 'sass-loader',
};
const pluginConfigs = {
    HtmlWebpackPlugin: new HtmlWebpackPlugin({
        template: 'src/index.html',
        hash: true,
    }),
    HardSourceWebpackPlugin: new HardSourceWebpackPlugin(),
};

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {test : /\.(js)$/, use:'babel-loader'},
            {
                test: /\.(woff2|woff|ttf|eot|svg|otf)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loaders: ['url-loader?limit=100&name=fonts/[name].[ext]'],
            },
            {
                test: /\.(png|jpg)$/,
                include: path.join(__dirname, 'src'),
                loader: 'file-loader',
            },
            {
                test: [/\.module.scss$/],
                exclude: [/^(?!(.*)module.scss$).*\.scss$/],
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                        },
                    },
                    sassLoader,
                ],
            },
            {
                test: [/\.scss$/],
                exclude: [/\.module.scss$/],
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            camelCase: true,
                        },
                    },
                    sassLoader,
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.jsx', '.js'],
        alias: {
            root: path.resolve(__dirname, 'src/'),
        },
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
        chunkFilename: '[name].[contenthash:8].chunk.js',
    },
    mode:'development',
    plugins: [
        new MiniCssExtractPlugin({}),
        pluginConfigs.HtmlWebpackPlugin,
        pluginConfigs.HardSourceWebpackPlugin,
    ],
};
