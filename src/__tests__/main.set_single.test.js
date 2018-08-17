import SimpleCache from '../index'
import setItem from '../operations/set_item'

import session from '../storage/session_storage'
import local from '../storage/local_storage'

describe('Set Single Behavior', () => {
  let cache, key, value, store
  beforeEach(() => {
    cache = new SimpleCache()
    key = 'key'
    value = null
    store = null
  })

  it('should call set item single properly for strings', () => {
    let calledWith = null
    value = 'my value here'

    setItem.single = jest.fn(cw => {
      store = cw.store
      calledWith = cw
    })

    cache.set(key, value)

    expect(setItem.single).toHaveBeenCalledTimes(1)
    expect(calledWith.value.value).toBe(value)
  })

  it('should call set item single properly for bools', () => {
    let calledWith = null
    value = true

    setItem.single = jest.fn(cw => {
      store = cw.store
      calledWith = cw.value
    })

    cache.set(key, value)

    expect(setItem.single).toHaveBeenCalledTimes(1)
    expect(calledWith.value).toBe(value)
  })

  it('should call set item single properly for objects', () => {
    let calledWith = null
    value = {
      prop: 'some value',
      nested: {
        prop: 'another value'
      }
    }

    setItem.single = jest.fn(cw => {
      store = cw.store
      calledWith = cw
    })

    cache.set(key, value)

    expect(calledWith.value.value).toBe(value)
    expect(setItem.single).toHaveBeenCalledTimes(1)
  })

  describe('Storage Behavior', () => {
    it('should call local storage', () => {
      value = true
      setItem.single = jest.fn(calledWith => {
        store = calledWith.store
      })
      cache.set(key, value)

      expect(store).toBe(local)
      expect(setItem.single).toHaveBeenCalledTimes(1)
    })

    it('should call session storage', () => {
      value = true
      setItem.single = jest.fn(calledWith => {
        store = calledWith.store
      })
      cache.set(key, value, true)

      expect(store).toBe(session)
      expect(setItem.single).toHaveBeenCalledTimes(1)
    })
  })
})