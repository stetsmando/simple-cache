import SimpleCache from '../index'
import setItem from '../operations/set_item'

import session from '../storage/session_storage'
import local from '../storage/local_storage'

describe('Set Multi Behavior', () => {
  const namespace = 'SimpleCacheTest:'
  let cache, values, store
  beforeEach(() => {
    cache = new SimpleCache({ namespace })
    values = null
    store = null
  })

  it('should call set item multi properly', async () => {
    values = [
      {
        key: 'key1',
        value: 'value'
      },
      {
        key: 'key2',
        value: true
      },
      {
        key: 'key3',
        value: { prop: { something: true } }
      }
    ]
    setItem.multi = jest.fn(cw => {
      cw.values.map((item, i) => {
        expect(item.key).toEqual(`${namespace}${values[i].key}`)
        expect(item.value).toEqual(expect.objectContaining({
          ttl: expect.anything(),
          value: values[i].value
        }))
      })

      expect(setItem.multi).toHaveBeenCalledTimes(1)
    })
    await cache.set(values)

    expect(setItem.multi).toHaveBeenCalledTimes(1)
  })

  describe('Storage Behavior', () => {
    it('should call local storage', () => {
      values = [{ key: 'key', value: 'value' }]
      setItem.multi = jest.fn(cw => {
        store = cw.store
      })
      cache.set(values)

      expect(store).toBe(local)
      expect(setItem.multi).toHaveBeenCalledTimes(1)
    })

    it('should call session storage', () => {
      values = [{ key: 'key', value: 'value' }]
      setItem.multi = jest.fn(cw => {
        store = cw.store
      })
      cache.set(values, true)

      expect(store).toBe(session)
      expect(setItem.multi).toHaveBeenCalledTimes(1)
    })
  })
})
