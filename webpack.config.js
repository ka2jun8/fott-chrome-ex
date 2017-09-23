var webpack = require('webpack');

module.exports = [
    {
        name: 'bundle',
        cache: true,
        entry: './src-popup/index.tsx',
        output: {
            path: __dirname+'/dist',
            filename: 'bundle.js'
        },
        resolve: {
            extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
        },
        devtool: 'source-map',
        module: {
            loaders: [
                // { test: /\.css$/, loader: "style-loader!css-loader" },
                { test: /\.tsx?$/, loader: 'tslint-loader' },
                { test: /\.tsx?$/, loader: 'ts-loader' }
            ]
        }
    },
    {
        name: 'option',
        cache: true,
        entry: './src-option/index.tsx',
        output: {
            path: __dirname+'/dist',
            filename: 'option.js'
        },
        resolve: {
            extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
        },
        devtool: 'source-map',
        module: {
            loaders: [
                // { test: /\.css$/, loader: "style-loader!css-loader" },
                { test: /\.tsx?$/, loader: 'tslint-loader' },
                { test: /\.tsx?$/, loader: 'ts-loader' }
            ]
        }
    }
];
