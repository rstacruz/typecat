import * as MockDate from 'mockdate'

global.fetch = require('jest-fetch-mock')

beforeEach(() => {
  global.fetch.resetMocks()
  MockDate.set('2007-09-02')
})

afterEach(() => {
  MockDate.reset()
})

export function lmao() {
  return true
}
