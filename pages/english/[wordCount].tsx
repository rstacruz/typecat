import AppPage from '../../src/templates/AppPage'

function Page({ wordCount }: { wordCount: number }) {
  if (!wordCount) return null
  if (wordCount < 4) return null
  if (wordCount > 200) return null

  return <AppPage wordCount={wordCount} />
}

export default Page

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

export async function getStaticProps({ params }) {
  return { props: { wordCount: +params.wordCount } }
}
