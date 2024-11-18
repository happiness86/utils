import { isBoolean, isNull, isObject, isUndef } from './compare'

export interface SafeAssignOptions {
  allowZero?: boolean
  allowEmptyString?: boolean
  allowUndefined?: boolean
  allowNull?: boolean
}

const defaultOptions: SafeAssignOptions = {
  allowZero: true,
  allowEmptyString: true,
  allowUndefined: false,
  allowNull: false,
}

/**
 * @desc 当且仅当target和source都有对应属性才赋值, 同时能控制赋值条件
 * @param target Record<string, any>
 * @param source Record<string, any>
 * @param options SafeAssignOptions | boolean。 传递false禁用所有选项或者true开启所有选项，不传使用默认配置（禁用null，undefine,允许0、‘’）
 */
export function safeAssign<T extends Record<string, any>>(target: T, source: T, opt?: SafeAssignOptions | boolean): T | Partial<T> {
  const options = Object.assign({}, defaultOptions)
  if (isBoolean(opt)) {
    const value = !!opt
    Object.keys(options).forEach((item) => {
      options[item as keyof SafeAssignOptions] = value
    })
  }
  else if (isObject(opt)) {
    Object.assign(options, opt)
  }
  const newTarget: T | Partial<T> = {}
  for (const key in target) {
    if (Object.hasOwnProperty.call(target, key) && Object.hasOwnProperty.call(source, key)) {
      const sourceVal = source[key]
      if (!options.allowZero && sourceVal === 0
        || !options.allowEmptyString && sourceVal === ''
        || !options.allowNull && isNull(sourceVal)
        || !options.allowUndefined && isUndef(sourceVal)
      ) {
        newTarget[key] = target[key]
        continue
      }
      else {
        target[key] = sourceVal
        newTarget[key] = sourceVal
      }
    }
    else {
      newTarget[key] = target[key]
    }
  }
  return newTarget
}
