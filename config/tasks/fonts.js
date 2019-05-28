import gulp from 'gulp'
import fontmin from 'gulp-fontmin'

import { project } from '../index'

const fontsPath = project.sourceDirectory + '/' + project.fontsDirectory + '/**/*.*'
const dest = project.distDirectory + '/' + project.fontsDirectory

export default function () {
  return function () {
    return gulp
      .src(fontsPath)
      .pipe(fontmin(fontsPath))
      .pipe(gulp.dest(dest))
  }
}

