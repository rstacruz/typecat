import React from 'react'
import SessionUI from './SessionUI'
import Layout from './Layout'
import useStore from './AppPage/SessionUI/useStore'

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
