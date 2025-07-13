path = require('path');

module.exports = {
    entry: {
        main: './js/index.js',
        styles: './css/styles.css'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './wwwroot/dist')
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