import gulp from 'gulp'
import plumber from 'gulp-plumber'
import gif from 'gulp-if'
import sourcemaps from 'gulp-sourcemaps'
import babel from 'gulp-babel'
import terser from 'gulp-terser'
import concat from 'gulp-concat'
import rollup from 'gulp-better-rollup'
import resolve from 'rollup-plugin-node-resolve'
import globals from 'rollup-plugin-node-globals'
import commonjs from 'rollup-plugin-commonjs'
import builtins from 'rollup-plugin-node-builtins'

import { handleError, liveEnv, project } from '../index'

const jsPaths = project.sourceDirectory + '/' + project.scriptsDirectory + '/**/*.js'
const jsFileName = project.jsMinFileName
const dest = project.distDirectory + '/' + project.scriptsDirectory

export default function () {
  return function () {
    return gulp
      .src(jsPaths)
      .pipe(rollup({
        plugins: [
          resolve({
            preferBuiltins: false,
          }),
          babel({
            compact: true,
          }),
          commonjs(),
          globals(),
          builtins(),
        ]
      }, 'umd'))
      .pipe(plumber({ errorHandler: handleError }))
      .pipe(gif(!liveEnv, sourcemaps.init()))
      .pipe(concat(jsFileName))
      .pipe(terser())
      .pipe(gif(!liveEnv, sourcemaps.write()))
      .pipe(gulp.dest(dest))
  }
}
