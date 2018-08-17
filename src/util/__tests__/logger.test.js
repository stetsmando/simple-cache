import Logger from '../logger'

let msg = null
console.log = jest.fn(message => { msg = message })

describe('Logger Behavior', () => {
  beforeEach(() => {
    msg = null
  })

  it(`shouldn't log anything`, () => {
    const log = Logger.create()
    log('test')

    expect(console.log).toHaveBeenCalledTimes(0)
  })

  it('should log a message without key', () => {
    const message = 'test'
    const log = Logger.create({ debug: true })
    log(message)

    expect(msg).toEqual(message)
  })

  it('should log a message with custom key', () => {
    const key = 'SimpleCache: '
    const message = 'test'
    const log = Logger.create({ debug: true, key })
    log(message)

    expect(msg).toEqual(`${key}${message}`)
  })
})
