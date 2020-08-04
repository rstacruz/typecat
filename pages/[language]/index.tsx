import { LANGUAGES, LanguageName } from '../../src/store/useStore'
import WordCountPage from './[wordCount]'

type Params = {
  language: LanguageName
}

type Props = Params

export default function LanguagePage(props: Props) {
  return <WordCountPage {...props} wordCount={50} />
}

export async function getStaticProps({ params }: { params: Params }) {
  return { props: { language: params.language } }
}

export async function getStaticPaths() {
  const paths = []

  for (let language of LANGUAGES) {
    const params: Params = { language }
    paths.push({ params })
  }

  return { paths, fallback: false }
}
