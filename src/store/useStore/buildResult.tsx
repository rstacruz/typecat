import { Result } from '../useStore'

type Tokenlike = { value: string } | null | void

const AVERAGE_CHARS_PER_WORD = 5

/**
 * Calculates wpm and accuracy
 */

export function buildResult(options: {
  durationMs: number
  tokens: ({ value: string } | null)[]
  finishedTokens: ({ value: string; mistakes: number } | null)[]
}): Result {
  // Get expected and actual strings
  const expected = stringify(options.tokens)

  // Count mistakes
  const mistakeCount = options.finishedTokens
    .map((t) => t?.mistakes || 0)
    .reduce((a, b) => a + b)
  const accuracy = 1 - mistakeCount / expected.length

  // Estimated number of accurate words
  const netWords = (expected.length - mistakeCount) / AVERAGE_CHARS_PER_WORD

  // Words per minute
  const wpm = netWords / (options.durationMs / 60000)

  const result: Result = { wpm, accuracy, mistakeCount }
  return result
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
