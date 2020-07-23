import { act } from '@testing-library/react-hooks'
import { tokenize } from '../../article-generator'
import { setupStoreTest } from './setupStoreTest'
import { set as mockDate } from 'mockdate'

const { state, actions } = setupStoreTest()

describe('finish typing with no articles left', () => {
  beforeEach(async () => {
    mockDate('2019-04-20 08:00:00')
    mockArticles()

    await act(async () => {
      actions().receiveArticles([{ tokens: tokenize('hi world') }])

      // Type
      actions().setInputValue('hi')
      await actions().inputWhitespace()
      actions().setInputValue('world')

      // Type the final bit
      mockDate('2019-04-20 08:00:10')
      await actions().inputWhitespace()
    })
  })

  test('resets and loads the next article', () => {
    expect(state().results.length).toEqual(1)
    expect(typeof state().results[0].wpm).toEqual('number')
    expect(state().session.status).toEqual('ready')
  })

  test('fetches from the API', () => {
    let calls = (fetch as any).mock.calls
    expect(calls[0][0].startsWith('/api/articles?')).toEqual(true)
  })

  test.skip('good result', () => {
    expect(state().results[0]).toMatchInlineSnapshot(`
      Object {
        "accuracy": 1,
        "wpm": 100,
      }
    `)
  })
})

function mockArticles() {
  ;(fetch as any).mockResponseOnce(
    JSON.stringify({
      articles: [
        { tokens: tokenize('hello there') },
        { tokens: tokenize('oh hi') },
      ],
    })
  )
}
