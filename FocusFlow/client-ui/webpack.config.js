path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main: './js/index.js',
        styles: './css/index.css'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../wwwroot/dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};