import AppPage from '../../src/templates/AppPage'
import { GeneratorConfig, LanguageName } from '../../src/store/useStore'

export type WordCountPageProps = {
  wordCount: number
  language: LanguageName
}

function WordCountPage({ wordCount, language }: WordCountPageProps) {
  if (!wordCount) return null
  if (wordCount < 4) return null
  if (wordCount > 200) return null

  const generator: GeneratorConfig = {
    type: 'word',
    language,
    wordCount,
  }

  return <AppPage generator={generator} />
}

export default WordCountPage

export async function getStaticPaths() {
  return {
    paths: [
      { params: { wordCount: '10' } },
      { params: { wordCount: '25' } },
      { params: { wordCount: '50' } },
      { params: { wordCount: '100' } },
    ],
    fallback: false,
  }
}

export async function getStaticProps({
  params,
}: {
  params: { wordCount: string }
}) {
  return { props: { wordCount: +params.wordCount, language: 'english' } }
}
