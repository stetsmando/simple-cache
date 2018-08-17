/* eslint no-undef: 0 */

import local from '../local_storage'
global.localStorage = {
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn()
}

describe('LocalStorage Behavior', () => {
  it('should call setItem with a key and stringified value', () => {
    const key = 'key'
    const value = 'value'
    local.set(key, value)

    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })

  it('should call getItem with a key', () => {
    const key = 'key'
    local.get(key)

    expect(localStorage.getItem).toHaveBeenCalledTimes(1)
    expect(localStorage.getItem).toHaveBeenCalledWith(key)
  })

  it('should call removeItem with a key', () => {
    const key = 'key'
    local.remove(key)

    expect(localStorage.removeItem).toHaveBeenCalledTimes(1)
    expect(localStorage.removeItem).toHaveBeenCalledWith(key)
  })
})
