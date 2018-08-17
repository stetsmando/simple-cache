import SimpleCache from '../index'
import getItem from '../operations/get_item'

describe('Get Single Behavior', () => {
  it('should call get item single', () => {
    const cache = new SimpleCache()
    const key = 'key'

    getItem.single = jest.fn()
    cache.get(key)

    expect(getItem.single).toHaveBeenCalledTimes(1)
  })
})
