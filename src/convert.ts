import { isEmptyString, isString } from './compare'

/**
 * @description 下划线转驼峰
 * @param target
 * @returns
 */
export function camelcase(target: string): string {
  if (!isString(target) || isEmptyString(target))
    return ''
  let temp = target.replace(/^_(\w)/, (str) => {
    return str[str.length - 1].toLowerCase()
  })
  if (temp.endsWith('_')) {
    temp = temp.slice(0, temp.length - 1)
  }
  return temp.replace(/_(\w)/g, (str) => {
    return str[str.length - 1].toUpperCase()
  })
}
