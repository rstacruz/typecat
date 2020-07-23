import { buildResult, stringify } from './buildResult'

const TOKENS = [
  { value: 'jaaa' },
  { value: ' ' },
  { value: 'jaaa' },
  { value: ' ' },
  { value: 'ding' },
  { value: ' ' },
  { value: 'dong' },
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
  it('works', () => {
    const result = buildResult({
      tokens: TOKENS,
      finishedTokens: FINISHED_TOKENS,
      durationMs: 8000,
    })
    expect(result).toMatchInlineSnapshot(`
      Object {
        "accuracy": 1,
        "mistakeCount": 0,
        "wpm": 24,
      }
    `)
  })

  it('works', () => {
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
        "accuracy": 0.75,
        "mistakeCount": 4,
        "wpm": 18,
      }
    `)
  })
})

describe('stringify()', () => {
  it('works', () => {
    const result = stringify(TOKENS)
    expect(result).toEqual('jaaajaaadingdong')
  })
})
