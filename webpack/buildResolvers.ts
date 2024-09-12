import type { Configuration } from "webpack";
import { BuildOPtions } from "./types";

export function buildResolvers(options: BuildOPtions): Configuration['resolve'] {
    return {
        extensions: ['.tsx', '.ts', '.js', '.scss'],
        alias: {
            "@": options.paths.src,
        }
    }
}