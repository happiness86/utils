import { describe, expect, it } from 'vitest'
import { safeAssign } from '../src/assign'

describe('assign', () => {
  it('should return source', () => {
    const target = {
      a: 1,
      b: 2,
    }
    const source = {
      a: 3,
      b: 4,
    }
    safeAssign(target, source)
    expect(target).toEqual(source)
  })
  it('should filter 0, \'\', null, undefined', () => {
    const target = {
      a: 1,
      b: 2,
      c: 'string',
      d: 3,
      e: 4,
    }
    const source = {
      a: 0,
      b: 4,
      c: '',
      d: undefined,
      e: null,
    }
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    safeAssign(target, source, false)
    expect(target).toEqual({
      a: 1,
      b: 4,
      c: 'string',
      d: 3,
      e: 4,
    })
  })
  it('should not filter 0, \'\', null, undefined', () => {
    const target = {
      a: 1,
      b: 2,
      c: 'string',
      d: 3,
      e: 4,
    }
    const source = {
      a: 0,
      b: {},
      c: '',
      d: undefined,
      e: null,
    }
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    safeAssign(target, source, true)
    expect(target).toEqual({
      a: 0,
      b: {},
      c: '',
      d: undefined,
      e: null,
    })
  })
  it('should return new value', () => {
    const target = {
      a: 1,
      b: 2,
      c: 'string',
      d: 3,
      e: 4,
    }
    const source = {
      a: 0,
      b: {},
      c: '',
      d: undefined,
      e: null,
    }
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    const newTarget = safeAssign(target, source, true)
    expect(newTarget).toEqual({
      a: 0,
      b: {},
      c: '',
      d: undefined,
      e: null,
    })
  })
  it('returned new value should be part of original value', () => {
    const target = {
      a: 1,
      b: 2,
      c: 'string',
      d: 3,
      e: 4,
    }
    const source = {
      a: 0,
      b: {},
      c: '',
      d: undefined,
      e: null,
    }
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    const newTarget = safeAssign(target, source)
    expect(newTarget).toEqual({
      a: 0,
      b: {},
      c: '',
      d: 3,
      e: 4,
    })
  })
})
