import ENGLISH_WORDS from './english1000.json'
import FILIPINO_WORDS from './filipino1000.json'
import { generateFromCorpus } from './generateFromCorpus'
import { LanguageName } from '../../store/useStore'

const LANGUAGES: { [key: string]: [string[], number] } = {
  english: [ENGLISH_WORDS, 1.1],
  filipino: [FILIPINO_WORDS, 2.2],
}

export function generate({
  wordCount,
  language,
}: {
  wordCount: number
  language: LanguageName
}) {
  if (!LANGUAGES[language]) throw new Error(`Unknown language: '${language}'`)
  const [words, difficulty] = LANGUAGES[language]

  return generateFromCorpus({
    words,
    wordCount,
    difficulty,
  })
}
