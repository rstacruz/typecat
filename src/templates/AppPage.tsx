import React from 'react'
import SessionUI from './AppPage/SessionUI'
import Layout from './Layout'
import useStore from '../store/useStore'

function AppPage(props: { wordCount: number }) {
  const { actions } = useStore()

  // Start a new session
  React.useEffect(() => {
    const params = { wordCount: props.wordCount }
    actions.setArticleParams(params)
    actions.startNewSession()
  }, [props.wordCount])

  return (
    <Layout>
      <SessionUI />
    </Layout>
  )
}

export default AppPage
