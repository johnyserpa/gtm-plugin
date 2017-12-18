import babel from 'rollup-plugin-babel';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default {
  input: 'dist/v1/gtm-wrapper.js',
  output: {
    file: 'dist/v1/gtm-wrapper-bundle.js',
    format: 'iife',
    sourcemap: true,
    globals: {
      jquery: 'jQuery'
    }
  },
  name: "GtmWrapper",
  external: [
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    sourcemaps()
  ]
};
