global.fetch = require('jest-fetch-mock')
require('mockdate').default.set('2007-09-02')

beforeEach(() => {
  global.fetch.resetMocks()
})
