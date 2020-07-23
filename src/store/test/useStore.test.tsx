import { act } from '@testing-library/react-hooks'
import { tokenize } from '../../article-generator'
import { setupStoreTest } from './setupStoreTest'

const { state, actions } = setupStoreTest()

test('has a good initial state', () => {
  expect(state().session).toMatchInlineSnapshot(`
    Object {
      "status": "pending",
    }
  `)

  expect(state().currentInput).toMatchInlineSnapshot(`
    Object {
      "charIndex": 0,
      "finishedTokens": Array [],
      "isAccurate": true,
      "tokenIndex": 0,
      "value": "",
    }
  `)
})

test('receive articles', () => {
  act(() => {
    actions().receiveArticles([{ tokens: tokenize('hi world') }])
  })

  expect(state().article.tokens).toMatchInlineSnapshot(`
    Array [
      Object {
        "type": "text",
        "value": "hi",
      },
      Object {
        "type": "whitespace",
        "value": " ",
      },
      Object {
        "type": "text",
        "value": "world",
      },
    ]
  `)
})

test('type 1 word', () => {
  act(() => {
    actions().receiveArticles([{ tokens: tokenize('hi world') }])
    actions().setInputValue('hi')
  })

  // Sesion is started
  expect(state().session).toMatchInlineSnapshot(`
    Object {
      "startedAt": 2007-09-02T00:00:00.000Z,
      "status": "ongoing",
    }
  `)

  // Types the word
  expect(state().currentInput).toMatchInlineSnapshot(`
    Object {
      "charIndex": 2,
      "finishedTokens": Array [],
      "isAccurate": true,
      "tokenIndex": 0,
      "value": "hi",
    }
  `)
})

test('type 1 word and a space', () => {
  act(() => {
    actions().receiveArticles([{ tokens: tokenize('hi world') }])
    actions().setInputValue('hi')
    actions().inputWhitespace()
  })

  expect(state().currentInput).toMatchInlineSnapshot(`
    Object {
      "charIndex": 0,
      "finishedTokens": Array [
        Object {
          "isAccurate": true,
          "mistakes": 0,
          "value": "hi",
        },
        Object {
          "isAccurate": true,
          "mistakes": 0,
          "value": "",
        },
      ],
      "isAccurate": true,
      "tokenIndex": 2,
      "value": "",
    }
  `)
})

test('receive one article', () => {
  act(() => {
    actions().receiveArticles([{ tokens: tokenize('hi world') }])
  })

  expect(state().article.tokens.length).toBeGreaterThan(0)
  expect(state().articleQueue.length).toEqual(0)
})

test('receive multiple articles', () => {
  act(() => {
    actions().receiveArticles([
      { tokens: tokenize('hi world') },
      { tokens: tokenize('oh hi') },
    ])
  })

  expect(state().article.tokens.length).toBeGreaterThan(0)
  expect(state().articleQueue.length).toEqual(1)
})

test('type a bad first word', () => {
  act(() => {
    actions().receiveArticles([{ tokens: tokenize('hi world') }])
    actions().setInputValue('hey')
    actions().inputWhitespace()
  })

  expect(state().session).toMatchInlineSnapshot(`
    Object {
      "startedAt": 2007-09-02T00:00:00.000Z,
      "status": "ongoing",
    }
  `)

  expect(state().currentInput).toMatchInlineSnapshot(`
    Object {
      "charIndex": 0,
      "finishedTokens": Array [
        Object {
          "isAccurate": false,
          "mistakes": 2,
          "value": "hey",
        },
        Object {
          "isAccurate": true,
          "mistakes": 0,
          "value": "",
        },
      ],
      "isAccurate": true,
      "tokenIndex": 2,
      "value": "",
    }
  `)
})

test('type something bad', () => {
  act(() => {
    actions().receiveArticles([{ tokens: tokenize('hi world') }])
    actions().setInputValue('hi')
    actions().inputWhitespace()
    actions().setInputValue('woke')
  })

  expect(state().session).toMatchInlineSnapshot(`
    Object {
      "startedAt": 2007-09-02T00:00:00.000Z,
      "status": "ongoing",
    }
  `)

  expect(state().currentInput).toMatchInlineSnapshot(`
    Object {
      "charIndex": 4,
      "finishedTokens": Array [
        Object {
          "isAccurate": true,
          "mistakes": 0,
          "value": "hi",
        },
        Object {
          "isAccurate": true,
          "mistakes": 0,
          "value": "",
        },
      ],
      "isAccurate": false,
      "tokenIndex": 2,
      "value": "woke",
    }
  `)
})

test('finish typing with no articles left', async () => {
  ;(fetch as any).mockResponseOnce(
    JSON.stringify({
      articles: [
        { tokens: tokenize('hello there') },
        { tokens: tokenize('oh hi') },
      ],
    })
  )

  await act(async () => {
    actions().receiveArticles([{ tokens: tokenize('hi world') }])
    actions().setInputValue('hi')
    await actions().inputWhitespace()
    actions().setInputValue('world')
  })

  expect(state().results.length).toEqual(0)

  // Type the final 'enter'
  await act(async () => {
    await actions().inputWhitespace()
  })

  // It should reset and load the next article
  expect(state().results.length).toEqual(1)
  expect(typeof state().results[0].wpm).toEqual('number')
  expect(state().session.status).toEqual('ready')

  let calls = (fetch as any).mock.calls
  expect(calls[0][0].startsWith('/api/articles?')).toEqual(true)
})
