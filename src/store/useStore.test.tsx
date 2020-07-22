import { renderHook, act, HookResult } from '@testing-library/react-hooks'
import { createStore, Store } from './useStore'
import { tokenize } from '../article-generator'
import fetch from 'cross-fetch'

let result: HookResult<Store>

beforeEach(() => {
  const [useStore] = createStore()
  result = renderHook(() => useStore()).result
})

const actions = () => result.current.actions
const state = () => result.current.state

test('works', () => {
  expect(state().session.status).toEqual('pending')
  expect(state().currentInput.value).toEqual('')
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

  expect(state().session).toMatchInlineSnapshot(`
    Object {
      "startedAt": 2007-09-02T00:00:00.000Z,
      "status": "ongoing",
    }
  `)
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
        },
      ],
      "isAccurate": false,
      "tokenIndex": 2,
      "value": "woke",
    }
  `)
})

test.only('fetch', async () => {
  const res = await fetch('/api/articles').then((r) => r.json())
  console.log(res)
})

test('finish typing with no articles left', async () => {
  await act(async () => {
    actions().receiveArticles([{ tokens: tokenize('hi world') }])
    actions().setInputValue('hi')
    await actions().inputWhitespace()
    actions().setInputValue('world')
  })

  expect(state().results.length).toEqual(0)

  await act(async () => {
    await actions().inputWhitespace()
  })

  expect(state().results.length).toEqual(1)
  expect(typeof state().results[0].wpm).toEqual('number')
  expect(state().session.status).toEqual('pending')
})
