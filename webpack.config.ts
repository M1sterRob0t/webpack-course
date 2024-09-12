import path from 'path';

import { BuildMode, BuildPath, BuildPlatform } from './webpack/types';
import { buildWebpack } from './webpack/buildWebpack';

interface EnvVariables {
    mode: BuildMode,
    port: number,
    analizer?: boolean,
    platform?: BuildPlatform;
}

export default (env: EnvVariables) => {
    const buildPath: BuildPath = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        output: path.resolve(__dirname, 'build'),
        src: path.resolve(__dirname, 'src'),
        public: path.resolve(__dirname, 'public'),
    }

    const config = buildWebpack({
        mode: env.mode ?? 'development', 
        paths: buildPath,
        port: 3000,
        analyzer: env.analizer,
        platform: env.platform ?? 'desktop',
    });
 
    return config;
}