const path = require('path');
// const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'bundle.js',
    },

    mode: 'development',

    // devServer: {
    //     contentBase: './dist'
    // },
    // plugins: [
    //     new htmlWebpackPlugin({
    //         filename: 'index.html',
    //         template: '.src/index.html'  
    //     })
    // ]
};