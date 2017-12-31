import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
  },
  external: ['md-core/dist/nodes'],

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
  ],
};
