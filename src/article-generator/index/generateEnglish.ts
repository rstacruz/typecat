import ENGLISH_WORDS from './english1000.json'

// The lower this is, the more short words are picked
const DIFFICULTY_FACTOR = 1.8

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
}): string {
  let result: string[] = []
  let lastWord: string
  let i = 0

  while (i < wordCount) {
    const word = pick(words)
    if (word !== lastWord) {
      result.push(word)
      lastWord = word
      i++
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

function pick(words: string[]): string {
  // Prefer the top 100 words as much as possible
  const rand = Math.random() ** DIFFICULTY_FACTOR
  const index = Math.round((words.length - 1) * rand)
  return words[index]
}

export { generateEnglish }
