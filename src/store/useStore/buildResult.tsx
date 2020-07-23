import { Result } from '../useStore'
import { get as getDistance } from 'fast-levenshtein'

type Tokenlike = { value: string } | null | void

const AVERAGE_CHARS_PER_WORD = 5

/**
 * Calculates wpm and accuracy
 */

export function buildResult(options: {
  durationMs: number
  tokens: ({ value: string } | null)[]
  finishedTokens: Tokenlike[]
}): Result {
  // Get expected and actual strings
  const expected = stringify(options.tokens)
  const actual = stringify(options.finishedTokens)

  // Calculate accuracy
  const { accuracy, mistakeCount } = getAccuracy(expected, actual)

  // Estimated number of accurate words
  const netWords = (expected.length - mistakeCount) / AVERAGE_CHARS_PER_WORD

  // Words per minute
  const wpm = netWords / (options.durationMs / 60000)

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
