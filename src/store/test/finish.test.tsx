import { act } from '@testing-library/react-hooks'
import { tokenize } from '../../article-generator'
import { setupStoreTest } from './setupStoreTest'

const { state, actions } = setupStoreTest()

test('finish typing with no articles left', async () => {
  mockArticles()

  await act(async () => {
    actions().receiveArticles([{ tokens: tokenize('hi world') }])
    actions().setInputValue('hi')
    await actions().inputWhitespace()
    actions().setInputValue('world')
    await actions().inputWhitespace()
  })

  // It should reset and load the next article
  expect(state().results.length).toEqual(1)
  expect(typeof state().results[0].wpm).toEqual('number')
  expect(state().session.status).toEqual('ready')

  let calls = (fetch as any).mock.calls
  expect(calls[0][0].startsWith('/api/articles?')).toEqual(true)
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
