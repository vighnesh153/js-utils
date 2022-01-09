import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

import pkg from './package.json';

const extensions = ['.ts', '.tsx'];

export default {
  input: 'src/index.ts',
  plugins: [
    nodeResolve({
      extensions,
    }),
    babel({
      extensions,
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
    terser(),
    typescript(),
  ],
  output: [
    {
      file: pkg['umd-file'],
      format: 'umd',
      name: 'Utils',
      sourcemap: false,
    },
    {
      file: pkg.main,
      format: 'es',
      sourcemap: false,
    },
    {
      file: pkg['cjs-file'],
      format: 'cjs',
      sourcemap: false,
    },
  ],
};
