import setItem from '../set_item'

describe('Set Item Behavior', () => {
  describe('Set Single', () => {
    it('should call store.set with proper values', () => {
      const key = 'key'
      const value = true
      const store = { set: jest.fn() }
      const result = setItem.single({ key, value, store, log: jest.fn() })

      expect(store.set).toHaveBeenCalledTimes(1)
      expect(store.set).toHaveBeenCalledWith(key, value)
      expect(result).toEqual({ key, value })
    })
  })

  describe('Set Multi', () => {
    it('should call store.set multiple times with proper values', async () => {
      const values = [
        {
          key: 'key1',
          value: {
            value: 'value',
            ttl: 999
          }
        },
        {
          key: 'key2',
          value: {
            value: true,
            ttl: 999
          }
        },
        {
          key: 'key3',
          value: {
            value: { prop: { something: true } },
            ttl: 999
          }
        }
      ]
      const store = { set: jest.fn() }
      const results = await setItem.multi({
        values,
        store,
        log: jest.fn()
      })

      expect(store.set).toHaveBeenCalledTimes(values.length)
      expect(values).toEqual(results)
    })
  })
})
