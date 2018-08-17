import getItem from '../get_item'

describe('Get Item Behavior', () => {
  it('should only call session storage if item is returned', () => {
    const key = 'key'
    const local = { get: jest.fn() }
    const session = { get: jest.fn(() => {
      return JSON.stringify({ value: true, ttl: Date.now() + 5000 })
    })}
    const result = getItem.single({ key, local, session, log: jest.fn() })

    expect(session.get).toHaveBeenCalledTimes(1)
    expect(local.get).toHaveBeenCalledTimes(0)
    expect(result).toEqual(expect.anything())
  })

  it('should call session and local storage if session returns null', () => {
    const key = 'key'
    const local = { get: jest.fn(() => {
      return JSON.stringify({ value: true, ttl: Date.now() + 5000 })
    })}
    const session = { get: jest.fn() }
    const result = getItem.single({ key, local, session, log: jest.fn() })

    expect(session.get).toHaveBeenCalledTimes(1)
    expect(local.get).toHaveBeenCalledTimes(1)
    expect(result).toEqual(expect.anything())
  })

  it('should remove item and return null if ttl expired (session)', () => {
    const key = 'key'
    const session = {
      get: jest.fn(() => {
        return JSON.stringify({
          value: true,
          ttl: Date.now() - 1000
        })
      }),
      remove: jest.fn(key => {
        return { key }
      })
    }
    const local = {
      get: jest.fn(),
      remove: jest.fn()
    }
    const result = getItem.single({ key, local, session, log: jest.fn() })

    expect(session.get).toHaveBeenCalledTimes(1)
    expect(session.remove).toHaveBeenCalledTimes(1)
    expect(local.get).toHaveBeenCalledTimes(1)
    expect(local.remove).toHaveBeenCalledTimes(0)
    expect(result).toEqual(null)
  })

  it('should remove item and return null if ttl expired (local)', () => {
    const key = 'key'
    const local = {
      get: jest.fn(() => {
        return JSON.stringify({
          value: true,
          ttl: Date.now() - 1000
        })
      }),
      remove: jest.fn(key => {
        return { key }
      })
    }
    const session = {
      get: jest.fn(),
      remove: jest.fn()
    }
    const result = getItem.single({ key, local, session, log: jest.fn() })

    expect(session.get).toHaveBeenCalledTimes(1)
    expect(session.remove).toHaveBeenCalledTimes(0)
    expect(local.get).toHaveBeenCalledTimes(1)
    expect(local.remove).toHaveBeenCalledTimes(1)
    expect(result).toEqual(null)
  })

  it('should remove both caches when item ttl has expired', () => {
    const key = 'key'
    const session = {
      get: jest.fn(() => JSON.stringify({ value: true, ttl: 0 })),
      remove: jest.fn()
    }
    const local = {
      get: jest.fn(() => JSON.stringify({ value: true, ttl: 0 })),
      remove: jest.fn()
    }
    const result = getItem.single({ key, local, session, log: jest.fn() })

    expect(result).toEqual(null)
    expect(session.get).toHaveBeenCalledTimes(1)
    expect(session.remove).toHaveBeenCalledTimes(1)
    expect(local.get).toHaveBeenCalledTimes(1)
    expect(local.remove).toHaveBeenCalledTimes(1)
  })

  describe('Get Multi Behavior', () => {
    it('should return multiple values (session)', async () => {
      const keys = ['key1', 'key2', 'key3']
      const value = { value: true, ttl: Date.now() + 5000 }
      const local = { get: jest.fn() }
      const session = {
        get: jest.fn(key => JSON.stringify(value))
      }
      const results = await getItem.multi({ keys, local, session, log: jest.fn() })

      expect(results.length).toEqual(keys.length)
      expect(session.get).toHaveBeenCalledTimes(keys.length)
      expect(local.get).toHaveBeenCalledTimes(0)
    })

    it('should return multiple values (local)', async () => {
      const keys = ['key1', 'key2', 'key3']
      const value = { value: true, ttl: Date.now() + 5000 }
      const session = { get: jest.fn() }
      const local = {
        get: jest.fn(key => JSON.stringify(value))
      }
      const results = await getItem.multi({ keys, local, session, log: jest.fn() })

      expect(results.length).toEqual(keys.length)
      expect(session.get).toHaveBeenCalledTimes(keys.length)
      expect(local.get).toHaveBeenCalledTimes(keys.length)
    })

    it('should return values from correct caches', async () => {
      const keys = ['key1', 'key2', 'key3']
      const sessionResponses = [{ value: 'session', ttl: Date.now() + 5000 }]
      const localResponses = [{ value: 'local', ttl: Date.now() + 5000 }]
      const session = {
        get: jest.fn(() => JSON.stringify(sessionResponses.pop())),
        remove: jest.fn()
      }
      const local = {
        get: jest.fn(() => JSON.stringify(localResponses.pop())),
        remove: jest.fn()
      }
      const results = await getItem.multi({ keys, local, session, log: jest.fn() })

      expect(results).toEqual(expect.arrayContaining(['session', 'local', null]))
      expect(results.length).toEqual(keys.length)
      expect(session.get).toHaveBeenCalledTimes(3)
      expect(local.get).toHaveBeenCalledTimes(2)
    })
  })
})
