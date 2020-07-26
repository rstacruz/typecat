import { Result } from '../useStore'

const AVERAGE_CHARS_PER_WORD = 5

/**
 * For interim results, the first few seconds would give wild results. To curb
 * this, adjust the duration for the first few seconds to make it not show a
 * spike.
 */

const MINIMUM_INTERIM_DURATION = 3000

/**
 * Calculates wpm and accuracy
 */

export function buildResult(options: {
  isInterim?: boolean
  durationMs: number
  tokens: ({ value: string; type: string } | null)[]
  finishedTokens: ({ value: string; mistakes: number } | null)[]
}): Result {
  const { durationMs } = options

  const adjustedDuration = options.isInterim
    ? Math.max(durationMs, MINIMUM_INTERIM_DURATION)
    : durationMs

  // Get expected string length
  const expected = getLength(options.tokens)

  // Count mistakes
  const mistakeCount = options.finishedTokens
    .map((t) => t?.mistakes || 0)
    .reduce((a, b) => a + b)
  const accuracy = 1 - mistakeCount / expected

  // Estimated number of accurate words
  const netWords = (expected - mistakeCount) / AVERAGE_CHARS_PER_WORD

  // Words per minute
  const wpm = netWords / (adjustedDuration / 60000)

  const result: Result = { wpm, accuracy, mistakeCount, durationMs }
  return result
}

/**
 * Converts a list of tokens to a string, normalising whitespaces
 */

export function getLength(
  tokens: ({ value: string; type: string } | null)[]
): number {
  return tokens.reduce((acc, token) => {
    if (!token) return acc
    return token.type === 'whitespace' ? acc + 1 : acc + token.value.length
  }, 0)
}
