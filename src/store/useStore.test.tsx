import { renderHook, act, HookResult } from '@testing-library/react-hooks'
import { createStore, Store, State } from './useStore'
import { tokenize } from '../article-generator'

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

test('works', () => {
  receiveArticles()
  typeSomethingGood()
  typeSpace()
})

function receiveArticles() {
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
}

function typeSomethingGood() {
  act(() => {
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
}

function typeSpace() {
  act(() => {
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
}
