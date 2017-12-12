import babel from 'rollup-plugin-babel';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default {
  input: 'dist/gtm-plugin.js',
  output: {
    file: 'dist/gtm-plugin-bundle.js',
    format: 'iife',
    sourcemap: true,
    globals: {
      jquery: 'jQuery'
    }
  },
  moduleName: "LVGtmPlugin",
  external: [
    'jquery'
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    sourcemaps()
  ]
};
