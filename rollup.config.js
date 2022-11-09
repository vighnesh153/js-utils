const babel = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const terser = require('@rollup/plugin-terser');
const typescript = require('@rollup/plugin-typescript');

const pkg = require('./package.json');

const extensions = ['.ts'];

module.exports = {
  input: 'src/utils.ts',
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
