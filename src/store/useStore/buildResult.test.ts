import { buildResult, stringify, getAccuracy } from './buildResult'

const TOKENS = [
  { value: 'jaaa' },
  { value: ' ' },
  { value: 'jaaa' },
  { value: ' ' },
  { value: 'ding' },
  { value: ' ' },
  { value: 'dong' },
]

const NOW = new Date('2010-04-20T08:00:00.000Z')

describe('buildResult()', () => {
  it('works', () => {
    const result = buildResult({
      tokens: TOKENS,
      finishedTokens: TOKENS,
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
      finishedTokens: [{ value: 'xxxx' }, ...TOKENS.slice(1)],
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

describe('getAccuracy()', () => {
  test('100% accuracy', () => {
    const res = getAccuracy('hey', 'hey')
    expect(res.mistakeCount).toEqual(0)
    expect(res.accuracy).toEqual(1)
  })

  test('0% accuracy', () => {
    const res = getAccuracy('123', '890')
    expect(res.mistakeCount).toEqual(3)
    expect(res.accuracy).toEqual(0)
  })

  test('50% accuracy', () => {
    const res = getAccuracy('1234', '12ab')
    expect(res.mistakeCount).toEqual(2)
    expect(res.accuracy).toEqual(0.5)
  })

  test('10% accuracy', () => {
    const res = getAccuracy('1234567890', '1xxxxyyyyy')
    expect(res.mistakeCount).toEqual(9)
    expect(res.accuracy - 0.1).toBeLessThan(0.001)
  })
})
