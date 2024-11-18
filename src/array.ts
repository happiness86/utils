import { isArray, isEmptyArray, isEmptyObject, isEmptyString, isFalsyExcludeZero, isNumber, isObject, isString } from './compare'

/**
 * @desc a是b的子集或一样
 */
export function isSameOrSubArray<T>(a: T[], b: T[]): boolean {
  if (a.length > b.length) {
    return false
  }
  return a.every(item => b.includes(item))
}

/**
 * @desc a与b一样
 */
export function isSameArray<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) {
    return false
  }
  const b1 = [...b]
  for (const element of a) {
    const index = b1.findIndex(item => item === element)
    if (index < 0) {
      return false
    }
    else {
      b1.splice(index, 1)
    }
  }
  return b1.length === 0
}

/**
 * @description 数组对象转map，按照某个对象某个key的值，跳过0以外的空值
 */
export function a2m<T extends Record<string, any>>(target: Array<T>, key: string, group = false): Map<string | number, T | T[]> {
  const map = new Map<string | number, T | T[]>()
  if (!isArray(target) || isEmptyArray(target) || !isString(key) || isEmptyString(key)) {
    return map
  }

  for (let i = 0; i < target.filter(Boolean).length; i++) {
    const item = target[i]
    if (!isObject(item) || isEmptyObject(item)) {
      continue
    }
    const value = item[key]
    if (isFalsyExcludeZero(value) || (!isString(value) && !isNumber(value))) {
      continue
    }
    else {
      if (group) {
        const result = map.get(value) || (map.set(value, []).get(value))
        result!.push(item)
      }
      else {
        if (!map.get(value)) {
          map.set(value, item)
        }
      }
    }
  }

  return map
}

/**
 * @description 数组对象转object，按照某个对象某个key的值，跳过0以外的空值
 */
export function a2o<T extends Record<string, any>>(target: Array<T>, key: string, group = false): Record<string, T | T[]> {
  const obj: Record<string, T | T[]> = {}
  if (!isArray(target) || isEmptyArray(target) || !isString(key) || isEmptyString(key)) {
    return obj
  }

  for (let i = 0; i < target.filter(Boolean).length; i++) {
    const item = target[i]
    if (!isObject(item) || isEmptyObject(item)) {
      continue
    }
    const value = item[key]
    if (isFalsyExcludeZero(value) || (!isString(value) && !isNumber(value))) {
      continue
    }
    else {
      if (group) {
        (obj[value] || (obj[value] = [])).push(item)
      }
      else {
        obj[value] = item
      }
    }
  }

  return obj
}
