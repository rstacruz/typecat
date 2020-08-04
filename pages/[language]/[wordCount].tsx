import {
  LANGUAGES,
  GeneratorConfig,
  LanguageName,
} from '../../src/store/useStore'
import AppPage from '../../src/templates/AppPage'

export type Props = {
  wordCount: number
  language: LanguageName
}

type Params = { wordCount: string; language: string }

export default function WordCountPage(props: Props) {
  const { wordCount, language } = props
  const generator: GeneratorConfig = {
    type: 'word',
    language,
    wordCount,
  }

  return <AppPage generator={generator} />
}

/**
 * Convert GET `?params` into React `props`
 */

export async function getStaticProps({ params }: { params: Params }) {
  return { props: { wordCount: +params.wordCount, language: params.language } }
}

/**
 * Get static paths
 */

export async function getStaticPaths() {
  const paths = []
  const wordCounts = ['10', '25', '50', '100']

  for (let language of LANGUAGES) {
    for (let wordCount of wordCounts) {
      const params: Params = { wordCount, language }
      paths.push({ params })
    }
  }

  return { paths, fallback: false }
}
