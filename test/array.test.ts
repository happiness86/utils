import { describe, expect, it } from 'vitest'
import { a2m } from '../src/array'

describe('array to map test', () => {
  it('empty array or other type should return map', () => {
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    expect(a2m(1, 'id')).toEqual(new Map())
    expect(a2m([], 'id')).toEqual(new Map())
  })
  it('should return map', () => {
    const arr = [
      {
        id: 1,
        name: 'cat',
      },
      {
        id: 2,
        name: 'dog',
      },
      {
        id: 3,
        name: 'chicken',
      },
    ]
    const result = new Map([
      [1, {
        id: 1,
        name: 'cat',
      }],
      [2, {
        id: 2,
        name: 'dog',
      }],
      [3, {
        id: 3,
        name: 'chicken',
      }],
    ])
    expect(a2m(arr, 'id')).toEqual(result)
  })
  it('should group by name', () => {
    const arr = [
      {
        id: 1,
        name: 'cat',
      },
      {
        id: 2,
        name: 'dog',
      },
      {
        id: 3,
        name: 'chicken',
      },
      {
        id: 4,
        name: 'chicken',
      },
    ]
    const result = new Map([
      ['cat', [{
        id: 1,
        name: 'cat',
      }]],
      ['dog', [{
        id: 2,
        name: 'dog',
      }]],
      ['chicken', [{
        id: 3,
        name: 'chicken',
      }, {
        id: 4,
        name: 'chicken',
      }]],
    ])
    expect(a2m(arr, 'name', true)).toEqual(result)
  })
  it('should filter falsy value', () => {
    const arr = [
      {
        id: 1,
        name: 'cat',
      },
      {
        id: 2,
        name: 'dog',
      },
      {
        id: 3,
        name: 'chicken',
      },
      undefined,
      {
        other: 'wolf',
      },
    ]
    const result = new Map([
      [1, {
        id: 1,
        name: 'cat',
      }],
      [2, {
        id: 2,
        name: 'dog',
      }],
      [3, {
        id: 3,
        name: 'chicken',
      }],
    ])
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    expect(a2m(arr, 'id')).toEqual(result)
  })
})
