const path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: ["./typescriptReact/app.tsx","./typescriptReact/num2.tsx"],
    mode: "production",
    output: {
        path: path.resolve(__dirname, 'public', 'scripts'),
        filename: "[name].js"
    },
    resolve: {
        extensions: ['.Webpack.js', '.web.js', '.ts', '.js', '.jsx', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'ts-loader'
                }
            }
        ]
    }
}
