import SimpleCache from '../index'
import removeItem from '../operations/remove_item'

describe('Remove Single Behavior', () => {
  it('should call remove item single', () => {
    const cache = new SimpleCache()
    const key = 'key'

    removeItem.single = jest.fn()
    cache.remove(key)

    expect(removeItem.single).toHaveBeenCalledTimes(1)
  })
})
