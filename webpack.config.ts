import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import type { Configuration } from "webpack";

type Mode = 'production' | 'development';

interface EnvVariables {
    mode: Mode,
    port: number,
}

export default (env: EnvVariables) => {
    const isDev = env.mode === 'development';
    const isProd = env.mode === 'production';

    const devServer: DevServerConfiguration = {
        open: true,
        port: env.port ?? 3000,

    };

    const config: Configuration  = {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        module: {
            rules: [
/*                 {
                    test: /\.css$/i,
                    use: ["style-loader"],
                },
                {
                    test: /\.css$/i,
                    use: ["css-loader"],
                }, */
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                      // Creates `style` nodes from JS strings
                      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                      // Translates CSS into CommonJS
                      "css-loader",
                      // Compiles Sass to CSS
                      "sass-loader",
                    ],
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'bundle.[contenthash].js',
            clean: true,
        },
        plugins: [
            new HtmlWebpackPlugin({template: path.resolve(__dirname, 'public', 'index.html')}),
            new webpack.ProgressPlugin(),
            isProd && new MiniCssExtractPlugin({
                filename: 'css/main.[contenthash].css'
            }),
        ],
        devServer: isDev ? devServer : undefined,
        devtool: isDev ? 'inline-source-map' : false,
    };
 
    return config;
}