import { Result } from '../useStore'
import { get as getDistance } from 'fast-levenshtein'

type Tokenlike = { value: string } | null | void

/**
 * Calculates wpm and accuracy
 */

export function buildResult(options: {
  startedAt: Date
  tokens: ({ value: string } | null)[]
  finishedTokens: Tokenlike[]
}): Result {
  // Get expected and actual strings
  const expected = stringify(options.tokens)
  const actual = stringify(options.finishedTokens)

  // Calculate accuracy
  const { accuracy, mistakeCount } = getAccuracy(expected, actual)

  const wpm = 60
  const result: Result = { wpm, accuracy, mistakeCount }
  return result
}

/**
 * Compute the accuracy of a typed `actual` string based on an
 * `expected` string
 */

export function getAccuracy(expected: string, actual: string) {
  const mistakeCount = getDistance(expected, actual)
  const accuracy = 1 - Math.max(Math.min(mistakeCount / expected.length, 1), 0)
  return { accuracy, mistakeCount }
}

/**
 * Converts a list of tokens to a string
 */

export function stringify(tokens: Tokenlike[]): string {
  return tokens
    .map((token) => (token && token.value).trim())
    .filter(Boolean)
    .join('')
}
