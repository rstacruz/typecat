import React from 'react'
import SessionUI from './AppPage/SessionUI'
import Layout from './Layout'
import useStore, { GeneratorConfig } from '../store/useStore'

function AppPage(props: { generator?: GeneratorConfig }) {
  const { actions } = useStore()

  // Start a new session
  React.useEffect(() => {
    actions.setGeneratorConfig(props.generator)
    actions.startNewSession({ force: true })
  }, [props.generator])

  return (
    <Layout>
      <SessionUI />
    </Layout>
  )
}

export default AppPage
