import gulp from 'gulp'
import plumber from 'gulp-plumber'
import sourcemaps from 'gulp-sourcemaps'
import gif from 'gulp-if'
import concat from 'gulp-concat'
import terser from 'gulp-terser'
import babel from 'gulp-babel'

import { handleError, liveEnv, targets, project } from '../index'

const jsPaths = targets.LIB_JS_INCLUDE_PATHS
const jsLibFileName = project.jsLibsMinFileName
const dest = project.distDirectory + '/' + project.scriptsDirectory

export default function () {
  return function () {
    return gulp
      .src(jsPaths)
      .pipe(plumber({ errorHandler: handleError }))
      .pipe(gif(!liveEnv, sourcemaps.init()))
      .pipe(babel({ compact: true }))
      .pipe(concat(jsLibFileName))
      .pipe(terser())
      .pipe(gif(!liveEnv, sourcemaps.write()))
      .pipe(gulp.dest(dest))
  }
}
