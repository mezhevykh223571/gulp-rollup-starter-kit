import gulp from 'gulp'
import sass from 'gulp-sass'
import plumber from 'gulp-plumber'
import gif from 'gulp-if'
import sourcemaps from 'gulp-sourcemaps'
import autoprefixer from 'gulp-autoprefixer'
import concat from 'gulp-concat'

import { handleError, liveEnv, targets, project } from '../index'

const sassPaths = targets.SASS_INCLUDE_PATHS
const autoprefixerSettings = targets.autoprefixer
const cssLibFileName = project.cssLibsMinFileName
const dest = project.distDirectory + '/' + project.stylesDirectory

export default function () {
  return function () {
    return gulp
      .src(sassPaths)
      .pipe(plumber({errorHandler: handleError}))
      .pipe(gif(!liveEnv, sourcemaps.init()))
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(autoprefixer({
          browsers: autoprefixerSettings
        })
      )
      .pipe(concat(cssLibFileName))
      .pipe(gif(!liveEnv, sourcemaps.write()))
      .pipe(gulp.dest(dest))
  }
}
