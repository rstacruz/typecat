import ENGLISH_WORDS from './english1000.json'

function generateEnglish({ wordCount }: { wordCount: number }) {
  return generateFromCorpus({ words: ENGLISH_WORDS, wordCount })
}

/**
 * Generates a string from a list of words.
 */

function generateFromCorpus({
  words,
  wordCount,
}: {
  words: string[]
  wordCount: number
}) {
  return Array.from(Array(wordCount), () => pick(words)).join(' ')
}

/**
 * Returns a random word from the list of words
 *
 * @example
 *     pick(['moe', 'larry', 'curly'])
 *     // => 'moe'
 */

function pick(words: string[]): string {
  // Prefer the top 100 words as much as possible
  const rand = Math.random() ** 3.5
  const index = Math.round((words.length - 1) * rand)
  return words[index]
}

export { generateEnglish }
