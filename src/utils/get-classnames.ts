import { COMPONENT_ID } from '../constants'

export function getClassnames(source = '') {
  let classNameArray = [COMPONENT_ID]
  const sourceSplit = source.split(',')

  classNameArray = [...classNameArray, ...sourceSplit]
  const className = classNameArray.join(' ')

  return className
}
