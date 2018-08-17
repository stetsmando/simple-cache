import SimpleCache from '../index'
import getItem from '../operations/get_item'

describe('Get Multi Behavior', () => {
  it('should call get item multi', async () => {
    const cache = new SimpleCache()
    const keys = ['key1', 'key2']

    getItem.multi = jest.fn()
    await cache.get(keys)

    expect(getItem.multi).toHaveBeenCalledTimes(1)
  })
})
