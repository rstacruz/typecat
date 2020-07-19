import React from 'react'
import SessionUI from './AppPage/SessionUI'
import Layout from './shared/Layout'
import useStore from './shared/useStore'

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
