import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
  },
  external: ['md-core', 'highlight.js'],

  plugins: [
    resolve(),
    babel({
      babelrc: false,
      presets: [
        ["env", {
          modules: false
        }],
      ],
      plugins: ["transform-object-rest-spread", "external-helpers"],
      // runtimeHelpers: true,
      exclude: 'node_modules/**',
    }),
    commonjs({
      include: 'node_modules/**',
    }),
  ],
};
