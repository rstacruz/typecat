export { default, getStaticPaths } from '../english/[wordCount]'

export async function getStaticProps({
  params,
}: {
  params: { wordCount: string }
}) {
  return { props: { wordCount: +params.wordCount, language: 'codewords' } }
}
