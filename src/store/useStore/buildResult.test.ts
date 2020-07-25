import { buildResult } from './buildResult'

const TOKENS = [
  { type: 'text', value: 'jaaa' },
  { type: 'whitespace', value: ' ' },
  { type: 'text', value: 'jaaa' },
  { type: 'whitespace', value: ' ' },
  { type: 'text', value: 'ding' },
  { type: 'whitespace', value: ' ' },
  { type: 'text', value: 'dong' },
]

const FINISHED_TOKENS = [
  { value: 'jaaa', mistakes: 0 },
  { value: ' ', mistakes: 0 },
  { value: 'jaaa', mistakes: 0 },
  { value: ' ', mistakes: 0 },
  { value: 'ding', mistakes: 0 },
  { value: ' ', mistakes: 0 },
  { value: 'dong', mistakes: 0 },
]

describe('buildResult()', () => {
  test('it works', () => {
    const result = buildResult({
      tokens: TOKENS,
      finishedTokens: FINISHED_TOKENS,
      durationMs: 8000,
    })
    expect(result).toMatchInlineSnapshot(`
      Object {
        "accuracy": 1,
        "durationMs": 8000,
        "mistakeCount": 0,
        "wpm": 28.5,
      }
    `)
  })

  test('multiple spaces treated just like one', () => {
    const result = buildResult({
      tokens: [
        TOKENS[0],
        { type: 'whitespace', value: '    ' },
        ...TOKENS.slice(2),
      ],
      finishedTokens: FINISHED_TOKENS,
      durationMs: 8000,
    })

    expect(result.accuracy).toEqual(1)
  })

  test('accounts for mistakes', () => {
    const result = buildResult({
      tokens: TOKENS,
      finishedTokens: [
        { value: 'xxxx', mistakes: 4 },
        ...FINISHED_TOKENS.slice(1),
      ],
      durationMs: 8000,
    })
    expect(result).toMatchInlineSnapshot(`
      Object {
        "accuracy": 0.7894736842105263,
        "durationMs": 8000,
        "mistakeCount": 4,
        "wpm": 22.5,
      }
    `)
  })
})
