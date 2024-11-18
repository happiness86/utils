import { describe, expect, it } from 'vitest'
import { camelcase } from '../src/convert'

describe('covert test', () => {
  it('should return foo', () => {
    expect(camelcase('_foo')).toBe('foo')
  })
  it('should return bar', () => {
    expect(camelcase('_bar_')).toBe('bar')
  })
  it('should return fooBar', () => {
    expect(camelcase('foo_bar')).toBe('fooBar')
  })
  it('should return ""', () => {
    expect(camelcase('')).toBe('')
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    expect(camelcase(0)).toBe('')
  })
})
