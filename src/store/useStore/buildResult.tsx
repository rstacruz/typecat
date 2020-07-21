import { Result } from '../useStore'

export function buildResult(): Result {
  const wpm = Math.round(60 + 30 * Math.random())
  const result: Result = { wpm, accuracy: 0.98 }
  return result
}
