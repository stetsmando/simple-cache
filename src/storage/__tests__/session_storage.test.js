/* eslint no-undef: 0 */

import session from '../session_storage'
global.sessionStorage = {
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn()
}

describe('SessionStorage Behavior', () => {
  it('should call setItem with a key and stringified value', () => {
    const key = 'key'
    const value = 'value'
    session.set(key, value)

    expect(sessionStorage.setItem).toHaveBeenCalledTimes(1)
    expect(sessionStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })

  it('should call getItem with a key', () => {
    const key = 'key'
    session.get(key)

    expect(sessionStorage.getItem).toHaveBeenCalledTimes(1)
    expect(sessionStorage.getItem).toHaveBeenCalledWith(key)
  })

  it('should call removeItem with a key', () => {
    const key = 'key'
    session.remove(key)

    expect(sessionStorage.removeItem).toHaveBeenCalledTimes(1)
    expect(sessionStorage.removeItem).toHaveBeenCalledWith(key)
  })
})
