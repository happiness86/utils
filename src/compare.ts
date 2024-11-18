/**
 * @description 获取数据类型
 */
export function getDataType(target: unknown): string {
  return Object.prototype.toString.call(target).slice(8, -1).toLowerCase()
}

export function isUndef(target: unknown): boolean {
  return getDataType(target) === 'undefined'
}

export function isNull(target: unknown): boolean {
  return getDataType(target) === 'null'
}

export function isString(target: unknown): boolean {
  return getDataType(target) === 'string'
}

export function isBoolean(target: unknown): boolean {
  return getDataType(target) === 'boolean'
}

export function isNumber(target: unknown): boolean {
  return getDataType(target) === 'number'
}

export function isArray(target: unknown): boolean {
  return getDataType(target) === 'array'
}

export function isObject(target: unknown): boolean {
  return getDataType(target) === 'object'
}

export function isNullOrUndef(target: unknown): boolean {
  return isNull(target) || isUndef(target)
}

export function isEmptyString(target: unknown): boolean {
  return isString(target) && target === ''
}

export function isEmptyObject(target: unknown): boolean {
  if (!isObject(target))
    return false
  const hasOwnProperty = Object.keys(target as object).length === 0
  if (!hasOwnProperty)
    return false
  let cnt = 0
  for (const _p in (target as object)) {
    cnt++
  }
  return cnt === 0
}

export function isEmptyArray(target: unknown): boolean {
  return isArray(target) && (target as Array<unknown>).length === 0
}

export function isNaNType(target: unknown): boolean {
  // eslint-disable-next-line no-self-compare
  return Number.isNaN(target) || target !== target
}

export function isFalsy(target: unknown): boolean {
  // eslint-disable-next-line no-self-compare
  return target === '' || target === 0 || isNull(target) || isUndef(target) || target === false || Number.isNaN(target) || target !== target
}

export function isTruthy(target: unknown): boolean {
  return !isFalsy(target)
}

export function isFalsyExcludeZero(target: unknown): boolean {
  return target === 0 ? false : isFalsy(target)
}
