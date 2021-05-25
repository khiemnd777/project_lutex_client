import { resolve } from 'path';
import rollupCommonjs from '@rollup/plugin-commonjs';
import rollupResolve from '@rollup/plugin-node-resolve';
import rollupJson from '@rollup/plugin-json';
import rollupFilesize from 'rollup-plugin-filesize';
import rollupReplace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
// const yargs = require('yargs/yargs');
// const { hideBin } = require('yargs/helpers');
const env = require('./env.config');
const node_env = process.env.NODE_ENV;
const isDevelopmentEnv = node_env === 'development';
// const argv = yargs(hideBin(process.argv)).argv;

console.log('Environment', node_env);

// API HOST
const port = env('CLIENT_PORT') || 7777;
const secureProtocol = !!env('API_SECURE') || false;
const apiPort = env('API_PORT') || 1337;
const apiHostName = env('API_HOST') || (node_env === 'development' ? 'localhost' : 'lutex.io'); // argv.apiHost || (node_env === 'development' ? 'localhost' : 'lutex.io');
const clientSecureProtocal = !!env('CLIENT_SECURE') ? 'https' : 'http'; //!!argv.clientSecure && argv.clientSecure === 'true' ? 'https' : 'http';
const clientHostName = env('CLIENT_HOST') || (node_env === 'development' ? 'localhost' : 'lutex.io'); // argv.clientHost || (node_env === 'development' ? 'localhost' : 'lutex.io');
const distPath = env('DIST') || (node_env === 'development' ? './wwwroot' : ''); //argv.dist || (node_env === 'development' ? './wwwroot' : '');

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
    'process.env.NODE_ENV': JSON.stringify(node_env || 'development'),
  }),
  rollupReplace({
    preventAssignment: true,
    exclude: 'node_modules/**',
    PORT: port,
    SECURE: secureProtocol,
    API_PORT: apiPort,
    API_HOST: apiHostName,
    CLIENT_SECURE: clientSecureProtocal,
    CLIENT_HOST: clientHostName,
    DIST_PATH: distPath,
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
      dir: resolve('wwwroot/'),
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
