import ENGLISH_WORDS from './english1000.json'
import FILIPINO_WORDS from './filipino1000.json'
import CODEWORDS from './codewords.json'
import CSS from './css.json'
import { generateFromCorpus } from './generateFromCorpus'
import { LanguageName } from '../../store/useStore'
import ARTICLES from './articles'

const CSS_WORDS = [...CSS.values, ...CSS.properties, ...CSS.literals]
const CODEWORDS_WORDS = [...CODEWORDS.keywords, ...CODEWORDS.operators]

const WORD_SETS: { [key: string]: [string[], number] } = {
  english: [ENGLISH_WORDS, 1.1],
  filipino: [FILIPINO_WORDS, 2.2],
  codewords: [CODEWORDS_WORDS, 1.2],
  articles: [ARTICLES, 1],
  css: [CSS_WORDS, 2.2],
}

export function generate({
  wordCount,
  language,
}: {
  wordCount: number
  language: LanguageName
}) {
  if (!WORD_SETS[language]) throw new Error(`Unknown language: '${language}'`)
  const [words, difficulty] = WORD_SETS[language]

  return generateFromCorpus({
    words,
    wordCount,
    difficulty,
  })
}
