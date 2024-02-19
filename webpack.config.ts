const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = {
    mode: "development",
    context: __dirname + "/src",
    entry: {
        app: "./index.ts",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: "ts-loader",
                },
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    target: "node",
    externalsPresets: {
        node: true,
    },
    externals: [nodeExternals()],
};
