import Item from '../item'

describe('Item Behavior', () => {
  it('should return an item with default ttl', () => {
    const ttl = 1000 * 30
    const obj = { 'key': true }
    const item = Item.create(ttl, jest.fn())
    const value = item.build(obj)

    expect(value.value).toEqual(obj)
    expect(value.ttl).toBeLessThan(ttl + Date.now())
  })

  it('should return an item with provided ttl', () => {
    const ttl = Date.now() + 1000 * 30
    const obj = { 'key': true, ttl }
    const item = Item.create(100, jest.fn())
    const value = item.build(obj)

    expect(value.value).toEqual({ 'key': true })
    expect(value.ttl).toEqual(ttl)
  })
})
