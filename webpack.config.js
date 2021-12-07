const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

const config = require('./config.json');
const package = require('./package.json');
const buildFolder = path.resolve(__dirname, package.name);

module.exports = (env = {}, argv) => {

    const getOutputPath = () => {
        return argv.mode === 'production' ? buildFolder + '/dist' : path.resolve(__dirname, 'dist');
    };

    const runShell = () => {

        switch (process.platform) {
            case 'win32': return ['echo "Windows is not supported"'];
            case 'darwin': return [`zip -r ${package.name}.zip ./${package.name}/* `];
            default: return [];
        }
    };

    const getPlugins = () => {
        const plugins = [
            new BrowserSyncPlugin({
                proxy: {
                    target: config.proxyURL
                },
                files: [
                    '**/*.php'
                ],
                cors: true,
                reloadDelay: 0
            }),
            new MiniCSSExtractPlugin({
                filename: 'style.bundle.css'
            })
        ];

        if (argv.mode === 'production') {
            plugins.push(
                new CleanWebpackPlugin(
                    {
                        cleanOnceBeforeBuildPatterns: [buildFolder]
                    }
                ),
                new CopyWebpackPlugin({
                    patterns: [
                        { from: path.resolve(__dirname, 'server') + '/**', to: buildFolder },
                        { from: path.resolve(__dirname, '*.php'), to: buildFolder }
                    ]
                }),
                new WebpackShellPluginNext({
                    onBuildEnd: {
                        scripts: runShell(),
                        blocking: false
                    }
                })
            );
        }

        return plugins;
    };

    return {
        entry: [
            './src/index.js'
        ],
        output: {
            filename: 'bundle.js',
            path: getOutputPath(),
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    },
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.scss$/i,
                    exclude: /node_modules/,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader'
                    ]
                }
            ]
        },
        devtool: 'source-map',
        plugins: getPlugins()
    };
};