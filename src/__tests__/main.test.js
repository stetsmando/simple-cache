import SimpleCache from '../index'

describe('SimpleCache Behavior', () => {
  it('should return a SimpleCache instance with default API/configuration', () => {
    const cache = new SimpleCache()

    expect(cache).toBeTruthy()
    expect(cache.set).toBeTruthy()
    expect(cache.get).toBeTruthy()
    expect(cache.remove).toBeTruthy()
    expect(cache.ttl).toEqual(1000 * 60 * 60 * 24)
    expect(cache.namespace).toEqual('SimpleCache:')
  })

  it('should return a SimpleCache instance with custom API/configuration', () => {
    const ttl = 1000 * 60
    const namespace = 'SimpleCacheTest:'

    const cache = new SimpleCache({
      ttl,
      namespace
    })

    expect(cache).toBeTruthy()
    expect(cache.set).toBeTruthy()
    expect(cache.get).toBeTruthy()
    expect(cache.remove).toBeTruthy()
    expect(cache.ttl).toEqual(ttl)
    expect(cache.namespace).toEqual(namespace)
  })
})
