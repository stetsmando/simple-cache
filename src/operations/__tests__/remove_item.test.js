import removeItem from '../remove_item'

describe('Remove Item Behavior', () => {
  describe('Remove Single', () => {
    it('should call store.remove with proper key', () => {
      const key = 'key'
      const local = { remove: jest.fn() }
      const session = { remove: jest.fn() }
      const stores = [ session, local ]
      const result = removeItem.single({ key, stores, log: jest.fn() })

      expect(local.remove).toHaveBeenCalledTimes(1)
      expect(session.remove).toHaveBeenCalledTimes(1)
      expect(result).toEqual({ key })
    })
  })

  describe('Remove Multi', () => {
    it('should call store.remove multiple times with proper keys', async () => {
      const keys = ['key', 'key2', 'key3']
      const local = { remove: jest.fn() }
      const session = { remove: jest.fn() }
      const stores = [ session, local ]
      const results = await removeItem.multi({ keys, stores, log: jest.fn() })

      expect(local.remove).toHaveBeenCalledTimes(keys.length)
      expect(session.remove).toHaveBeenCalledTimes(keys.length)
      expect(keys).toEqual(results)
    })
  })
})
