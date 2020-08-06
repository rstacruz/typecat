/**
 * Generates a string from a list of words.
 */

function generateFromCorpus({
  words,
  wordCount,
  difficulty,
}: {
  words: string[]
  wordCount: number
  /** The higher the number, the more shorter words are preferred */
  difficulty: number
}): string {
  let result: string[] = []
  let lastWord: string | undefined = undefined
  let i = 0

  while (i < wordCount) {
    const word = pick(words, difficulty)
    const subwords = word.split(/\s+/)
    if (subwords[0] !== lastWord) {
      result.push(word)
      lastWord = subwords[subwords.length - 1]
      i += subwords.length
    }
  }

  return result.join(' ')
}

/**
 * Returns a random word from the list of words
 *
 * @example
 *     pick(['moe', 'larry', 'curly'])
 *     // => 'moe'
 */

function pick(words: string[], difficulty: number): string {
  // Prefer the top 100 words as much as possible
  const rand = Math.random() ** difficulty
  const index = Math.round((words.length - 1) * rand)
  return words[index]
}

export { generateFromCorpus }
