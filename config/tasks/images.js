import gulp from 'gulp'
import imagemin from 'gulp-imagemin'

import { project, targets } from '../index'

const imgsPath = project.sourceDirectory + '/' + project.imagesDirectory + '/**/*.*'
const dest = project.distDirectory + '/' + project.imagesDirectory

export default function () {
  return function () {
    return gulp
      .src(imgsPath)
      .pipe(imagemin(targets.imageOptimization))
      .pipe(gulp.dest(dest))
  }
}
