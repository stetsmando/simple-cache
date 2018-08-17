import SimpleCache from '../index'
import removeItem from '../operations/remove_item'

describe('Remove Multi Behavior', () => {
  it('should call remove item multi', async () => {
    const namespace = 'SimpleCacheTest:'
    const cache = new SimpleCache({
      namespace
    })
    const keys = ['key1', 'key2']
    const expected = [`${namespace}key1`, `${namespace}key2`]

    removeItem.multi = jest.fn(cw => {
      expect(cw.keys).toEqual(expect.arrayContaining(expected))
    })
    await cache.remove(keys)

    expect(removeItem.multi).toHaveBeenCalledTimes(1)
  })
})
