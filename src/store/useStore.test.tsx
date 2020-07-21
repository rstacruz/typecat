import { renderHook, act } from '@testing-library/react-hooks'
import useStore from './useStore'
import tokenize from './useStore/tokenize'

let result, state, actions

beforeEach(() => {
  result = renderHook(() => useStore()).result
})

test('works', () => {
  state = result.current.state
  expect(state.session.status).toEqual('pending')
  expect(state.currentInput.value).toEqual('')
})

test('simulate input', () => {
  actions = result.current.actions

  act(() => {
    actions.update(({ state }) => {
      state.session = { status: 'ready' }
      state.article.tokens = tokenize('hi world')
    })
  })

  state = result.current.state
  expect(state.article.tokens).toMatchInlineSnapshot(`
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

  act(() => {
    actions.setInputValue('hi')
  })

  state = result.current.state
  expect(state.session).toMatchInlineSnapshot(`
    Object {
      "startedAt": 2007-09-02T00:00:00.000Z,
      "status": "ongoing",
    }
  `)
  expect(state.currentInput).toMatchInlineSnapshot(`
    Object {
      "charIndex": 2,
      "finishedTokens": Array [],
      "isAccurate": true,
      "tokenIndex": 0,
      "value": "hi",
    }
  `)

  act(() => {
    actions.inputWhitespace()
  })

  state = result.current.state
  expect(state.currentInput).toMatchInlineSnapshot(`
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
