import React from 'react'
import SessionUI from './AppPage/SessionUI'
import Layout from './AppPage/Layout'
import useStore from './AppPage/SessionUI/TextDisplay/useStore'

function AppPage() {
  const { actions } = useStore()

  // Start a new session
  React.useEffect(() => {
    actions.startNewSession()
  }, [])

  return (
    <Layout>
      <SessionUI />
    </Layout>
  )
}

export default AppPage
