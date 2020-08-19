const CracoLessPlugin = require('craco-less');
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer"); // 在项目运行之后会弹出一个页面显示编译文件详情
const CompressionWebpackPlugin = require("compression-webpack-plugin"); // gzip打包压缩插件


module.exports = {
    webpack: {
        plugins: [
            new BundleAnalyzerPlugin(),
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp(
                    '\\.(' +
                    ['js', 'css'].join('|') +
                    ')$'
                ),
                threshold: 1024,
                minRatio: 0.8
            }),
        ]
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#1DA57A' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
    devServer: {
        proxy: {
            "/api": {
                target: "http://xxx.xx.xxx.xx:xxxx",//后台服务地址
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    },
    babel: {
        plugins: [
            [
                "import",
                {
                    "libraryName": "antd",
                    "libraryDirectory": "es",
                    "style": true //设置为true即是less
                }
            ]
        ]
    },
}