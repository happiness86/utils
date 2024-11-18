import { describe, expect, it } from 'vitest'
import { getDataType, isEmptyObject } from '../src/compare'

describe('primitive value test', () => {
  it('should return string', () => {
    expect(getDataType('1')).toBe('string')
  })
  it('should return number', () => {
    expect(getDataType(1)).toBe('number')
  })
  it('should return boolean', () => {
    expect(getDataType(false)).toBe('boolean')
  })
  it('should return undefined', () => {
    expect(getDataType(undefined)).toBe('undefined')
  })
  it('should return null', () => {
    expect(getDataType(null)).toBe('null')
  })
  it('should return symbol', () => {
    expect(getDataType(Symbol(''))).toBe('symbol')
  })
})

describe('object value test', () => {
  it('should return object', () => {
    expect(getDataType({})).toBe('object')
  })
  it('should return function', () => {
    const fn = () => {}
    expect(getDataType(fn)).toBe('function')
  })
  it('should return array', () => {
    expect(getDataType([])).toBe('array')
  })
  it('should return date', () => {
    expect(getDataType(new Date())).toBe('date')
  })
  it('should return promise', () => {
    expect(getDataType(new Promise(() => {}))).toBe('promise')
  })
  it('should return regexp', () => {
    // eslint-disable-next-line prefer-regex-literals
    expect(getDataType(new RegExp('abc', 'gi'))).toBe('regexp')
  })
  it('should return regexp1', () => {
    expect(getDataType(/abc/gi)).toBe('regexp')
  })
})

describe('empty object test', () => {
  it('{} should return true', () => {
    expect(isEmptyObject({})).toBe(true)
  })
  it('{a: 1} should return false', () => {
    expect(isEmptyObject({ a: 1 })).toBe(false)
  })
  it('has proto', () => {
    const proto = { foo: 1 }
    const target = {}
    Object.setPrototypeOf(target, proto)
    expect(isEmptyObject(target)).toBe(false)
  })

  it('init object', () => {
    const proto = { foo: 1 }
    const target = Object.create(proto)
    expect(isEmptyObject(target)).toBe(false)
  })
})
