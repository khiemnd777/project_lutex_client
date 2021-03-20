import { resolve } from 'path';
import rollupCommonjs from '@rollup/plugin-commonjs';
import rollupResolve from '@rollup/plugin-node-resolve';
import rollupJson from '@rollup/plugin-json';
import rollupFilesize from 'rollup-plugin-filesize';
import rollupReplace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const env = process.env.NODE_ENV;
const buildConfig = require('./build.config.json');
const isDevelopmentEnv = env === 'development';
const argv = yargs(hideBin(process.argv)).argv;

console.log('Environment', env);

// API HOST
const secureProtocol = argv.secure || 'false';
const apiPort = argv.apiPort || 1337;
const apiHostName = argv.apiHost || (env === 'development' ? 'localhost' : 'lutex.io');
const port = argv.port || 7777;

const plugins = [
  rollupResolve({
    jsnext: true,
    preferBuiltins: true,
    browser: true,
  }),
  rollupCommonjs({
    include: 'node_modules/**',
  }),
  rollupReplace({
    preventAssignment: true,
    'process.env.NODE_ENV': JSON.stringify(env || 'development'),
  }),
  rollupReplace({
    preventAssignment: true,
    exclude: 'node_modules/**',
    PORT: port,
    SECURE: secureProtocol,
    API_PORT: apiPort,
    API_HOST: apiHostName,
    delimiters: ['{{', '}}'],
  }),
  rollupJson({
    namedExports: true,
  }),
  rollupFilesize(),
];

!isDevelopmentEnv && plugins.push(terser());

const external = [];

const globals = {};

export default [
  {
    input: './ssr/server.js',
    watch: isDevelopmentEnv,
    plugins: [...plugins],
    external: external,
    output: {
      sourcemap: isDevelopmentEnv,
      dir: resolve(buildConfig.dist),
      format: 'iife',
      globals: globals,
    },
    watch: {
      buildDelay: 500,
      clearScreen: false,
      chokidar: {
        ignoreInitial: true,
        useFsEvents: true,
      },
      exclude: ['node_modules/**'],
    },
  },
];
