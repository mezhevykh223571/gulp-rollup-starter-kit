import del from 'del'

import { project } from '../index'

export default function () {
  return function () {
    return del([project.distDirectory])
  }
}
